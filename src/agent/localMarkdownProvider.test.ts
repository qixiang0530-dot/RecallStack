import { describe, expect, it } from 'vitest'
import { LocalMarkdownProvider } from './localMarkdownProvider'

describe('LocalMarkdownProvider', () => {
  it('turns markdown sections into reviewable card drafts', async () => {
    const provider = new LocalMarkdownProvider()
    const drafts = await provider.generate({
      name: 'java.md',
      content: '# Java 集合\n\n## HashMap 原理\n\nHashMap 通过数组、链表和红黑树组织数据。\n\n- 需要关注哈希冲突\n- 扩容会重新分布元素\n'
    })

    expect(drafts).toHaveLength(1)
    expect(drafts[0]).toMatchObject({
      topic: 'Java 集合',
      question: 'HashMap 原理是什么？',
      coreAnswer: 'HashMap 通过数组、链表和红黑树组织数据。',
      keyPoints: ['需要关注哈希冲突', '扩容会重新分布元素'],
      sourceRef: 'java.md · Java 集合 / HashMap 原理',
      provider: 'local-rule',
      quality: 'ready'
    })
    expect(drafts[0].sourceExcerpt).toContain('HashMap')
    expect(drafts[0].contentHash).toMatch(/^[a-f0-9]{64}$/)
  })

  it('keeps sections without a usable answer in the review queue', async () => {
    const provider = new LocalMarkdownProvider()
    const drafts = await provider.generate({ name: 'notes.md', content: '## 需要补充的问题\n\n- 先整理资料来源\n' })

    expect(drafts[0]).toMatchObject({
      question: '',
      quality: 'needs-review',
      coreAnswer: ''
    })
    expect(drafts[0].provider).toBe('local-rule')
  })

  it('accepts plain pasted text as a single draft', async () => {
    const provider = new LocalMarkdownProvider()
    const drafts = await provider.generate({ name: '粘贴内容', content: '什么是线程池？\n线程池复用工作线程执行任务，降低线程创建和销毁成本。' })

    expect(drafts[0]).toMatchObject({
      question: '什么是线程池？',
      coreAnswer: '线程池复用工作线程执行任务，降低线程创建和销毁成本。',
      tags: ['线程池']
    })
  })

  it('returns no drafts for an empty file', async () => {
    const provider = new LocalMarkdownProvider()

    expect(await provider.generate({ name: 'empty.md', content: '   \n\n' })).toEqual([])
  })

  it('handles a long section as one editable draft', async () => {
    const provider = new LocalMarkdownProvider()
    const content = `## 缓存原理\n\n${'缓存用于降低重复计算成本。'.repeat(2000)}`

    const drafts = await provider.generate({ name: 'long.md', content })

    expect(drafts).toHaveLength(1)
    expect(drafts[0]).toMatchObject({ question: '缓存原理是什么？', quality: 'ready' })
  })
})
