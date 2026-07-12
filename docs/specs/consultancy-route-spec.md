# Consultancy Route Specification (Step 1)

## Status

Approved for implementation

## Objective

Introduce an unlisted route at `/consultancy` that reuses the same page composition and visual style as the current home page while allowing a small, explicit set of content changes.

## Why This Exists

The route should support targeted sharing of a consultancy-focused page without adding it to public navigation.

## Scope

In scope:

- Add a new page route: `/consultancy`
- Keep shared layout and styling parity with the home page
- Reuse existing components used on home page
- Support minor, controlled content differences for consultancy context
- Keep route unlisted from site navigation

Out of scope:

- Changing the global design system
- Reworking section component architecture
- Adding the route to header or footer navigation

## Existing Home Page Composition (Baseline)

Current home page (`app/page.tsx`) renders, in order:

1. `Header`
2. `BackgroundPaths`
3. `AboutSection`
4. `ProjectSection`
5. `TechStackSection`
6. `ContactSection`
7. `Footer`

## Functional Requirements

1. A user can navigate directly to `/consultancy`.
2. `/consultancy` renders the same component structure as the home page unless explicitly overridden by approved minor changes.
3. `/consultancy` must not appear in header navigation links (`app/data/headerData.tsx`) or other visible nav lists.
4. Shared style tokens, spacing behavior, and responsive behavior must remain consistent with home page.

## Non-Functional Requirements

1. Preserve existing TypeScript and Next.js app-router conventions.
2. Avoid duplicating styles when existing classes/components can be reused.
3. Keep implementation simple and easy to maintain.

## Proposed Technical Direction (for Step 2)

- Add `app/consultancy/page.tsx`.
- Start by mirroring `app/page.tsx` composition.
- Introduce route-specific content via small data overrides or conditional props where needed.
- Do not modify `headerData.headerLinks` with `/consultancy`.

## Acceptance Criteria

1. Visiting `/consultancy` successfully renders the page.
2. Visual layout matches home page at mobile and desktop breakpoints.
3. `Header`, `BackgroundPaths`, `AboutSection`, `ProjectSection`, `TechStackSection`, `ContactSection`, and `Footer` are present (unless replaced by an approved minor change).
4. Navigation remains unchanged and does not list `/consultancy`.
5. No TypeScript errors are introduced by the implementation.

## Confirmed Product Decisions

- Keep the same hero section as the home page.
- Add an About Us section focused on personal story, history, and upbringing.
- Keep the Contact section layout unchanged, but hide the Employment Type field on `/consultancy`.
- Add metadata required for production (title and description).
- Keep the rest of the page mostly the same as home page.

## Validation Plan (once implemented)

1. Run app and open `/` and `/consultancy`.
2. Compare structure and styling parity manually.
3. Confirm nav links do not include `/consultancy`.
4. Run type checks/lint as available.

## Definition of Done for This Spec Phase

- This document is approved.
- Minor changes are finalized in concrete, testable terms.
- Implementation can begin in Step 2 with no ambiguity.
