---
epic_id: EPIC-002
title: Content Section Migration to Markdown Pipeline
version: 1.0
created: 2025-12-09
status: draft
priority: high
estimated_effort: large
dependencies: [EPIC-001]
---

## 1. Goal

### Problem

The portfolio currently uses placeholder TypeScript data files (`src/data/*.ts`) containing generic example content (projects, skills, blogs, etc.) that is not representative of the actual portfolio owner's experience. This creates several issues:

- Content authoring requires editing TypeScript files, mixing content with code
- Example data must be manually replaced with real portfolio content
- Seven different content sections need migration: Home, About, Skills, Projects, Blogs, Contact, and Learning Journey
- React components are tightly coupled to hardcoded data structures
- No clear separation between content layer and presentation layer
- Content updates trigger unnecessary code review processes

### Solution

Migrate all seven content sections from hardcoded TypeScript to Markdown files, leveraging the Core Plugin Infrastructure (EPIC-001). This epic focuses on:

- Creating Markdown content files for each section with proper frontmatter schemas
- Authoring real portfolio content to replace placeholder examples
- Updating React components to consume virtual module data instead of hardcoded arrays
- Implementing section-specific parser functions in Vite plugins
- Establishing content validation and quality standards
- Ensuring seamless integration between content and UI layers

Each section will follow a consistent pattern: define schema → create content → implement parser → update component → validate output.

### Impact

**Primary Outcomes:**

- **Content Separation**: Complete decoupling of content from code, enabling independent updates
- **Real Portfolio Data**: All sections populated with actual experience, projects, and skills
- **Maintainability**: Content updates become simple file edits without touching React components
- **AI Workflow**: AI agents can directly manage portfolio content via Markdown files
- **Type Safety**: Full TypeScript type checking maintained across content pipeline
- **Performance**: Lighthouse 90+ scores maintained through build-time processing

**Measurable Metrics:**

- 7 content sections successfully migrated (Home, About, Skills, Projects, Blogs, Contact, Learning Journey)
- 0 TypeScript errors after migration
- <100ms HMR latency for content updates
- Lighthouse Performance ≥90, Accessibility ≥90
- 100% content coverage (no placeholder data remaining)

## 2. User Personas

### Primary Persona: Portfolio Owner (Developer/Content Author)

**Role:** Career-transition developer building personal portfolio

**Goals:**

- Replace generic placeholder content with real professional experience
- Showcase actual projects, skills, and career journey
- Update portfolio content frequently as new skills/projects are completed
- Maintain professional presentation with high performance scores
- Enable AI assistants to help manage and update content

**Pain Points:**

- Current placeholder data requires complete replacement
- Editing TypeScript files for content updates is cumbersome
- Risk of breaking UI when updating data structures
- Difficult to preview content changes during editing

**Content Authoring Skills:** Basic Markdown knowledge, comfortable with YAML frontmatter

### Secondary Persona: AI Content Assistant

**Role:** Automated agent helping maintain and update portfolio content

**Goals:**

- Read current portfolio content for context
- Generate or update content sections based on instructions
- Validate content schema and structure
- Ensure consistency across content sections

**Pain Points:**

- TypeScript data files require code parsing
- Schema validation requires understanding TypeScript interfaces
- Difficult to identify which files contain content vs code

**Technical Proficiency:** Advanced (can parse structured data formats)

## 3. High-Level User Journeys

### Journey 1: Create Real Portfolio Content (Replace Placeholders)

1. Portfolio owner reviews existing placeholder content in `src/data/projects.ts`
2. Owner creates `content/3-projects/` directory structure
3. Owner creates `project-portfolio.md` with YAML frontmatter for first real project
4. Owner adds required fields: title, description, technologies, status
5. Owner adds Markdown sections: `## Highlights`, `## Notes`
6. Owner saves file and verifies HMR updates browser preview
7. Owner repeats for remaining projects (5-10 total)
8. **Success Criteria:** All project cards display real portfolio projects, no placeholder data visible

### Journey 2: Update Existing Content Section

1. Developer completes new skill/certification (e.g., AWS certification)
2. Developer opens `content/2.5-skills/skills.md`
3. Developer adds new entry to YAML array with name, proficiency, category
4. Developer saves file
5. Vite plugin detects change, re-parses file, invalidates virtual module
6. Browser updates via HMR showing new skill in Skills section
7. **Success Criteria:** New skill appears in <100ms, correct category badge, proper sorting

