import type { CardDraft, MaterialInput } from '../domain/types'

export type GenerationEvent =
  | { type: 'start'; requestId: string; totalChunks: number }
  | { type: 'chunk-start'; index: number; sourceRef: string }
  | { type: 'drafts'; index: number; drafts: CardDraft[] }
  | { type: 'chunk-error'; index: number; message: string; retryable: boolean }
  | { type: 'complete'; generated: number; failedChunks: number }

export type GenerationOptions = {
  signal?: AbortSignal
  chunkIndexes?: number[]
  onEvent?: (event: GenerationEvent) => void | Promise<void>
}

export type CardGenerationProvider = {
  generate(input: MaterialInput, options?: GenerationOptions): Promise<CardDraft[]>
}

export type { CardDraft, MaterialInput }
