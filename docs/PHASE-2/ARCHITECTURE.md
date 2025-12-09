---
title: "Project Architecture Blueprint - Markdown-Driven Content Pipeline System"
source: ""
author: "Growth Journey Portfolio Team"
post_slug: "project-architecture-blueprint"
categories: ["Architecture", "Documentation", "Content Pipeline"]
tags: ["architecture", "vite", "markdown", "build-system", "typescript", "content-management"]
ai_note: "Generated architecture blueprint aligning with Project Specification and Technology Stack. Uses ASCII diagrams per workspace conventions. References requirement IDs from specification documents."
summary: "Comprehensive architecture blueprint for the Markdown-Driven Content Pipeline System, detailing layered system architecture, component design, build pipelines, cross-cutting concerns, and quality gates for the Growth Journey Portfolio."
date: 2025-12-09
---

# Project Architecture Blueprint

## Architecture Overview & Drivers

### System Scope

The Growth Journey Portfolio implements a modern content pipeline architecture that transforms static portfolio content from hardcoded TypeScript files into a flexible, file-based content management system. The architecture is built on Vite's build system with custom plugins that parse Markdown files at build time and expose content through type-safe virtual modules.

**Core Architecture Pattern:** JAMstack (JavaScript, APIs, Markup)

- **JavaScript:** React 18+ with TypeScript 5+ for UI components
- **APIs:** Build-time content transformation (no runtime APIs)
- **Markup:** Markdown files with YAML frontmatter for content authoring

### Business Goals to Technical Requirements Mapping

| Business Goal | Requirement IDs | Technology Layers | Implementation Strategy |
|---------------|----------------|-------------------|------------------------|
| Enable friction-free content updates | REQ-001, REQ-004 | Content Layer, Processing Layer | Markdown files + HMR for instant preview |
| Maintain 90+ Lighthouse scores | PERF-001, PERF-004 | Build Layer, Delivery Layer | Build-time parsing, zero runtime overhead |
| Preserve type safety | REQ-003, REQ-008 | Processing Layer, Runtime Layer | TypeScript virtual module declarations |
| Support AI-assisted workflows | REQ-001, REQ-005 | Content Layer | Structured Markdown with validation |
| Ensure accessibility (WCAG AA) | A11Y-001, A11Y-002 | Presentation Layer | Semantic HTML, ARIA attributes |
| Secure content pipeline | SEC-001, SEC-002, SEC-003 | Processing Layer | Path validation, content sanitization |
| Fast development feedback | REQ-004, PERF-003 | Automation Layer | HMR <100ms, incremental builds |

### Atomic Design Goals

The system follows Atomic Design methodology (PAT-005) to ensure component reusability and maintainability:

- **Atoms:** Basic UI elements (buttons, inputs, icons)
- **Molecules:** Simple component groups (cards, navigation items)
- **Organisms:** Complex UI sections (hero section, project grid)
- **Templates:** Page layouts with placeholder content
- **Pages:** Actual portfolio pages with real content

## Layered System Architecture

### Architecture Layer Overview

The system is organized into six distinct layers, each with specific responsibilities and technologies:

```
┌─────────────────────────────────────────────────────────────┐
│                     DELIVERY LAYER                          │
│  Vercel CDN · Edge Network · Static Assets · HTTPS         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                        │
│  React 18+ · Tailwind CSS · Framer Motion · Semantic HTML  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      BUILD LAYER                            │
│  Vite 5+ · TypeScript 5+ · Custom Plugins · Virtual Modules│
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT LAYER                            │
│  Markdown Files · YAML Frontmatter · File System Structure │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   AUTOMATION LAYER                          │
│  GitHub Actions · Lighthouse CI · Testing · Validation     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  DEVELOPMENT LAYER                          │
│  VSCode · Git · npm · Node.js 18+ · Dev Server             │
└─────────────────────────────────────────────────────────────┘
```

### Layer 1: Delivery Layer

**Purpose:** Serve optimized static assets to end users with minimal latency

**Key Technologies:**

- Vercel Edge Network (global CDN)
- HTTP/2 and HTTP/3 support
- Brotli and Gzip compression
- Automatic HTTPS with TLS 1.3

**Primary Responsibilities:**

- Asset caching and cache invalidation
- Edge routing and request handling
- Security headers (CSP, HSTS, X-Frame-Options)
- Performance optimization (compression, minification results)

**Requirement Alignment:**

- PERF-001: Fast delivery of optimized bundles
- SEC-003: HTTPS enforcement for security
- Deployment to Vercel (CON-005)

### Layer 2: Presentation Layer

**Purpose:** Render accessible, performant user interface

**Key Technologies:**

- React 18.2+ (component library)
- TypeScript 5+ (type safety)
- Tailwind CSS 3.4+ (utility-first styling)
- Framer Motion 11+ (animations)

**Primary Responsibilities:**

- Component rendering and lifecycle management
- State management for UI interactions
- Accessibility features (ARIA, keyboard navigation)
- Responsive design across devices
- Progressive enhancement

**Requirement Alignment:**

- A11Y-001: Semantic HTML structure (REQ references in components)
- A11Y-002: Alt text enforcement for images
- PERF-004: No runtime Markdown parsers bundled
- PAT-005: Atomic Design component organization

**Component Structure:**

```
src/components/
├── atoms/          # Basic UI elements
│   ├── Button.tsx
│   ├── Icon.tsx
│   └── Badge.tsx
├── molecules/      # Simple composites
│   ├── Card.tsx
│   ├── NavLink.tsx
│   └── SkillBadge.tsx
├── organisms/      # Complex sections
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ProjectGrid.tsx
├── sections/       # Page sections (organisms)
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── BlogsSection.tsx
│   ├── ContactSection.tsx
│   └── JourneyTimeline.tsx
└── layout/         # Templates
    ├── Navigation.tsx
    └── Footer.tsx
```

### Layer 3: Build Layer

**Purpose:** Transform source files into optimized production bundles

**Key Technologies:**

- Vite 5.4+ (build tool and dev server)
- TypeScript Compiler 5.3+ (type checking)
- Custom Vite Plugins (content transformation)
- ESBuild (bundling and minification)

**Primary Responsibilities:**

- Virtual module generation from Markdown content
- TypeScript compilation and type checking
- Asset optimization (code splitting, tree shaking)
- Development server with HMR
- Production build optimization

