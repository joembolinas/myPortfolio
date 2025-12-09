---
title: Architecture Specification - Markdown-Driven Content Pipeline System
version: 1.0
date_created: 2025-12-09
last_updated: 2025-12-09
owner: portfolio-team
tags: [architecture, content-pipeline, vite-plugin, markdown, build-system]
---
# Introduction

This specification defines the complete architecture for the Markdown-Driven Content Pipeline System that powers the Growth Journey Portfolio. The system transforms static portfolio content from hardcoded TypeScript files into a flexible, file-based content management approach using Markdown files parsed at build time through Vite virtual modules.

## 1. Purpose & Scope

**Purpose:**

Establish a unified, type-safe content pipeline that:

- Separates content authoring from code implementation
- Enables non-technical content updates without code changes
- Maintains optimal runtime performance (Lighthouse 90+)
- Preserves full TypeScript type safety and developer experience
- Supports Hot Module Replacement (HMR) for instant content preview

**Scope:**

This specification covers seven content sections across the portfolio:

1. **Home/Hero** - Landing page content and CTAs
2. **About** - Personal narrative and values
3. **Skills** - Technical competencies by category
4. **Projects** - Portfolio project showcases
5. **Blogs** - Article metadata and previews
6. **Contact** - Contact methods and information
7. **Learning Journey** - Career timeline and milestones

**Out of Scope:**

- Runtime CMS integration
- User-generated content
- Multi-language support (future consideration)
- Content versioning/history (handled by Git)

**Intended Audience:**

- Frontend developers implementing or maintaining the system
- Content authors creating/updating portfolio content
- AI agents working on content pipeline features

**Assumptions:**

- Node.js 18+ and npm 9+ installed
- Vite 5.x build system
- React 18+ with TypeScript 5+
- gray-matter library available for YAML parsing

## 2. Definitions

- **Virtual Module**: A module generated in-memory by Vite at build time, accessible via a specific import identifier (e.g., `virtual:home-data`), containing parsed content data serialized as JavaScript/TypeScript.
- **Frontmatter**: YAML metadata block enclosed by `---` delimiters at the start of a Markdown file, containing structured data fields.
- **Content Layer**: The file system directory structure (`content/`) containing all source Markdown files.
- **Processing Layer**: Vite plugins (`contentDataPlugin.ts`, `journeyDataPlugin.ts`) that read, parse, and transform Markdown into virtual modules.
- **Runtime Layer**: React components that import and consume virtual module data.
- **HMR (Hot Module Replacement)**: Development-time feature that updates browser state when source files change, without full page reload.
- **Build Time**: The phase when `npm run build` executes, transforming source files into production assets.
- **Slug**: URL-safe identifier derived from filename (e.g., `portfolio-v2.md` → `portfolio-v2`).
- **Parser Function**: A TypeScript function that accepts a `MarkdownFile` and returns a typed data object or null.

## 3. Requirements, Constraints & Guidelines

### Functional Requirements

- **REQ-001**: The system **MUST** source all portfolio content from Markdown files located in structured directories under `content/`.
- **REQ-002**: The system **MUST** use Vite plugin hooks (`resolveId`, `load`, `handleHotUpdate`) to parse content at build time.
- **REQ-003**: The system **MUST** generate type-safe virtual modules for each content section, exportable as JavaScript constants.
- **REQ-004**: The system **MUST** support Hot Module Replacement (HMR) during development, reflecting Markdown edits within 100ms.
- **REQ-005**: The system **MUST** validate required Frontmatter fields and log warnings for missing/invalid data without crashing the build.
- **REQ-006**: The system **MUST** extract bullet lists from Markdown sections (e.g., `## Highlights`) and convert them to string arrays.
- **REQ-007**: The system **MUST** support optional fields that degrade gracefully (render nothing or default values when absent).
- **REQ-008**: The system **MUST** enforce type-safe enums for categorical fields (e.g., `category`, `status`, `proficiency`).
- **REQ-009**: The system **MUST** generate unique IDs for content items based on file paths (slugified).
- **REQ-010**: The system **MUST** skip files named `*spec.md` or `*Spec.md` to avoid parsing documentation as content.

### Non-Functional Requirements

- **PERF-001**: Build-time content processing overhead **MUST NOT** exceed 2 seconds for 100 Markdown files.
- **PERF-002**: Virtual module generation for a single section **MUST NOT** exceed 500ms.
- **PERF-003**: HMR updates for content changes **MUST** complete within 100ms in development mode.
- **PERF-004**: The system **MUST NOT** bundle Markdown parsing libraries (e.g., `gray-matter`) in the client bundle.
- **A11Y-001**: Generated content **MUST** maintain semantic HTML structure for screen readers.
- **A11Y-002**: All images referenced in content **MUST** include alt text (enforced at parse time).

