# RecallStack Agent Workflow

本文记录 RecallStack v0.3 如何使用 Agent 完成需求拆解、测试驱动实现、浏览器回归和安全边界设计。这里区分两类 Agent 能力：开发过程中的编码 Agent，以及产品运行时调用百炼模型的 AI 拆卡 Provider。

## 1. 从想法到可验证需求

项目先把“像背单词一样背 Java 八股”收敛为稳定学习闭环：

```text
今日任务 -> 主动回忆 -> 查看答案 -> 四档评分 -> FSRS 安排复习
```

v0.3 没有让模型直接修改正式卡片，而是定义第二条闭环：

```text
资料分块 -> LLM 结构化生成 -> Zod 校验 -> 来源匹配 -> 草稿落库 -> 用户审核 -> 个人牌组
```

每项需求都对应可观察结果。例如“AI 输出必须审核”对应 `quality: needs-review`、显式“完成审核”操作、仓储层校验和 E2E 断言。

## 2. Provider 与安全边界

```ts
type CardGenerationProvider = {
  generate(input: MaterialInput, options?: GenerationOptions): Promise<CardDraft[]>
}
```

`LocalMarkdownProvider` 在浏览器本地运行。`LlmCardGenerationProvider` 只负责调用 Worker、解析 SSE 和上报分块进度。两者都只输出 `CardDraft`，不接触 FSRS 或正式牌组写入。

Cloudflare Worker 负责：

- 保存百炼 API Key Secret
- 标题/长度分块和请求限额
- 调用 `qwen3.7-plus`
- Zod 校验、来源片段匹配和内容 Hash
- 通过 SSE 返回成功草稿与失败分块

Worker 不访问 IndexedDB，不持久化用户资料，也没有正式牌组写入能力。

## 3. Agent 辅助测试

实现采用 Red-Green-Refactor：先写能说明需求的失败测试，确认失败原因，再提交最小实现。

重点覆盖：

- Markdown 标题、段落、合并和 60,000 字符上限
- 模型 JSON、代码围栏、字段长度、置信度和来源匹配
- 网络失败、重试一次、单块失败与 30 张总上限
- SSE 日期恢复、浏览器原生 `fetch` 调用绑定和取消信号
- Dexie v4 迁移、v1/v2 备份和隐私同意持久化
- AI 草稿显式审核、最终内容 Hash 重算和重复卡片跳过
- 桌面 Chrome 与 Pixel 7 的部分成功、失败块重试和刷新持久化

CI 使用 Mock Worker，不消耗真实模型额度，也不依赖 Cloudflare 账号。

## 4. 浏览器验证与回归

Playwright 操作实际 Vite 页面并拦截 Worker 请求返回 SSE。回归路径包括：

1. 首次引导与 Java 卡片学习。
2. 查看上一题并替换最近一次评分。
3. 本地规则生成、编辑和批量确认。
4. AI 隐私同意、SSE 进度和来源片段展示。
5. 一个分块成功、一个分块失败，再只重试失败索引。
6. 完成审核后加入个人牌组，刷新确认 IndexedDB 数据仍在。
7. JSON 备份导出和恢复。

真实 Worker smoke test 不进入 CI：部署后手动使用一份无敏感信息的短 Markdown，确认百炼响应、CORS、限频和线上 Pages 配置。

## 5. Prompt 与可复现性

Worker 固定记录 `model` 和 `promptVersion`，当前分别为：

```text
qwen3.7-plus
v0.3-card-generation-1
```

资料在 Prompt 中被声明为不可信数据，模型不得执行资料里的指令。Worker 生成 ID、时间、Hash 和版本字段，不信任模型返回这些元数据。

## 6. 为什么生成内容必须审核

LLM 可能产生问题边界不清、版本细节错误、遗漏上下文或过度概括。`confidence` 不是事实正确率，只用于排序审核优先级；`generationNotes` 也只是模型提示。

因此 AI 草稿即使字段完整，初始状态仍是 `needs-review`。用户编辑并点击“完成审核”后才变为 `ready`，随后才能进入个人牌组。批准时按最终编辑内容重新计算 Hash，避免沿用失效的模型 Hash。

## 7. RAG 边界

v0.3 不实现向量数据库或 RAG。拆卡的核心问题是结构化生成质量、审核成本、费用和隐私；在这些指标稳定前加入检索层会扩大部署和调试面。

v0.4 可基于真实使用数据评估：资料级检索、来源引用增强、问答范围控制、向量数据删除和多租户隔离。RAG 仍不能绕过人工审核或直接写入正式牌组。