**Requirement Alignment:**

- REQ-002: Vite plugin hooks for content parsing
- REQ-003: Type-safe virtual module generation
- REQ-004: HMR support for instant preview
- PERF-001: Build processing <2s for 100 files
- PERF-002: Virtual module generation <500ms
- PERF-003: HMR updates <100ms

**Plugin Architecture:**

```
src/vite/
├── contentDataPlugin.ts    # 6 content sections
│   ├── resolveId Hook      # Map virtual:*-data to internal IDs
│   ├── load Hook           # Parse Markdown, generate modules
│   └── handleHotUpdate     # Invalidate cache on file changes
│
└── journeyDataPlugin.ts    # Learning Journey section
    ├── resolveId Hook
    ├── load Hook
    └── handleHotUpdate

Virtual Modules Generated:
├── virtual:home-data
├── virtual:about-data
├── virtual:skills-data
├── virtual:projects-data
├── virtual:blogs-data
├── virtual:contact-data
└── virtual:learning-journey-data
```

### Layer 4: Content Layer

**Purpose:** Store and organize portfolio content in human-readable format

**Key Technologies:**

- Markdown (CommonMark specification)
- YAML (frontmatter metadata)
- File system (structured directory layout)
- Git (version control for content)

**Primary Responsibilities:**

- Content authoring and storage
- Metadata definition via frontmatter
- Content organization by section
- Version control for content changes

**Requirement Alignment:**

- REQ-001: All content sourced from Markdown files
- REQ-010: Skip `*spec.md` files from processing
- DQ-001 to DQ-004: Data quality enforcement
- SEC-001: File access restricted to `content/` directory

**Directory Structure:**

```
content/
├── 1-home/
│   └── hero.md                    # Landing page content
├── 2-about/
│   └── About.md                   # Personal narrative
├── 2.5-skills/
│   ├── react.md                   # Individual skill files
│   ├── typescript.md
│   └── networking.md
├── 3-projects/
│   ├── project-portfolio.md       # Project showcases
│   ├── project-ecommerce.md
│   └── project-network-monitor.md
├── 5-blogs/
│   ├── blog-content-pipeline.md   # Blog metadata
│   └── blog-career-transition.md
├── 6-contact/
│   └── Contact.md                 # Contact methods
└── learningJourney/
    ├── term-1/
    │   ├── career-start.md
    │   └── college-return.md
    └── term-2/
        ├── leetcode-journey.md
        └── tryhackme-security.md
```

### Layer 5: Automation Layer

**Purpose:** Ensure code quality, performance, and deployment automation

**Key Technologies:**

- GitHub Actions (CI/CD workflows)
- Vitest (unit testing)
- Playwright (E2E testing)
- Lighthouse CI (performance auditing)
- ESLint + Prettier (code quality)

**Primary Responsibilities:**

- Automated testing (unit, integration, E2E)
- Performance validation (Lighthouse scores ≥90)
- Code quality checks (linting, formatting)
- Build validation and deployment
- Test coverage reporting

**Requirement Alignment:**

- Testing requirements from specification Section 7
- Performance budgets (PERF-001, PERF-002, PERF-003)
- Accessibility validation (A11Y-001, A11Y-002)
- Security checks (SEC-001, SEC-002, SEC-003)

**CI/CD Pipeline:**

```
GitHub Push/PR
      ↓
┌─────────────────┐
│  Code Quality   │ → ESLint, Prettier, TypeScript check
└─────────────────┘
      ↓
┌─────────────────┐
│  Unit Tests     │ → Vitest (80% coverage target)
└─────────────────┘
      ↓
┌─────────────────┐
│  Build          │ → Vite production build
└─────────────────┘
      ↓
┌─────────────────┐
│  Integration    │ → Plugin hooks, virtual modules
└─────────────────┘
      ↓
┌─────────────────┐
│  E2E Tests      │ → Playwright (7 sections)
└─────────────────┘
      ↓
┌─────────────────┐
│  Lighthouse CI  │ → Performance ≥90, A11y ≥90
└─────────────────┘
      ↓
┌─────────────────┐
│  Deploy         │ → Vercel (if all checks pass)
└─────────────────┘
```

### Layer 6: Development Layer

**Purpose:** Provide developer tools and environment for efficient workflow

**Key Technologies:**

- Node.js 18+ (runtime environment)
- npm 9+ (package management)
- VSCode (IDE with extensions)
- Git (version control)
- Vite Dev Server (local development)

**Primary Responsibilities:**

- Local development environment
- Package dependency management
- Code editing with IntelliSense
- Hot Module Replacement during development
- Git workflow and branching

**Requirement Alignment:**

- REQ-004: HMR for instant content preview
- Developer experience guidelines (GUD-001 to GUD-006)
- Workspace conventions from `.github/copilot-instructions.md`

## Content & Build Pipelines

### Content Ingestion to Deployment Flow

The system follows a sequential pipeline from content authoring to production deployment:

**Pipeline Stages:**

1. **Content Authoring** → Developer/AI writes Markdown files
2. **File Discovery** → Vite plugin scans `content/` directory
3. **Content Parsing** → YAML frontmatter + Markdown sections extracted
4. **Validation** → Required fields checked, schema compliance verified
5. **Transformation** → Raw data converted to typed structures
6. **Module Generation** → Virtual modules created with exports
7. **Type Checking** → TypeScript validates virtual module usage
8. **Bundling** → Vite bundles code with inlined content data
9. **Testing** → Unit, integration, E2E tests run
10. **Performance Audit** → Lighthouse CI validates scores
11. **Deployment** → Static assets deployed to Vercel CDN

### Content Processing Pipeline (Build Time)

