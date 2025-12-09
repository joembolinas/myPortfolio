---
agent: "agent"
name: "create-github-pull-request-from-specification"
description: "Create or update a GitHub pull request from a specification template, auto-filling branch, issue, and change-type details."
---
## Purpose

- Generate a single, well-structured pull request from a specification.
- Auto-fill template details (branch info, related issues, change types) from repo state.
- Enforce verification that no existing PR for the branch is already open.

## Inputs

- Specification template: `.github/pull_request #{}.md` (fill `{}` with PR number).
- Current branch context and commit history (conventional commits expected).
- Target branch (default to `main` unless the spec says otherwise).

## Process

1. Gather commits on the current branch (e.g., `git log --since=midnight --pretty=format:"%h %an %ad %s" --date=short`; if empty, fall back to full branch history). Capture type/scope and issue references.
2. Load the spec template via search from `${workspaceFolder}/.github/pull_request #{}.md` to extract required sections and placeholders.
3. Check for an existing PR for the current branch using `get_pull_request`. If one exists, skip creation and go to step 5.
4. If none exists, create a draft PR on `${current:Branch}` with `create_pull_request`, using a clear title that references the specification and branch; set the target branch per spec (default `main`).
5. Retrieve the PR diff with `get_pull_request_diff` and summarize the notable changes (features, fixes, docs, tests, performance, a11y).
6. Update the PR title and body with `update_pull_request`, merging template data and detected context:
   - **What does this PR do?** Summarize commit themes and diff highlights.
   - **Related Issues / Closes / Fixes / Relates:** Auto-detect issue numbers from commit messages and branch name; fill the appropriate keywords.
   - **Branch Information:**
     - Source: current branch name.
     - Target: template default or repository default branch.
     - Branch Type: infer from branch prefix (`feature/`, `refactor/`, `docs/`, `hotfix/`, `release/`, `epic/`, `experiment/`, `ci/`, `chore/`).
   - **Type of Change:** Map from commit types and diff:
     - `feat` → New feature
     - `fix` → Bug fix
     - `refactor` → Refactor
     - `perf` → Performance
     - `docs` → Documentation
     - `test` → Tests
     - `build`/`ci` → Build/CI
     - UI-related scopes → UI/UX; `a11y` scopes → Accessibility; security-related scopes → Security; mark Breaking change if commits contain `!` or `BREAKING CHANGE`.
7. Switch the PR from draft to ready for review via `update_pull_request` once the body and title are complete.
8. Get the creator username with `get_me` and assign the PR using `update_issue` (or equivalent assignment tool) to ensure ownership.
9. Return the PR URL to the user.

## Guardrails

- Create only one PR per specification; never duplicate an existing PR for the branch.
- Always verify for an existing PR before creation.
- Keep the PR title explicit about the specification and branch.
- Populate all relevant template fields; leave none blank if data is available.

## Template

`myPortfolio\.github\pull_request #{}.md`

