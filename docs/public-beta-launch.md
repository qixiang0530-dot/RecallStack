# RecallStack 公开 Beta 发布清单

## 发布前技术检查

- [ ] `VITE_CARD_GENERATION_API_URL` 已配置为线上 Worker URL。
- [ ] Cloudflare KV `DAILY_BUDGET` 已创建并写入 `worker/wrangler.toml`。
- [ ] `DEEPSEEK_API_KEY` 已通过 `wrangler secret put` 保存，没有进入仓库。
- [ ] Worker 保持 `AI_GENERATION_ENABLED=true` 和 `REQUIRE_DAILY_BUDGET=true`。
- [ ] 用无敏感信息的短 Java 资料完成一次真实 smoke test。
- [ ] 快速重复请求确认每 IP 2 次/分钟限流。
- [ ] 检查额度耗尽、余额不足和本地规则降级提示。
- [ ] 检查桌面 Chrome、Android 手机、普通窗口和无痕窗口加载最新版本。
- [ ] 执行 `npm run lint`、`npm test`、`npm run worker:test`、`npm run build`、`npm run test:e2e` 和 `git diff --check`。
- [ ] 执行敏感信息扫描，确认仓库没有 API Key。

## 30 秒视频

画面顺序：

```text
Java 资料 -> AI 自动分块 -> 生成知识卡片 -> 展示来源依据
-> 人工审核 -> 加入个人牌组 -> FSRS 复习
```

屏幕上固定标注：

```text
RecallStack v0.3 Beta
AI 生成内容需要人工审核
公开测试期间每日 AI 额度有限
```

## 2 分钟视频

1. 首页展示今日任务和 Java 牌组。
2. 学习一张卡片，主动回忆后展开答案并评分。
3. 进入拆卡页，点击“载入 Java 线程池示例”。
4. 选择 AI 模式并展示隐私说明、来源片段和进度。
5. 编辑问题或回答，点击“完成审核”。
6. 加入个人资料牌组，切换到牌组并开始学习。
7. 刷新页面，展示本地进度仍然存在。

## 发布文案草稿

```text
我做了一个背单词式的 Java 八股复习工具 RecallStack。

把 Markdown 资料交给 AI 自动分块、生成知识卡片，并展示来源依据；用户审核后，卡片才会进入 FSRS 复习流程。当前是 v0.3 Beta，AI 使用 DeepSeek + Cloudflare Worker，公开测试期间每日额度有限。

在线体验：
https://qixiang0530-dot.github.io/RecallStack/

AI 生成内容需要人工审核，不要上传公司内部资料和敏感信息。欢迎通过 GitHub Issues 反馈拆卡质量、失败问题和移动端体验。
```

## 反馈收集

- AI 质量问题：附原始资料类型、生成卡片问题和期望结果，不要附敏感原文。
- 拆卡失败：附时间、错误提示、资料长度和是否重试成功。
- 页面或移动端问题：附设备、浏览器、页面路径和截图。
- 功能建议：描述使用场景和希望减少的操作成本。