```
Markdown File (content/3-projects/project-portfolio.md)
    ↓
[File Discovery]
    ├── Recursive directory scan
    ├── Filter out *spec.md files (REQ-010)
    └── Return array of file paths
    ↓
[File Reading]
    ├── fs.readFileSync() (synchronous)
    ├── UTF-8 encoding
    └── Security validation (SEC-001)
    ↓
[Frontmatter Parsing]
    ├── gray-matter library
    ├── Extract YAML metadata
    ├── Validate required fields (REQ-005)
    └── Handle malformed YAML (DQ-003)
    ↓
[Section Splitting]
    ├── Split by ## headings
    ├── Extract content blocks
    └── Normalize section names
    ↓
[Bullet Extraction]
    ├── Find lines starting with - or *
    ├── Convert to string arrays (REQ-006)
    └── Return structured data
    ↓
[Data Enrichment]
    ├── Generate slug from filename (REQ-009)
    ├── Add icon/color based on category
    ├── Normalize enum values (REQ-008, DQ-001)
    └── Apply default values (REQ-007)
    ↓
[Virtual Module Generation]
    ├── Serialize to JavaScript
    ├── Generate export statement (REQ-003)
    └── Return module code string
    ↓
[Type Checking]
    ├── TypeScript validates against interfaces
    ├── Virtual module declaration matched
    └── Compile-time type safety
    ↓
Virtual Module: virtual:projects-data
    export const projectsData: ProjectDataItem[] = [...]
```

### Pipeline Input/Output Table

| Stage | Input | Output | Tooling | Requirements |
|-------|-------|--------|---------|--------------|
| File Discovery | Directory path | File path array | Node.js fs module | REQ-010, SEC-001 |
| File Reading | File path | Raw content string | fs.readFileSync | SEC-001 |
| Frontmatter Parse | Raw content | { data, content } | gray-matter | REQ-005, GUD-001 |
| Section Splitting | Markdown content | Section map | Custom utility | REQ-006 |
| Bullet Extraction | Section text | String array | Custom utility | REQ-006 |
| Data Enrichment | Parsed data | Typed object | Parser functions | REQ-007, REQ-008, REQ-009 |
| Module Generation | Typed object | JS module code | Virtual module API | REQ-003 |
| Type Checking | Module code | Compilation result | TypeScript | REQ-003 |

## Component & Presentation Architecture

### Atomic Design Implementation

The component architecture follows Atomic Design principles (PAT-005) with strict separation of concerns:

**Atoms (Basic Elements):**

- `Button.tsx` - Interactive button with variants
- `Icon.tsx` - SVG icon wrapper with accessibility
- `Badge.tsx` - Status/category indicator
- `Input.tsx` - Form input with validation
- `Link.tsx` - Navigation link with active state

**Molecules (Simple Composites):**

- `Card.tsx` - Content container with styling
- `NavLink.tsx` - Navigation item with active indicator
- `SkillBadge.tsx` - Skill with proficiency indicator
- `ProjectCard.tsx` - Project preview card
- `BlogCard.tsx` - Blog post preview

**Organisms (Complex Sections):**

- `Navigation.tsx` - Main navigation bar with logo
- `Footer.tsx` - Site footer with links
- `ProjectGrid.tsx` - Grid of project cards
- `SkillsGrid.tsx` - Categorized skill display
- `Timeline.tsx` - Learning journey timeline

**Templates (Page Layouts):**

- `MainLayout.tsx` - Standard page wrapper
- `SectionLayout.tsx` - Content section wrapper

**Pages (Actual Routes):**

- `App.tsx` - Single-page application root

### Semantic HTML & BEM Conventions

**Semantic HTML Structure (A11Y-001):**

```html
<!-- Section structure -->
<section id="projects" aria-labelledby="projects-heading">
  <h2 id="projects-heading">Projects</h2>
  
  <div role="list" aria-label="Portfolio projects">
    <article role="listitem">
      <h3>Project Title</h3>
      <p>Project description</p>
      <nav aria-label="Project links">
        <a href="..." rel="noopener noreferrer">Demo</a>
        <a href="..." rel="noopener noreferrer">Source</a>
      </nav>
    </article>
  </div>
</section>
```

**BEM Naming (Block Element Modifier):**

```css
/* Block */
.project-card { }

/* Element */
.project-card__title { }
.project-card__description { }
.project-card__tech-list { }

/* Modifier */
.project-card--featured { }
.project-card--archived { }
```

**Tailwind CSS Integration:**

Tailwind utilities are used alongside BEM for rapid development while maintaining semantic class names where needed.

### Progressive Enhancement Strategy

The architecture supports progressive enhancement to ensure baseline functionality without JavaScript:

1. **HTML First:** Semantic markup renders content without styles
2. **CSS Enhancement:** Tailwind provides styling and layout
3. **JavaScript Enhancement:** React adds interactivity and animations
4. **Animation Layer:** Framer Motion adds polish (non-critical)

**Example: Navigation**

- **Baseline:** HTML anchor links work without JavaScript
- **Enhanced:** React Router provides client-side navigation
- **Polished:** Smooth scroll animations with Framer Motion

### Accessibility Implementation

**Keyboard Navigation (A11Y-001):**

- Tab order follows visual hierarchy
- Focus indicators visible on all interactive elements
- Skip links for main content
- Escape key closes modals/menus

**Screen Reader Support (A11Y-001, A11Y-002):**

- ARIA labels on all interactive elements
- ARIA landmarks for page regions
- Alt text required for all images (enforced at parse time)
- Heading hierarchy follows semantic structure

**Code Example:**

```tsx
// HeroSection.tsx - Accessibility features
<section 
  id="home" 
  aria-labelledby="hero-heading"
  className="hero-section"
>
  <h1 id="hero-heading" className="sr-only">
    {homeData.title}
  </h1>
  
  <div role="banner">
    <p className="text-4xl font-bold">{homeData.subtitle}</p>
  </div>
  
  <nav aria-label="Primary actions">
    <a 
      href={homeData.ctaPrimary.href}
      className="btn-primary"
      aria-describedby="cta-description"
    >
      {homeData.ctaPrimary.label}
    </a>
  </nav>
</section>
```

## Data & Metadata Architecture

### Front Matter Schema

Content metadata is defined using YAML frontmatter at the top of each Markdown file. The schema varies by content section but follows consistent patterns.

**Home/Hero Schema:**

```yaml
---
title: "Growth Journey Portfolio"
subtitle: "Building performant, accessible web experiences"
ctaPrimary:
  label: "View Projects"
  href: "#projects"
ctaSecondary:
  label: "Contact Me"
  href: "#contact"
highlights:
  - "Performance-first development"
  - "WCAG AA accessibility"
  - "React 18 + TypeScript"
badges:
  - "Lighthouse 90+"
  - "100% Type Safe"
social:
  - label: "GitHub"
    href: "https://github.com/username"
  - label: "LinkedIn"
    href: "https://linkedin.com/in/username"
---
```

