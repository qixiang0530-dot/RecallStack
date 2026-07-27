import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const DEFAULT_SOURCE_DIR = 'data/java-source'
const DEFAULT_PDF_MARKDOWN_DIR = join(process.env.TEMP ?? '', 'recallstack-java-pdfs')

const topicSources = [
  ['Java基础', '01-Java基础.md', '01-Java基础-原资料.md', 'base'],
  ['Java集合', '02-Java集合.md', '02-Java集合-原资料.md', 'collections'],
  ['Java并发', '03-Java并发.md', '03-Java并发-原资料.md', 'concurrency'],
  ['JVM', '04-JVM.md', '04-JVM-原资料.md', 'jvm'],
  ['Spring', '05-Spring.md', '05-Spring-原资料.md', 'spring'],
  ['MySQL', '06-MySQL.md', '06-MySQL-原资料.md', 'mysql'],
  ['Redis', '07-Redis.md', '07-Redis-原资料.md', 'redis'],
  ['计算机网络', '08-计算机网络.md', '08-计算机网络-原资料.md', 'network'],
  ['操作系统', '09-操作系统.md', '09-操作系统-原资料.md', 'os'],
  ['数据结构与算法', '10-数据结构与算法.md', '10-数据结构与算法-原资料.md', 'dsa'],
  ['消息队列', '11-消息队列.md', '11-消息队列-原资料.md', 'mq']
]

const legacyCards = new Map([
  ['HashMap 的并发风险', ['java-hashmap-thread-safety', 'HashMap 为什么线程不安全？']],
  ['ConcurrentHashMap 实现原理', ['java-concurrent-hashmap', 'ConcurrentHashMap 如何保证并发安全？']],
  ['ArrayList 与 LinkedList 对比', ['java-arraylist-linkedlist', 'ArrayList 和 LinkedList 有什么区别？']],
  ['String、StringBuilder、StringBuffer', ['java-string-immutable', 'String、StringBuilder 和 StringBuffer 如何选择？']],
  ['==、equals 与 hashCode 契约', ['java-equals-double-equals', '== 和 equals() 有什么区别？']],
  ['JVM 运行时内存区域', ['java-jvm-memory', 'JVM 运行时内存区域有哪些？']],
  ['类加载全过程', ['java-class-loading', 'Java 类加载过程是什么？']],
  ['synchronized 与 ReentrantLock 选型', ['java-synchronized-lock', 'synchronized 和 ReentrantLock 有什么区别？']],
  ['ThreadPoolExecutor 工作流程与核心参数', ['java-thread-pool', '线程池任务提交后的执行流程是什么？']],
  ['Bean 生命周期与容器扩展点', ['java-spring-bean-lifecycle', 'Spring Bean 的生命周期是什么？']]
])

const supplementalAnswers = new Map([
  ['图的表示、BFS 与 DFS', {
    coreAnswer: '图通常用邻接表或邻接矩阵表示。BFS 借助队列按层扩展，适合无权图最短步数；DFS 借助递归或栈深入搜索，适合连通性判断、路径枚举和回溯。两者都要用 visited 避免重复访问。',
    explanation: '邻接矩阵占用 O(V²) 空间，判断两点是否相连快，适合稠密图；邻接表占用 O(V+E) 空间，遍历邻居高效，适合稀疏图。BFS 将起点入队并标记，循环取出节点、访问未见邻居并入队。DFS 访问当前节点后递归或压栈处理未见邻居。遍历整张图时还要从每个未访问顶点重新启动，以覆盖非连通分量。',
    followUps: ['邻接表和邻接矩阵如何选择？', '为什么 BFS 能求无权图最短步数？']
  }],
  ['贪心与动态规划', {
    coreAnswer: '贪心每一步选择当前看来最优的方案，成立前提是具备贪心选择性质并能证明不会破坏全局最优；动态规划则定义状态、建立转移、设置初值并按依赖顺序计算，用空间换时间消除重复子问题。',
    explanation: '判断贪心是否可用，不能只看局部策略是否直观，通常要用交换论证或反证法证明。区间选择可按结束时间排序并持续选择不冲突区间。动态规划要先明确状态含义，再写转移方程、初始化和遍历顺序。0/1 背包使用一维数组压缩时，容量必须倒序遍历，避免同一物品在一轮中被重复使用。',
    followUps: ['如何证明一个贪心策略正确？', '0/1 背包一维优化为什么要倒序遍历？']
  }],
  ['二分查找与边界模板', {
    coreAnswer: '二分查找适用于有序或答案具有单调性的搜索空间。关键是固定区间定义并保持循环条件、mid 更新和边界收缩一致；查找第一个不小于目标值时，命中后仍向左收缩，最终得到左边界。',
    explanation: '闭区间模板使用 left <= right，排除 mid 后更新为 mid - 1 或 mid + 1；左闭右开模板使用 left < right，右边界可更新为 mid。无论选择哪一种，都要保证每轮严格缩小区间并检查空数组、单元素、目标不存在和重复值。时间复杂度是 O(log n)，空间复杂度通常是 O(1)。二分答案还需要先证明判断函数随答案单调。',
    followUps: ['如何查找第一个不小于目标值的位置？', '二分答案需要满足什么单调性条件？']
  }]
])

