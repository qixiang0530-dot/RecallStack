import { describe, expect, it, vi } from 'vitest'
import { LlmCardGenerationProvider } from './llmCardGenerationProvider'

describe('LlmCardGenerationProvider', () => {
  it('parses SSE progress and returns generated drafts', async () => {
    const fetchImpl = vi.fn(async () => new Response([
      `data: ${JSON.stringify({ type: 'start', requestId: 'req-1', totalChunks: 1 })}`,
      `data: ${JSON.stringify({ type: 'chunk-start', index: 0, sourceRef: 'java.md' })}`,
      `data: ${JSON.stringify({ type: 'drafts', index: 0, drafts: [draft()] })}`,
      `data: ${JSON.stringify({ type: 'complete', generated: 1, failedChunks: 0 })}`
    ].join('\n\n') + '\n\n', { status: 200, headers: { 'content-type': 'text/event-stream' } }))
    const events: string[] = []
    const provider = new LlmCardGenerationProvider('https://worker.test/api/card-generation', fetchImpl)

    const drafts = await provider.generate({ name: 'java.md', content: 'HashMap 通过数组组织数据。' }, {
      onEvent: (event) => { events.push(event.type) }
    })

    expect(drafts).toHaveLength(1)
    expect(drafts[0].createdAt).toBeInstanceOf(Date)
    expect(drafts[0].updatedAt).toBeInstanceOf(Date)
    expect(events).toEqual(['start', 'chunk-start', 'drafts', 'complete'])
    expect(fetchImpl).toHaveBeenCalledWith('https://worker.test/api/card-generation', expect.objectContaining({ method: 'POST' }))
  })

  it('surfaces structured worker errors', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ code: 'RATE_LIMITED', message: '请求过于频繁' }), { status: 429 }))
    const provider = new LlmCardGenerationProvider('https://worker.test/api/card-generation', fetchImpl)

    await expect(provider.generate({ name: 'java.md', content: '资料' })).rejects.toThrow('请求过于频繁')
  })

  it('requires a configured worker URL', async () => {
    const provider = new LlmCardGenerationProvider('')

    await expect(provider.generate({ name: 'java.md', content: '资料' })).rejects.toThrow('AI 拆卡服务未配置')
  })

  it('invokes fetch without binding it to the provider instance', async () => {
    const fetchImpl = vi.fn(function (this: unknown) {
      expect(this).toBeUndefined()
      return Promise.resolve(new Response(`data: ${JSON.stringify({ type: 'complete', generated: 0, failedChunks: 0 })}\n\n`, { status: 200 }))
    })
    const provider = new LlmCardGenerationProvider('https://worker.test/api/card-generation', fetchImpl)

    await provider.generate({ name: 'java.md', content: '资料' })
  })

  it('returns partial drafts and reports failed chunks for a later retry', async () => {
    const fetchImpl = vi.fn(async () => new Response([
      `data: ${JSON.stringify({ type: 'start', requestId: 'req-2', totalChunks: 2 })}`,
      `data: ${JSON.stringify({ type: 'chunk-error', index: 1, message: '稍后重试', retryable: true })}`,
      `data: ${JSON.stringify({ type: 'drafts', index: 0, drafts: [draft()] })}`,
      `data: ${JSON.stringify({ type: 'complete', generated: 1, failedChunks: 1 })}`
    ].join('\n\n') + '\n\n', { status: 200, headers: { 'content-type': 'text/event-stream' } }))
    const provider = new LlmCardGenerationProvider('https://worker.test/api/card-generation', fetchImpl)
    const errors: string[] = []

    const drafts = await provider.generate({ name: 'java.md', content: '资料' }, {
      onEvent: (event) => {
        if (event.type === 'chunk-error') errors.push(event.message)
      }
    })

    expect(drafts).toHaveLength(1)
    expect(errors).toEqual(['稍后重试'])
  })

  it('validates SSE drafts and forces AI drafts back into review', async () => {
    const readyDraft = { ...draft(), quality: 'ready' as const }
    const fetchImpl = vi.fn(async () => new Response(`data: ${JSON.stringify({ type: 'drafts', index: 0, drafts: [readyDraft] })}\n\n`, { status: 200 }))
    const provider = new LlmCardGenerationProvider('https://worker.test/api/card-generation', fetchImpl)

    const drafts = await provider.generate({ name: 'java.md', content: '资料' })

    expect(drafts[0].quality).toBe('needs-review')
    expect(drafts[0].provider).toBe('llm')
  })

  it('rejects malformed SSE draft payloads', async () => {
    const fetchImpl = vi.fn(async () => new Response(`data: ${JSON.stringify({ type: 'drafts', index: 0, drafts: [{ ...draft(), confidence: 'high' }] })}\n\n`, { status: 200 }))
    const provider = new LlmCardGenerationProvider('https://worker.test/api/card-generation', fetchImpl)

    await expect(provider.generate({ name: 'java.md', content: '资料' })).rejects.toThrow()
  })
})

function draft() {
  return {
    id: 'draft-1',
    title: 'HashMap',
    topic: 'Java 集合',
    question: 'HashMap 是什么？',
    coreAnswer: '一种 Map。',
    explanation: '',
    keyPoints: [],
    followUps: [],
    tags: ['HashMap'],
    sourceRef: 'java.md',
    sourceExcerpt: 'HashMap 通过数组组织数据。',
    confidence: 0.8,
    generationNotes: [],
    contentHash: 'a'.repeat(64),
    quality: 'needs-review' as const,
    provider: 'llm' as const,
    model: 'qwen3.7-plus',
    promptVersion: 'v0.3-card-generation-1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