### Security Requirements

- **SEC-001**: File reading operations **MUST** be restricted to the `content/` directory subtree.
- **SEC-002**: User-generated content (if added) **MUST** be sanitized before rendering (no `dangerouslySetInnerHTML` without sanitization).
- **SEC-003**: External URLs in content **MUST** open in new tabs with `rel="noopener noreferrer"`.

### Data Quality Requirements

- **DQ-001**: Invalid or missing category values SHALL default to `skill`
- **DQ-002**: Missing required frontmatter fields SHALL trigger build warnings but not fail the build
- **DQ-003**: Malformed markdown files SHALL be skipped with logged warnings
- **DQ-004**: Empty sections SHALL return empty arrays or empty strings, not null/undefined

### Constraints

- **CON-001**: No runtime Markdown parsing libraries shall be included in the production client bundle.
- **CON-002**: Content file structure **MUST** adhere to the defined directory layout in `content/`.
- **CON-003**: All images referenced in Markdown **MUST** exist in `public/` or be external URLs.
- **CON-004**: Frontmatter **MUST** be valid YAML; malformed YAML logs a warning and skips the file.
- **CON-005**: The system **MUST** maintain compatibility with Vercel deployment pipeline.

### Guidelines

- **GUD-001**: Use `gray-matter` for all Frontmatter parsing operations.
- **GUD-002**: Keep content transformation logic within Vite plugin `load` hooks.
- **GUD-003**: Ensure all generated data matches TypeScript interfaces in `src/types/`.
- **GUD-004**: Use kebab-case for file names and slugs.
- **GUD-005**: Log informative warnings (including filename and field) for validation failures.
- **GUD-006**: Provide fallback data in `src/data/*.ts` files for graceful degradation during development.

### Architectural Patterns

- **PAT-001**: **Plugin Pattern** - Vite plugin with `resolveId`, `load`, and `handleHotUpdate` hooks
- **PAT-002**: **Pipeline Pattern** - Sequential processing (discover → parse → enrich → compile)
- **PAT-003**: **Virtual Module Pattern** - Memory-only modules with null-byte prefix (`\0`)
- **PAT-004**: **Factory Pattern** - Icon/color generator functions based on category
- **PAT-005**: **Builder Pattern** - Gradual construction of typed data objects

## 4. Interfaces & Data Contracts


### Home (`content/1-home/hero.md`)

Frontmatter: `title, subtitle, ctaPrimary{label,href}, ctaSecondary?, highlights[], badges?, social[]`.
Sections: `## Hero Copy`, `## Highlights`, `## Notes`.
Virtual export: `export const home = { ... }` consumed by `HeroSection`.

### About (`content/2-about/about.md`)

Frontmatter: `headline, bio, strengths[], values[], currentFocus[], cta?`.
Sections: `## Narrative`, `## Highlights`, `## Values`, `## Current Focus`.
Virtual export: `about` object for `AboutSection`.

### Skills (`content/2.5-skills/skills.md`)

Frontmatter: `category, title, summary` per group.
Section `## Skills` list items with `name, proficiency (beginner|intermediate|advanced), icon?, description?`.
Virtual export: array of skill items grouped; defaults: category->`learning`, proficiency->`beginner`.

### Projects (`content/3-projects/project-*.md`)

Frontmatter: `title, description, technologies[], gradient?, demoUrl?, sourceUrl?, image?, status? (wip|live|archived)`.
Sections: `## Highlights`, `## Notes` optional.
ID: filename slug.
Virtual export: projects array for `ProjectsSection` / `ProjectCard`.

### Blogs (`content/5-blogs/blog-*.md`)

Frontmatter: `title, excerpt, date(ISO), tags[], readTime?, url?, status?(draft|published)`.
Sections: `## Summary`, `## Notes` optional.
Behavior: skip drafts in prod builds; include in dev if flag set.
Virtual export: blogs array for `BlogSection` cards.

### Contact (`content/6-contact/contact.md`)

Frontmatter: `headline, summary`.
Section `## Contacts` list items with `type(email|linkedin|github|phone), label, value, url?, icon?`.
Behavior: synthesize `mailto:`/`tel:` if missing for email/phone; fallback icon if absent.
Virtual export: contacts array for `ContactSection`.

### 4.1. Virtual Module Declarations

All virtual modules are declared in `src/types/virtual-modules.d.ts`:

```typescript
declare module 'virtual:home-data' {
  export const homeData: HomeData | null;
}

declare module 'virtual:about-data' {
  export const aboutData: AboutData | null;
}

declare module 'virtual:skills-data' {
  export const skillsData: SkillDataItem[];
}

declare module 'virtual:projects-data' {
  export const projectsData: ProjectDataItem[];
}

declare module 'virtual:blogs-data' {
  export const blogsData: BlogDataItem[];
}

declare module 'virtual:contact-data' {
  export const contactData: ContactData | null;
}

declare module 'virtual:learning-journey-data' {
  export const learningJourney: LearningJourneyItem[];
}
```