**Projects Schema:**

```yaml
---
title: "Portfolio V2"
description: "Modern portfolio with Markdown content pipeline"
technologies:
  - React
  - Vite
  - TypeScript
  - Tailwind CSS
gradient: "from-blue-500 to-purple-600"
demoUrl: "https://portfolio.example.com"
sourceUrl: "https://github.com/username/portfolio"
image: "/projects/portfolio-screenshot.png"
status: "live"
---
```

### TypeScript Interface Mapping

Each content section has corresponding TypeScript interfaces that map to frontmatter fields:

```typescript
// src/types/index.ts

interface HomeData {
  id: string;                    // Generated from filename
  title: string;                 // Required
  subtitle?: string;             // Optional
  ctaPrimary?: CTAButton;        // Optional
  ctaSecondary?: CTAButton;      // Optional
  highlights?: string[];         // Optional
  badges?: string[];             // Optional
  social?: SocialLink[];         // Optional
  body?: string;                 // Markdown content
}

interface ProjectDataItem {
  id: string;                    // Generated (REQ-009)
  title: string;                 // Required
  description: string;           // Required
  technologies: string[];        // Required
  gradient?: string;             // Optional
  demoUrl?: string;              // Optional
  sourceUrl?: string;            // Optional
  image?: string;                // Optional
  highlights?: string[];         // Optional (from ## Highlights)
  status?: 'wip' | 'live' | 'archived';  // Optional enum (REQ-008)
}

interface SkillDataItem {
  id: string;                    // Generated
  name: string;                  // Required
  category: SkillCategory;       // Enum with default (DQ-001)
  proficiency: ProficiencyLevel; // Enum with default
  icon?: string;                 // Optional (auto-generated)
  description?: string;          // Optional
}

type SkillCategory = 'dev' | 'network' | 'data' | 'ai' | 'tools' | 'learning';
type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';
```

### Metadata Field Usage in Components

| Frontmatter Field | Component Usage | Validation | Default Behavior |
|-------------------|-----------------|------------|------------------|
| `title` | Page heading, SEO meta | Required (REQ-005) | Build warning if missing |
| `description` | Card text, SEO meta | Required for projects/blogs | Build warning if missing |
| `technologies` | Tech badge list | Array normalization | Empty array if missing |
| `status` | Status indicator | Enum validation (REQ-008) | Default: 'live' |
| `category` | Section grouping | Enum validation | Default: 'learning' (DQ-001) |
| `proficiency` | Skill level indicator | Enum validation | Default: 'beginner' |
| `url` | External link | URL synthesis for email/phone | Auto-generate mailto:/tel: |
| `image` | Project thumbnail | Alt text required (A11Y-002) | Skip if missing |

### Validation Strategy (AJV Integration)

Content validation occurs at build time using schema validation and TypeScript type checking:

**Validation Layers:**

1. **YAML Parsing Validation** → gray-matter handles malformed YAML (DQ-003)
2. **Required Field Validation** → Parser functions check required fields (REQ-005)
3. **Type Validation** → TypeScript compiler validates interface compliance (REQ-003)
4. **Enum Validation** → Parser functions validate enum values (REQ-008, DQ-001)
5. **Data Quality Checks** → Ensure arrays vs null/undefined (DQ-004)

**Error Reporting Workflow:**

```
Content File with Invalid Data
    ↓
[Parser Function]
    ├── Check required fields
    ├── Missing field detected
    └── Log warning: "Missing required field 'title' in hero.md"
    ↓
[Return Behavior]
    ├── Return null for invalid single-file content
    ├── Skip item in multi-file collections
    └── Build continues (no crash)
    ↓
[TypeScript Compilation]
    ├── Validate virtual module exports
    ├── Type mismatch detected
    └── Compilation error (build fails)
    ↓
[Developer Action Required]
    ├── Review build warnings/errors
    ├── Fix content file
    └── Re-run build
```

## Cross-Cutting Concerns

### Accessibility (WCAG AA Compliance)

**Requirements Addressed:** A11Y-001, A11Y-002

**Implementation Strategies:**

1. **Semantic HTML Structure**
   - All sections use proper heading hierarchy (h1 → h2 → h3)
   - Landmark regions (header, main, nav, footer, section)
   - Lists use ul/ol with li elements
   - Forms use label elements with htmlFor attributes

2. **ARIA Attributes**
   - aria-label on interactive elements without visible text
   - aria-labelledby on sections referencing heading IDs
   - aria-describedby for additional context
   - role attributes for custom components

3. **Keyboard Navigation**
   - All interactive elements reachable via Tab key
   - Tab order follows visual hierarchy
   - Focus indicators visible (outline, border, background change)
   - Skip links for main content navigation
   - Escape key dismisses modals/overlays

4. **Screen Reader Support**
   - Alt text required on all images (enforced at parse time)
   - Visually hidden text for context (.sr-only class)
   - Descriptive link text (avoid "click here")
   - Form error messages announced to screen readers

5. **Color and Contrast**
   - Minimum 4.5:1 contrast ratio for normal text
   - Minimum 3:1 for large text (18pt+)
   - Color is not the only indicator (icons + text)
   - Tailwind CSS classes for accessible color pairs

**Validation:**

- Lighthouse CI accessibility score ≥90
- Playwright E2E tests for keyboard navigation
- Manual testing with NVDA/JAWS screen readers

### Performance Budgets

**Requirements Addressed:** PERF-001, PERF-002, PERF-003, PERF-004

**Performance Targets:**

| Metric | Target | Requirement | Enforcement |
|--------|--------|-------------|-------------|
| Build Processing | <2s for 100 files | PERF-001 | Unit tests, CI checks |
| Virtual Module Gen | <500ms per section | PERF-002 | Integration tests |
| HMR Update Latency | <100ms | PERF-003 | Manual verification |
| Client Bundle Size | 0KB Markdown parsers | PERF-004 | Bundle analysis |
| First Contentful Paint | <1.8s | Lighthouse | Lighthouse CI |
| Largest Contentful Paint | <2.5s | Lighthouse | Lighthouse CI |
| Cumulative Layout Shift | <0.1 | Lighthouse | Lighthouse CI |
| Total Blocking Time | <300ms | Lighthouse | Lighthouse CI |
| Lighthouse Performance | ≥90 | Lighthouse | Lighthouse CI (blocking) |

