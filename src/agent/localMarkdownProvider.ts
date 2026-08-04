import type { CardDraft, CardGenerationProvider, MaterialInput } from './types'
import { createContentHash } from './contentHash'

export class LocalMarkdownProvider implements CardGenerationProvider {
  async generate(input: MaterialInput): Promise<CardDraft[]> {
    const sections = splitSections(input.content)
    const drafts = await Promise.all(sections.map((section, index) => createDraft(input.name, section, index)))
    return drafts.filter((draft): draft is CardDraft => draft !== undefined)
  }
}

function splitSections(content: string): Array<{ headings: string[]; body: string[] }> {
  const sections: Array<{ headings: string[]; body: string[] }> = []
  let current = { headings: [] as string[], body: [] as string[] }
  for (const rawLine of content.split(/\r?\n/)) {
    const heading = rawLine.match(/^(#{1,2})\s+(.+?)\s*$/)
    if (heading) {
      if (current.body.length) sections.push(current)
      if (heading[1].length === 1) current = { headings: [heading[2]], body: [] }
      else current = { headings: [...current.headings.slice(0, 1), heading[2]], body: [] }
      continue
    }
    if (rawLine.trim()) current.body.push(rawLine.trim())
  }
  if (current.body.length || current.headings.length) sections.push(current)
  if (!sections.length && content.trim()) sections.push({ headings: [], body: content.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) })
  return sections
}

async function createDraft(fileName: string, section: { headings: string[]; body: string[] }, index: number): Promise<CardDraft | undefined> {
  const title = section.headings.at(-1) ?? `资料片段 ${index + 1}`
  const topic = section.headings[0] ?? '未分类资料'
  const bullets = section.body.filter((line) => /^[-*+]\s+/.test(line)).map((line) => line.replace(/^[-*+]\s+/, ''))
  const paragraphs = section.body.filter((line) => !/^[-*+]\s+/.test(line))
  const firstLine = paragraphs[0] ?? ''
  const inlineQuestion = buildQuestion(firstLine, paragraphs[1] ?? '')
  const question = buildQuestion(title, firstLine) || inlineQuestion
  const coreAnswer = question === inlineQuestion ? paragraphs[1] ?? '' : firstLine && question ? firstLine : ''
  const sourceExcerpt = [title, ...section.body].join('\n').slice(0, 1200)
  const contentHash = await createContentHash([topic, question, coreAnswer])
  const now = new Date()
  return {
    id: `draft-${slugify(`${fileName}-${topic}-${title}`)}`,
    title,
    topic,
    question,
    coreAnswer,
    explanation: question === inlineQuestion ? paragraphs.slice(2).join(' ') : paragraphs.slice(1).join(' '),
    keyPoints: bullets,
    followUps: [],
    tags: uniqueTags(section.headings.length ? `${topic} ${title}` : question.replace(/^什么是/, '').replace(/[？?]$/, '')),
    sourceRef: `${fileName} · ${section.headings.join(' / ') || '未分类资料'}`,
    sourceExcerpt,
    confidence: question && coreAnswer ? 0.5 : 0,
    generationNotes: [],
    contentHash,
    quality: question && coreAnswer ? 'ready' : 'needs-review',
    provider: 'local-rule',
    createdAt: now,
    updatedAt: now
  }
}

function buildQuestion(title: string, answer: string): string {
  if (!answer) return ''
  if (/[？?]$/.test(title)) return title
  if (title.endsWith('原理')) return `${title}是什么？`
  if (/(什么是|区别|为什么|如何)/.test(title)) return `${title}${title.endsWith('？') ? '' : '？'}`
  return ''
}

function uniqueTags(value: string): string[] {
  return [...new Set(value.split(/[\s、，,：:()（）/]+/).map((item) => item.trim()).filter((item) => item.length >= 2))].slice(0, 5)
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 80) || 'material'
}