### 4.2. Core Data Schemas

#### HomeData

```typescript
interface HomeData {
  id: string;
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  highlights?: string[];
  badges?: string[];
  social?: Array<{ label: string; href: string }>;
  body?: string;
}
```

**Source**: `content/1-home/hero.md`

**Required Fields**: `title`

**Example Frontmatter**:

```yaml
---
title: Growth Journey Portfolio
subtitle: Building performant, accessible experiences
ctaPrimary: { label: "View Projects", href: "#projects" }
highlights: ["Performance-first", "WCAG AA", "React 18"]
---
```

#### AboutData

```typescript
interface AboutData {
  id: string;
  headline: string;
  bio?: string;
  strengths?: string[];
  values?: string[];
  currentFocus?: string[];
  cta?: { label: string; href: string };
  narrative?: string;
}
```

**Source**: `content/2-about/About.md`

**Required Fields**: `headline`

**Sections**: `## Narrative`, `## Highlights`, `## Values`, `## Current Focus`

#### SkillDataItem

```typescript
interface SkillDataItem {
  id: string;
  name: string;
  category: 'dev' | 'network' | 'data' | 'ai' | 'tools' | 'learning';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
  description?: string;
}
```

**Source**: `content/2.5-skills/*.md` (can have multiple files)

**Required Fields**: `name`

**Defaults**: `category: 'learning'`, `proficiency: 'beginner'`

#### ProjectDataItem

```typescript
interface ProjectDataItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  gradient?: string;
  demoUrl?: string;
  sourceUrl?: string;
  image?: string;
  highlights?: string[];
  status?: 'wip' | 'live' | 'archived';
}
```

**Source**: `content/3-projects/project-*.md`

**Required Fields**: `title`, `description`

**ID Generation**: Extracted from filename (e.g., `project-portfolio.md` → `project-portfolio`)

#### BlogDataItem

```typescript
interface BlogDataItem {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime?: number;
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'coming-soon';
  featured?: boolean;
  url?: string;
  summary?: string;
}
```

**Source**: `content/5-blogs/blog-*.md`

**Required Fields**: `title`, `excerpt`, `date`

**Behavior**: Draft filtering in production builds (skip `status: draft`)

#### ContactData

```typescript
interface ContactDataItem {
  type: 'email' | 'linkedin' | 'github' | 'phone';
  label: string;
  value: string;
  url?: string;
  icon?: string;
}

interface ContactData {
  headline?: string;
  summary?: string;
  contacts: ContactDataItem[];
}
```

**Source**: `content/6-contact/Contact.md`

**URL Synthesis**: Auto-generate `mailto:` for email, `tel:` for phone if `url` missing

#### LearningJourneyItem

```typescript
interface LearningJourneyItem {
  id: string;
  title: string;
  period: string;
  category: 'education' | 'work' | 'skill' | 'project' | 'certification';
  description: string;
  expandedContent: {
    overview: string;
    keyLearnings: string[];
    technologies?: string[];
    achievements?: string[];
    challenges?: string[];
    nextSteps?: string[];
  };
  icon: string;
  color: string;
}
```

**Source**: `content/learningJourney/term-*/*.md`

**Sorting**: By `period` field (descending)

**Icon/Color**: Generated by `getIconAndColor(category)` utility

### 4.3. Plugin Architecture

#### ContentDataPlugin

**File**: `src/vite/contentDataPlugin.ts`

**Responsibilities**:

- Register virtual module IDs for `home`, `about`, `skills`, `projects`, `blogs`, `contact`
- Read Markdown files from respective `content/` directories
- Parse each file with section-specific parser functions
- Generate virtual modules exporting typed data
- Handle HMR invalidation on file changes

**Key Functions**:

- `resolveId(id)`: Map `virtual:*-data` to internal resolved ID
- `load(id)`: Read files, parse, serialize to JS module
- `handleHotUpdate({ file, server })`: Invalidate module graph on content changes

**Parser Functions**:

- `parseHome(file)`: Extract home/hero content
- `parseAbout(file)`: Extract about section content
- `parseSkills(file)`: Extract skill items array
- `parseProjects(file)`: Extract single project
- `parseBlogs(file)`: Extract single blog metadata
- `parseContact(file)`: Extract contact methods

#### JourneyDataPlugin

**File**: `src/vite/journeyDataPlugin.ts`

**Responsibilities**:

- Register `virtual:learning-journey-data` module
- Recursively read all `.md` files in `content/learningJourney/`
- Parse using `markdownParser.ts`
- Enrich with icons/colors via `iconColorGenerator.ts`
- Sort by `period` field
- Export as `LearningJourneyItem[]`

