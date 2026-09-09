# Sitewide Language Switching Design

## Status
Draft

## Phase
Step 2: Design

## Purpose
Translate the approved sitewide language switching specification into a concrete implementation plan that fits this Next.js App Router codebase with the least risk and the fewest moving parts.

## Recommended Approach
Use a free, open-source, route-based localization setup with local message files and middleware-driven locale detection. The implementation must use `next-intl` as the localization framework for locale-prefixed routing, message loading, and locale-aware navigation. For v1, the design must support only the `en` locale and route every public page through `/en`. The design should prioritize:

- no paid runtime dependency
- correct language on first load
- route preservation when switching language
- localized metadata and document language
- minimal disruption to the current component structure

## Why This Fits This Codebase
This repository already has a small number of top-level public routes and a shared layout/header pattern. Most content is directly embedded in page components, which means localization will be driven more by content extraction than by architectural rewrites. That makes a route-based `next-intl` solution a better fit than a client-only language toggle.

Current route surface:

- Home: [app/page.tsx](../../app/page.tsx)
- Consultancy: [app/consultancy/page.tsx](../../app/consultancy/page.tsx)
- Consultancy services: [app/consultancy/services/page.tsx](../../app/consultancy/services/page.tsx)
- Resume: [app/resume/page.tsx](../../app/resume/page.tsx)
- Legal pages: [app/legal](../../app/legal)

Shared components that will need localization hooks:

- [app/layout.tsx](../../app/layout.tsx)
- [components/header.tsx](../../components/header.tsx)
- [components/mobile-nav.tsx](../../components/mobile-nav.tsx)
- [components/contact-form.tsx](../../components/contact-form.tsx)
- [components/footer.tsx](../../components/footer.tsx)
- page-specific section components under `app/` and `components/`

## Design Goals
1. Keep the current visual structure intact.
2. Apply the chosen locale before the page renders.
3. Make language switching available everywhere the user can navigate.
4. Preserve deep links, anchors, and current route state during language changes.
5. Keep all locale content local to the repo.
6. Minimize duplicated markup by isolating text in message files.
7. Address all identified implementation risks with concrete remediations before coding starts.

## Clarification Decisions (Locked)
- The language switcher is visible in v1 but disabled until another locale is introduced.
- Legal pages are not translated in v1; localization hooks for legal content are required now for locale-2 readiness.
- Brand names remain unchanged.
- Missing translation keys fall back to English.

## Information Architecture
### Locale model
- Define a single supported locale for v1: `en`.
- Use `en` as the only active locale prefix for all public routes.
- Persist the locale in a cookie so the route resolution remains stable across refreshes.
- Leave multi-locale browser preference logic out of v1 to avoid implying unsupported behavior.

### URL model
- Move public routes under a locale segment, for example `/{locale}`.
- For v1, the locale segment is always `en`.
- Keep the route structure consistent under `/en`:
  - `/en`
  - `/en/consultancy`
  - `/en/consultancy/services`
  - `/en/resume`
  - `/en/legal/privacyPolicy`
  - `/en/legal/termsAndConditions`

### Content model
- Store all user-facing strings in local message files.
- Organize messages by route or feature area rather than by file size alone.
- Keep static marketing text, nav labels, form labels, and legal copy separate enough to maintain clarity.

## Proposed File Structure
This is the intended structure, not a literal implementation requirement:

- `messages/en/*.json`
- `messages/<other-locale>/*.json`
- `middleware.ts`
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/consultancy/page.tsx`
- `app/[locale]/consultancy/services/page.tsx`
- `app/[locale]/resume/page.tsx`
- `app/[locale]/legal/privacyPolicy/page.tsx`
- `app/[locale]/legal/termsAndConditions/page.tsx`
- `components/language-switcher.tsx`
- `lib/i18n/*` with `next-intl` configuration and shared locale helpers

## Implementation Strategy
### 1. Locale-aware routing
Create locale-prefixed routes for every public page using `next-intl` App Router integration. Keep the component composition the same as today, but move the route entry points into locale-aware folders. This gives each language a stable URL and makes canonical/alternate metadata straightforward.

### 2. Middleware and locale detection
Use `next-intl` middleware to resolve locale in this order for v1:
1. explicit locale in the path
2. fallback to `en`

Redirect bare public routes to `/en`. Browser preference detection is intentionally out of scope for v1 because only English is supported.

### 3. Locale-aware root layout
Make the root layout read the active locale through `next-intl` and set:
- `<html lang>`
- localized metadata
- locale provider/context if the implementation uses one

### 4. Shared language switcher
Add a reusable switcher in the shared header and mobile nav using `next-intl` navigation helpers. The switcher should:
- show the supported locales clearly
- keep the current route, search params, and hash where possible
- write the selection to the locale cookie
- navigate to the same route in the new locale

### 5. Content extraction
Move hard-coded strings into local message files. Start with the highest-impact content:
- header nav labels
- hero and section headings
- consultancy-specific copy
- resume page copy
- contact form labels and messages
- footer labels
- legal page text

### 6. Form and API messaging
Localize client-side validation and submission states in `components/contact-form.tsx`. Keep the API response contract simple, but make user-facing messages in the UI locale-aware.

### 7. SEO and metadata
Generate localized metadata for each locale page, including title, description, canonical, and alternate language links. This is required for the public-facing site to behave correctly in search and sharing.

### 8. Route parity
Keep the same page structure and section order across locales unless a locale requires content-specific legal or phrasing changes. This avoids layout drift and keeps the visual parity that already exists between the main and consultancy pages.

## Cross-Cutting Risk Remediations (Mandatory)
### R1: Hard-coded internal routes and locale leakage
- Create a centralized locale-safe navigation helper layer and remove string-literal internal route targets from shared nav and footer/legal links.
- Refactor header data route entries to use locale-resolved paths.
- Add verification that all internal links remain under `/en` in v1.

### R2: Static metadata and fixed document language
- Move metadata to locale-aware generation across route entry points.
- Ensure the root locale layout sets document language from active locale context.
- Add validation that metadata and document language are consistent across all covered routes.

### R3: API/user-message coupling in contact flow
- Replace server-returned display strings with stable error/status codes.
- Map codes to localized messages in the form layer.
- Keep API semantics stable while isolating localization responsibility to UI presentation.

### R4: Silent build-quality failures
- Re-enable strict TypeScript and lint failure reporting for feature validation.
- Add gating checks so unresolved localization regressions fail validation.

### R5: Anchor/hash navigation regressions
- Preserve path, search, and hash during locale transitions.
- Keep section IDs stable and verify cross-route anchor links from resume/services contexts.

### R6: Visible-but-disabled switcher behavior in v1
- Render the switcher in desktop and mobile nav.
- Disable locale change interaction while only `en` is configured.
- Add clear accessibility labeling for disabled state and future readiness.

### R7: Legal localization deferred but future-ready
- Separate legal presentation from legal copy source now.
- Add legal message namespaces/placeholders and routing hooks in v1.
- Defer legal translated content population and review to locale-2 milestone.

## Work Breakdown by Area
### Global layout and navigation
- Replace hard-coded `lang="en"`.
- Add locale provider wiring if needed.
- Add language switcher into header and mobile nav.
- Localize menu labels.

### Main site
- Localize hero, section headings, CTA labels, and footer.
- Keep the existing composition of `About`, `Projects`, `Tech Stack`, `Contact`, and `Footer`.

### Consultancy route
- Localize consultancy-specific hero/about content.
- Keep the route hidden from site-wide nav unless explicitly intended.
- Preserve the current special-case contact behavior, including hiding employment type where required.

### Services and resume
- Localize titles, headings, summary text, and button labels.
- Keep resume data-driven content, but move human-readable labels into locale files where practical.

### Legal pages
- Localize privacy and terms content carefully.
- Treat these as controlled content requiring review because they are compliance-facing.

## Key Decisions
1. The solution is route-based, not a client-only toggle.
2. The solution must use `next-intl`.
3. The solution is free and repository-local.
4. V1 supports only English and uses `/en` for all public routes.
5. Locale selection must be available in shared navigation.
6. The whole application is covered, including legal and resume routes.
7. Language switching must preserve the current route.
8. The language switcher is visible but disabled in v1.
9. Legal localization content is deferred to locale-2 while architecture hooks are required in v1.

## Risks and Mitigations
- **Risk: copy is embedded across many components.**
  - Mitigation: localize by route/feature in phases and keep structural components intact.
- **Risk: legal translations become inconsistent.**
  - Mitigation: review legal content separately and avoid automated-only translations for final text.
- **Risk: anchor links break when routes change.**
  - Mitigation: preserve hash fragments and keep section IDs unchanged.
- **Risk: overengineering the solution.**
  - Mitigation: prefer a simple local-dictionary approach and only add abstractions that remove repetition.

## Validation Expectations
The design is complete when the implementation can satisfy:

- direct visits render in the selected locale
- switching language keeps the current route
- shared navigation and footer stay consistent across locales
- forms and legal pages render localized copy
- metadata and document language update per locale
- no paid localization service is required

## Design Exit Criteria
- The route structure is finalized.
- The locale strategy is finalized.
- The message file layout is finalized.
- The shared components that need localization are identified.
- The implementation can begin without guessing the architecture.
- All mandatory cross-cutting remediations are mapped to concrete implementation tasks.