const args = parseArgs(process.argv.slice(2))
const sourceDir = resolve(args.source ?? DEFAULT_SOURCE_DIR)
const pdfMarkdownDir = resolve(args.pdfMarkdown ?? DEFAULT_PDF_MARKDOWN_DIR)
const outputPath = resolve(args.output ?? 'src/data/javaCards.ts')

assertDirectory(sourceDir, '分级资料目录')
assertDirectory(pdfMarkdownDir, 'PDF Markdown 目录')

const rows = []
for (const [topic, gradingFile, pdfFile, idPrefix] of topicSources) {
  const grading = readFileSync(join(sourceDir, gradingFile), 'utf8')
  const pdf = parsePdfMarkdown(readFileSync(join(pdfMarkdownDir, pdfFile), 'utf8'))
  for (const importance of ['S', 'A']) {
    for (const row of parseGradingRows(grading, importance)) {
      rows.push(buildCard({ ...row, topic, importance, idPrefix, pdf }))
    }
  }
}

const orderedCards = rows
  .sort((first, second) => importanceOrder(first.importance) - importanceOrder(second.importance) || first.topicOrder - second.topicOrder || first.rowOrder - second.rowOrder)
  .map(({ topicOrder: _topicOrder, rowOrder: _rowOrder, matchScore: _matchScore, ...card }, index) => ({ ...card, order: index + 1 }))

validateCards(orderedCards)

const output = `import type { AppCard } from '../domain/types'\n\nexport const javaCards: AppCard[] = ${JSON.stringify(orderedCards, null, 2)}\n`
writeFileSync(outputPath, output, 'utf8')

const lowConfidence = rows.filter((card) => card.matchScore < 0.16)
console.log(`Generated ${orderedCards.length} cards (${orderedCards.filter((card) => card.importance === 'S').length} S, ${orderedCards.filter((card) => card.importance === 'A').length} A) at ${outputPath}`)
console.log(`Low-confidence PDF matches: ${lowConfidence.length}`)
for (const card of lowConfidence.slice(0, 20)) console.log(`- ${card.topic} / ${card.question} (${card.matchScore.toFixed(3)})`)

function parseArgs(values) {
  const parsed = {}
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index]
    if (value === '--source') parsed.source = values[++index]
    else if (value === '--pdf-markdown') parsed.pdfMarkdown = values[++index]
    else if (value === '--output') parsed.output = values[++index]
    else throw new Error(`Unknown argument: ${value}`)
  }
  return parsed
}

function assertDirectory(path, label) {
  if (!existsSync(path)) throw new Error(`${label}不存在: ${path}`)
}

function parseGradingRows(markdown, importance) {
  const section = markdown.match(new RegExp(`## ${importance} 级\\s*([\\s\\S]*?)(?=\\n## )`))?.[1]
  if (!section) throw new Error(`Missing ${importance} section`)
  return section.split(/\r?\n/)
    .filter((line) => /^\|\s*(陌生|模糊|熟练)\s*\|/.test(line))
    .map((line, rowOrder) => {
      const cells = line.slice(1, -1).split('|').map((cell) => cell.trim())
      const title = stripMarkdown(cells[1])
      const score = Number(cells[2].match(/^\d+/)?.[0])
      if (!title || !score) throw new Error(`Invalid grading row: ${line}`)
      return {
        title,
        score,
        rationale: stripMarkdown(cells[3]),
        mastery: stripMarkdown(cells[4]),
        sourceRef: stripMarkdown(cells[5]),
        rowOrder
      }
    })
}

