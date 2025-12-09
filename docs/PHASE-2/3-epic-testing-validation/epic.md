---
epic_id: EPIC-003
title: Testing & Validation Infrastructure for Content Pipeline
version: 1.0
created: 2025-12-09
status: draft
priority: medium
estimated_effort: medium
dependencies: [EPIC-001, EPIC-002]
---

## 1. Goal

### Problem

The Markdown-Driven Content Pipeline System (EPIC-001) and Content Section Migration (EPIC-002) introduce complex build-time processing logic that requires comprehensive testing to ensure reliability. Without proper test coverage, several risks emerge:

- Content parsing errors may go undetected until production deployment
- Schema validation logic may fail silently, allowing invalid data into the UI
- Vite plugin lifecycle (resolveId, load, handleHotUpdate) may break without automated verification
- React component integration with virtual modules lacks validation
- Performance regressions (build time, HMR latency, bundle size) may accumulate unnoticed
- Accessibility and performance targets (Lighthouse 90+, WCAG AA) need continuous validation
- Manual testing alone cannot cover edge cases (malformed YAML, missing fields, large file sets)

### Solution

Establish comprehensive testing and validation infrastructure covering unit, integration, end-to-end, and performance testing layers. This epic focuses on:

- **Unit Testing:** Parser functions, utility functions, schema validation logic (Vitest)
- **Integration Testing:** Vite plugin lifecycle, virtual module generation, HMR functionality
- **End-to-End Testing:** Full user workflows, content rendering, accessibility compliance (Playwright)
- **Performance Testing:** Build times, HMR latency, bundle size, Lighthouse scores (Lighthouse CI)
- **Test Data Management:** Fixture files, mock content, edge case scenarios
- **CI/CD Integration:** Automated test execution, coverage enforcement, performance monitoring
- **Validation Tools:** TypeScript type checking, markdown linting, schema validation

This infrastructure will provide confidence in system reliability, catch regressions early, and enable safe refactoring.

### Impact

**Primary Outcomes:**

- **Quality Assurance**: Comprehensive test coverage (≥80%) ensures system reliability
- **Regression Prevention**: Automated tests catch breaking changes before deployment
- **Developer Confidence**: Safe refactoring and feature additions with test safety net
- **Performance Monitoring**: Continuous validation of Lighthouse 90+ and build-time targets
- **Accessibility Compliance**: Automated WCAG AA verification across all sections
- **Documentation**: Test cases serve as living documentation of expected behavior

**Measurable Metrics:**

- Unit test coverage: ≥80% overall, 100% for parsing/validation branches
- Integration test coverage: 100% plugin lifecycle hooks
- E2E test coverage: 100% critical user workflows (7 content sections)
- Performance benchmarks: Build time <2s, HMR <100ms, Lighthouse ≥90
- CI/CD pipeline: 100% test pass rate on all PRs/commits
- Zero production incidents related to content parsing or rendering

## 2. User Personas

### Primary Persona: Developer (You)

**Role:** Full-stack developer maintaining portfolio with content pipeline

**Goals:**

- Ensure content pipeline works correctly across all edge cases
- Prevent regressions when adding new features or refactoring
- Validate performance targets are met continuously
- Maintain accessibility compliance automatically
- Gain confidence in making code changes

**Pain Points:**

- Manual testing is time-consuming and error-prone
- Difficult to test all edge cases (malformed content, large file sets)
- Performance regressions may go unnoticed without automated checks
- Accessibility issues require specialized knowledge to detect

**Testing Proficiency:** Intermediate (familiar with Vitest, Playwright, basic testing concepts)

### Secondary Persona: AI Coding Agent

**Role:** Automated assistant helping with code changes and refactoring

**Goals:**

- Run tests to verify changes don't break existing functionality
- Interpret test failures to understand root causes
- Suggest fixes based on test output
- Generate new tests for added features

**Pain Points:**

- Need clear test output to understand failures
- Require well-structured test organization for navigation
- Benefit from comprehensive fixture data for testing

**Testing Proficiency:** Advanced (can parse test output, generate tests)

## 3. High-Level User Journeys

### Journey 1: Develop New Feature with TDD

1. Developer plans new feature (e.g., add "featured" flag to projects)
2. Developer writes failing unit test for parser function update
3. Developer implements parser logic to make test pass
4. Developer writes integration test for virtual module export
5. Developer updates E2E test to verify UI displays featured badge
6. All tests pass; developer commits changes
7. CI/CD runs full test suite and validates
8. **Success Criteria:** All tests green, coverage ≥80%, feature works in production