**Optimization Strategies:**

1. **Build-Time Processing**
   - All Markdown parsing at build time (PERF-004)
   - gray-matter not bundled in client code
   - Content data inlined as JavaScript constants

2. **Code Splitting**
   - Route-based splitting (future enhancement)
   - Component lazy loading for non-critical UI
   - Dynamic imports for heavy dependencies

3. **Asset Optimization**
   - Image optimization (WebP, AVIF formats)
   - SVG optimization with SVGO
   - Font subsetting for web fonts
   - Critical CSS inlining

4. **Caching Strategy**
   - Immutable assets with content hashing
   - Service worker for offline support (future)
   - Vercel CDN edge caching

### Security Implementation

**Requirements Addressed:** SEC-001, SEC-002, SEC-003

**Security Measures:**

1. **File System Security (SEC-001)**
   - File reading restricted to `content/` directory
   - Path validation prevents directory traversal (../)
   - Absolute paths outside project rejected
   - Symlinks not followed outside content directory

2. **Content Sanitization (SEC-002)**
   - No dangerouslySetInnerHTML without sanitization
   - Markdown rendering (future) uses DOMPurify
   - User input (if added) sanitized before storage
   - XSS prevention through React's default escaping

3. **External Link Security (SEC-003)**
   - All external links open in new tabs (target="_blank")
   - rel="noopener noreferrer" on external links
   - HTTPS enforcement for external resources

4. **Security Headers**
   - Content Security Policy (CSP) via Vercel headers
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: restrictive defaults

**Vercel Configuration (vercel.json):**

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
        }
      ]
    }
  ]
}
```

### Caching Strategies

**Build Output Caching:**

- Vite generates content-hashed filenames (e.g., `main.abc123.js`)
- Immutable assets cached indefinitely
- HTML entry point has short cache (5 minutes)

**Vercel Edge Caching:**

- Static assets cached at edge nodes globally
- Cache invalidation on new deployment
- Stale-while-revalidate for better UX

**Development Caching:**

- Vite dev server caches node_modules
- Virtual modules not cached (invalidated on file change)
- HMR preserves module graph for fast updates

## CI/CD, Testing, and Quality Gates

### Pipeline Overview

The CI/CD pipeline enforces quality gates before deployment, ensuring all code meets standards defined in the specification.

**GitHub Actions Workflows:**

1. **PR Checks Workflow** (`test.yml`)
   - Triggered on: Pull requests to main branch
   - Jobs: Lint, Type Check, Unit Tests, Build
   - Required for merge approval

2. **Main Branch Workflow** (`deploy.yml`)
   - Triggered on: Push to main branch
   - Jobs: All PR checks + Integration Tests + E2E Tests + Lighthouse CI
   - Auto-deploys to Vercel on success

3. **Scheduled Workflow** (`lighthouse-schedule.yml`)
   - Triggered on: Daily at 00:00 UTC
   - Jobs: Lighthouse CI on production URL
   - Monitors performance regression

### Pipeline Stages Detail

**Stage 1: Code Quality**

```yaml
# .github/workflows/test.yml (excerpt)
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint        # ESLint
      - run: npm run format:check # Prettier
```

**Stage 2: Type Checking**

```yaml
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsc --noEmit  # TypeScript compilation
```

**Stage 3: Unit Tests**

```yaml
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

**Stage 4: Build Validation**

```yaml
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - name: Check bundle size
        run: |
          BUNDLE_SIZE=$(du -sb dist | cut -f1)
          if [ $BUNDLE_SIZE -gt 1048576 ]; then
            echo "Bundle too large: $BUNDLE_SIZE bytes"
            exit 1
          fi
```

**Stage 5: Integration Tests**

```yaml
  integration-tests:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:integration
```

**Stage 6: E2E Tests**

```yaml
  e2e-tests:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run preview &
      - run: npm run test:e2e
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

**Stage 7: Lighthouse CI**

```yaml
  lighthouse:
    runs-on: ubuntu-latest
    needs: [build, e2e-tests]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - name: Run Lighthouse CI
        run: npx @lhci/cli@latest autorun
      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-report
          path: .lighthouseci/
```

**Stage 8: Deploy**

```yaml
  deploy:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, unit-tests, integration-tests, e2e-tests, lighthouse]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Test Alignment Matrix

| Pipeline Stage | Tools | Requirement Coverage | Pass Criteria |
|----------------|-------|---------------------|---------------|
| Lint | ESLint, Prettier | Code quality, consistency | Zero errors, zero warnings |
| Type Check | TypeScript | REQ-003, REQ-008 | Zero type errors |
| Unit Tests | Vitest | REQ-005, REQ-006, PERF-001, PERF-002 | ≥80% coverage, all tests pass |
| Build | Vite | REQ-002, PERF-001, PERF-004 | Build success, <1MB bundle |
| Integration | Vitest + Vite | REQ-002, REQ-003, PERF-003 | All plugin hooks tested |
| E2E | Playwright | A11Y-001, A11Y-002, SEC-003 | All user journeys pass |
| Lighthouse | Lighthouse CI | PERF-001, PERF-003, A11Y-001 | All scores ≥90 |
| Deploy | Vercel | CON-005 | Deployment success |

### Quality Gates (Blocking)

The following conditions **MUST** be met before code can be merged or deployed:

1. ✅ ESLint passes with zero errors
2. ✅ Prettier formatting check passes
3. ✅ TypeScript compilation succeeds (no type errors)
4. ✅ Unit tests pass with ≥80% code coverage
5. ✅ Build completes successfully
6. ✅ Integration tests pass
7. ✅ E2E tests pass
8. ✅ Lighthouse Performance score ≥90
9. ✅ Lighthouse Accessibility score ≥90
10. ✅ Lighthouse Best Practices score ≥90
11. ✅ Lighthouse SEO score ≥90

**Failure Handling:**

- PR cannot be merged if any gate fails
- GitHub Actions status check blocks merge
- Developer receives detailed error report
- Artifacts (test reports, screenshots) uploaded for debugging

## Extension & Evolution Strategy

### Adding New Content Sections

**Process for adding a new content section (e.g., "Testimonials"):**

1. **Define Schema** (EPIC-002-F1)
   - Add TypeScript interface in `src/types/index.ts`
   - Define frontmatter structure
   - Document required vs optional fields

