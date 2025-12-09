---
epic_id: EPIC-001
title: Core Plugin Infrastructure for Markdown Content Pipeline
version: 1.0
created: 2025-12-09
status: draft
priority: high
estimated_effort: large
---

## 1. Goal

### Problem

The Growth Journey Portfolio currently relies on placeholder TypeScript data files (`src/data/*.ts`) that contain hardcoded example content unrelated to the actual portfolio owner. This approach creates several challenges:

- Content updates require code changes and TypeScript knowledge, creating friction for content authorship
- Example data is not representative of the actual portfolio, requiring manual replacement
- No separation between content and presentation logic, making content management cumbersome
- AI agents assisting with content updates must navigate code files rather than content-focused formats
- Developer experience is degraded by mixing content editing with code development workflows

### Solution

Build a foundational Vite plugin infrastructure that transforms the content pipeline from code-based to file-based. This epic establishes the core mechanisms for:

- Reading Markdown files from a structured `content/` directory at build time
- Parsing YAML frontmatter and Markdown sections into typed data structures
- Generating virtual modules that expose parsed content as importable JavaScript constants
- Supporting Hot Module Replacement (HMR) for instant content preview during development
- Providing type-safe TypeScript interfaces for all content data

This infrastructure will serve as the foundation for subsequent content section migrations, enabling a clean separation between content authoring (Markdown files) and code implementation (React components).

### Impact

**Primary Outcomes:**

- **Developer Velocity**: Content updates become file edits rather than code changes, reducing cognitive load and enabling faster iteration
- **AI-Friendly Workflow**: AI agents can directly read/write Markdown files without navigating TypeScript/React code
- **Type Safety**: Maintain full TypeScript type safety while separating content from code
- **Performance**: Zero runtime overhead by processing content at build time (target: <2s for 100 files)
- **Developer Experience**: HMR enables <100ms content preview updates without manual refresh

**Measurable Metrics:**

- Build-time processing overhead: <2 seconds for 100 Markdown files
- HMR latency: <100ms for content file changes
- Bundle size impact: 0KB (no runtime Markdown parsers in client bundle)
- TypeScript compilation: Zero type errors when importing virtual modules

## 2. User Personas

### Primary Persona: Solo Developer/Content Author (You)

**Role:** Full-stack developer building and maintaining personal portfolio

**Goals:**

- Quickly update portfolio content (projects, skills, experience) without touching code
- Maintain professional code quality with TypeScript type safety
- Preview content changes instantly during development
- Achieve high performance and accessibility scores (Lighthouse 90+)

**Pain Points:**

- Current example data requires manual replacement and code knowledge
- Content editing mixed with code development creates context switching
- No visual preview of content changes without rebuilding

**Technical Proficiency:** High (comfortable with React, TypeScript, Vite, build systems)

### Secondary Persona: AI Coding Agent

**Role:** Automated assistant helping with content updates and maintenance

**Goals:**

- Read and parse portfolio content for analysis or updates
- Generate or modify content based on instructions
- Understand content structure without navigating complex code

**Pain Points:**

- TypeScript data files require code parsing vs simple file reading
- Difficult to distinguish content from implementation logic
- Schema validation requires code analysis

**Technical Proficiency:** Advanced (can parse code, but prefers structured data formats)

## 3. High-Level User Journeys

### Journey 1: Initial Setup - Developer Establishes Content Pipeline

1. Developer installs dependencies (`gray-matter` for YAML parsing)
2. Developer creates Vite plugin files (`contentDataPlugin.ts`, `journeyDataPlugin.ts`)
3. Developer configures virtual module TypeScript declarations in `src/types/virtual-modules.d.ts`
4. Developer registers plugins in `vite.config.ts`
5. Developer runs `npm run build` to verify plugins are registered and functional
6. Developer verifies TypeScript compilation passes without errors
7. **Success Criteria:** Build completes successfully, virtual modules resolve, TypeScript shows no errors

### Journey 2: Development - Content Update with HMR

1. Developer starts dev server (`npm run dev`)
2. Developer edits a Markdown file in `content/` directory (e.g., updates project description)
3. Developer saves the file
4. Vite plugin detects file change via `handleHotUpdate` hook
5. Plugin re-parses the file and invalidates virtual module cache
6. Browser receives HMR update and re-renders affected components
7. Developer sees updated content in browser within 100ms without manual refresh
8. **Success Criteria:** Content changes appear instantly, no console errors, TypeScript autocomplete works

### Journey 3: AI Agent - Content Analysis and Update

1. AI agent receives instruction to update portfolio content (e.g., "Add new project")
2. AI agent reads Markdown files from `content/3-projects/` directory
3. AI agent parses YAML frontmatter to understand required schema
4. AI agent creates new `project-*.md` file with valid frontmatter and sections
5. AI agent verifies file structure matches specification
6. Developer runs build or dev server to verify changes
7. **Success Criteria:** New content appears correctly, no parsing errors, schema validation passes