### Journey 3: AI-Assisted Content Generation

1. User instructs AI: "Add my latest blog post about Vite plugins"
2. AI reads `content/5-blogs/` directory to understand schema
3. AI analyzes specification for required fields (title, excerpt, date, tags)
4. AI creates `blog-vite-plugins.md` with valid frontmatter
5. AI adds `## Summary` section with brief content
6. AI verifies file structure matches specification
7. User reviews generated content and approves
8. **Success Criteria:** New blog appears in Blogs section, schema validation passes

### Journey 4: Multi-Section Content Update (Learning Journey)

1. Developer completes major learning milestone (e.g., completes online course)
2. Developer navigates to `content/learningJourney/term-2/`
3. Developer creates `aws-certification.md` with full frontmatter (title, period, category, description)
4. Developer adds all expanded content sections: Overview, Key Learnings, Technologies, Achievements, Challenges, Next Steps
5. Developer saves file
6. Plugin parses file, enriches with icon/color based on category
7. Learning Journey timeline updates with new entry in chronological order
8. **Success Criteria:** Timeline entry appears with correct icon, color, and all sections populated

### Journey 5: Component Integration Update

1. Developer implements parser function for a content section (e.g., `parseContact`)
2. Developer updates React component to import `virtual:contact-data` instead of hardcoded array
3. Developer removes hardcoded fallback data from `src/data/contact.ts`
4. Developer runs build to verify virtual module resolves correctly
5. Developer runs TypeScript type-check to verify no errors
6. Developer tests HMR by editing `content/6-contact/Contact.md`
7. **Success Criteria:** Component renders content from Markdown, TypeScript passes, HMR works

## 4. Business Requirements

### Functional Requirements

**Content Schema Definition:**

- **FR-001:** Each section SHALL define required and optional frontmatter fields in specification
- **FR-002:** Frontmatter schemas SHALL enforce type-safe enums (status, proficiency, category, etc.)
- **FR-003:** Schemas SHALL support nested objects (ctaPrimary, ctaSecondary, contacts array)
- **FR-004:** Default values SHALL be specified for optional fields per section

**Section-Specific Implementation:**

**Home/Hero Section:**

- **FR-005:** SHALL parse single `content/1-home/hero.md` file
- **FR-006:** Required fields: title
- **FR-007:** Optional fields: subtitle, ctaPrimary, ctaSecondary, highlights[], badges[], social[]
- **FR-008:** SHALL extract sections: `## Hero Copy`, `## Highlights`, `## Notes`
- **FR-009:** Virtual export: `homeData: HomeData | null`

**About Section:**

- **FR-010:** SHALL parse single `content/2-about/About.md` file
- **FR-011:** Required fields: headline
- **FR-012:** Optional fields: bio, strengths[], values[], currentFocus[], cta
- **FR-013:** SHALL extract sections: `## Narrative`, `## Highlights`, `## Values`, `## Current Focus`
- **FR-014:** Virtual export: `aboutData: AboutData | null`

**Skills Section:**

- **FR-015:** SHALL parse one or more `content/2.5-skills/*.md` files
- **FR-016:** Required fields: name
- **FR-017:** Optional fields: category (default: 'learning'), proficiency (default: 'beginner'), icon, description
- **FR-018:** SHALL support enum: category (dev|network|data|ai|tools|learning)
- **FR-019:** SHALL support enum: proficiency (beginner|intermediate|advanced)
- **FR-020:** Virtual export: `skillsData: SkillDataItem[]`

**Projects Section:**

- **FR-021:** SHALL parse multiple `content/3-projects/project-*.md` files
- **FR-022:** Required fields: title, description
- **FR-023:** Optional fields: technologies[], gradient, demoUrl, sourceUrl, image, status
- **FR-024:** SHALL extract sections: `## Highlights`, `## Notes`
- **FR-025:** SHALL generate ID from filename (e.g., `project-portfolio.md` → `project-portfolio`)
- **FR-026:** Virtual export: `projectsData: ProjectDataItem[]`

**Blogs Section:**

