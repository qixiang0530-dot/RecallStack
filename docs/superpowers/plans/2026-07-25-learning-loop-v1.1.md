# RecallStack v1.1 Learning Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reliable local-first daily study session, one-step review correction, backups, weak-card insights, and seven-day due forecasts.

**Architecture:** Dexie schema version 2 stores one session per local date. Repository transactions own review advancement, exact rerating, and backup replacement; pure domain helpers calculate weak cards and forecasts. Pages consume repository snapshots and keep only presentation state locally.

**Tech Stack:** React 19, TypeScript, Dexie, ts-fsrs, Zod, Vitest, React Testing Library, Playwright.

---

### Task 1: Daily session persistence

**Files:** `src/data/database.ts`, `src/data/studyRepository.ts`, `src/data/studyRepository.test.ts`

- [ ] Write failing tests proving same-day queue and position survive repository recreation while next-day sessions differ.
- [ ] Add Dexie v2 `studySessions` store and typed session records.
- [ ] Add repository methods to create, hydrate, advance, and reset the daily session.
- [ ] Run `npx vitest run src/data/studyRepository.test.ts` and confirm all tests pass.

### Task 2: Previous-card rerating

**Files:** `src/domain/types.ts`, `src/data/studyRepository.ts`, `src/pages/StudyPage.tsx`, `src/data/studyRepository.test.ts`, `src/app/App.test.tsx`

- [ ] Write failing tests proving rerating replaces one log and keeps `reviewCount` unchanged.
- [ ] Persist the pre-review state, original review timestamp, log ID, and queue index as the session's only correction snapshot.
- [ ] Add previous/current view states and rerating controls to the study page.
- [ ] Run repository and app tests and confirm the second previous navigation is unavailable.

### Task 3: Backup and restore

**Files:** `src/domain/schemas.ts`, `src/data/studyRepository.ts`, `src/pages/SettingsPage.tsx`, `src/data/studyRepository.test.ts`, `src/app/App.test.tsx`

- [ ] Write failing tests for valid round-trip restore and invalid input preserving current data.
- [ ] Add versioned Zod validation, date serialization, and transactional replacement.
- [ ] Add export and import controls with success/error feedback to settings.
- [ ] Run repository and app tests.

### Task 4: Weak cards and due forecast

**Files:** `src/domain/insights.ts`, `src/domain/insights.test.ts`, `src/pages/StatsPage.tsx`, `src/styles.css`

- [ ] Write failing tests for weak-card rules and seven date buckets.
- [ ] Implement pure insight helpers.
- [ ] Add forecast bars, topic weak counts, and a prioritized weak-card list.
- [ ] Run insight and app tests.

### Task 5: End-to-end verification

**Files:** `e2e/study.spec.ts`, `README.md`

- [ ] Extend Playwright coverage for refresh resume, previous rerating, and backup export.
- [ ] Update README with v1.1 behavior and backup semantics.
- [ ] Run `npm test`, `npm run lint`, `npm run build`, and `npm run test:e2e`.
- [ ] Inspect desktop and Pixel 7 screenshots for overlap and overflow.