### Journey 4: Production Build - Content Compilation

1. Developer runs `npm run build` for production deployment
2. Vite executes plugin `load` hooks for all virtual modules
3. Plugin recursively reads all Markdown files from `content/` directory
4. Plugin parses each file, validates schema, logs warnings for issues
5. Plugin generates virtual modules with serialized JSON data
6. Vite bundles virtual modules into production JavaScript
7. Developer verifies `dist/` output contains no `.md` files and no parsing libraries
8. **Success Criteria:** Build completes <2s processing time, bundle excludes build-time dependencies, Lighthouse score ≥90

## 4. Business Requirements

### Functional Requirements

**Plugin Infrastructure:**

- **FR-001:** System SHALL implement Vite plugin with `resolveId`, `load`, and `handleHotUpdate` hooks
- **FR-002:** Plugin SHALL register virtual module IDs following convention `virtual:*-data` (e.g., `virtual:home-data`)
- **FR-003:** Plugin SHALL resolve virtual IDs to internal IDs with null-byte prefix (`\0virtual:*-data`)
- **FR-004:** Plugin SHALL support multiple content sections via modular parser architecture
- **FR-005:** Plugin SHALL log informative warnings (including filename and field) for validation failures without crashing builds

**File System Integration:**

- **FR-006:** System SHALL recursively read Markdown files from `content/` directory structure
- **FR-007:** System SHALL restrict file reading operations to `content/` directory subtree for security
- **FR-008:** System SHALL skip files matching pattern `*spec.md` or `*Spec.md` to avoid parsing documentation
- **FR-009:** System SHALL handle missing files gracefully with logged warnings

**Content Parsing:**

- **FR-010:** System SHALL parse YAML frontmatter using `gray-matter` library
- **FR-011:** System SHALL extract Markdown sections by `## Heading` delimiters
- **FR-012:** System SHALL convert bullet lists (`- item` or `* item`) to string arrays
- **FR-013:** System SHALL validate required fields and log warnings for missing/invalid data
- **FR-014:** System SHALL provide default values for optional fields (per data quality requirements)
- **FR-015:** System SHALL generate unique IDs from file paths (slugified)

**Virtual Module Generation:**

- **FR-016:** System SHALL serialize parsed data to JavaScript module exports
- **FR-017:** System SHALL generate type-safe exports matching TypeScript interfaces
- **FR-018:** System SHALL support both single-object exports (`home`, `about`, `contact`) and array exports (`skills`, `projects`, `blogs`, `learningJourney`)
- **FR-019:** System SHALL ensure virtual modules integrate with Vite dependency graph for caching

**Hot Module Replacement:**

- **FR-020:** System SHALL detect Markdown file changes via `handleHotUpdate` hook
- **FR-021:** System SHALL invalidate virtual module cache when source files change
- **FR-022:** System SHALL trigger browser HMR updates for affected modules
- **FR-023:** System SHALL complete HMR cycle within 100ms of file save

**Type Safety:**

- **FR-024:** System SHALL provide TypeScript declarations for all virtual modules in `src/types/virtual-modules.d.ts`
- **FR-025:** System SHALL ensure virtual module imports show no TypeScript errors in IDE
- **FR-026:** System SHALL maintain type safety across build and runtime boundaries

**Utility Functions:**

- **FR-027:** System SHALL implement `splitSections(markdown: string)` to parse Markdown by headings
- **FR-028:** System SHALL implement `extractBullets(block?: string)` to parse bullet lists
- **FR-029:** System SHALL implement `ensureStringArray(value: any)` to normalize array inputs
- **FR-030:** System SHALL implement `slugFromPath(filePath: string)` to generate URL-safe IDs

### Non-Functional Requirements

**Performance:**

- **NFR-001:** Plugin execution time SHALL NOT exceed 500ms per virtual module generation
- **NFR-002:** Total build-time processing overhead SHALL NOT exceed 2 seconds for 100 Markdown files
- **NFR-003:** HMR updates SHALL complete within 100ms in development mode
- **NFR-004:** System SHALL NOT bundle `gray-matter` or other build-time libraries in client bundle

**Security:**

- **NFR-005:** File reading operations SHALL be restricted to `content/` directory subtree
- **NFR-006:** System SHALL prevent path traversal attacks via input validation
- **NFR-007:** System SHALL sanitize file paths before file system operations

**Reliability:**

- **NFR-008:** Invalid YAML frontmatter SHALL trigger logged warnings but not crash the build
- **NFR-009:** Missing required fields SHALL trigger logged warnings but not crash the build
- **NFR-010:** Malformed Markdown SHALL be skipped with logged warnings
- **NFR-011:** Empty sections SHALL return empty arrays/strings, not null/undefined

**Maintainability:**

