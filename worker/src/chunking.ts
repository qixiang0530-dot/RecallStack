import type { MaterialInput } from '../../src/domain/types'

export const MAX_MATERIAL_LENGTH = 12_000
export const MAX_CHUNKS = 3
export const TARGET_CHUNK_LENGTH = 4_000
export const HARD_CHUNK_LENGTH = 6_000
export const MIN_MERGE_LENGTH = 800

export type MaterialChunk = {
  index: number
  sourceRef: string
  content: string
}

type Section = {
  headings: string[]
  paragraphs: string[]
}

export function chunkMaterial(input: MaterialInput): MaterialChunk[] {
  const content = input.content.trim()
  if (content.length > MAX_MATERIAL_LENGTH) throw new Error(`资料过长，最多支持 ${MAX_MATERIAL_LENGTH} 个字符`)
  if (!content) return []

  const sections = parseSections(content)
  const chunks = sections.flatMap((section) => splitSection(input.name, section))
  const merged = mergeShortChunks(chunks)
  if (merged.length > MAX_CHUNKS) throw new Error(`资料分块过多，公开 Beta 最多支持 ${MAX_CHUNKS} 个分块`)
  return merged.map((chunk, index) => ({ ...chunk, index }))
}

function parseSections(content: string): Section[] {
  const sections: Section[] = []
  let headings: string[] = []
  let paragraphs: string[] = []
  let lines: string[] = []

  const flushParagraph = () => {
    const paragraph = lines.join('\n').trim()
    if (paragraph) paragraphs.push(paragraph)
    lines = []
  }
  const flushSection = () => {
    flushParagraph()
    if (paragraphs.length) sections.push({ headings, paragraphs })
    paragraphs = []
  }

  for (const line of content.split(/\r?\n/)) {
    const heading = line.match(/^(#{1,3})\s+(.+?)\s*$/)
    if (heading) {
      flushSection()
      const level = heading[1].length
      headings = [...headings.slice(0, level - 1), heading[2]]
      continue
    }
    if (line.trim()) lines.push(line.trim())
    else flushParagraph()
  }
  flushSection()
  return sections.length ? sections : [{ headings: [], paragraphs: [content] }]
}

function splitSection(name: string, section: Section): MaterialChunk[] {
  const prefix = section.headings.length ? `${section.headings.join(' / ')}\n\n` : ''
  const sourceRef = `${name} / ${section.headings.join(' / ') || '未分类资料'}`
  if (prefix.length >= HARD_CHUNK_LENGTH) {
    return splitByLength(`${prefix}${section.paragraphs.join('\n\n')}`.trim(), HARD_CHUNK_LENGTH)
      .map((content) => ({ index: 0, sourceRef, content }))
  }

  const result: MaterialChunk[] = []
  let current = prefix
  const bodyChunkLength = HARD_CHUNK_LENGTH - prefix.length

  for (const paragraph of section.paragraphs) {
    const pieces = paragraph.length > bodyChunkLength ? splitByLength(paragraph, bodyChunkLength) : [paragraph]
    for (const piece of pieces) {
      const candidate = current === prefix ? `${current}${piece}` : `${current}\n\n${piece}`
      if (candidate.length > TARGET_CHUNK_LENGTH && current !== prefix) {
        result.push({ index: 0, sourceRef, content: current.trim() })
        current = `${prefix}${piece}`
      } else {
        current = candidate
      }
    }
  }
  if (current.trim()) result.push({ index: 0, sourceRef, content: current.trim() })
  return result
}

function splitByLength(value: string, length: number): string[] {
  const pieces: string[] = []
  for (let start = 0; start < value.length; start += length) pieces.push(value.slice(start, start + length))
  return pieces
}

function mergeShortChunks(chunks: MaterialChunk[]): MaterialChunk[] {
  const result: MaterialChunk[] = []
  for (const chunk of chunks) {
    const previous = result.at(-1)
    if (previous && chunk.content.length < MIN_MERGE_LENGTH && previous.content.length + chunk.content.length + 2 <= HARD_CHUNK_LENGTH) {
      previous.content = `${previous.content}\n\n${chunk.content}`
    } else {
      result.push({ ...chunk })
    }
  }
  return result
}