- **FR-027:** SHALL parse multiple `content/5-blogs/blog-*.md` files
- **FR-028:** Required fields: title, excerpt, date (ISO format)
- **FR-029:** Optional fields: readTime, category, tags[], status, featured, url
- **FR-030:** SHALL skip draft status in production builds
- **FR-031:** SHALL extract sections: `## Summary`, `## Notes`
- **FR-032:** Virtual export: `blogsData: BlogDataItem[]`

**Contact Section:**

- **FR-033:** SHALL parse single `content/6-contact/Contact.md` file
- **FR-034:** Required fields per contact: type, label, value
- **FR-035:** SHALL support enum: type (email|linkedin|github|phone)
- **FR-036:** SHALL synthesize URLs for email (`mailto:`) and phone (`tel:`) when missing
- **FR-037:** SHALL provide default icons based on contact type
- **FR-038:** Virtual export: `contactData: ContactData | null`

**Learning Journey Section:**

- **FR-039:** SHALL recursively parse `content/learningJourney/term-*/*.md` files
- **FR-040:** Required fields: title, period, category, description
- **FR-041:** SHALL support enum: category (education|work|skill|project|certification)
- **FR-042:** SHALL extract expanded sections: Overview, Key Learnings, Technologies, Achievements, Challenges, Next Steps
- **FR-043:** SHALL enrich with icons/colors via `getIconAndColor(category)` utility
- **FR-044:** SHALL sort by period field (descending chronological order)
- **FR-045:** Virtual export: `learningJourney: LearningJourneyItem[]`

**Component Integration:**

- **FR-046:** React components SHALL import from virtual modules (e.g., `import { homeData } from 'virtual:home-data'`)
- **FR-047:** Components SHALL handle null/empty data gracefully
- **FR-048:** Components SHALL preserve existing UI structure and styling
- **FR-049:** Components SHALL maintain accessibility features (ARIA labels, semantic HTML)
- **FR-050:** TypeScript SHALL validate data types match interface definitions

**Content Validation:**

- **FR-051:** Missing required fields SHALL log warnings with filename and field name
- **FR-052:** Invalid enum values SHALL default to safe fallback (e.g., category → 'skill')
- **FR-053:** Malformed YAML SHALL log error and skip file
- **FR-054:** Empty bullet lists SHALL return empty arrays (not null)
- **FR-055:** Validation errors SHALL NOT crash the build

**Content Authoring:**

- **FR-056:** All content files SHALL use kebab-case naming (e.g., `project-portfolio.md`)
- **FR-057:** Files SHALL skip `*spec.md` or `*Spec.md` patterns
- **FR-058:** Frontmatter SHALL use YAML syntax with `---` delimiters
- **FR-059:** Markdown sections SHALL use `## Heading` format
- **FR-060:** Bullet lists SHALL support both `-` and `*` markers

### Non-Functional Requirements

**Performance:**

- **NFR-001:** HMR updates SHALL complete within 100ms for content changes
- **NFR-002:** Parsing all 7 sections SHALL complete within 2 seconds
- **NFR-003:** Client bundle SHALL NOT include Markdown parsing libraries
- **NFR-004:** Lighthouse Performance score SHALL remain ≥90

**Accessibility:**

- **NFR-005:** All migrated content SHALL maintain WCAG AA compliance
- **NFR-006:** Images referenced in content SHALL include alt text
- **NFR-007:** Generated HTML SHALL preserve semantic structure
- **NFR-008:** Links SHALL include appropriate `rel` attributes (noopener, noreferrer)

**Reliability:**

- **NFR-009:** Content migration SHALL NOT introduce TypeScript compilation errors
- **NFR-010:** Invalid content SHALL degrade gracefully without breaking UI
- **NFR-011:** Build SHALL succeed even with partial content migration
- **NFR-012:** Fallback data SHALL display when content is missing

**Maintainability:**

- **NFR-013:** Each section SHALL have dedicated parser function
- **NFR-014:** Parser functions SHALL follow signature `(file: MarkdownFile) => T | null`
- **NFR-015:** Content schemas SHALL be documented in specification
- **NFR-016:** Code SHALL include JSDoc explaining parser logic

**Data Quality:**

- **NFR-017:** Real portfolio content SHALL replace all placeholder examples
- **NFR-018:** Content SHALL be factually accurate and up-to-date
- **NFR-019:** Content SHALL maintain consistent tone and style
- **NFR-020:** Content SHALL follow specification schemas precisely

## 5. Success Metrics

### Key Performance Indicators (KPIs)

