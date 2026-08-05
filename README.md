<p align="center">
  <img src="docs/assets/recallstack-hero.png" alt="RecallStack 机器人与记忆卡片" width="260" />
</p>

<h1 align="center">RecallStack · Java Memory Lab</h1>

<p align="center">把 Java 八股资料变成可审核、可复习的知识卡片。</p>

<p align="center">
  <a href="https://qixiang0530-dot.github.io/RecallStack/">在线 Demo</a>
  ·
  <a href="https://github.com/qixiang0530-dot/RecallStack">GitHub 仓库</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v0.3.0--beta.4-1f5c4a" alt="v0.3.0-beta.4" />
  <img src="https://img.shields.io/badge/model-DeepSeek-222222" alt="DeepSeek" />
  <img src="https://img.shields.io/badge/gateway-Cloudflare%20Worker-f38020" alt="Cloudflare Worker" />
  <img src="https://img.shields.io/badge/tests-92%20passed-2ea44f" alt="92 tests passed" />
  <img src="https://img.shields.io/badge/license-MIT-0f766e" alt="MIT license" />
</p>

RecallStack 是一个面向 Java 后端学习的 Web/PWA。它保留“先回忆、再看答案、最后按掌握程度评分”的学习节奏，也支持把 Markdown 或纯文本资料拆成可审核的知识卡片。

> **公开 Beta**：AI 生成内容必须人工审核。AI 服务有每 IP 限流和每日额度限制，请不要上传公司内部资料、密钥或其他敏感内容。

## 先看体验

| 今日学习 | 主动回忆 |
| --- | --- |
| ![RecallStack 首页](docs/screenshots/home.png) | ![RecallStack 学习卡片](docs/screenshots/study.png) |

![RecallStack 资料拆卡审核](docs/screenshots/import-review.png)

## 五分钟体验