### Journey 2: Detect and Fix Regression

1. Developer refactors markdown parser utility
2. Developer runs `npm run test`
3. Unit test fails: "extractBullets should handle mixed list markers"
4. Test output shows expected vs actual: `['item1', 'item2']` vs `['item1']`
5. Developer reviews test fixture and identifies bug (asterisk markers not parsed)
6. Developer fixes regex pattern to handle both `-` and `*`
7. Test passes; developer verifies no other failures
8. **Success Criteria:** Regression caught before commit, fix verified by tests

### Journey 3: Validate Content Changes

1. Developer updates `content/3-projects/project-portfolio.md`
2. Developer runs `npm run dev` with HMR
3. Integration test watches for file changes
4. Test verifies virtual module invalidation occurs
5. E2E test validates project card renders correctly
6. Performance test confirms HMR <100ms
7. **Success Criteria:** Content change validated across all layers, performance targets met

### Journey 4: CI/CD Pipeline Execution

1. Developer pushes commit to GitHub
2. GitHub Actions workflow triggers
3. CI installs dependencies and builds project
4. CI runs unit tests (Vitest) → 145/145 passed, 87% coverage
5. CI runs integration tests → 23/23 passed
6. CI runs E2E tests (Playwright) → 18/18 passed
7. CI runs Lighthouse → Performance 94, Accessibility 96
8. CI validates TypeScript → 0 errors
9. All checks pass; PR approved for merge
10. **Success Criteria:** Full test suite passes, coverage threshold met, performance targets validated

### Journey 5: Performance Regression Detection

1. Developer adds feature that increases build complexity
2. CI runs performance benchmarks
3. Build time test fails: Expected <2s, got 2.8s
4. CI posts comment on PR: "⚠️ Performance regression detected: Build time +40%"
5. Developer reviews change, identifies inefficient file reading loop
6. Developer optimizes loop, build time drops to 1.6s
7. CI re-runs, all performance tests pass
8. **Success Criteria:** Performance regression caught automatically, fixed before merge

## 4. Business Requirements

### Functional Requirements

**Unit Testing Infrastructure:**

- **FR-001:** System SHALL use Vitest as unit testing framework
- **FR-002:** System SHALL test all parser functions (`parseHome`, `parseAbout`, `parseSkills`, etc.)
- **FR-003:** System SHALL test utility functions (`splitSections`, `extractBullets`, `ensureStringArray`, `slugFromPath`)
- **FR-004:** System SHALL test icon/color generator (`getIconAndColor`)
- **FR-005:** System SHALL use mock `MarkdownFile` objects for parser tests
- **FR-006:** System SHALL test required field validation
- **FR-007:** System SHALL test default value assignment for optional fields
- **FR-008:** System SHALL test enum validation and fallback behavior
- **FR-009:** System SHALL achieve ≥80% code coverage overall
- **FR-010:** System SHALL achieve 100% branch coverage for parsing and validation logic

**Integration Testing:**

- **FR-011:** System SHALL test Vite plugin lifecycle (`resolveId`, `load`, `handleHotUpdate`)
- **FR-012:** System SHALL test virtual module resolution (ID mapping)
- **FR-013:** System SHALL test virtual module content generation (serialized JSON)
- **FR-014:** System SHALL test HMR module invalidation on file changes
- **FR-015:** System SHALL test multi-file parsing for array-based sections
- **FR-016:** System SHALL test TypeScript type compatibility with virtual module exports
- **FR-017:** System SHALL verify generated modules match interface definitions

**End-to-End Testing:**

- **FR-018:** System SHALL use Playwright as E2E testing framework
- **FR-019:** System SHALL test all 7 content sections render correctly (Home, About, Skills, Projects, Blogs, Contact, Learning Journey)
- **FR-020:** System SHALL test navigation between sections
- **FR-021:** System SHALL test project cards display correct data (title, description, technologies)
- **FR-022:** System SHALL test external links open in new tabs with `rel="noopener noreferrer"`
- **FR-023:** System SHALL test responsive layout across viewport sizes
- **FR-024:** System SHALL test keyboard navigation
- **FR-025:** System SHALL run automated accessibility tests (axe-core integration)

**Performance Testing:**

