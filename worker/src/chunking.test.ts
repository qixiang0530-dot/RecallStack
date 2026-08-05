import { describe, expect, it } from 'vitest'
import { HARD_CHUNK_LENGTH, MAX_MATERIAL_LENGTH, chunkMaterial } from './chunking'

describe('chunkMaterial', () => {
  it('keeps heading hierarchy and splits long sections at paragraph boundaries', () => {
    const content = [
      '# Java',
      '## 集合',
      '',
      '第一段内容。'.repeat(120),
      '',
      '第二段内容。'.repeat(120),
      '',
      '### HashMap',
      '',
      'HashMap 内容。'.repeat(120)
    ].join('\n')

    const chunks = chunkMaterial({ name: 'java.md', content })

    expect(chunks.length).toBeGreaterThan(1)
    expect(chunks.every((chunk) => chunk.content.length <= 6000)).toBe(true)
    expect(chunks[0].sourceRef).toContain('Java / 集合')
    expect(chunks.some((chunk) => chunk.sourceRef.includes('HashMap'))).toBe(true)
  })

  it('treats plain text as paragraph chunks', () => {
    const chunks = chunkMaterial({
      name: 'notes.txt',
      content: '第一段。\n\n第二段。'
    })

    expect(chunks).toHaveLength(1)
    expect(chunks[0].content).toContain('第一段。')
    expect(chunks[0].content).toContain('第二段。')
  })

  it('rejects material longer than the configured limit', () => {
    expect(() => chunkMaterial({ name: 'large.md', content: 'x'.repeat(MAX_MATERIAL_LENGTH + 1) })).toThrow('12000')
  })

  it('keeps a heading prefix within the hard chunk limit', () => {
    const chunks = chunkMaterial({
      name: 'java.md',
      content: `# Java 并发\n\n${'x'.repeat(HARD_CHUNK_LENGTH)}`
    })

    expect(chunks.every((chunk) => chunk.content.length <= HARD_CHUNK_LENGTH)).toBe(true)
  })
})
