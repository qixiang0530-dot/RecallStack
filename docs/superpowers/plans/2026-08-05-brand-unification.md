# RecallStack Brand Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task with review checkpoints.

**Goal:** Apply the selected calm-study visual direction to RecallStack without changing product behavior.

**Architecture:** Keep the existing React and CSS structure. Add one repository-local icon asset, update the existing design tokens and brand shell, then validate the generated manifest and responsive layout through the existing test and build commands.

**Tech Stack:** React, TypeScript, Vite, vite-plugin-pwa, CSS custom properties, Vitest, Playwright.

---

### Task 1: Add the supplied brand asset

**Files:**
- Create: `public/recallstack-brand.svg` as a repository-local, deterministic reproduction of the user-supplied optimized icon.
- Keep: `public/icon.svg` as the SVG fallback until the raster asset is verified in the build.

- [ ] Verify the SVG is present and parses as an XML image resource with `Get-Item public/recallstack-brand.svg`.

### Task 2: Update brand metadata and shell markup

**Files:**
- Modify: `src/components/AppShell.tsx`
- Modify: `index.html`
- Modify: `vite.config.ts`

- [ ] Replace the text-only `.brand-mark` content with an image using `src="./recallstack-brand.svg"`, `alt="RecallStack"`, and a stable 36px box.
- [ ] Keep the existing brand name and navigation labels unchanged.
- [ ] Add the new SVG favicon before the existing SVG fallback in `index.html`.
- [ ] Add a 192px SVG manifest icon while retaining the existing SVG `any` icon fallback.
- [ ] Set the browser theme color to the existing paper token so installable surfaces remain consistent.

### Task 3: Extend the existing design tokens

**Files:**
- Modify: `src/styles.css`

- [ ] Add tokens for `--charcoal`, `--cyan`, `--cyan-soft`, and `--icon-surface` next to the current palette.
- [ ] Style `.brand-mark` as an image container with `object-fit: cover`, no text fallback dependency, and a small radius matching the supplied icon tile.
- [ ] Add `.ai-consent-box`, `.provider-note`, `.generation-progress`, and visible focus states to use cyan only for AI/brand emphasis where existing selectors currently use blue or generic green.
- [ ] Preserve green as the primary command, active navigation, progress, and learned-state color.
- [ ] Preserve current mobile bottom navigation height and safe-area padding while increasing active-state contrast with the new charcoal/cyan roles.
- [ ] Add a `@media (max-width: 560px)` rule if needed so the 36px mark and RecallStack text do not clip in the compact shell.

### Task 4: Add focused regression coverage

**Files:**
- Modify: `src/app/App.test.tsx`
- Modify: `src/components/AppShell.tsx` only if a testable accessible label is needed.

- [ ] Add a test that renders the shell and asserts the brand image has `alt="RecallStack"` and the expected `src`.
- [ ] Add a test that asserts the primary study action keeps its existing class and navigation target.
- [ ] Run the focused test and verify the new assertions fail before implementation, then pass after implementation.

### Task 5: Verify desktop, mobile, and build output

**Files:**
- No source changes expected.

- [ ] Run `npm test src/app/App.test.tsx`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test:e2e`.
- [ ] Run `git diff --check`.
- [ ] Inspect the built `dist/manifest.webmanifest` and confirm it references the raster and SVG brand icons.
- [ ] Check the app at desktop and mobile widths for clipped text, broken contrast, or icon overlap.