### 4.4. Utility Functions

#### splitSections(markdown: string)

Splits Markdown content by `## Heading` into keyed sections.

**Returns**: `Record<string, string>` where keys are lowercased headings.

#### extractBullets(block?: string)

Extracts bullet points (`- item` or `* item`) from a Markdown block.

**Returns**: `string[]`

#### ensureStringArray(value: any)

Normalizes various input formats to `string[]`.

**Handles**: Arrays, comma-separated strings, or returns empty array.

#### slugFromPath(filePath: string)

Converts file path to URL-safe identifier.

**Example**: `content/3-projects/project-portfolio.md` → `project-portfolio`

### 4.5. Content Re-export Pattern

Each `src/data/*.ts` file imports from its virtual module and re-exports with fallback:

```typescript
import { projectsData } from 'virtual:projects-data';

const fallbackProjects: Project[] = [/* ... */];

export const projects: Project[] = 
  Array.isArray(projectsData) && projectsData.length 
    ? projectsData 
    : fallbackProjects;
```

**Rationale**: Provides type-safe exports with graceful degradation during development.

## 5. Acceptance Criteria

### Build & Runtime

- **AC-001**: Running `npm run build` successfully generates `dist/` with all virtual modules resolved.
- **AC-002**: Adding a new `project-*.md` file to `content/3-projects/` and rebuilding adds the project to the Projects section.
- **AC-003**: Modifying `content/1-home/hero.md` title field updates the Hero section after HMR refresh.
- **AC-004**: TypeScript compilation (`npm run type-check`) passes without errors.
- **AC-005**: Lighthouse performance score remains ≥90 after full migration to dynamic content.

### Content Parsing

- **AC-006**: Files with missing required fields log a warning and are skipped without breaking the build.
- **AC-007**: Files with invalid YAML frontmatter log a descriptive error (filename, line number if possible) and skip.
- **AC-008**: Bullet lists under `## Highlights` are correctly extracted as `string[]`.
- **AC-009**: Enum fields (e.g., `proficiency`, `status`) default to safe values when invalid or missing.
- **AC-010**: Contact email without `url` field auto-generates `mailto:` link.

### Developer Experience

- **AC-011**: Editing any Markdown file triggers HMR and updates the browser within 100ms (measured in dev tools).
- **AC-012**: Virtual module imports show no TypeScript errors in IDE (VSCode with Volar/TypeScript extension).
- **AC-013**: Fallback data displays correctly when virtual module returns empty array or null.

### Performance

- **AC-014**: Build time for 50 Markdown files across all sections completes in <1.5 seconds (plugin processing only).
- **AC-015**: Production bundle size does not include `gray-matter` or any Markdown parsing library.
- **AC-016**: Client runtime does not perform any file I/O or Markdown parsing.

## 6. Test Automation Strategy

### Unit Testing

**Framework**: Vitest

**Targets**:

- `src/utils/markdownParser.ts`: Test frontmatter extraction, section parsing, bullet extraction.
- `src/utils/iconColorGenerator.ts`: Test category-to-icon/color mappings.
- `src/vite/contentDataPlugin.ts`: Test parser functions (`parseHome`, `parseAbout`, etc.) with mock `MarkdownFile` inputs.
- Utility functions: `splitSections`, `extractBullets`, `ensureStringArray`, `slugFromPath`.

**Coverage Target**: ≥80% overall, 100% for parsing/validation branches.

**Example Test**:

```typescript
describe('parseProjects', () => {
  it('should parse valid project markdown', () => {
    const file = {
      path: 'project-portfolio.md',
      content: `---
title: Portfolio V2
description: A modern portfolio
technologies: [React, Vite]
---

## Highlights
- Fast
- Accessible
`
    };
    const result = parseProjects(file);
    expect(result?.title).toBe('Portfolio V2');
    expect(result?.technologies).toEqual(['React', 'Vite']);
    expect(result?.highlights).toEqual(['Fast', 'Accessible']);
  });

  it('should return null for missing required fields', () => {
    const file = { path: 'bad.md', content: '---\ntitle: Only Title\n---' };
    expect(parseProjects(file)).toBeNull();
  });
});
```

### Integration Testing

**Targets**:

- Full plugin lifecycle: `resolveId` → `load` → module output.
- HMR event triggering and module invalidation.
- Verify generated virtual module exports match expected TypeScript types.

**Example Test**:

```typescript
describe('contentDataPlugin integration', () => {
  it('should resolve virtual:projects-data module', () => {
    const plugin = contentDataPlugin();
    const resolved = plugin.resolveId('virtual:projects-data');
    expect(resolved).toBe('\0virtual:projects-data');
  });

  it('should load projects data from content directory', async () => {
    // Mock file system or use test fixtures
    const plugin = contentDataPlugin();
    const code = await plugin.load('\0virtual:projects-data');
    expect(code).toContain('export const projectsData');
    expect(JSON.parse(code.match(/= (.+);/)[1])).toBeInstanceOf(Array);
  });
});
```

