# Spanish Locale (locale-2) Design

## Status
Draft

## Phase
Step 2: Design

## Basis
Derived from the approved, gap-analyzed [docs/specs/spanish-locale-spec.md](./spanish-locale-spec.md). All locked clarification decisions and codebase analysis findings in that document are binding inputs to this design.

## Purpose
Translate the Spanish-locale spec into a concrete, file-level implementation plan: which files change, in what order, and how the new per-route readiness/rollout mechanism works, so implementation can begin without re-deriving architecture decisions.

## Correction to Spec Record
The spec's codebase analysis described `app/page.tsx`, `app/consultancy/**`, `app/resume/**`, and `app/legal/**` as "legacy/dead" routes. Re-checking [app/[locale]/page.tsx](../../app/[locale]/page.tsx) and [app/[locale]/legal/privacyPolicy/page.tsx](../../app/[locale]/legal/privacyPolicy/page.tsx) shows these files are not dead: the `app/[locale]/**` route wrappers directly import and re-render the components from the non-locale paths (e.g. `import HomePage from "../page"`). They are the real page-composition implementations, reused through relative imports by the locale-aware wrappers, not unreachable duplicates. This does not change the spec's out-of-scope decision (leave these files untouched as page implementations); it only corrects why they exist. Content edits for Spanish still happen by adding translation keys/message lookups inside these same shared implementation files, not by duplicating them.

## Known Build-Safety Caveat
[next.config.mjs](../../next.config.mjs) sets `typescript.ignoreBuildErrors: true` and `eslint.ignoreDuringBuilds: true`, so `next build` will not fail on type or lint errors. This means the spec's "build must remain free of TypeScript/lint regressions" constraint cannot rely on `npm run build` alone as a gate. Validation must additionally run `tsc --noEmit` and the project's lint command directly and treat their output as the actual pass/fail signal.

## Locale Registry Refactor
Replace hardcoded `en`-only logic with list-driven logic across three files:

1. **[lib/i18n/locale.ts](../../lib/i18n/locale.ts)**
   - Change `LOCALES = ["en"]` to `LOCALES = ["en", "es"] as const`.
   - Keep `DEFAULT_LOCALE = "en"` (per locked decision #1).
   - `normalizeLocale` already checks membership in `LOCALES`, so no logic change needed there beyond the array update.
   - `buildLocalizedPath` currently special-cases `"/en"` as the default prefix; generalize so any locale in `LOCALES` produces `/${locale}` uniformly, with `en` continuing to resolve to `/en` (no behavior change for `en`, new `/es` behavior falls out of the same generalized branch).

2. **[i18n/request.ts](../../i18n/request.ts)**
   - Add `es: () => import("../messages/es.json")` to `messageLoaders`.

3. **[middleware.ts](../../middleware.ts)**
   - Replace literal `"/en"` checks with logic derived from `LOCALES`/`DEFAULT_LOCALE`:
     - `PUBLIC_PREFIXES` stays infra-only (`/api`, `/_next`, `/images`, `/favicon.ico`); drop the `/en` special case from that list since it will instead be handled by the general locale-prefix check.
     - Replace `if (pathname === "/en")` with a generic check: if the first path segment is any value in `LOCALES`, treat it as already locale-prefixed and pass through.
     - Replace the redirect fallback `/en${pathname}` with `/${resolvedLocale}${pathname}` where `resolvedLocale` comes from the new detection logic below (falls back to `DEFAULT_LOCALE` when no signal is present).

## Accept-Language Detection (New Logic)
Add first-time-visitor detection to `middleware.ts`, only when the `NEXT_LOCALE` cookie is absent (an existing cookie always wins, per locked decision #6):

1. Read the `Accept-Language` header from the incoming request.
2. Parse preference-ordered language tags (respecting `q` weighting if present; a simple split on `,` and `;q=` is sufficient — no new dependency needed).
3. For each tag in order, normalize: if the tag is `es` or starts with `es-` (any regional variant, e.g. `es-MX`, `es-AR`), resolve to `es`. If the tag is `en` or starts with `en-`, resolve to `en`.
4. Use the first resolved match; if none of the header's tags match a supported locale, fall back to `DEFAULT_LOCALE`.
5. This resolved locale feeds the bare-`/` redirect and the no-prefix redirect fallback described above, and is written to the `NEXT_LOCALE` cookie so subsequent visits skip detection.
6. This logic only runs on first visit (no cookie). Once a user has a cookie (from detection or manual switch), it always takes precedence, matching locked decision #6.

## Locale-Safe Navigation Bug Fix
Required prerequisite (spec finding #5). In [components/header.tsx](../../components/header.tsx), [components/mobile-nav.tsx](../../components/mobile-nav.tsx), and [components/footer.tsx](../../components/footer.tsx):
- Replace `buildLocalizedHref(href, DEFAULT_LOCALE)` calls with the active locale obtained via `useLocale()` from `next-intl` (these are already `"use client"` components, so the hook is usable directly).
- No change needed to `buildLocalizedHref`/`buildLocalizedPath` signatures; only the call sites change.
- This fix applies immediately for both `en` and `es` and is not gated by per-route readiness — without it, Spanish navigation cannot work at all.

## Legal Locale Config Update
In [lib/i18n/legal.ts](../../lib/i18n/legal.ts):
- Keep `deferredLocales: ["fr", "de"]` unchanged (locked decision: keep as-is).
- Add `es` as an active locale: introduce `activeLocales: ["en", "es"]` (or extend `currentLocale` to `currentLocales: ["en", "es"]`) so the legal module reflects that Spanish legal content is now live, distinct from the still-deferred `fr`/`de`.
- `getLegalContentStatus()` should reflect per-locale status going forward (e.g. return a map keyed by locale) rather than a single global string, since `en`/`es` are now "active" while `fr`/`de` stay "deferred".

## Per-Route Locale Readiness (New Mechanism)
Introduce `lib/i18n/localeReadiness.ts`:
- Export a config keyed by route identifier (reuse the same route keys already used elsewhere, e.g. `home`, `consultancy`, `consultancyServices`, `resume`, `legal.privacyPolicy`, `legal.termsAndConditions`) mapping to which non-default locales are verified/enabled for that route (e.g. `{ home: ["es"], resume: [] }`).
- Export a helper `isLocaleEnabledForRoute(routeKey, locale)` used by `LanguageSwitcher` to decide whether the `es` option is interactive or disabled on the current page.
- Routes are added to this config only after their Spanish translation is drafted and approved (per locked decision #4 and #2), keeping the rollout sequencing explicit and auditable in one file.
- Default state for any route not listed: `es` disabled, matching current v1 disabled behavior.

## Language Switcher Rebuild
Rebuild [components/language-switcher.tsx](../../components/language-switcher.tsx):
- Replace the single static `<Button>` with a small control (e.g. two toggle buttons or a compact dropdown) listing locales in the order `["es", "en"]` (locked decision #1/#9), each labeled with its own language name (`Español`, `English`) rather than the current hardcoded `"EN"` text.
- Accept a `routeKey` prop (or resolve the current route key from `usePathname()`) so it can call `isLocaleEnabledForRoute` from the new readiness config.
- For a locale that is not enabled on the current route, keep it rendered but disabled with the existing accessible pattern (`aria-disabled`, descriptive `title`/`aria-label`), consistent with current v1 disabled-state conventions.
- For an enabled locale, clicking navigates to the same route/search/hash under the new locale prefix (using `buildLocalizedHref`/`buildLocalizedPath` with the target locale) and lets `next-intl`/middleware persist the cookie.
- `messages/en.json`'s `common.languageSwitcher` namespace needs new keys for per-locale labels and enabled-state `aria-label`s (in addition to today's `label`/`disabledLabel`), mirrored in `messages/es.json`.

## Translation Content Plan
- Create `messages/es.json` as a single flat file mirroring the full key structure of `messages/en.json` (locked decision: no namespace split).
- Populate with es-ES translations for every namespace: `common` (navigation, languageSwitcher, footer, projectCard), `metadata` (all routes), contact form/message-code text, and `legal` (privacyPolicy, termsAndConditions).
- All translations are agent-drafted first, then presented to the user as a diff/preview for explicit approval before merge (locked decision #4) — no Spanish content merges silently.
- Missing-key fallback to English is already built into the `next-intl` message-loading path and needs no new code.

## Metadata, Canonical, and hreflang
Extend [lib/i18n/metadata.ts](../../lib/i18n/metadata.ts)'s `buildLocalizedMetadata`:
- Keep `canonical` pointing at the current-locale path (existing behavior).
- Add `alternates.languages` populated with an entry per locale in `LOCALES` (`en` → `/en/...`, `es` → `/es/...`) using `buildLocalizedPath` for each, so generated metadata includes `hreflang` alternates automatically for every route that already calls `buildLocalizedMetadata`. No per-route call-site changes are needed beyond this shared helper update.

## Contact Form and API Messages
- [lib/i18n/contactMessages.ts](../../lib/i18n/contactMessages.ts) stays structurally unchanged (already locale-agnostic code-to-key mapping).
- Add the corresponding es-ES strings for every `CONTACT_MESSAGE_CODES` entry in `messages/es.json` under the same namespace path used today in `messages/en.json`.
- No API route changes are required; the contact API already returns stable codes, not display text.

## Rollout Sequencing (Per-Route Verification Gates)
Given locked decision #2 (enable per route as verified, not all at once), routes are enabled in `localeReadiness.ts` in this order, each gated on translation content being merged and manually spot-checked by the user:
1. Home (`/es`) + shared shell (header, mobile nav, footer) — must ship first since the switcher itself lives in the shared shell.
2. Consultancy (`/es/consultancy`)
3. Consultancy services (`/es/consultancy/services`)
4. Resume (`/es/resume`)
5. Legal — Privacy Policy (`/es/legal/privacyPolicy`)
6. Legal — Terms and Conditions (`/es/legal/termsAndConditions`)

Each step: translate → agent presents content for approval → merge → add route key to `localeReadiness.ts` → verify in browser → move to next route.

## Design Goals
1. No behavior change for existing `en` users beyond nav links now correctly resolving to their own locale instead of always `/en`.
2. `es` is only reachable/interactive where explicitly marked ready, preventing partially-translated pages from being exposed.
3. Reuse existing `next-intl`, message-loading, and metadata plumbing; no parallel i18n system.
4. Keep the single flat message file pattern already established for `en`.
5. Make translation review a required, visible step, not an implicit merge.

## Risks and Mitigations
- **Risk: `next build` won't catch type/lint regressions** (build-safety caveat above). Mitigation: run `tsc --noEmit` and lint explicitly as part of validation, not just `npm run build`.
- **Risk: Accept-Language parsing edge cases** (malformed headers, no header present). Mitigation: wrap parsing defensively and fall back to `DEFAULT_LOCALE` on any parse failure.
- **Risk: partially translated routes leak through if `localeReadiness.ts` is misconfigured.** Mitigation: default-disabled unless explicitly listed; keep the config centralized in one file for easy audit.
- **Risk: switcher rebuild regresses accessibility of the existing disabled-state pattern.** Mitigation: keep the same `aria-disabled`/`title`/`aria-label` conventions already used today, just parameterized per locale/route.

## Validation Expectations
- `tsc --noEmit` and the project lint command both pass (since `next build` alone cannot be trusted per the build-safety caveat).
- Direct visits to `/es` and `/en` for every route listed in the rollout sequence render correctly.
- Switching locale on any enabled route preserves path, search params, and hash.
- Switcher shows `es` disabled on any route not yet added to `localeReadiness.ts`.
- First-time visit with an `es-*` Accept-Language header lands on `/es`; a returning visitor's cookie choice overrides this.
- `hreflang`/`alternates.languages` present for both locales on every route with metadata.

## Design Exit Criteria
- Every file requiring change is identified with the specific edit needed (locale registry, middleware, nav components, legal config, metadata helper).
- The new `localeReadiness.ts` mechanism and its consumption by `LanguageSwitcher` are fully specified.
- The Accept-Language detection algorithm is specified precisely enough to implement without further design decisions.
- The rollout sequence and its gating condition (translation approved → route added to readiness config) are explicit.
- Implementation can begin without guessing architecture.