2. **Update Plugin** (EPIC-001-F4)
   - Add parser function to `contentDataPlugin.ts`
   - Implement section-specific parsing logic
   - Add virtual module identifier

3. **Create Virtual Module Declaration** (EPIC-001-F7)
   - Add module declaration in `src/types/virtual-modules.d.ts`
   - Export typed constant

4. **Create Content Files** (EPIC-002-F2)
   - Create directory: `content/7-testimonials/`
   - Add Markdown files with frontmatter

5. **Build Component** (EPIC-002-F4)
   - Create `TestimonialsSection.tsx`
   - Import virtual module data
   - Render content with accessibility features

6. **Add Tests** (EPIC-003)
   - Unit tests for parser function
   - Integration tests for virtual module
   - E2E tests for section rendering

**Constraint Compliance:**

- No breaking changes to existing sections (CON-002)
- Type safety maintained (REQ-003)
- Performance budgets respected (PERF-001)

### Component Addition Guidelines

**Atomic Design Placement:**

- **Atom:** Reusable UI element (button, icon, input)
- **Molecule:** Composition of atoms (card, nav item)
- **Organism:** Section-level component (navigation, footer, content section)

**Component Checklist:**

- [ ] TypeScript with strict mode enabled
- [ ] Props interface defined and exported
- [ ] JSDoc comments on public functions
- [ ] Accessibility attributes (ARIA, keyboard)
- [ ] Responsive design (mobile-first)
- [ ] Unit tests for logic
- [ ] Storybook story (future enhancement)

### Refactoring Guidelines

**When refactoring existing code:**

1. **Maintain Type Safety**
   - Preserve existing TypeScript interfaces
   - Update types if data structure changes
   - Run `npx tsc --noEmit` to verify

2. **Preserve Backward Compatibility**
   - Existing virtual module exports must not change
   - Component props can be extended but not removed
   - Fallback behavior for missing data

3. **Test Coverage**
   - Update tests to reflect changes
   - Maintain ≥80% coverage threshold
   - Add integration tests for new interactions

4. **Documentation Updates**
   - Update JSDoc comments
   - Update specification documents
   - Add ADR entry for significant decisions

### AI-Assisted Contribution Workflow

**Guidelines from `.github/copilot-instructions.md`:**

1. **Plan Before Implementation**
   - Present plan and wait for CONFIRM or PROCEED
   - Ask clarifying questions when unclear
   - Break complex tasks into smaller steps

2. **Code Generation**
   - Explain rationale before coding
   - Start simple, layer complexity gradually
   - Include helpful comments for learning

3. **Testing**
   - Generate tests alongside implementation
   - Cover edge cases and error scenarios
   - Validate against specification requirements

4. **Documentation**
   - Add JSDoc to all functions
   - Link to relevant specification sections
   - Include file footer: `{Version} | {status} | {Last Updated: MMM DD YYYY - HH:MM}`

5. **Commit Messages**
   - Follow Conventional Commits format
   - Reference requirement IDs when applicable
   - Use types: feat, fix, docs, refactor, test, chore

**AI Agent Best Practices:**

- Read specification documents before making changes
- Validate changes against requirement IDs
- Run tests after implementation
- Suggest architectural improvements when appropriate

## Architectural Decision Log

### ADR-001: Build-Time vs Runtime Content Parsing

**Context:**

Portfolio content needs to be transformed from Markdown to data structures consumable by React components. Two approaches considered: runtime parsing in browser or build-time parsing during Vite build.

**Decision:**

Use build-time parsing with Vite plugins to generate virtual modules.

**Status:** Accepted

**Rationale:**

- **Performance:** Eliminates 50KB+ gray-matter library from client bundle (PERF-004)
- **Type Safety:** Build-time allows TypeScript type checking of content data (REQ-003)
- **Developer Experience:** HMR provides instant feedback without runtime overhead (REQ-004)
- **Simplicity:** Components import typed data, no parsing logic in UI layer

**Consequences:**

- ✅ Zero runtime overhead for content parsing
- ✅ Full TypeScript type safety for content
- ✅ Fast HMR updates during development
- ⚠️ Content changes require build step (acceptable trade-off)
- ⚠️ More complex build configuration (mitigated by good documentation)

**Follow-Up Actions:**

- Implement Vite plugins with resolveId, load, handleHotUpdate hooks (EPIC-001-F1)
- Create virtual module declarations (EPIC-001-F7)
- Document plugin architecture in specification

### ADR-002: Virtual Modules vs Import Aliases

**Context:**

Vite plugins need to expose parsed content data to React components. Two approaches: virtual modules (`virtual:*-data`) or import aliases (`@content/*`).

**Decision:**

Use virtual modules with null-byte prefix pattern.

**Status:** Accepted

**Rationale:**

- **Vite Native Pattern:** Virtual modules are standard Vite plugin convention
- **Dynamic Generation:** Module code generated in-memory at build time
- **Type Safety:** Virtual module declarations integrate with TypeScript
- **Clear Separation:** virtual: prefix clearly indicates build-time generation

**Consequences:**

- ✅ Follows Vite best practices and conventions
- ✅ Clear distinction between file imports and generated modules
- ✅ TypeScript IntelliSense works with virtual module declarations
- ⚠️ Requires null-byte prefix (`\0`) in plugin implementation
- ⚠️ Developers need to understand virtual module concept

**References:**

- Vite Plugin API documentation: https://vitejs.dev/guide/api-plugin.html
- REQ-002, REQ-003 (virtual module requirements)

### ADR-003: Single Plugin vs Multiple Plugins

**Context:**

Seven content sections need parsing. Should all sections use one plugin or separate plugins per section?

**Decision:**

Use two plugins: `contentDataPlugin.ts` for 6 sections, `journeyDataPlugin.ts` for Learning Journey.

**Status:** Accepted

**Rationale:**

- **Separation of Concerns:** Learning Journey has unique recursive parsing needs
- **Code Organization:** Grouping similar sections (Home, About, Skills, Projects, Blogs, Contact) in one plugin
- **Maintainability:** Easier to understand and modify related code
- **Performance:** No significant difference in build performance

**Consequences:**

- ✅ Clear separation between standard and complex parsing logic
- ✅ Learning Journey parser can be optimized independently
- ✅ Standard sections share common utilities
- ⚠️ Two plugins to maintain instead of one
- ⚠️ Slight duplication of plugin boilerplate code