- **FR-026:** System SHALL use Lighthouse CI for performance monitoring
- **FR-027:** System SHALL enforce Lighthouse Performance score ≥90
- **FR-028:** System SHALL enforce Lighthouse Accessibility score ≥90
- **FR-029:** System SHALL enforce Lighthouse Best Practices score ≥90
- **FR-030:** System SHALL enforce Lighthouse SEO score ≥90
- **FR-031:** System SHALL benchmark plugin execution time (target: <500ms per module)
- **FR-032:** System SHALL benchmark total build processing time (target: <2s for 100 files)
- **FR-033:** System SHALL benchmark HMR latency (target: <100ms)
- **FR-034:** System SHALL verify client bundle excludes build-time dependencies

**Test Data Management:**

- **FR-035:** System SHALL store sample markdown files in `src/__tests__/fixtures/`
- **FR-036:** System SHALL provide valid example files for each content section
- **FR-037:** System SHALL provide edge case files (malformed YAML, missing fields, large files)
- **FR-038:** System SHALL use consistent test data across unit and integration tests
- **FR-039:** System SHALL clean up generated files after test runs

**Edge Case Testing:**

- **FR-040:** System SHALL test missing required fields (expect null return, logged warning)
- **FR-041:** System SHALL test invalid YAML frontmatter (expect error logged, file skipped)
- **FR-042:** System SHALL test empty markdown sections (expect empty arrays/strings)
- **FR-043:** System SHALL test mixed bullet list markers (`-` and `*`)
- **FR-044:** System SHALL test special characters in content (<, >, &, ", ')
- **FR-045:** System SHALL test large files (100+ bullet points)
- **FR-046:** System SHALL test contact section URL synthesis (mailto:, tel:)
- **FR-047:** System SHALL test blog draft filtering in production
- **FR-048:** System SHALL test spec file exclusion (`*spec.md`, `*Spec.md`)

**CI/CD Integration:**

- **FR-049:** System SHALL run tests on every push and pull request
- **FR-050:** System SHALL enforce 80% code coverage threshold (fail CI if below)
- **FR-051:** System SHALL run build test to ensure virtual modules work in production
- **FR-052:** System SHALL run TypeScript type-check in CI pipeline
- **FR-053:** System SHALL run Lighthouse on Vercel preview deployments
- **FR-054:** System SHALL post performance results as PR comments
- **FR-055:** System SHALL block merges if tests fail or coverage drops

**Validation Tools:**

- **FR-056:** System SHALL run TypeScript compiler (`tsc --noEmit`) to validate types
- **FR-057:** System SHALL run markdown linter on content files (optional)
- **FR-058:** System SHALL validate frontmatter schemas against specification
- **FR-059:** System SHALL provide clear error messages with filename and line number

### Non-Functional Requirements

**Test Reliability:**

- **NFR-001:** Tests SHALL be deterministic (no flaky tests)
- **NFR-002:** Tests SHALL run in isolation (no shared state between tests)
- **NFR-003:** Tests SHALL clean up after themselves (no temp files left)
- **NFR-004:** E2E tests SHALL use isolated browser contexts

**Test Performance:**

- **NFR-005:** Unit test suite SHALL complete in <10 seconds
- **NFR-006:** Integration test suite SHALL complete in <30 seconds
- **NFR-007:** E2E test suite SHALL complete in <60 seconds
- **NFR-008:** Full CI/CD pipeline SHALL complete in <5 minutes

**Test Maintainability:**

- **NFR-009:** Tests SHALL follow consistent naming convention (`describe('component/function', () => it('should behavior', ...))`)
- **NFR-010:** Test files SHALL colocate with source files (`*.test.ts` alongside `*.ts`)
- **NFR-011:** Test fixtures SHALL be organized by section (`fixtures/home/`, `fixtures/projects/`)
- **NFR-012:** Tests SHALL include descriptive failure messages

**Coverage Requirements:**

- **NFR-013:** Minimum 80% overall code coverage
- **NFR-014:** 100% coverage for critical paths (parsing, validation)
- **NFR-015:** Branch coverage for all error handling paths
- **NFR-016:** Coverage reports SHALL be generated and tracked in CI

**Developer Experience:**

- **NFR-017:** Test commands SHALL be simple (`npm run test`, `npm run test:e2e`)
- **NFR-018:** Tests SHALL support watch mode for rapid iteration
- **NFR-019:** Test output SHALL be readable and actionable
- **NFR-020:** Failed tests SHALL provide clear debugging information

## 5. Success Metrics

### Key Performance Indicators (KPIs)

**Test Coverage:**

- **KPI-001:** Unit test coverage: ≥80% (measured via Vitest coverage report)
- **KPI-002:** Integration test coverage: 100% plugin hooks (resolveId, load, handleHotUpdate)
- **KPI-003:** E2E test coverage: 7/7 content sections (100%)
- **KPI-004:** Edge case coverage: 9/9 scenarios tested

**Test Reliability:**

- **KPI-005:** Test flakiness rate: 0% (all tests deterministic)
- **KPI-006:** CI/CD pass rate: 100% (no false failures)
- **KPI-007:** Production incidents related to content pipeline: 0

**Performance Validation:**

- **KPI-008:** Lighthouse Performance: ≥90 (enforced in CI)
- **KPI-009:** Lighthouse Accessibility: ≥90 (enforced in CI)
- **KPI-010:** Build time: <2s (measured via CI benchmarks)
- **KPI-011:** HMR latency: <100ms (measured in dev tools)

**CI/CD Integration:**

- **KPI-012:** CI pipeline execution time: <5 minutes
- **KPI-013:** Coverage threshold enforcement: 100% (CI fails if <80%)
- **KPI-014:** Type safety enforcement: 0 TypeScript errors allowed

**Developer Productivity:**

- **KPI-015:** Test execution time: Unit <10s, Integration <30s, E2E <60s
- **KPI-016:** Test maintenance overhead: <10% of development time

### Measurement Methods

- **Automated:** Vitest coverage reports, Playwright test results, Lighthouse CI scores, GitHub Actions logs
- **Manual:** Test flakiness tracking, production incident logs
- **Continuous:** CI/CD dashboard, coverage trend reports

## 6. Out of Scope

**Explicitly NOT included in this epic:**

- **Visual Regression Testing:** Screenshot-based diff testing (not needed for this project)
- **Load Testing:** Stress testing under high traffic (static site, not applicable)
- **Security Testing:** Penetration testing, vulnerability scanning (separate concern)
- **Browser Compatibility Testing:** Only latest Chrome/Firefox/Safari (no IE11 support)
- **Mobile Device Testing:** Responsive design tested, but not on physical devices
- **Mutation Testing:** Code mutation analysis (overkill for this project size)
- **Contract Testing:** API contract testing (no external APIs beyond optional GitHub)
- **Snapshot Testing:** Component snapshot tests (high maintenance, low value)
- **Code Quality Tools:** ESLint, Prettier (assumed already configured)
- **Documentation Testing:** Doc examples verification (manual review sufficient)
- **Dependency Audits:** npm audit, security scanning (separate process)

## 7. Business Value

### Value Rating: **MEDIUM-HIGH**

### Justification

**Risk Mitigation:**

- Prevents production incidents caused by content parsing errors
- Catches performance regressions before they impact user experience
- Ensures accessibility compliance is maintained automatically
- Provides safety net for refactoring and feature additions

**Quality Assurance:**

- Establishes quality baseline with 80% test coverage
- Validates content pipeline works across all edge cases
- Ensures TypeScript type safety is maintained end-to-end
- Continuous performance monitoring prevents degradation

**Developer Productivity:**

- Reduces debugging time by catching errors early in development
- Enables confident refactoring with automated regression detection
- Provides living documentation through test cases
- Speeds up development with rapid feedback loops (watch mode)

**Long-term Maintainability:**

- Test suite scales with codebase growth
- Future contributors can safely make changes
- Reduces technical debt accumulation
- Enables incremental improvements with confidence

**Opportunity Cost:**

- Without tests, manual QA would require 2-4 hours per release
- Production bugs would require emergency fixes and rollbacks
- Performance regressions would accumulate unnoticed
- Accessibility issues might go undetected until user reports

### Dependency Chain

This epic **depends on:**

- Epic-001: Core Plugin Infrastructure (requires implementation to test)
- Epic-002: Content Section Migration (requires content to test against)

This epic **does not block** any future epics but provides foundation for safe evolution.

### Return on Investment (ROI)

**Time Investment:** ~20-25 hours (test setup, writing tests, CI/CD configuration)

**Time Savings:**

- Eliminates 2-4 hours of manual QA per release
- Prevents 5-10 hours of debugging time per production incident (estimated 2-3 incidents avoided per year)
- Reduces refactoring time by 30% (confidence from test coverage)

**Annual ROI:** ~40-50 hours saved (assumes 10 releases/year + prevented incidents)

**Risk Reduction Value:**

- Production incidents avoided: High (unmeasurable user trust impact)
- Performance regression prevention: Maintains Lighthouse 90+ continuously
- Accessibility compliance: Avoids potential legal/reputation risks

**Strategic Value:**

- Demonstrates professional development practices
- Positions project for open-source release or template extraction
- Enables AI-assisted development with test validation

---

**Version:** 1.0 | **Status:** Draft | **Last Updated:** Dec 09 2025 - 11:00