### End-to-End (E2E) Testing

**Framework**: Playwright

**Scenarios**:

1. Verify all sections render content from Markdown sources in production build.
2. Navigate to Projects section and verify project cards display correct titles, descriptions, technologies.
3. Check that external links (blogs, GitHub, LinkedIn) open in new tabs with correct `rel` attributes.
4. Verify accessibility: screen reader can navigate sections, all images have alt text.

**Example Test**:

```typescript
test('Projects section displays markdown content', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Projects');
  
  // Verify at least one project card exists
  const projectCard = page.locator('[data-testid="project-card"]').first();
  await expect(projectCard).toBeVisible();
  
  // Verify project title and tech stack
  await expect(projectCard.locator('h3')).toContainText(/Portfolio|E-Commerce/);
  await expect(projectCard.locator('text=React')).toBeVisible();
});
```

### Performance Testing

**Tools**: Lighthouse CI

**Metrics**:

- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

**CI Integration**: Run Lighthouse after each deployment to Vercel preview URL.

### Test Data Management

- Store sample markdown files in `src/__tests__/fixtures/`
- Use consistent test data across unit and integration tests
- Cleanup generated files after each test run

### CI/CD Integration

- Run tests on every push and pull request
- Enforce 80% code coverage threshold
- Include build test to ensure virtual module works in production

### Coverage Requirements

- Minimum 80% overall code coverage
- 100% coverage for critical paths (parsing, validation)
- Branch coverage for all error handling paths

### Performance Benchmarking

- Benchmark plugin execution time with varying file counts (10, 50, 100 files)
- Measure HMR update latency
- Track bundle size impact in CI

## 7. Rationale & Context

### Why Build-Time Processing?

**Performance**: Parsing Markdown at runtime is CPU-intensive and requires heavy libraries (e.g., `gray-matter` ~50KB, `marked` ~100KB). By processing at build time, we deliver pre-computed JSON to the client, ensuring:

- Lighthouse Performance score >90
- Fast Time-to-Interactive (TTI)
- Minimal JavaScript bundle size

**Developer Experience**: Virtual modules integrate seamlessly with Vite's dependency graph, enabling:

- HMR for instant content preview
- TypeScript type safety with `.d.ts` declarations
- Tree-shaking for unused content

### Why Virtual Modules?

Virtual modules allow treating file-system content as importable JavaScript modules. This approach:

- Avoids code generation in `src/` (keeps Git clean)
- Leverages Vite's module caching and HMR infrastructure
- Enables dynamic content without runtime overhead
- Maintains strict TypeScript typing

### Why Markdown?

Markdown provides:

- **Developer-Friendly**: Syntax highlighting, Git diffs, code review
- **Version Control**: Full history via Git
- **Portable**: Easy migration to CMS or static site generator if needed
- **Separation of Concerns**: Content authors don't touch code
- **AI-Friendly**: LLMs can easily parse and generate Markdown

### Design Decisions

**Single vs. Array Parsers**:

- **Single** (`home`, `about`, `contact`): Expect one canonical file per section.
- **Array** (`skills`, `projects`, `blogs`, `learningJourney`): Support multiple files, aggregate into arrays.

**Slug Generation**:

Uses filename (without extension) as ID. This:

- Avoids manual ID assignment
- Keeps URLs predictable (`/projects/portfolio-v2`)
- Simplifies content authoring

**Fallback Data**:

Each `src/data/*.ts` includes hardcoded fallback arrays. This:

- Ensures UI doesn't break during development
- Provides example structure for content authors
- Enables incremental migration (can delete fallbacks once all Markdown is authored)

### Trade-offs Analysis

**Build-Time vs Runtime Processing:**

- ✅ **Pros**: Zero runtime overhead, smaller bundle, better SEO, pre-computed data
- ⚠️ **Cons**: Longer build times (acceptable for static content), requires rebuild for content changes
- 🚫 **Not Suitable For**: Dynamic user-generated content, frequently changing data

**Virtual Modules vs Physical Files:**

- ✅ **Pros**: Clean separation, no .gitignore complexity, atomic updates, type safety
- ⚠️ **Cons**: Less visible in file explorer, requires understanding of Vite internals
- 💡 **Decision**: Benefits outweigh learning curve for this use case

**YAML Frontmatter + Markdown:**

- ✅ **Pros**: Human-readable, version control friendly, portable, widely supported
- ⚠️ **Alternative Considered**: JSON files (rejected: less human-friendly, no markdown support)
- ⚠️ **Alternative Considered**: Database (rejected: deployment complexity, overkill for static content)
- ⚠️ **Alternative Considered**: CMS (rejected: unnecessary complexity for personal portfolio)

