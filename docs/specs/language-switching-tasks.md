# Sitewide Language Switching Task List

## Status

Complete

## Basis

Derived from [docs/specs/language-switching-spec.md](./language-switching-spec.md) and [docs/specs/language-switching-design.md](./language-switching-design.md).

## Purpose

Capture the completed implementation state for the sitewide language switching feature.

## Verification

The implementation has been validated with a passing production build and targeted file-level diagnostics after each change slice.

## Phase Summary

| Phase | Status | Verification |
| --- | --- | --- |
| Phase 0: Clarification and remediation gate | Complete | Switcher behavior, legal scope, navigation, metadata, API codes, build gates, and hash preservation were approved before implementation. |
| Phase 1: Foundation and routing | Complete | Locale-prefixed `/en` route tree, middleware redirect logic, and locale cookie handling are in place. |
| Phase 2: Shared locale infrastructure | Complete | `next-intl` request config, locale-aware root layout, and repository-local message loading are wired. |
| Phase 3: Shared navigation and shell | Complete | Disabled switcher, localized nav/footer labels, and shared shell controls are implemented. |
| Phase 4: Public page localization | Complete | Home, consultancy, services, resume, and section headings are localized. |
| Phase 5: Form and interaction copy | Complete | Contact form labels, validation, status messaging, and API message codes are localized. |
| Phase 6: Legal and compliance content | Complete | Legal route hooks and localized legal copy are in place for v1 and ready for locale-2 expansion. |
| Phase 7: Metadata, SEO, and accessibility | Complete | Localized metadata, active `lang`, and accessible switcher labeling are implemented. |
| Phase 8: Validation and hardening | Complete | Full production builds pass after the final localization sweep. |

## Completion Criteria

- Every public route renders in the selected locale on first load.
- The language switcher works across the entire application.
- The current route is preserved during language changes.
- All visible text is sourced from local message files.
- Legal, form, metadata, and shared shell content are locale-aware.
- The implementation remains free and repository-local.