**Alternatives Considered:**

- **Single Plugin:** Would work but mix concerns
- **Seven Plugins:** Too fragmented, more overhead

### ADR-004: Markdown-First vs CMS Integration

**Context:**

Content management could use Markdown files (file-based) or integrate with headless CMS (Contentful, Sanity, Strapi).

**Decision:**

Use Markdown files with Git version control.

**Status:** Accepted

**Rationale:**

- **Simplicity:** No external dependencies or API calls (CON-005)
- **Developer Workflow:** Content co-located with code in Git repository
- **AI-Friendly:** Markdown easier for AI agents to read/write than CMS APIs
- **Free Hosting:** No CMS subscription or infrastructure costs
- **Version Control:** Git provides full content history and rollback

**Consequences:**

- ✅ Simple, zero-cost content management
- ✅ Full version control with Git
- ✅ Fast builds (no API calls)
- ✅ Works offline (no network dependency)
- ⚠️ No web-based content editing UI (acceptable for solo developer)
- ⚠️ Content updates require Git knowledge (acceptable for target user)

**Future Considerations:**

- Could add CMS later if non-technical editors needed
- MDX could provide more component flexibility (future enhancement)

### ADR-005: TypeScript Strict Mode

**Context:**

TypeScript can run in strict mode (all strict checks enabled) or relaxed mode (some checks disabled).

**Decision:**

Enable TypeScript strict mode for entire project.

**Status:** Accepted

**Rationale:**

- **Type Safety:** Catches more errors at compile time (REQ-003)
- **Code Quality:** Enforces best practices (no implicit any, null checks)
- **Maintainability:** Explicit types make code self-documenting
- **AI Assistance:** Better IntelliSense and autocomplete

**Consequences:**

- ✅ Maximum type safety across codebase
- ✅ Fewer runtime errors due to type mismatches
- ✅ Better IDE support and autocomplete
- ⚠️ More verbose type annotations required
- ⚠️ Steeper learning curve for TypeScript beginners

**Configuration:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

## Risk & Mitigation Register

### Risk 1: HMR Performance Degradation

**Description:** HMR updates may exceed 100ms target as content volume grows.

**Likelihood:** Medium

**Impact:** Medium (affects developer experience)

**Mitigation:**

- Implement efficient file watcher with debouncing
- Cache virtual module generation results
- Invalidate only affected modules, not entire graph
- Monitor HMR latency in development
- Add performance tests for HMR (PERF-003)

**Status:** Open

**Owner:** Build system developer

### Risk 2: TypeScript Type Mismatch Between Virtual Modules and Runtime

**Description:** Virtual module exports might not match TypeScript declarations, causing runtime errors.

**Likelihood:** Low

**Impact:** High (breaks type safety guarantee)

**Mitigation:**

- Integration tests validate virtual module exports
- TypeScript compilation enforced in CI/CD
- Type guards in component code for defensive programming
- Comprehensive unit tests for parser functions
- Regular type checking during development

**Status:** Mitigated

**Owner:** All developers

### Risk 3: Content Validation Gaps

**Description:** Invalid content might slip through validation and cause UI errors.

**Likelihood:** Medium

**Impact:** Medium (broken UI sections)

**Mitigation:**

- Required field validation in parser functions (REQ-005)
- Schema validation with detailed error messages
- Default values for optional fields (REQ-007)
- E2E tests for all content sections
- Content authoring templates and examples

**Status:** Partially Mitigated

**Owner:** Content pipeline developer

### Risk 4: Performance Budget Exceeded

**Description:** Client bundle size might exceed targets as features are added.

**Likelihood:** Medium

**Impact:** High (fails Lighthouse performance score)

**Mitigation:**

- Bundle size checks in CI/CD pipeline
- Code splitting for route-level components
- Tree shaking enabled in production builds
- Regular bundle analysis with Vite Rollup plugin visualizer
- Lighthouse CI enforces performance budgets

**Status:** Mitigated

**Owner:** Frontend developer

### Risk 5: Accessibility Regression

**Description:** New features might introduce accessibility issues.

**Likelihood:** Medium

**Impact:** High (fails WCAG AA compliance)

**Mitigation:**

- Lighthouse CI accessibility score ≥90 (blocking)
- E2E tests for keyboard navigation
- ARIA attribute validation in unit tests
- Manual testing with screen readers
- Accessibility-first component design

**Status:** Mitigated

**Owner:** All developers

## Requirement Coverage Matrix

### Epic 001: Core Plugin Infrastructure

| Requirement ID | Description | Blueprint Coverage | Status | Evidence |
|----------------|-------------|-------------------|--------|----------|
| REQ-001 | Markdown file sourcing | Layer 4: Content Layer | ✅ Satisfied | Directory structure defined |
| REQ-002 | Vite plugin hooks | Layer 3: Build Layer | ✅ Satisfied | Plugin architecture documented |
| REQ-003 | Type-safe virtual modules | Layer 3: Build Layer | ✅ Satisfied | Virtual module pattern defined |
| REQ-004 | HMR support <100ms | Layer 3: Build Layer | ✅ Satisfied | HMR flow documented |
| REQ-005 | Field validation | Content & Build Pipelines | ✅ Satisfied | Validation strategy defined |
| REQ-006 | Bullet list extraction | Content & Build Pipelines | ✅ Satisfied | Pipeline stage documented |
| REQ-007 | Optional field handling | Data & Metadata Architecture | ✅ Satisfied | Graceful degradation strategy |
| REQ-008 | Type-safe enums | Data & Metadata Architecture | ✅ Satisfied | Enum validation documented |
| REQ-009 | Unique ID generation | Content & Build Pipelines | ✅ Satisfied | Slug generation pipeline stage |
| REQ-010 | Spec file filtering | Layer 4: Content Layer | ✅ Satisfied | File discovery rules |

### Non-Functional Requirements