- **NFR-012:** Plugin code SHALL follow established architectural patterns (PAT-001 to PAT-005)
- **NFR-013:** Parser functions SHALL have signature `(file: MarkdownFile) => T | null`
- **NFR-014:** Utility functions SHALL be pure and testable
- **NFR-015:** Code SHALL include JSDoc comments explaining non-obvious logic

**Compatibility:**

- **NFR-016:** System SHALL maintain compatibility with Vite 5.x plugin API
- **NFR-017:** System SHALL support Node.js 18+ runtime
- **NFR-018:** System SHALL use ES Modules (ESM) syntax exclusively
- **NFR-019:** System SHALL integrate with Vercel deployment pipeline

**Developer Experience:**

- **NFR-020:** TypeScript autocomplete SHALL work for virtual module imports
- **NFR-021:** Error messages SHALL include filename, field name, and suggested fix
- **NFR-022:** Plugin registration SHALL be visible in build output logs
- **NFR-023:** HMR updates SHALL preserve browser state (scroll position, form inputs)

## 5. Success Metrics

### Key Performance Indicators (KPIs)

**Build Performance:**

- **KPI-001:** Plugin execution time: <500ms per virtual module (measured via Vite build logs)
- **KPI-002:** Total processing time: <2s for 100 Markdown files (measured via build profiling)
- **KPI-003:** HMR latency: <100ms from file save to browser update (measured via dev tools)

**Bundle Efficiency:**

- **KPI-004:** Client bundle size impact: 0KB (no runtime parsers in `dist/assets/*.js`)
- **KPI-005:** Virtual module overhead: <10KB per section (serialized JSON size)

**Type Safety:**

- **KPI-006:** TypeScript compilation errors: 0 (measured via `npm run type-check`)
- **KPI-007:** IDE type errors: 0 (verified manually in VSCode)

**Reliability:**

- **KPI-008:** Build success rate: 100% (no crashes from invalid content)
- **KPI-009:** Validation warnings: All logged with filename and field (manual verification)

**Developer Experience:**

- **KPI-010:** Content update workflow: <5 steps (edit file → save → preview)
- **KPI-011:** Plugin setup: <30 minutes (from scratch to first successful build)

### Measurement Methods

- **Automated:** Vite build logs, TypeScript compiler output, bundle analyzer
- **Manual:** Developer workflow timing, IDE type checking verification
- **Continuous:** CI/CD integration with build time tracking

## 6. Out of Scope

**Explicitly NOT included in this epic:**

- **Content Migration:** Actual migration of portfolio content to Markdown files (covered in Epic-002)
- **Testing Infrastructure:** Unit/integration/E2E tests for plugins (covered in Epic-003)
- **UI Components:** React component updates to consume virtual modules (covered in Epic-002)
- **Content Schemas:** Detailed section-specific schemas (covered in Epic-002)
- **Runtime CMS:** Any runtime content management system integration
- **Multi-language Support:** Internationalization or localization features
- **Content Versioning:** Git history is sufficient; no custom versioning system
- **User-Generated Content:** System only handles author-controlled content
- **External Data Sources:** No integration with external CMSs or APIs (except optional GitHub API)
- **Advanced Markdown Features:** No support for custom directives, plugins, or extended syntax beyond CommonMark

## 7. Business Value

### Value Rating: **HIGH**

### Justification

**Strategic Alignment:**

- Establishes foundational infrastructure for content-driven portfolio architecture
- Enables future AI-assisted content workflows, aligning with modern development practices
- Reduces technical debt by separating content from code, improving long-term maintainability

**Efficiency Gains:**

- Eliminates context switching between code editing and content authoring
- Reduces content update time from minutes (code changes, testing, commit) to seconds (file edit, save)
- Enables AI agents to assist with content management without code navigation

**Quality Improvements:**

- Maintains TypeScript type safety while improving developer experience
- Preserves performance targets (Lighthouse 90+) through build-time processing
- Reduces risk of runtime errors by moving content parsing to build phase

**Scalability:**

- Plugin architecture supports unlimited content sections without code changes
- Virtual module pattern scales to hundreds of content files without performance degradation
- Lays groundwork for potential future multi-author workflows

**Risk Mitigation:**

- Build-time processing eliminates runtime parsing failures
- Type-safe interfaces prevent schema mismatches
- HMR provides immediate feedback on content errors

### Dependency Chain

This epic is a **blocker** for:

- Epic-002: Content Section Migration (requires plugin infrastructure)
- Epic-003: Testing & Validation (requires plugin implementation to test)

### Return on Investment (ROI)

**Time Investment:** ~20-30 hours (plugin development, TypeScript setup, documentation)

**Time Savings:** ~5-10 minutes per content update × estimated 50+ updates = 4-8 hours saved in first year

**Long-term Benefits:**

- Improved developer experience (qualitative)
- AI-assisted workflows (future productivity multiplier)
- Reduced onboarding time for future contributors

---

**Version:** 1.0 | **Status:** Draft | **Last Updated:** Dec 09 2025 - 10:30
