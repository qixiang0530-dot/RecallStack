import { describe, expect, it, vi } from 'vitest'
import { handleRequest, type WorkerEnv } from './handler'

const origin = 'http://localhost:5173'

describe('card generation worker', () => {
  it('streams validated drafts and progress events from the model response', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({ cards: [validModelCard()] }) } }]
    }), { status: 200, headers: { 'content-type': 'application/json' } }))
    const response = await handleRequest(requestWith('## HashMap\n\nHashMap 通过数组组织数据。'), envWith(fetchImpl))
    const body = await response.text()
    const events = body.split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/event-stream')
    expect(events.map((event) => event.type)).toEqual(['start', 'chunk-start', 'drafts', 'complete'])
    expect(events[2].drafts[0]).toMatchObject({ provider: 'llm', quality: 'needs-review', model: 'qwen3.7-plus' })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const requestInit = (fetchImpl.mock.calls[0] as unknown as [RequestInfo | URL, RequestInit])[1]
    expect(JSON.parse(String(requestInit.body))).toMatchObject({ enable_thinking: false })
  })

  it('keeps grounded cards when another card has an invalid source excerpt', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({
        cards: [validModelCard(), { ...validModelCard(), title: '无效引用', sourceExcerpt: '这段完整引用并不存在于当前资料内容中。' }]
      }) } }]
    }), { status: 200 }))

    const response = await handleRequest(requestWith('HashMap 通过数组组织数据。'), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.find((event) => event.type === 'drafts')?.drafts).toHaveLength(1)
    expect(events.at(-1)).toMatchObject({ type: 'complete', generated: 1, failedChunks: 0 })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('retries one failed model request and then returns the successful chunk', async () => {
    const fetchImpl = vi.fn()
      .mockResolvedValueOnce(new Response('temporary failure', { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({
        choices: [{ message: { content: JSON.stringify({ cards: [validModelCard()] }) } }]
      }), { status: 200 }))
    const response = await handleRequest(requestWith('HashMap 通过数组组织数据。'), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.at(-1)).toMatchObject({ type: 'complete', generated: 1, failedChunks: 0 })
    expect(fetchImpl).toHaveBeenCalledTimes(2)
  })

  it('does not retry a non-retryable model response', async () => {
    const fetchImpl = vi.fn(async () => new Response('unauthorized', { status: 401 }))
    const response = await handleRequest(requestWith('HashMap 通过数组组织数据。'), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.at(-1)).toMatchObject({ type: 'complete', generated: 0, failedChunks: 1 })
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('reports only a structured error type when model JSON is invalid', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({
      choices: [{ message: { content: 'not-json' } }]
    }), { status: 200 }))

    const response = await handleRequest(requestWith('HashMap 通过数组组织数据。'), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.find((event) => event.type === 'chunk-error')?.message).toContain('JSON')
    expect(warn).toHaveBeenCalledWith('card-generation-chunk-error', expect.objectContaining({
      chunkIndex: 0,
      errorType: 'MODEL_JSON_INVALID'
    }))
    warn.mockRestore()
  })

  it('reports schema field paths without logging model values', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({ cards: [{ ...validModelCard(), confidence: 'high' }] }) } }]
    }), { status: 200 }))

    const response = await handleRequest(requestWith('HashMap 通过数组组织数据。'), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.find((event) => event.type === 'chunk-error')?.message).toContain('cards.0.confidence')
    expect(warn).toHaveBeenCalledWith('card-generation-chunk-error', expect.objectContaining({
      errorType: 'MODEL_SCHEMA_INVALID',
      issueFields: ['cards.0.confidence']
    }))
    warn.mockRestore()
  })

  it('keeps a failed chunk visible without failing other chunks', async () => {
    const fetchImpl = vi.fn(async () => new Response('bad response', { status: 500 }))
    const content = `第一段。${'内容。'.repeat(900)}\n\n第二段。${'内容。'.repeat(900)}`
    const response = await handleRequest(requestWith(content), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.some((event) => event.type === 'chunk-error' && event.retryable === false)).toBe(true)
    expect(events.at(-1)).toMatchObject({ type: 'complete', generated: 0, failedChunks: 2 })
    expect(fetchImpl).toHaveBeenCalledTimes(4)
  })

  it('stops after generating the request-level maximum of 30 drafts', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({
      choices: [{ message: { content: JSON.stringify({ cards: Array.from({ length: 5 }, validModelCard) }) } }]
    }), { status: 200 }))
    const content = 'HashMap 通过数组组织数据。'.repeat(3_000)

    const response = await handleRequest(requestWith(content), envWith(fetchImpl))
    const events = (await response.text()).split('\n').filter((line) => line.startsWith('data: ')).map((line) => JSON.parse(line.slice(6)))

    expect(events.at(-1)).toMatchObject({ type: 'complete', generated: 30 })
    expect(events.filter((event) => event.type === 'drafts').flatMap((event) => event.drafts)).toHaveLength(30)
    expect(fetchImpl).toHaveBeenCalledTimes(6)
  })

  it('rejects disallowed origins and overlong materials before calling the model', async () => {
    const fetchImpl = vi.fn()
    const blocked = await handleRequest(requestWith('资料', 'https://example.com'), envWith(fetchImpl))
    const tooLong = await handleRequest(requestWith('x'.repeat(60_001)), envWith(fetchImpl))
    const empty = await handleRequest(requestWith('   '), envWith(fetchImpl))

    expect(blocked.status).toBe(403)
    expect(tooLong.status).toBe(413)
    expect(empty.status).toBe(400)
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('does not retry the model request after the client cancels', async () => {
    const controller = new AbortController()
    const fetchImpl = vi.fn((_url: string | URL | Request, init?: RequestInit) => {
      if (fetchImpl.mock.calls.length > 1) return Promise.reject(new Error('unexpected retry'))
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true })
      })
    })
    const request = requestWith('HashMap 通过数组组织数据。')
    Object.defineProperty(request, 'signal', { value: controller.signal })

    const response = await handleRequest(request, envWith(fetchImpl as typeof fetch))
    controller.abort()
    await response.text()

    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })
})

function envWith(fetchImpl: typeof fetch): WorkerEnv {
  return {
    DASHSCOPE_API_KEY: 'test-key',
    ALLOWED_ORIGINS: origin,
    RATE_LIMITER: { limit: async () => ({ success: true }) },
    fetchImpl
  }
}

function requestWith(content: string, requestOrigin = origin): Request {
  return new Request('https://worker.example.com/api/card-generation', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: requestOrigin },
    body: JSON.stringify({ material: { name: 'java.md', content } })
  })
}

function validModelCard() {
  return {
    title: 'HashMap 原理',
    topic: 'Java 集合',
    question: 'HashMap 的结构是什么？',
    coreAnswer: 'HashMap 通过数组组织数据。',
    explanation: '',
    keyPoints: ['数组'],
    followUps: [],
    tags: ['HashMap'],
    sourceExcerpt: 'HashMap 通过数组组织数据。',
    confidence: 0.8,
    generationNotes: []
  }
}
