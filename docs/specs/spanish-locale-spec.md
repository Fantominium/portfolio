# Spanish Locale (locale-2) Specification

## Status
Draft — clarifications locked, codebase analysis complete, ready for Step 2: Design

## Phase
Step 1: Specify

## Basis
This spec builds on the completed sitewide language switching foundation described in:
- [docs/specs/language-switching-spec.md](./language-switching-spec.md)
- [docs/specs/language-switching-design.md](./language-switching-design.md)
- [docs/specs/language-switching-tasks.md](./language-switching-tasks.md)

Those documents established `en` as the only v1 locale, a visible-but-disabled switcher, and explicit "locale-2 readiness" hooks (legal namespaces, locale-safe navigation, locale-aware metadata) that this effort is intended to activate.

## Objective
Introduce Spanish (`es`) as the second supported locale and the first additional language exposed through the sitewide language switcher, enabling the switcher's previously disabled interaction.

## Why This Exists
The language-switching feature was built with a visible-but-disabled switcher specifically to prepare for a second locale without rework. Spanish is the first locale to activate that capability, so the switcher becomes interactive and the app serves fully translated content in at least two languages.

## Clarification Decisions (Locked)
1. **Default/first language semantics**: English remains the default locale (bare `/` continues to resolve to `/en`). "First language" refers only to display order: `es` is listed first in the switcher UI, ahead of `en`.
2. **Switcher activation scope**: Roll out interactivity route-by-route as each route's Spanish content is verified, rather than enabling it everywhere at once. The switcher stays disabled on any route not yet verified for `es`.
3. **Regional variant**: Use `es-ES` (Spain) vocabulary and tone.
4. **Translation authorship**: Translations are agent-drafted. All Spanish copy must be presented for explicit user review/approval before merge.
5. **Legal content**: Privacy Policy and Terms and Conditions are in scope for Spanish translation in this phase (no further deferral).
6. **Locale persistence/detection**: Auto-detect `Accept-Language` for first-time visitors and default them into `/es` when their browser prefers Spanish; manual switching still persists via cookie thereafter.
7. **URL/routing**: Use `/es` mirroring `/en` for every existing route under [app/[locale]](../../app/[locale]).
8. **SEO**: Localized metadata, canonical URLs, and `hreflang` alternates for `es` are in scope for this phase.

## Codebase Analysis Findings (Step 1 Gate)
An analysis of the current implementation against this spec surfaced gaps that change the effort's real scope. These are resolved below and folded into Scope/Constraints.