**Migration Completeness:**

- **KPI-001:** 7/7 content sections migrated (100% coverage)
- **KPI-002:** 0 placeholder data references remaining in production
- **KPI-003:** 100% real portfolio content (projects, skills, experience)

**Technical Quality:**

- **KPI-004:** TypeScript compilation errors: 0
- **KPI-005:** Build success rate: 100%
- **KPI-006:** HMR latency: <100ms (measured in dev tools)

**Performance:**

- **KPI-007:** Lighthouse Performance: ≥90
- **KPI-008:** Lighthouse Accessibility: ≥90
- **KPI-009:** Build time: <2s for content processing

**Content Quality:**

- **KPI-010:** Schema validation: 100% pass rate
- **KPI-011:** Required field coverage: 100%
- **KPI-012:** Content freshness: All dates accurate and current

**Developer Experience:**

- **KPI-013:** Content update workflow: ≤3 steps (edit → save → preview)
- **KPI-014:** AI agent success rate: 100% for schema-compliant content generation

### Measurement Methods

- **Automated:** Build logs, TypeScript compiler output, Lighthouse CI reports
- **Manual:** Content review, visual inspection, schema validation checks
- **Continuous:** CI/CD pipeline integration with automated tests

## 6. Out of Scope

**Explicitly NOT included in this epic:**

- **Testing Infrastructure:** Automated tests for parsers and components (covered in EPIC-003)
- **Advanced Markdown Features:** Custom directives, plugins, or extended syntax
- **Content Management UI:** Web-based content editing interface
- **Content Versioning System:** Git history is sufficient
- **Multi-Author Workflows:** Only single author (portfolio owner) supported
- **Content Scheduling:** No publish date or scheduling features
- **Draft Workflow:** Basic draft/published status only (no approval workflows)
- **Image Optimization:** Images managed manually in `public/` directory
- **SEO Metadata:** Basic meta tags only (no advanced SEO features)
- **Analytics Integration:** Content tracking handled separately
- **Internationalization:** English-only content
- **Content Search:** No built-in search functionality
- **RSS/Feeds:** Blog feed generation not included
- **Comments/Interactions:** Static content only, no user-generated content

## 7. Business Value

### Value Rating: **HIGH**

### Justification

**Strategic Alignment:**

- Enables authentic portfolio representation with real projects and experience
- Establishes scalable content management for ongoing career growth
- Positions portfolio for AI-assisted content workflows
- Demonstrates technical capability through implementation of custom content pipeline

**Efficiency Gains:**

- Reduces content update time by 80% (from code edits to file edits)
- Eliminates context switching between code and content authoring
- Enables rapid iteration on portfolio content without deployment overhead
- Supports AI-driven content generation and maintenance

**Quality Improvements:**

- Real portfolio content increases authenticity and credibility
- Type-safe content pipeline reduces runtime errors to zero
- Maintains high performance scores (Lighthouse 90+) through build-time processing
- Improves accessibility compliance with structured content

**User Impact:**

- Portfolio visitors see accurate, up-to-date professional experience
- Improved content quality enhances professional presentation
- Better SEO through semantic HTML and structured data

**Risk Mitigation:**

- Phased migration allows validation at each step
- Build-time processing catches content errors before deployment
- Fallback data ensures UI never breaks during migration
- TypeScript type safety prevents schema mismatches

### Dependency Chain

This epic **depends on:**

- Epic-001: Core Plugin Infrastructure (must be complete)

This epic **blocks:**

- Epic-003: Testing & Validation (requires migrated content to test)

### Return on Investment (ROI)

**Time Investment:** ~30-40 hours (content authoring, parser implementation, component updates, validation)

**Immediate Value:**

- Professional portfolio with real content (vs generic placeholders)
- Ability to update portfolio in minutes instead of hours
- Demonstration of advanced technical skills to potential employers/clients

**Long-term Value:**

- Scalable content management for career-long portfolio maintenance
- AI-assisted content workflows (future productivity multiplier)
- Foundation for potential portfolio template/framework extraction

**Opportunity Cost Avoided:**

- Not migrating would require maintaining placeholder data indefinitely
- Manual content updates in TypeScript files would accumulate technical debt
- Inability to leverage AI tools for content management

---

**Version:** 1.0 | **Status:** Draft | **Last Updated:** Dec 09 2025 - 10:45