**File Path as ID:**

- ✅ **Pros**: Automatic and predictable, no manual ID management, stable across builds
- ⚠️ **Cons**: IDs change if files are moved or renamed
- 💡 **Decision**: Reflects content organization, human-readable for debugging

## 8. Dependencies & External Integrations

### Infrastructure Dependencies

- **INF-001**: **Vite** (v5+) - Required for plugin system, HMR, and build pipeline.
- **INF-002**: **Node.js** (v18+) - Runtime for build scripts and plugin execution.
- **INF-003**: **Vercel** - Deployment platform; must support Node.js build step.

### Library Dependencies

- **LIB-001**: **gray-matter** - YAML frontmatter parsing (build-time only, not bundled for client).
- **LIB-002**: **TypeScript** (v5+) - Type definitions and compile-time checking.
- **LIB-003**: **React** (v18+) - Component framework consuming virtual module data.

### Tooling Dependencies

- **TOOL-001**: **Vitest** - Unit testing framework.
- **TOOL-002**: **Playwright** - E2E testing framework.
- **TOOL-003**: **Lighthouse CI** - Performance monitoring.

### External Systems

- **EXT-001**: **File System** - Read markdown files from `content/` directory
  - **Access Pattern**: Synchronous file reads during build
  - **Error Handling**: Skip missing files, log warnings
  - **Security**: Restricted to `content/` subtree only

- **EXT-002**: **GitHub API** - Optional integration for live repository stats (separate from content system)

### Technology Platform Dependencies

- **PLT-001**: **ES Modules** - All code uses ESM syntax; requires Node.js with ESM support.
- **PLT-002**: **TypeScript Compiler** - Must support `declare module 'virtual:*'` syntax in `.d.ts` files.

### Compliance Dependencies

- **COM-001**: **Content Security Policy (CSP)** - Prevent XSS from markdown content
  - **Impact**: All markdown must be sanitized before rendering
  - **Mitigation**: Use React's built-in XSS protection, avoid `dangerouslySetInnerHTML`

## 9. Examples & Edge Cases

### Example 1: Valid Project Markdown

**File**: `content/3-projects/project-portfolio.md`

```markdown
---
title: Growth Journey Portfolio
description: A performance-first portfolio showcasing career transition.
technologies: [React, TypeScript, Vite, Tailwind CSS, Framer Motion]
gradient: from-blue-500 to-purple-600
demoUrl: https://growth-journey-portfolio.vercel.app
sourceUrl: https://github.com/joembolinas/myPortfolio
status: live
---

## Highlights
- Achieved 95+ Lighthouse scores across all metrics
- Implemented custom Vite plugins for markdown content pipeline
- WCAG AA compliant with keyboard navigation and screen reader support
- Optimized animations that adapt to device performance
```

**Generated Data**:

```json
{
  "id": "project-portfolio",
  "title": "Growth Journey Portfolio",
  "description": "A performance-first portfolio showcasing career transition.",
  "technologies": ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
  "gradient": "from-blue-500 to-purple-600",
  "demoUrl": "https://growth-journey-portfolio.vercel.app",
  "sourceUrl": "https://github.com/joembolinas/myPortfolio",
  "highlights": [
    "Achieved 95+ Lighthouse scores across all metrics",
    "Implemented custom Vite plugins for markdown content pipeline",
    "WCAG AA compliant with keyboard navigation and screen reader support",
    "Optimized animations that adapt to device performance"
  ],
  "status": "live"
}
```

### Example 2: Skills with Category

**File**: `content/2.5-skills/Skills.md`

```markdown
---
category: dev
title: Development Skills
skills:
  - name: React
    proficiency: advanced
    icon: react
    description: Hooks, context, performance optimization
  - name: TypeScript
    proficiency: advanced
    icon: typescript
  - name: Node.js
    proficiency: intermediate
    icon: node
---
```

**Generated Data**:

```json
[
  {
    "id": "Skills-0",
    "name": "React",
    "category": "dev",
    "proficiency": "advanced",
    "icon": "react",
    "description": "Hooks, context, performance optimization"
  },
  {
    "id": "Skills-1",
    "name": "TypeScript",
    "category": "dev",
    "proficiency": "advanced",
    "icon": "typescript",
    "description": ""
  },
  {
    "id": "Skills-2",
    "name": "Node.js",
    "category": "dev",
    "proficiency": "intermediate",
    "icon": "node",
    "description": ""
  }
]
```

### Edge Cases

#### Edge Case 1: Missing Required Field

**File**: `project-incomplete.md`

```markdown
---
title: Incomplete Project
# Missing required 'description' field
technologies: [React]
---
```