1. **Locale registry is English-only across three files, not a single flag.** `LOCALES = ["en"]` in [lib/i18n/locale.ts](../../lib/i18n/locale.ts), the `messageLoaders` map in [i18n/request.ts](../../i18n/request.ts), and literal `"/en"` string checks in [middleware.ts](../../middleware.ts) all need refactoring to be locale-list-driven. **Resolution**: in scope, required.
2. **`lib/i18n/legal.ts` lists `deferredLocales: ["fr", "de"]`, not `es`.** **Resolution**: keep `fr`/`de` as-is; add `es` alongside them as an additional, now-active locale (legal config becomes `currentLocale`/active-locale aware rather than single-locale, with `fr`/`de` remaining deferred).
3. **No `Accept-Language` detection exists anywhere in `middleware.ts` today.** This is net-new middleware logic, not an "enable" of dormant code. **Resolution**: in scope, required; any `es-*` Accept-Language value (e.g. `es-MX`, `es-AR`) must map to the site's single `es-ES` content.
4. **`LanguageSwitcher` is a single static disabled `<Button>` hardcoded to render `"EN"`**, with no list/dropdown, no per-locale label data, and no per-route awareness. **Resolution**: in scope, required rebuild to support locale listing (`es` first, then `en`) and per-route enablement.
5. **Bug: header/mobile-nav/footer links are hardcoded to `DEFAULT_LOCALE`.** [components/header.tsx](../../components/header.tsx), [components/mobile-nav.tsx](../../components/mobile-nav.tsx), and [components/footer.tsx](../../components/footer.tsx) all call `buildLocalizedHref(href, DEFAULT_LOCALE)` instead of the active locale, forcing every in-app nav click back to `/en`. **Resolution**: in scope, required prerequisite fix — must read the active locale (e.g. via `useLocale()`) instead of `DEFAULT_LOCALE`.
6. **Legacy non-locale route trees** (`app/page.tsx`, `app/consultancy/**`, `app/resume/**`, `app/legal/**`) still exist alongside `app/[locale]/**` equivalents, appear unreachable due to middleware redirects, and use un-localized `app/data/headerData.tsx`. **Resolution**: out of scope; leave untouched.
7. **No existing mechanism for per-route locale enablement** (needed for decision #2). **Resolution**: in scope — introduce a new config file (e.g. `lib/i18n/localeReadiness.ts`) listing which routes have verified `es` content and are switcher-enabled; routes not listed stay disabled for `es`.
8. **Messages file structure is a single flat `messages/en.json`**, not the `messages/en/*.json` split the original design proposed. **Resolution**: mirror with a single flat `messages/es.json`.
9. No inconsistency found in `lib/i18n/metadata.ts` or `lib/i18n/contactMessages.ts` — both are already locale-agnostic and only need `es` content added.

## Scope
In scope:
- Refactor `lib/i18n/locale.ts`, `i18n/request.ts`, and `middleware.ts` to be locale-list-driven (add `es` to `LOCALES`, message loaders, and remove literal `/en`-only branching).
- Add `Accept-Language`-based locale detection for first-time visitors (any `es-*` variant maps to `es-ES` content), with cookie persistence overriding detection on subsequent visits.
- Fix locale-safe navigation bug: header, mobile nav, and footer links must resolve against the active locale, not `DEFAULT_LOCALE`.
- Update `lib/i18n/legal.ts` so `es` becomes an active/current locale alongside `en`, while `fr`/`de` remain in `deferredLocales` unchanged.
- Introduce a new per-route locale-readiness config (e.g. `lib/i18n/localeReadiness.ts`) to drive incremental switcher enablement per route.
- Rebuild `LanguageSwitcher` to list `es` before `en`, reflect per-route readiness, and remain disabled for `es` on routes not yet verified.
- Create `messages/es.json` (single flat file mirroring `messages/en.json`) in es-ES.
- Translate all routes already covered by the language-switching feature: home, consultancy, consultancy services, resume, sections (about/projects/tech stack/contact), shared shell (header/mobile nav/footer), and legal pages (privacy policy, terms and conditions).
- Update locale-aware metadata/document-language generation, canonical URLs, and `hreflang` alternates to support `es`.
- Update contact form and API message-code mapping to include Spanish (es-ES) text.
- Present all agent-drafted Spanish copy to the user for explicit review/approval before merge.

Out of scope:
- Any locale beyond `es`/`en` (including `fr`/`de`, which remain deferred and untouched).
- Deleting or modifying the legacy non-locale route trees (`app/page.tsx`, `app/consultancy`, `app/resume`, `app/legal`).
- Redesigning the switcher UI beyond reordering and per-route enablement.
- Changing the existing visual system.

## Constraints (Carried Over From Locale-1 Foundation)
- Must remain free/repository-local (no paid translation or localization SaaS at runtime).
- Must reuse the existing `next-intl` route-based architecture; no parallel i18n mechanism.
- Missing Spanish keys must fall back to English (existing fallback behavior).
- Locale switching must preserve the current route, search params, and hash.
- Build must remain free of TypeScript/lint regressions.

## Next Steps
1. ~~Author [docs/specs/spanish-locale-design.md](./spanish-locale-design.md) (Step 2: Design)~~ — done; design drafted covering the locale-registry refactor, the locale-safe navigation bug fix, the new per-route readiness config, per-route rollout sequencing/verification gates, Accept-Language detection logic, and the es-ES metadata/hreflang plan.
2. Author a Spanish-locale task list (Step 3: Tasks) once design is approved, following the phase-table format in [docs/specs/language-switching-tasks.md](./language-switching-tasks.md).
3. Do not merge any agent-drafted Spanish copy without explicit user review/approval.
4. Do not begin implementation until this spec's status is updated to "Approved for implementation."

## Definition of Done for Step 1
- All Open Questions above are answered and recorded as locked decisions.
- Scope and out-of-scope lists are finalized based on those answers.
- The feature can move to Step 2: Design without ambiguity.
