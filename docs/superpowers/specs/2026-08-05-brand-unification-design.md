# RecallStack Brand Unification Design

## Goal

Align the product UI with the optimized RecallStack robot icon while preserving the existing calm, tool-oriented study experience.

## Visual Direction

Use the selected A direction, "calm study desk": warm paper backgrounds and ink-green learning actions remain primary. The robot icon contributes charcoal, soft cyan, and off-white accents as restrained brand signals. Java red remains reserved for importance and attention states.

## Scope

- Replace the existing text-only brand mark with the supplied robot icon in the sidebar and PWA metadata.
- Add semantic CSS tokens for charcoal, cyan, cyan-soft, and icon-surface roles.
- Use cyan for AI provider/status accents, focus treatment, and brand details without changing task semantics.
- Keep green for primary study actions, progress, learned states, and active navigation.
- Keep Java red and amber for existing importance and warning meanings.
- Improve mobile bottom navigation and compact controls only where the new mark or tokens need it.
- Do not change routes, repository behavior, FSRS scheduling, card content, or Worker behavior.

## Asset Handling

The provided optimized icon is the visual source of truth. Store a repository-local SVG reproduction for the sidebar and installable PWA so the mark is deterministic, small, and legible at small sizes. Keep the existing SVG fallback available for older references and give the brand image an accessible text label.

## Acceptance Criteria

- The new robot mark appears in the sidebar, browser icon, and PWA manifest.
- Existing green primary actions and card importance meanings remain unchanged.
- AI surfaces have a recognizable cyan brand accent without a full palette rewrite.
- Desktop and mobile layouts have no overlap or clipped brand text.
- Existing unit, build, lint, and E2E behavior remains green.
