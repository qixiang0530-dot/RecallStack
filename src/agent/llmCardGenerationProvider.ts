import type { CardDraft, CardGenerationProvider, GenerationEvent, GenerationOptions, MaterialInput } from './types'
import { z } from 'zod'
import { cardDraftSchema } from '../domain/schemas'

const llmDraftEventSchema = cardDraftSchema.extend({
  provider: z.literal('llm'),
  sourceExcerpt: z.string().min(1),
  contentHash: z.string().regex(/^[a-f0-9]{64}$/),
  model: z.string().min(1),
  promptVersion: z.string().min(1)
})

const generationEventSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('start'), requestId: z.string().min(1), totalChunks: z.number().int().nonnegative() }),
  z.object({ type: z.literal('chunk-start'), index: z.number().int().nonnegative(), sourceRef: z.string() }),
  z.object({ type: z.literal('drafts'), index: z.number().int().nonnegative(), drafts: z.array(llmDraftEventSchema) }),
  z.object({ type: z.literal('chunk-error'), index: z.number().int().nonnegative(), message: z.string(), retryable: z.boolean() }),
  z.object({ type: z.literal('complete'), generated: z.number().int().nonnegative(), failedChunks: z.number().int().nonnegative() })
])

export class LlmCardGenerationProvider implements CardGenerationProvider {
  constructor(private readonly apiUrl: string, private readonly fetchImpl: typeof fetch = fetch) {}

  async generate(input: MaterialInput, options: GenerationOptions = {}): Promise<CardDraft[]> {
    if (!this.apiUrl) throw new Error('AI 拆卡服务未配置')
    const fetchImpl = this.fetchImpl
    const response = await fetchImpl(this.apiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
      body: JSON.stringify({ material: input, chunkIndexes: options.chunkIndexes }),
      signal: options.signal
    })
    if (!response.ok) {
      let message = `AI 拆卡服务返回 ${response.status}`
      const body = await response.json().catch(() => undefined) as { code?: string; message?: string } | undefined
      if (body?.code === 'DAILY_BUDGET_EXCEEDED') message = '今日 AI 拆卡额度已用完，你仍可以使用本地规则拆卡。'
      if (body?.code === 'AI_DISABLED') message = 'AI 拆卡服务当前已暂停，你仍可以使用本地规则拆卡。'
      if (body?.code === 'MATERIAL_TOO_LARGE') message = '资料超过公开 Beta 限制，请缩短到 12000 字符以内。'
      if (body?.code === 'MODEL_NOT_CONFIGURED') message = 'AI 服务尚未完成配置，请稍后再试。'
      if (body?.message) message = body.message
      throw new Error(message)
    }
    if (!response.body) throw new Error('AI 拆卡服务没有返回进度流')

    const drafts: CardDraft[] = []
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    while (true) {
      const result = await reader.read()
      buffer += decoder.decode(result.value, { stream: !result.done })
      const blocks = buffer.split('\n\n')
      buffer = blocks.pop() ?? ''
      for (const block of blocks) {
        const event = parseEvent(block)
        if (!event) continue
        await options.onEvent?.(event)
        if (event.type === 'drafts') drafts.push(...event.drafts)
      }
      if (result.done) break
    }
    return drafts
  }
}

export function createDefaultLlmCardGenerationProvider(): LlmCardGenerationProvider {
  const testUrl = import.meta.env.MODE === 'test' ? 'https://worker.test/api/card-generation' : ''
  const apiUrl = import.meta.env.MODE === 'test' ? testUrl : (import.meta.env.VITE_CARD_GENERATION_API_URL ?? '')
  return new LlmCardGenerationProvider(apiUrl)
}

function parseEvent(block: string): GenerationEvent | undefined {
  const data = block.split(/\r?\n/).filter((line) => line.startsWith('data: ')).map((line) => line.slice(6)).join('\n')
  if (!data) return undefined
  const event = generationEventSchema.parse(JSON.parse(data)) as GenerationEvent
  if (event.type !== 'drafts') return event
  return {
    ...event,
    drafts: event.drafts.map((draft) => ({
      ...draft,
      quality: 'needs-review' as const,
      provider: 'llm' as const,
      createdAt: new Date(String(draft.createdAt)),
      updatedAt: new Date(String(draft.updatedAt))
    }))
  }
}