| Requirement ID | Description | Blueprint Coverage | Status | Evidence |
|----------------|-------------|-------------------|--------|----------|
| PERF-001 | Build <2s for 100 files | Cross-Cutting: Performance | ✅ Satisfied | Performance budget defined |
| PERF-002 | Virtual module gen <500ms | Cross-Cutting: Performance | ✅ Satisfied | Performance budget defined |
| PERF-003 | HMR <100ms | Cross-Cutting: Performance | ✅ Satisfied | Performance budget defined |
| PERF-004 | No runtime parsers | Layer 3: Build Layer | ✅ Satisfied | Build-time processing pattern |
| A11Y-001 | Semantic HTML | Component Architecture | ✅ Satisfied | Accessibility implementation |
| A11Y-002 | Image alt text | Component Architecture | ✅ Satisfied | Alt text enforcement |
| SEC-001 | File access restriction | Cross-Cutting: Security | ✅ Satisfied | Security implementation |
| SEC-002 | Content sanitization | Cross-Cutting: Security | ✅ Satisfied | Sanitization strategy |
| SEC-003 | External link security | Cross-Cutting: Security | ✅ Satisfied | Link security rules |

### Data Quality Requirements

| Requirement ID | Description | Blueprint Coverage | Status | Evidence |
|----------------|-------------|-------------------|--------|----------|
| DQ-001 | Category defaults | Data & Metadata Architecture | ✅ Satisfied | Default value strategy |
| DQ-002 | Missing field warnings | Content & Build Pipelines | ✅ Satisfied | Error reporting workflow |
| DQ-003 | Malformed file handling | Content & Build Pipelines | ✅ Satisfied | Validation strategy |
| DQ-004 | Empty array handling | Data & Metadata Architecture | ✅ Satisfied | Array normalization |

### Constraints

| Constraint ID | Description | Blueprint Coverage | Status | Evidence |
|---------------|-------------|-------------------|--------|----------|
| CON-001 | No runtime parsers | Layer 3: Build Layer | ✅ Satisfied | Build-time processing |
| CON-002 | Directory structure | Layer 4: Content Layer | ✅ Satisfied | Directory layout documented |
| CON-003 | Image location | Layer 4: Content Layer | ✅ Satisfied | Public directory reference |
| CON-004 | Valid YAML | Content & Build Pipelines | ✅ Satisfied | YAML validation strategy |
| CON-005 | Vercel compatibility | Layer 1: Delivery Layer | ✅ Satisfied | Vercel deployment documented |

### Guidelines

| Guideline ID | Description | Blueprint Coverage | Status |
|--------------|-------------|-------------------|--------|
| GUD-001 | Use gray-matter | Content & Build Pipelines | ✅ Documented |
| GUD-002 | Plugin transformation | Layer 3: Build Layer | ✅ Documented |
| GUD-003 | Type interface matching | Data & Metadata Architecture | ✅ Documented |
| GUD-004 | Kebab-case naming | Layer 4: Content Layer | ✅ Documented |
| GUD-005 | Informative warnings | Content & Build Pipelines | ✅ Documented |
| GUD-006 | Fallback data | Extension & Evolution | ✅ Documented |

### Architectural Patterns

| Pattern ID | Description | Blueprint Coverage | Status |
|------------|-------------|-------------------|--------|
| PAT-001 | Plugin pattern | Layer 3: Build Layer | ✅ Implemented |
| PAT-002 | Pipeline pattern | Content & Build Pipelines | ✅ Implemented |
| PAT-003 | Virtual module pattern | Layer 3: Build Layer | ✅ Implemented |
| PAT-004 | Factory pattern | Content & Build Pipelines | ✅ Implemented |
| PAT-005 | Atomic Design | Component Architecture | ✅ Implemented |

## Next Steps

### Validation Steps

To validate this architecture blueprint:

1. **Run Document Validators:**
   ```bash
   npm run validate:markdown  # Check markdown syntax
   npm run validate:frontmatter  # Verify YAML front matter
   npm run validate:line-length  # Ensure ≤400 chars per line
   ```

2. **Cross-Reference Specification:**
   - Verify all requirement IDs (REQ, PERF, A11Y, SEC, DQ) are covered
   - Confirm technology choices align with stack blueprint
   - Validate constraint compliance (CON-001 to CON-005)

3. **Review with Stakeholders:**
   - Developer: Confirm implementation feasibility
   - AI Agent: Validate AI-assisted workflow compatibility
   - Content Author: Verify content authoring process clarity

4. **Update Related Documents:**
   - Link Epic PRDs to architecture sections
   - Update Feature PRDs with architecture references
   - Sync with Technology Stack Blueprint

### Implementation Roadmap

**Phase 1: Foundation (EPIC-001)**

- Implement Vite plugins (F1)
- Build file discovery and parsing utilities (F2, F3)
- Create section-specific parsers (F4.1-F4.7)
- Develop utility function library (F5)
- Generate virtual modules (F6)
- Define TypeScript declarations (F7)
- Implement HMR (F8)
- Create data re-export layer (F9)

**Phase 2: Content Migration (EPIC-002)**

- Define schemas and interfaces (F1)
- Author real portfolio content (F2.1-F2.7)
- Implement parser functions (F3)
- Update React components (F4.1-F4.7)
- Add fallback data layer (F5)
- Implement validation checks (F6)
- Verify HMR workflow (F7)

**Phase 3: Testing & Quality (EPIC-003)**

- Build unit test suite (F1.1-F1.3)
- Create integration tests (F2.1-F2.3)
- Develop E2E tests (F3.1-F3.3)
- Set up Lighthouse CI (F4)
- Configure CI/CD pipeline (F5)
- Organize test data (F6)
- Enable coverage reporting (F7)

**Phase 4: Deployment & Monitoring**

- Deploy to Vercel production
- Monitor Lighthouse scores
- Track performance metrics
- Gather user feedback
- Plan future enhancements

---

**Maintenance Notes:**

- Review and update this blueprint quarterly
- Add new ADR entries for significant architectural decisions
- Update requirement coverage matrix as features are implemented
- Maintain alignment with Project Specification and Technology Stack Blueprint
- Validate against markdown linting and front matter requirements

**Document Metadata:**

- **Version Control:** Track changes via Git
- **Review Cycle:** Quarterly or on major feature additions
- **Approval Required:** Technical lead review before major changes
- **Related Documents:**
  - `docs/spec/specs-md-pipeline.md` (Project Specification)
  - `docs/epic-*/arch.md` (Epic Architecture Specs)
  - `.github/copilot-instructions.md` (Workspace Guidelines)

---

v1.0.0 | Draft | Last Updated: Dec 09 2025 - 14:30