**Behavior**: Parser returns `null`, file is skipped, warning logged:

```text
[content-plugin] Warning: Skipped content/3-projects/project-incomplete.md - missing required field: description
```

#### Edge Case 2: Invalid YAML Frontmatter

**File**: `project-bad-yaml.md`

```markdown
---
title: Valid Title
technologies: [React, TypeScript
# Unclosed array
---
```

**Behavior**: `gray-matter` throws error, caught by plugin, logs warning:

```text
[content-plugin] Error parsing content/3-projects/project-bad-yaml.md - invalid YAML: unexpected end of array
```

#### Edge Case 3: Empty Sections

**File**: `project-minimal.md`

```markdown
---
title: Minimal Project
description: A minimal example
technologies: []
---

## Highlights

(No bullets)
```

**Behavior**: Generates valid data with empty arrays:

```json
{
  "id": "project-minimal",
  "title": "Minimal Project",
  "description": "A minimal example",
  "technologies": [],
  "highlights": []
}
```

#### Edge Case 4: Contact Without URL

**Frontmatter**:

```yaml
contacts:
  - type: email
    label: Email
    value: example@example.com
```

**Behavior**: URL synthesized as `mailto:example@example.com`

#### Edge Case 5: Blog Draft in Production

**Frontmatter**:

```yaml
status: draft
```

**Behavior**: Filter logic in component or plugin excludes drafts when `process.env.NODE_ENV === 'production'`.

#### Edge Case 6: Spec File in Content Directory

**File**: `content/3-projects/Projects.md` (contains spec, not project)

**Behavior**: Plugin ignores files matching `/spec\.md$/i` pattern.

### Example 3: Complete Learning Journey Entry

**File**: `content/learningJourney/term-2/tryhackme-security.md`

```markdown
---
title: TryHackMe Security Learning
date: 2024-06-15
period: 2024-Present
category: skill
description: Developing cybersecurity skills through hands-on challenges and learning paths.
skills: [penetration testing, network security, linux, scripting]
tags: [security, tryhackme, hacking, cybersecurity]
term: T2-AY2024
type: skill
---

## Overview

Engaged in structured cybersecurity training through TryHackMe's platform, completing learning paths in penetration testing, network security, and offensive security fundamentals.

## Key Learnings

- Network enumeration and reconnaissance techniques
- Linux command line proficiency and scripting
- Web application security testing
- Privilege escalation methods
- Security tool usage (nmap, burp suite, metasploit)

## Technologies

- Kali Linux
- Burp Suite
- Metasploit Framework
- Nmap
- Wireshark
- Python for security scripting

## Achievements

- Completed 50+ rooms across multiple difficulty levels
- Earned "Top 10%" rank in global leaderboard
- Successfully completed OWASP Top 10 learning path
- Built custom security tools and scripts

## Challenges

- Understanding complex attack vectors and defensive measures
- Time management between learning and hands-on practice
- Keeping up with rapidly evolving security landscape

## Next Steps

- Pursue OSCP certification preparation
- Contribute to CTF competitions
- Build personal security lab environment
```

**Generated Output**:

```json
{
  "id": "term-2/tryhackme-security",
  "title": "TryHackMe Security Learning",
  "period": "2024-Present",
  "category": "skill",
  "description": "Developing cybersecurity skills through hands-on challenges and learning paths.",
  "expandedContent": {
    "overview": "Engaged in structured cybersecurity training...",
    "keyLearnings": [
      "Network enumeration and reconnaissance techniques",
      "Linux command line proficiency and scripting",
      "Web application security testing",
      "Privilege escalation methods",
      "Security tool usage (nmap, burp suite, metasploit)"
    ],
    "technologies": [
      "Kali Linux",
      "Burp Suite",
      "Metasploit Framework",
      "Nmap",
      "Wireshark",
      "Python for security scripting"
    ],
    "achievements": [
      "Completed 50+ rooms across multiple difficulty levels",
      "Earned 'Top 10%' rank in global leaderboard",
      "Successfully completed OWASP Top 10 learning path",
      "Built custom security tools and scripts"
    ],
    "challenges": [
      "Understanding complex attack vectors and defensive measures",
      "Time management between learning and hands-on practice",
      "Keeping up with rapidly evolving security landscape"
    ],
    "nextSteps": [
      "Pursue OSCP certification preparation",
      "Contribute to CTF competitions",
      "Build personal security lab environment"
    ]
  },
  "icon": "⚡",
  "color": "from-yellow-500 to-yellow-600"
}
```

#### Edge Case 7: Mixed List Markers

**Content**:

```markdown
## Key Learnings

- Learning with dash
* Learning with asterisk
  - Indented learning
- Another dash learning
```

**Expected Behavior**:

- All items extracted regardless of marker type (`-` or `*`)
- Indented items included if they match pattern
- Output: `['Learning with dash', 'Learning with asterisk', 'Indented learning', 'Another dash learning']`

#### Edge Case 8: Special Characters in Content

**Content**:

```markdown
---
title: "Entry with 'quotes' and \"escapes\""
description: Content with <html> and & special chars
---

## Overview

Content with special characters: < > & " ' 
Code snippet: `const x = 'test';`
```

**Expected Behavior**:

- Quotes properly escaped in generated JavaScript
- HTML characters preserved as-is (React will handle escaping)
- Backticks and code preserved
- No script injection possible

#### Edge Case 9: Large File (100+ Bullet Points)

**Expected Behavior**:

- All 100 items parsed into array
- Processing completes in under 500ms (per **PERF-002**)
- No memory issues
- Array properly serialized to JSON

## 10. Validation Criteria

### Build Validation

- **VAL-001**: `npm run build` completes without errors.
- **VAL-002**: Generated `dist/` includes no `.md` files.
- **VAL-003**: All virtual modules are resolved and inlined into JavaScript bundles.

#### Build-time Validation Procedures

1. **Plugin Registration**
   - Run `npm run build`
   - Check build output for plugin name in plugin list
   - Verify no errors related to virtual module resolution

2. **Virtual Module Generation**
   - Run `npm run dev`
   - Import `virtual:*-data` in a test file
   - Verify TypeScript autocomplete works
   - Check browser console for data array

3. **Content Processing**
   - Add new markdown file to respective `content/` directory
   - Run build
   - Verify new entry appears in generated array
   - Confirm ID matches file path pattern

4. **HMR Functionality**
   - Start dev server
   - Edit existing markdown file
   - Save file
   - Verify browser updates within 100ms without manual refresh

### Type Validation

- **VAL-004**: `npm run type-check` (or `tsc --noEmit`) passes with zero errors.
- **VAL-005**: IDE shows no TypeScript errors when importing `virtual:*-data` modules.

#### Type Safety Validation Procedures

1. **TypeScript Compilation**
   - Run `npm run type-check`
   - Verify no errors in files importing virtual modules
   - Confirm autocomplete works for data item properties

2. **Interface Compliance**
   - Generate data from markdown
   - Validate each item has all required interface fields
   - Verify enum values are valid
   - Confirm nested object structures match interfaces

### Content Validation

- **VAL-006**: All portfolio sections on deployed site display content from Markdown sources.
- **VAL-007**: Projects section cards match data in `content/3-projects/*.md`.
- **VAL-008**: Skills are grouped by category as defined in Markdown.
- **VAL-009**: Contact methods include synthesized URLs (mailto, tel) where applicable.

### Performance Validation

- **VAL-010**: Lighthouse performance score ≥90 on production deployment.
- **VAL-011**: Client bundle does not include `gray-matter` or other build-time dependencies.
- **VAL-012**: Time-to-Interactive (TTI) <2.5s on 4G connection (Lighthouse metric).

### Accessibility Validation

- **VAL-013**: Lighthouse accessibility score ≥90.
- **VAL-014**: Automated `axe-core` tests pass (zero violations).
- **VAL-015**: All images have `alt` attributes (enforced by linter or parser validation).

## 11. Related Specifications / Further Reading

### Internal Documentation

- `spec/docs-content-sections-spec.md` - Detailed schema for individual content sections
- `content/md-content.md` - High-level system design overview
- `content/learningJourney/LearningJourney.md` - Learning Journey implementation plan
- `README.md` - Project overview and quick start

### External References

- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html) - Official Vite plugin documentation
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - YAML frontmatter parsing library
- [Virtual Modules in Vite](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention) - Virtual module conventions
- [TypeScript Module Augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) - Declaring virtual modules

### Performance & Accessibility Standards

- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/) - Understanding Lighthouse metrics
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1&levels=aa) - Accessibility standards
- [Web Vitals](https://web.dev/vitals/) - Core Web Vitals metrics

### Architecture Patterns

- [Pipeline Pattern](https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html) - Sequential data processing pattern
- [Virtual Filesystem Pattern](https://en.wikipedia.org/wiki/Virtual_file_system) - In-memory file system abstraction
- [Builder Pattern](https://refactoring.guru/design-patterns/builder) - Object construction pattern

### Markdown & YAML Standards

- [YAML Specification](https://yaml.org/spec/1.2/spec.html) - Official YAML spec
- [Markdown Spec (CommonMark)](https://spec.commonmark.org/) - Standardized Markdown specification
- [TypeScript Module Declarations](https://www.typescriptlang.org/docs/handbook/modules.html) - Module declaration documentation

---

**Version**: 1.0 | **Status**: Active | **Last Updated**: Dec 09 2025 - 10:15
