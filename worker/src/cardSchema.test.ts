import { describe, expect, it } from 'vitest'
import { buildLlmDraft, llmCardOutputSchema } from './cardSchema'

describe('LLM card schema', () => {
  it('accepts a grounded model card and enriches metadata outside the model output', async () => {
    const output = llmCardOutputSchema.parse({
      title: 'HashMap 原理',
      topic: 'Java 集合',
      question: 'HashMap 的结构是什么？',
      coreAnswer: 'HashMap 通过数组、链表和红黑树组织数据。',
      explanation: '哈希冲突较多时会树化。',
      keyPoints: ['数组', '链表', '红黑树'],
      followUps: ['树化阈值是什么？'],
      tags: ['HashMap', '集合'],
      sourceExcerpt: 'HashMap 通过数组、链表和红黑树组织数据。',
      confidence: 0.82,
      generationNotes: ['请确认 JDK 版本差异。']
    })

    const draft = await buildLlmDraft(output, {
      sourceRef: 'java.md / Java 集合 / HashMap',
      sourceContent: output.sourceExcerpt,
      model: 'qwen3.7-plus',
      promptVersion: 'v0.3-card-generation-1'
    })

    expect(draft).toMatchObject({
      provider: 'llm',
      quality: 'needs-review',
      model: 'qwen3.7-plus',
      promptVersion: 'v0.3-card-generation-1',
      sourceExcerpt: output.sourceExcerpt,
      confidence: 0.82
    })
    expect(draft.contentHash).toMatch(/^[a-f0-9]{64}$/)
    expect(draft.id).toContain('draft-')
  })

  it('rejects a source excerpt that is not grounded in the chunk', async () => {
    const output = llmCardOutputSchema.parse({
      title: '错误来源',
      topic: 'Java',
      question: '问题？',
      coreAnswer: '答案。',
      explanation: '',
      keyPoints: [],
      followUps: [],
      tags: [],
      sourceExcerpt: '原文中不存在的完整内容片段',
      confidence: 0.5,
      generationNotes: []
    })

    await expect(buildLlmDraft(output, {
      sourceRef: 'java.md',
      sourceContent: '这是实际原文。',
      model: 'qwen3.7-plus',
      promptVersion: 'v0.3-card-generation-1'
    })).rejects.toThrow('来源片段')
  })

  it('rejects a source excerpt that is too short to support review', () => {
    expect(() => llmCardOutputSchema.parse({
      title: '短引用',
      topic: 'Java',
      question: '问题是什么？',
      coreAnswer: '答案。',
      explanation: '',
      keyPoints: [],
      followUps: [],
      tags: [],
      sourceExcerpt: '。',
      confidence: 0.5,
      generationNotes: []
    })).toThrow()
  })

  it('normalizes a single generation note into the array contract', () => {
    const output = llmCardOutputSchema.parse({
      title: 'HashMap 原理',
      topic: 'Java 集合',
      question: 'HashMap 的结构是什么？',
      coreAnswer: 'HashMap 通过数组、链表和红黑树组织数据。',
      explanation: '',
      keyPoints: ['数组', '链表', '红黑树'],
      followUps: [],
      tags: ['HashMap'],
      sourceExcerpt: 'HashMap 通过数组、链表和红黑树组织数据。',
      confidence: 0.8,
      generationNotes: '请确认 JDK 版本差异。'
    })

    expect(output.generationNotes).toEqual(['请确认 JDK 版本差异。'])
  })

  it('snaps a close model excerpt to the exact source sentence', async () => {
    const sourceSentence = 'ScheduledThreadPool：可以设置定期的执行任务，它支持定时或周期性执行任务。'
    const output = llmCardOutputSchema.parse({
      title: 'ScheduledThreadPool',
      topic: 'Java 线程池',
      question: 'ScheduledThreadPool 适合什么任务？',
      coreAnswer: '适合定时或周期性执行任务。',
      explanation: '',
      keyPoints: ['定时执行', '周期执行'],
      followUps: [],
      tags: ['ScheduledThreadPool'],
      sourceExcerpt: 'ScheduledThreadPool 可以设置定时或周期任务。',
      confidence: 0.8,
      generationNotes: []
    })

    const draft = await buildLlmDraft(output, {
      sourceRef: 'thread-pool.md',
      sourceContent: sourceSentence,
      model: 'qwen3.7-plus',
      promptVersion: 'v0.3-card-generation-1'
    })

    expect(draft.sourceExcerpt).toBe(sourceSentence)
  })
})