1. 打开[在线 Demo](https://qixiang0530-dot.github.io/RecallStack/)，完成首次引导，或直接进入 Java Demo。
2. 进入学习页，先自己回答问题，再点击“查看答案”。
3. 使用 `Space` 查看答案，使用 `1-4` 进行“忘记 / 吃力 / 记得 / 轻松”评分。
4. 打开“资料拆卡”，点击“载入 Java 线程池示例”，即可不用准备文件体验导入流程。
5. 选择本地规则或 AI 模式，检查来源片段和生成备注，完成审核后再加入个人资料牌组。

## 它解决什么问题

普通题库容易让人停留在“看过答案”，而 RecallStack 把学习过程拆成一个稳定闭环：

```text
今日任务 -> 主动回忆 -> 查看答案 -> 四档评分 -> FSRS 安排复习
```

内置 Java 牌组用于立即体验；用户资料会进入独立的“我的资料牌组”，不会混入内置牌组。学习进度、草稿和审核结果默认保存在当前浏览器的 IndexedDB 中，可从设置页导出 JSON 备份。

## AI 拆卡不是直接调用模型

AI 模式是一条可观察、可审核的工作流：

```text
Markdown / 纯文本
  -> Worker 按标题和长度分块
  -> DeepSeek V4 Flash 结构化生成
  -> Zod 校验字段与来源片段
  -> SSE 实时返回分块进度
  -> 浏览器增量保存草稿
  -> 用户编辑并完成审核
  -> 写入个人牌组并进入 FSRS 队列
```

工程边界包括：

- `CardGenerationProvider` 让本地规则 Provider 与 LLM Provider 可替换。
- Worker 不具备牌组写入能力，模型永远只能产生草稿。
- Zod 检查结构、字段长度、置信度和来源片段是否能在原文中匹配。
- SSE 支持部分成功、失败块重试和取消，已生成草稿不会因为连接中断而丢失。
- `contentHash` 用于重复检测；审核完成后才允许进入个人牌组。

## 技术架构

```mermaid
flowchart LR
  A[GitHub Pages React] --> B[LlmCardGenerationProvider]
  B --> C[Cloudflare Worker]
  C --> D[Markdown 分块与请求限制]
  D --> E[DeepSeek V4 Flash]
  E --> F[Zod 校验与来源匹配]
  F --> G[SSE 草稿流]
  G --> H[浏览器 IndexedDB]
  H --> I[人工审核]
  I --> J[个人资料牌组]
  J --> K[FSRS 复习队列]
```

| 层 | 技术 | 作用 |
| --- | --- | --- |
| 前端 | React + TypeScript + Vite | 页面、学习流程和响应式交互 |
| 本地数据 | Dexie + IndexedDB | 卡片、草稿、复习状态和备份 |
| 复习算法 | `ts-fsrs` | 根据四档评分安排下次复习 |
| AI 网关 | Cloudflare Worker | 隐藏 API Key、限流、预算、SSE |
| 模型 | DeepSeek V4 Flash | 结构化生成卡片草稿 |
| 校验 | Zod | 运行时校验模型输出和来源依据 |

## 本地运行

环境要求：Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

不配置 Worker URL 时，AI 模式会禁用，但 Java 示例牌组和本地规则拆卡仍然可以完整体验。

如需连接自己的 Worker，在项目根目录创建 `.env.local`：

```text
VITE_CARD_GENERATION_API_URL=https://your-worker.workers.dev/api/card-generation
```

不要把 `DEEPSEEK_API_KEY` 写入前端环境变量、GitHub Pages 或仓库。

## 部署 AI Worker

AI 服务需要 Cloudflare 账号、DeepSeek API Key 和 KV namespace。API Key 只保存为 Cloudflare Secret。

```bash
npx wrangler login
npx wrangler kv namespace create DAILY_BUDGET --config worker/wrangler.toml
npx wrangler secret put DEEPSEEK_API_KEY --config worker/wrangler.toml
npm run worker:test
npm run worker:deploy
```

创建 KV 后，将返回的 namespace ID 写入 `worker/wrangler.toml`：

```toml
[[kv_namespaces]]
binding = "DAILY_BUDGET"
id = "your-namespace-id"
```

GitHub Pages 通过 Actions Variable `VITE_CARD_GENERATION_API_URL` 注入公开 Worker URL，不需要也不应该配置 API Key。

## 公开 Beta 保护

- 每个 IP 每分钟最多 2 次 AI 请求。
- 单次最多 12,000 个字符、3 个分块和 8 张卡片。
- 每日以 UTC 日期累计 token，接近 80,000 token 时停止 AI 生成。
- 限流、预算或模型余额不足时，仍可切换到本地规则拆卡。
- Worker 日志只记录请求 ID、耗时、分块数、token 用量和错误类型，不记录原文、完整 Prompt 或模型响应。

这些限制是公开测试期间的费用和隐私保护，不代表模型输出一定正确。请始终检查来源片段并人工审核。

## 隐私边界

只有在用户选择 AI 模式并明确同意后，本次资料才会发送到 RecallStack Cloudflare Worker，再转发到 DeepSeek。Worker 不访问浏览器 IndexedDB，也不长期保存完整原文。草稿、审核结果和学习进度只保存在当前浏览器。

当前版本不提供账号、云同步、多人协作、RAG、向量数据库、PDF/DOCX 导入或网页 URL 导入。

## 验证命令

```bash
npm run lint
npm test
npm run worker:test
npm run build
npm run test:e2e
git diff --check
```

CI 中的 E2E 使用 Mock Worker，不消耗真实 DeepSeek 额度。线上 smoke test 使用短的、非敏感 Java 示例资料完成。

## 反馈与 Agent 工程记录

欢迎通过 [GitHub Issues](https://github.com/qixiang0530-dot/RecallStack/issues) 反馈：

- [AI 生成质量](https://github.com/qixiang0530-dot/RecallStack/issues/new?template=ai-quality.yml)
- [拆卡失败](https://github.com/qixiang0530-dot/RecallStack/issues/new?template=generation-failure.yml)
- [页面或移动端问题](https://github.com/qixiang0530-dot/RecallStack/issues/new?template=mobile-ui.yml)
- [功能建议](https://github.com/qixiang0530-dot/RecallStack/issues/new?template=feature-request.yml)

工程过程、Provider 边界、测试和浏览器回归记录见 [`docs/agent-workflow.md`](docs/agent-workflow.md)。抖音公开测试素材清单见 [`docs/public-beta-launch.md`](docs/public-beta-launch.md)。

## Roadmap

- v0.3：稳定 AI 拆卡、来源依据、审核闭环和公开 Beta 反馈。
- v0.4：根据真实使用数据评估引用增强和资料级检索，不默认引入 RAG。
- 后续：再评估账号、云同步、更多资料格式和更丰富的牌组生态。

## Changelog

### v0.3.0-beta.3

- 使用机器人卡片标记统一侧栏、favicon 和 PWA manifest。
- 保留暖白与墨绿学习基调，增加深灰与青色 AI 品牌 token。
- 更新首页、学习页和资料拆卡截图。
- 重构 README 首页体验路径、AI 工程边界、隐私说明和公开测试反馈入口。

### v0.3.0-beta.2

- 从阿里云百炼迁移到 DeepSeek V4 Flash。
- 增加 Cloudflare Worker 限流、KV 每日 token 预算和紧急停用开关。
- 增加输入长度、分块数量和卡片数量限制。
