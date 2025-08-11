# Next Issue Preparation
**Date:** 2025-08-11
**Current Phase:** 2.3 Completed (GitHub Integration)

## 1. Verified Current Baseline
- Phase 2.3 (GitHub API Integration) marked complete in README
- Formatting + lint pipeline locally clean
- Logging compliance system in place
- Core animated sections + GitHub showcase operational

## 2. Candidate Next Issue Themes
| Theme | Purpose | Potential Deliverables | Impact |
|-------|---------|------------------------|--------|
| Performance Optimization (2.4) | Solidify 70:30 principle | Code splitting, route-based chunking, image lazy load, bundle analyzer actions | Higher Lighthouse scores & faster TTI |
| Contact System | Enable external communication | Contact form, validation, API handler (mock or service), spam protection | Improves conversion & professionalism |
| Blog System Foundation | Content engine | Post schema, Markdown/MDX loader, listing + detail view | Enables storytelling & SEO |
| Resume + Download Module | Employer-facing asset | Styled resume component, print/export to PDF, update workflow | Direct hiring utility |
| Accessibility & Testing Pass | Quality reinforcement | Axe automated checks, keyboard nav audit, test matrix | WCAG AA credibility |

## 3. Proposed Selection Criteria
Rank by: (1) Recruiter Impact, (2) Technical Depth, (3) Time-to-Value, (4) Portfolio Differentiation.

| Theme | Score (1-5 each) | Total |
|-------|------------------|-------|
| Performance Optimization | 4 + 4 + 3 + 3 | 14 |
| Contact System | 5 + 3 + 4 + 4 | 16 |
| Blog System Foundation | 4 + 4 + 2 + 4 | 14 |
| Resume Module | 5 + 2 + 4 + 3 | 14 |
| Accessibility & Testing | 4 + 3 + 3 + 5 | 15 |

Highest score: Contact System (16) → Recommended next unless strategic shift.

## 4. Draft Scope: Contact System (If Chosen)
- UI: ContactSection enhancement (form fields: name, email, message, purpose)
- Validation: Client schema (Zod or custom) + visual feedback
- Anti-Spam: Honeypot hidden field + basic rate throttle placeholder
- Delivery Options:
  - Phase 1: Mock service + console log
  - Phase 2: Pluggable adapter (EmailJS / SendGrid / serverless endpoint)
- States: idle → typing → submitting → success / failure
- Animations: Subtle input focus glow, success pulse, error shake
- Accessibility: Labels, aria-live region for status

## 5. Technical Tasks (Preliminary)
1. Define form schema (types + validation)
2. Build ContactForm component (controlled inputs)
3. Add service adapter layer (src/services/contactService.ts)
4. Add hook: useContactForm (handles validation + submission)
5. Implement UI + animations
6. Add tests: validation logic, hook behavior
7. Log instrumentation (success/failure counts placeholder)
8. Update README feature table

## 6. Risks & Mitigations
| Risk | Mitigation |
|------|-----------|
| No backend yet | Use mock adapter + easy swap interface |
| Spam submissions | Add honeypot + delay + future captcha slot |
| Validation complexity | Start minimal (required + email format) |
| Animation performance | Keep within existing performance budget |

## 7. Acceptance Criteria
- Form renders and accepts input
- Validation errors display inline per field
- Submit triggers mock API; success resets form
- Error path visibly handled
- All interactions keyboard accessible
- Logged: submission attempts + outcomes

## 8. Required Updates if Implemented
- README (features + quick start mention)
- project.log (MILESTONE + IMPLEMENTATION entries)
- CHANGELOG.md (Added Contact System foundation)

---
Pending your confirmation to proceed or adjust focus. Modify any scoring or choose an alternate theme.
