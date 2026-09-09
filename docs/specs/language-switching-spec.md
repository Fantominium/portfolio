# Sitewide Language Switching Specification

## Status
Draft

## Phase
Step 1: Specify

## Objective
Define a free, sitewide language switching solution for the entire public application so every user-facing route, shared component, and visible string renders in the selected language on first load. For v1, the implementation must use `next-intl` with a single supported locale (`en`), locale-prefixed routing, and local message files.

## Why This Exists
The portfolio must support a consistent multilingual experience across the full app, including the main site, consultancy route, services, resume, legal pages, and shared UI, without relying on paid localization services.

## Scope
In scope:

- All public routes in the application
- Shared layout, header, mobile navigation, footer, and theme-adjacent UI
- Home page, consultancy route, services, resume, and legal pages
- Contact form labels, helper text, validation, and success/error messaging
- Metadata, `lang` attribute, canonical URLs, and alternate language routing
- Locale persistence and route preservation when switching languages

Out of scope:

- Paid translation services or proprietary localization platforms
- Redesigning the site
- Changing the existing visual system beyond language-aware UI needs

## Constraints

- The solution must be free to run and maintain
- Locale content must live in the repository
- v1 supports only `en`
- All public routes must resolve under the `/en` locale prefix
- Language selection must apply before first meaningful render
- The current route must be preserved when switching languages
- The solution must work across the whole application, not only the home and consultancy pages

## Clarification Decisions (Locked)
- The language switcher is visible in v1 but disabled until a second locale is introduced.
- Legal page localization is deferred to the locale-2 milestone, but architecture hooks for legal localization must be implemented in v1.
- Brand names remain unchanged across locales.
- Missing translation keys must fall back to English.

## Current Baseline
The app uses Next.js App Router with a shared root layout in [app/layout.tsx](../../app/layout.tsx) and shared navigation in [components/header.tsx](../../components/header.tsx) and [components/mobile-nav.tsx](../../components/mobile-nav.tsx). Most visible copy is embedded directly in page and component files, including [app/page.tsx](../../app/page.tsx), [app/consultancy/page.tsx](../../app/consultancy/page.tsx), [components/contact-form.tsx](../../components/contact-form.tsx), and legal pages under [app/legal](../../app/legal).

## Functional Requirements
1. A user can select the site language from anywhere in the public app.
2. In v1, the selected language is always English and resolves to `/en`.
3. The app preserves the current page or route when switching language.
4. The app renders the correct language on first load for direct visits and refreshes.
5. The correct `lang` attribute is set on the document for the active locale.
6. All visible text is sourced from local translation files.
7. The language switcher appears in both desktop and mobile navigation.
8. The solution covers the entire application, not only the main site and consultancy route.

## Non-Functional Requirements
1. Use a free, open implementation with no paid runtime dependency.
2. Preserve existing App Router conventions.
3. Keep route logic simple and maintainable.
4. Avoid duplicating UI or styles when shared components can be reused.
5. Maintain accessibility and SEO-friendly language-specific routing.

## Proposed Technical Direction
- Use `next-intl` for locale handling, message loading, and route integration.
- Use locale-prefixed routes for all public pages with `en` as the only supported locale in v1.
- Use middleware to resolve the locale from the path or default to `/en`; browser preference detection is reserved for future locale expansion and is not active in v1.
- Store translations in local message files in the repository.
- Make shared layout locale-aware so `html lang`, metadata, and navigation reflect the active locale.
- Add a reusable language switcher to shared header and mobile nav.
- Localize all visible copy, including forms, legal pages, and route-specific content.

## Route Coverage
The localization system must cover:

- Home page
- Consultancy route
- Consultancy services route
- Resume route
- About, projects, tech stack, and contact sections
- Privacy policy
- Terms and conditions
- Any future public-facing route added to the app

## Compliance and Quality Requirements
- Legal content must be translated carefully and reviewed for correctness.
- Form labels, validation, and submission messages must be translated.
- Locale switching must not break navigation or section anchors.
- No paid translation API or localization SaaS is required for the app to function.
- All internal route navigation must be locale-safe and must not escape the `/en` prefix.
- API endpoints must return stable message codes for user-facing errors and statuses; final localized text must be resolved in the UI layer.
- Build safety checks for TypeScript and linting must be active before implementation completion.
- Locale-aware metadata generation and document language updates are required for all public routes.

## Acceptance Criteria
1. Every public route renders in the selected language.
2. The language switcher works sitewide and preserves the current route.
3. The app loads in the correct locale on direct visit and refresh.
4. The correct document language is applied for each locale.
5. Shared navigation, page sections, forms, and legal pages are localized.
6. No paid localization dependency is required.
7. No TypeScript or routing errors are introduced.
8. The language switcher is visible and explicitly disabled in v1.
9. Legal localization hooks exist in v1 even though legal translation content is deferred to locale-2.

## Pre-Implementation Remediation Gate
Implementation must not begin until the following are specified in design/tasks and approved:

1. Locale-safe navigation remediation for all hard-coded internal links.
2. Locale-aware metadata and document language remediation for all public routes.
3. API message-code contract remediation for contact form submission paths.
4. Build-safety remediation to prevent silent TypeScript and linting failures.
5. Anchor/hash preservation remediation for cross-route navigation.
6. Switcher behavior remediation for visible-but-disabled v1 behavior.
7. Legal content remediation strategy with locale-2 localization hooks in place.

## Validation Plan
1. Test direct visits to multiple routes in each supported locale.
2. Switch languages on the home page, consultancy route, resume, and legal pages.
3. Confirm the current route is preserved after switching.
4. Confirm `html lang` and metadata update correctly.
5. Verify all public pages are reachable in every supported locale.

## Definition of Done for Step 1
- The scope, constraints, and route coverage are explicit.
- The solution is specified as a free, sitewide implementation.
- The feature can move to design and implementation without ambiguity.