```
---

---


## Pull Request Overview

branch `refactor/content`
commit count:
covered:

### What does this PR do?

<!-- Brief description of the changes made -->

### Related Issues

<!-- Link related issues using keywords -->

Closes #`<!-- auto-detect/issue number -->`
Fixes #`<!--  auto-detect/issue number -->`
Relates to #`<!--  auto-detect/issue number -->`

### Branch Information

**Source Branch:** `<!-- your branch name -->`
**Target Branch:** `<!-- develop or main -->`
**Branch Type:** `<!-- feature / refactor / docs / hotfix / release / epic / experiment / ci / chore -->`

---

## Type of Change

<!-- Check all that apply -->

- [ ] **Bug fix** - Non-breaking change fixing an issue
- [ ] **New feature** - Non-breaking change adding functionality
- [ ] **Breaking change** - Fix/feature causing existing functionality to break
- [ ] **Documentation** - Documentation only changes
- [ ] **Performance** - Performance improvements
- [ ] **Refactor** - Code restructuring (no functional changes)
- [ ] **Tests** - Adding or updating tests
- [ ] **Build/CI** - Build process or CI/CD improvements
- [ ] **UI/UX** - Visual design or user experience changes
- [ ] **Accessibility** - Accessibility improvements
- [ ] **Security** - Security enhancements or fixes

---

## Testing

### Test Execution

- [ ] I have tested this change locally
- [ ] All existing tests pass (`npm run test`)
- [ ] I have added tests for my changes
- [ ] Manual testing completed
- [ ] Edge cases tested

### Test Coverage

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated (if applicable)
- [ ] Test coverage maintained or improved

**Test Commands:**

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Cross-Browser & Device Testing

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Responsive Breakpoints

- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px - 1439px)
- [ ] Large Desktop (1440px+)

---

## Accessibility Compliance (WCAG AA)

### Core Requirements

- [ ] WCAG AA compliance maintained
- [ ] Semantic HTML used
- [ ] ARIA labels provided where needed
- [ ] Focus indicators visible and clear
- [ ] Color contrast ratios meet WCAG AA

### Assistive Technology Testing

- [ ] Screen reader tested
- [ ] Keyboard navigation working
- [ ] Focus trap tested
- [ ] Skip links functional

### Accessibility Tools

- [ ] axe DevTools scan passed
- [ ] Lighthouse accessibility score >= 90
- [ ] WAVE accessibility checker passed

---

## Performance Impact

### Performance Metrics

- [ ] No performance regression introduced
- [ ] Lighthouse Performance score >= 90
- [ ] Bundle size impact assessed
- [ ] Loading performance tested
- [ ] Code splitting implemented (if applicable)
- [ ] Lazy loading used where appropriate

### Lighthouse Scores (Target: 90+)

```
Performance:    [ ] / 100
Accessibility:  [ ] / 100
Best Practices: [ ] / 100
SEO:            [ ] / 100
```

### Bundle Size Analysis

```
Before: [ ] KB
After:  [ ] KB
Diff:   [ ] KB
```

---

## Security Considerations

- [ ] No sensitive data exposed in code
- [ ] Input validation implemented
- [ ] XSS protection verified
- [ ] CSRF protection maintained
- [ ] Dependencies scanned for vulnerabilities
- [ ] Environment variables properly used
- [ ] API keys/secrets not committed

---

## Code Quality

### Code Standards

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code commented (complex logic explained)
- [ ] TypeScript strict mode compliance
- [ ] No `any` types used (unless justified)
- [ ] PropTypes/interfaces defined for components
- [ ] Error handling implemented

### Linting & Formatting

- [ ] ESLint passes with no errors
- [ ] Prettier formatting applied
- [ ] TypeScript compilation successful
- [ ] No console errors in browser

### Code Architecture

- [ ] Follows Atomic Design principles (if UI component)
- [ ] Uses path aliases
- [ ] Virtual modules used for content (if applicable)
- [ ] Proper separation of concerns
- [ ] DRY principle followed

---

## Documentation

### Documentation Updates

- [ ] README updated (if user-facing changes)
- [ ] Code comments added where necessary
- [ ] JSDoc comments for exported functions
- [ ] API documentation updated (if applicable)
- [ ] CHANGELOG updated
- [ ] ADR created (if architectural decision made)

### Related Documentation

- [ ] Technology Stack Blueprint updated
- [ ] Folder Structure Blueprint updated
- [ ] Code Exemplars updated (if new pattern)
- [ ] Copilot Instructions updated (if new convention)

---

## Architecture & Design

### Architectural Decisions

- [ ] Follows existing ADRs
- [ ] New ADR created (if needed)
- [ ] Design pattern documented

**Related ADRs:**

- [ ] ADR-001: Build-Time vs Runtime Parsing
- [ ] ADR-002: Virtual Modules vs Import Aliases
- [ ] ADR-003: Single vs Multiple Plugins
- [ ] ADR-004: Markdown vs CMS
- [ ] ADR-005: TypeScript Strict Mode
- [ ] ADR-XXX: `<!-- New ADR if created -->`

### Component Structure (if applicable)

```
Type: [ ] Atom / [ ] Molecule / [ ] Organism / [ ] Section
Location: src/components/<!-- path -->
Exports: Named / Default
```

---

## Visual Changes (if applicable)

### Screenshots/Videos

**Before:**

<!-- Add screenshot or video of before state -->

**After:**

<!-- Add screenshot or video of after state -->

### UI/UX Changes

- [ ] Design mockups provided
- [ ] User flow documented
- [ ] Animation/transition details specified

---

## Breaking Changes & Migration

### Breaking Changes

- [ ] No breaking changes
- [ ] Contains breaking changes (see migration guide below)

### Migration Guide

<!-- If breaking changes, provide step-by-step migration instructions -->

---

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing in CI/CD
- [ ] Preview deployment reviewed
- [ ] Database migrations tested (if applicable)
- [ ] Environment variables documented
- [ ] Feature flags configured (if applicable)

### Post-Deployment

- [ ] Production deployment successful
- [ ] Smoke tests passed
- [ ] Monitoring alerts configured
- [ ] Rollback plan documented

---

## Reviewer Checklist

**For Reviewers:**

- [ ] Code follows project conventions
- [ ] Logic is clear and maintainable
- [ ] Tests are comprehensive and pass
- [ ] Documentation is complete and accurate
- [ ] Performance impact is acceptable
- [ ] Security considerations addressed
- [ ] Accessibility requirements met
- [ ] No obvious bugs or edge cases missed

**Review Type:**

- [ ] Code review
- [ ] Design review
- [ ] Accessibility review
- [ ] Performance review
- [ ] Security review

---

## Additional Context

### Related Work

<!-- Link to related PRs, issues, or discussions -->

### Implementation Notes

<!-- Any technical details reviewers should know -->

### Known Limitations

<!-- Any known issues or future improvements needed -->

### Dependencies

<!-- External dependencies or blockers -->

---

## Pre-Merge Checklist

**Before requesting review:**

- [ ] All checkboxes above completed
- [ ] Self-review done thoroughly
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] CI/CD pipeline passing
- [ ] Branch up to date with target branch

**Before merging:**

- [ ] All reviewer comments addressed
- [ ] Required approvals obtained
- [ ] CI/CD checks passed
- [ ] No merge conflicts
- [ ] Squash commits (if needed)
- [ ] Delete branch after merge

---

## Success Criteria

<!-- Define what "done" looks like for this PR -->

- [ ] Feature works as expected
- [ ] No regressions introduced
- [ ] Performance metrics maintained
- [ ] Accessibility standards met
- [ ] Documentation complete
- [ ] Team approval received

---

**By submitting this pull request, I confirm that:**

- [ ] I have read and followed the Contributing Guidelines
- [ ] I have tested my changes thoroughly
- [ ] I understand this code will be publicly available
- [ ] I agree to the project's license terms
- [ ] I have followed the Git Flow Branch Strategy

---

**Conventional Commit Summary:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

<!-- 
Example:
feat(hero): add animated gradient background

Implemented Framer Motion gradient animation with performance optimizations.
Uses GPU-accelerated transforms for 60fps on low-end devices.

Closes #42
-->

```

```

v1.1.0 | New | Last Updated: Dec 09 2025 - 12:00
