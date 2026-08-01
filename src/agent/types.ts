import type { CardDraft, MaterialInput } from '../domain/types'

export type CardGenerationProvider = {
  generate(input: MaterialInput): Promise<CardDraft[]>
}

export type { CardDraft, MaterialInput }
