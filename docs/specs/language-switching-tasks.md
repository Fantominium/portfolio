# Sitewide Language Switching Task List

## Status
Draft

## Basis
Derived from [docs/specs/language-switching-spec.md](./language-switching-spec.md) and [docs/specs/language-switching-design.md](./language-switching-design.md).

## Purpose
Provide a concrete, ordered implementation checklist for the sitewide language switching feature that covers the entire public application and remains free, local, and maintainable.

## Guiding Rules
- Keep the implementation free of paid localization dependencies.
- Preserve the current visual structure wherever possible.
- Apply locale on first load, not only after hydration.
- Cover all public routes and shared UI, not just the home and consultancy pages.
- Favor `next-intl` with local message files and route-based localization over one-off client-only state.
- Protect route preservation, anchors, metadata, and accessibility during language changes.
- Do not start feature coding until all remediation gate tasks in Phase 0 are complete.

## Task List

### Phase 0: Clarification and remediation gate (must complete before implementation)
1. Lock the visible-but-disabled switcher behavior in all design and acceptance criteria.
2. Lock legal content scope to locale-2 while requiring legal localization hooks in v1.
3. Define locale-safe navigation helper requirements for replacing hard-coded internal links.
4. Define locale-aware metadata and document-language requirements for all public routes.
5. Define API message-code contract for contact form error/success localization.
6. Define build-quality gates for TypeScript and lint checks.
7. Define anchor/hash preservation requirements across locale-aware route transitions.
8. Confirm remediation acceptance checks and sign off before coding starts.

### Phase 1: Foundation and routing
1. Confirm the supported locale list and default locale as `en`.
2. Define the canonical locale URL pattern for all public routes as `/en/*`.
3. Add locale-aware route folders for the application entry points:
   - home
   - consultancy
   - consultancy services
   - resume
   - legal pages
4. Keep the existing public route structure intact within each locale.
5. Add middleware to resolve locale from:
   - explicit route locale
   - fallback to `en`
6. Redirect bare public routes to the resolved locale.
7. Ensure the selected locale is persisted in a cookie, even though v1 only supports `en`.
8. Preserve search parameters and hash fragments when redirecting or switching locale.

### Phase 2: Shared locale infrastructure
9. Add a shared locale helper layer using `next-intl` for reading the active locale and loading messages.
10. Make the root layout locale-aware for `en`.
11. Replace the hard-coded `lang="en"` attribute with the active locale.
12. Attach localized metadata generation to the route layout or page layer.
13. Add locale-aware alternate and canonical link generation for the single supported locale.
14. Establish a repository-local message file structure.
15. Split messages by route or feature area so content remains manageable.

### Phase 3: Shared navigation and shell
16. Add a reusable language switcher component.
17. Place the language switcher in the desktop header.
18. Place the language switcher in the mobile navigation sheet.
19. Preserve the current path when changing language.
20. Ensure the switcher works from every public route and preserves `/en`.
21. Localize shared navigation labels.
22. Localize footer labels and any shared shell copy.
23. Keep theme toggle behavior unchanged while adding language controls.
24. Keep the language switcher visible but disabled while only `en` is configured.
25. Add accessible labeling for disabled switcher state.

### Phase 4: Public page localization
26. Localize the home page content.
27. Localize the consultancy page content.
28. Localize the consultancy services page content.
29. Localize the resume page content.
30. Localize the about, projects, tech stack, and contact section headings and labels.
31. Preserve section IDs and anchor targets across locales.
32. Keep the existing page composition and visual rhythm consistent between locales.

### Phase 5: Form and interaction copy
33. Localize all contact form labels.
34. Localize contact form validation messages.
35. Localize contact form success and error messaging.
36. Keep the contact form layout unchanged while swapping text content.
37. Preserve the consultancy-specific behavior that hides the employment type field.
38. Replace user-facing API strings with message codes and map to localized UI text.

### Phase 6: Legal and compliance content
39. Implement legal localization architecture hooks (message namespaces, content boundaries, route wiring).
40. Keep legal routes discoverable by direct URL but aligned with locale routing.
41. Store legal content source in a structure that supports locale-2 translation and legal review.
42. Defer legal translated content population and review to locale-2 milestone.

### Phase 7: Metadata, SEO, and accessibility
43. Localize page titles and descriptions for all public routes.
44. Generate correct `hreflang`/alternate links for supported locales.
45. Confirm document language changes with locale selection.
46. Verify accessible labels for the language switcher.
47. Verify keyboard access and mobile interaction for the switcher.
48. Confirm anchor navigation and page focus behavior still work after locale switches.

### Phase 8: Validation and hardening
49. Manually test direct visits to each public route in each supported locale.
50. Test switching languages on the home page.
51. Test switching languages on the consultancy page.
52. Test switching languages on the services and resume pages.
53. Test switching languages on legal pages.
54. Confirm the current route is preserved after switching.
55. Confirm refreshes stay in the selected locale.
56. Run type checking and linting for the touched route and component set.
57. Verify no public navigation path is dropped or duplicated.
58. Verify no paid localization dependency is required for the app to function.
59. Verify the switcher is visible, disabled, and accessible in desktop and mobile nav.
60. Verify legal localization hooks exist and are ready for locale-2 content onboarding.

## Suggested Implementation Order
1. Clarification and remediation gate.
2. Foundation and routing.
3. Shared locale infrastructure.
4. Shared navigation and shell.
5. Public page localization.
6. Form and interaction copy.
7. Legal and compliance content.
8. Metadata, SEO, and accessibility.
9. Validation and hardening.

## Completion Criteria
- Every public route renders in the selected locale on first load.
- The language switcher works across the entire application.
- The current route is preserved during language changes.
- All visible text is sourced from local message files.
- Legal, form, metadata, and shared shell content are locale-aware.
- The implementation remains free and repository-local.