function parsePdfMarkdown(markdown) {
  markdown = markdown.replace(/\f/g, '\f\n')
  const pageAt = new Array(markdown.length + 1)
  let page = 1
  for (let index = 0; index < markdown.length; index += 1) {
    pageAt[index] = page
    if (markdown[index] === '\f') page += 1
  }

  const headings = [
    ...markdown.matchAll(/^#\s+(.+)$/gm),
    ...markdown.matchAll(/^([^#\r\n]{2,80}[？?])\r?$/gm),
    ...markdown.matchAll(/^([^#\r\n。；：]{2,70}(?:说说|说几个|讲一下|介绍一下|什么|哪些|为什么|怎么|如何|区别|流程|时间复杂度|空间复杂度|使用场景|稳定性)[^。；：\r\n]{0,35})\r?$/gm)
  ].sort((first, second) => (first.index ?? 0) - (second.index ?? 0))
  const uniqueHeadings = uniqueBy(headings, (match) => match.index ?? 0)
  return uniqueHeadings.map((match, index) => ({
    heading: cleanText(match[1]),
    body: cleanText(markdown.slice((match.index ?? 0) + match[0].length, uniqueHeadings[index + 1]?.index ?? markdown.length)),
    page: pageAt[match.index ?? 0] ?? 1
  })).filter((section) => section.heading && section.body.length >= 20)
}

function buildCard(row) {
  const supplemental = supplementalAnswers.get(row.title)
  const pageRanges = supplemental ? [] : extractPageRanges(row.sourceRef)
  const candidates = supplemental ? [] : row.pdf.filter((section) => pageRanges.some(([startPage, endPage]) => section.page >= startPage && section.page <= endPage))
  const phrases = extractSourcePhrases(row.sourceRef)
  const matchInputs = phrases.length ? phrases : [row.title]
  const matches = supplemental ? [] : uniqueBy(matchInputs.map((phrase) => bestMatch(phrase, row.title, candidates)).filter(Boolean), (section) => section.heading)
  const selected = supplemental ? [{ heading: row.title, body: supplemental.coreAnswer }] : matches.length ? matches : candidates.slice(0, 1)
  if (!selected.length) throw new Error(`No PDF answer found for ${row.topic}: ${row.title} (${row.sourceRef})`)

  const primary = selected[0]
  const legacy = legacyCards.get(row.title)
  const question = legacy?.[1] ?? toQuestion(row.title)
  const explanationParts = selected.slice(0, 4).map((section) => `${section.heading}：${excerpt(section.body, 420)}`)
  const explanation = supplemental?.explanation ?? excerpt(explanationParts.join(' '), 1050)
  const coreAnswer = supplemental?.coreAnswer ?? excerpt(selected.slice(0, 2).map((section) => section.body).join(' '), 320)
  const tags = createTags(row.topic, row.title)
  const followUps = supplemental?.followUps ?? createFollowUps(selected, row.mastery)
  const id = legacy?.[0] ?? `java-${row.idPrefix}-${stableHash(row.title)}`

  return {
    id,
    deckId: 'java-basics-sample',
    topic: row.topic,
    importance: row.importance,
    score: row.score,
    question,
    coreAnswer,
    explanation,
    keyPoints: createKeyPoints(row.mastery),
    followUps,
    tags,
    sourceRef: normalizeSourceRef(row.sourceRef),
    source: 'builtin',
    topicOrder: topicSources.findIndex(([topic]) => topic === row.topic),
    rowOrder: row.rowOrder,
    matchScore: supplemental ? 1 : similarity(matchInputs[0], primary.heading)
  }
}

function extractPageRanges(sourceRef) {
  const matches = [...sourceRef.matchAll(/(?:PDF\s+)?p\.(\d+)(?:-(\d+))?/gi)]
  if (!matches.length) throw new Error(`Missing PDF page range: ${sourceRef}`)
  return matches.map((match) => [Number(match[1]), Number(match[2] ?? match[1])])
}

function extractSourcePhrases(sourceRef) {
  const details = sourceRef.split(/[：:]/).slice(1).join('：')
  return details.split(/[；;]/).map((phrase) => cleanText(phrase)).filter(Boolean)
}

function normalizeSourceRef(sourceRef) {
  return sourceRef.replace(/\s+/g, ' ').replace(/^(Java基础|Java集合|Java并发|JVM|Spring|MySQL|Redis|计算机网络|操作系统|数据结构与算法|消息队列)\s+PDF/i, '$1 PDF')
}

function bestMatch(phrase, title, candidates) {
  return candidates.reduce((best, candidate) => {
    const score = Math.max(similarity(phrase, candidate.heading), similarity(title, candidate.heading) * 0.8)
    return !best || score > best.score ? { ...candidate, score } : best
  }, undefined)
}

function similarity(first, second) {
  const a = normalizeForMatch(first)
  const b = normalizeForMatch(second)
  if (!a || !b) return 0
  if (a.includes(b) || b.includes(a)) return 1
  const firstBigrams = bigrams(a)
  const secondBigrams = new Set(bigrams(b))
  const overlap = firstBigrams.filter((gram) => secondBigrams.has(gram)).length
  return (2 * overlap) / Math.max(1, firstBigrams.length + secondBigrams.size)
}

function normalizeForMatch(value) {
  return stripMarkdown(value).toLowerCase().replace(/(是什么|有哪些|怎么|如何|为什么|区别|联系|介绍一下|了解吗|原理|机制|场景|实现|正确使用)/g, '').replace(/[^\p{L}\p{N}+#]/gu, '')
}

function bigrams(value) {
  if (value.length < 2) return [value]
  return Array.from({ length: value.length - 1 }, (_, index) => value.slice(index, index + 2))
}

function createKeyPoints(mastery) {
  const points = mastery.split(/[；;]/).map((point) => point.trim().replace(/^(能|需|要)?(口述|说明|解释|比较|区分|讲清|列举|写出|画出|知道|给出|从)/, '')).filter(Boolean)
  return points.length ? points : [mastery]
}

function createTags(topic, title) {
  const titleParts = stripMarkdown(title).split(/[、，：:；;\/]|\s+(?:与|和|及)\s+|(?<=\p{Script=Han})(?:与|和|及)(?=\p{Script=Han})/u).map((part) => part.trim()).filter((part) => part.length >= 2)
  const englishTerms = stripMarkdown(title).match(/[A-Za-z][A-Za-z0-9+#.]*/g) ?? []
  const tags = uniqueBy([topic, ...titleParts, ...englishTerms, title], (tag) => tag.toLowerCase())
  return tags.slice(0, 6)
}

function createFollowUps(selected, mastery) {
  const related = uniqueBy(selected.slice(1), (section) => section.heading)
    .slice(0, 2)
    .map((section) => ensureQuestion(section.heading))
  if (related.length) return related
  return createKeyPoints(mastery).slice(0, 2).map((point) => ensureQuestion(point))
}

function toQuestion(title) {
  if (/[？?]$/.test(title)) return title
  if (/(区别|对比|选型|取舍|辨析)$/.test(title)) return `${title}是什么？`
  if (/(流程|过程|链路|体系|架构|模型|算法|机制|原理|语义|边界|治理|设计|实现|契约|区域|特性|分类|结构|作用|场景|方法|模板)$/.test(title)) return `${title}应该如何理解？`
  return `如何理解${title}？`
}

function ensureQuestion(value) {
  return /[？?]$/.test(value) ? value : `${value}？`
}

function excerpt(value, maxLength) {
  const text = cleanText(value)
  if (text.length <= maxLength) return text
  const candidate = text.slice(0, maxLength)
  const boundary = Math.max(candidate.lastIndexOf('。'), candidate.lastIndexOf('；'), candidate.lastIndexOf('！'), candidate.lastIndexOf('？'))
  return `${candidate.slice(0, boundary >= 80 ? boundary + 1 : maxLength).trim()}…`
}

function cleanText(value) {
  return stripMarkdown(value)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/[\f\r\n\t]+/g, ' ')
    .replace(/\uFFFD/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function stripMarkdown(value) {
  return String(value ?? '').replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').trim()
}

function stableHash(value) {
  return createHash('sha1').update(value, 'utf8').digest('hex').slice(0, 10)
}

function importanceOrder(importance) {
  return importance === 'S' ? 0 : 1
}

function uniqueBy(values, key) {
  const seen = new Set()
  return values.filter((value) => {
    const id = key(value)
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}

function validateCards(cards) {
  const counts = cards.reduce((result, card) => ({ ...result, [card.importance]: (result[card.importance] ?? 0) + 1 }), {})
  if (cards.length !== 165 || counts.S !== 72 || counts.A !== 93) throw new Error(`Unexpected scope: ${JSON.stringify(counts)}, total ${cards.length}`)
  if (new Set(cards.map((card) => card.id)).size !== cards.length) throw new Error('Duplicate card IDs found')
  for (const card of cards) {
    if (card.coreAnswer.length < 30 || card.explanation.length < 40) throw new Error(`Answer too short: ${card.question} (core ${card.coreAnswer.length}, explanation ${card.explanation.length})`)
    if (card.tags.length < 2 || card.keyPoints.length < 1) throw new Error(`Metadata incomplete: ${card.question}`)
  }
}
