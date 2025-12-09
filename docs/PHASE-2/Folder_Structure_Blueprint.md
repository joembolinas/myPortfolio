---
title: "Folder Structure Blueprint - Growth Journey Portfolio"
source: ""
author: "Growth Journey Portfolio Team"
post_slug: "folder-structure-blueprint"
categories: ["Architecture", "Documentation", "Project Structure"]
tags: ["folder-structure", "organization", "conventions", "monorepo", "architecture"]
ai_note: "Complete folder structure blueprint for the Growth Journey Portfolio. Documents directory organization, file naming conventions, and structural patterns for consistent project navigation and code generation."
summary: "Comprehensive folder structure blueprint documenting the single-app React + Vite + TypeScript project organization, including source code, tests, configuration, content, and documentation."
date: 2025-12-09
---

# Folder Structure Blueprint

## Executive Summary

The Growth Journey Portfolio follows a **single-app architecture** with clear separation of concerns across source code, content, configuration, documentation, and testing. The structure emphasizes discoverability, maintainability, and scalability while adhering to React/TypeScript best practices and Atomic Design principles.

**Project Type:** Single-app (React SPA with Vite)
**Architecture Pattern:** Layered (6-layer system from Architecture Blueprint)
**Organization Style:** Feature-based with Atomic Design for components
**Content Strategy:** Markdown-first with build-time transformation

## 1. Root Directory Structure

```
myPortfolio/
├── .github/                    # GitHub-specific configuration
├── .husky/                     # Git hooks (pre-commit, pre-push)
├── config/                     # Centralized configuration files
├── content/                    # Markdown content source files
├── docs/                       # Project documentation
├── logging-system/             # Development logging utilities
├── public/                     # Static assets (no processing)
├── spec/                       # Technical specifications
├── src/                        # Application source code
├── .gitignore                  # Git ignore patterns
├── CHANGELOG.md                # Version history and release notes
├── commit.prompt.md            # Commit message guidelines
├── index.html                  # HTML entry point
├── LICENSE                     # MIT license
├── lighthouserc.json           # Lighthouse CI configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project overview
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration (app)
├── tsconfig.node.json          # TypeScript configuration (Node/Vite)
└── vite.config.ts              # Vite build configuration
```

### 1.1 Root-Level Files

| File | Purpose | Technology |
|------|---------|------------|
| `index.html` | HTML entry point, SPA shell | HTML5 |
| `package.json` | Dependencies, scripts, metadata | npm |
| `vite.config.ts` | Build system configuration | Vite 7.0 |
| `tsconfig.json` | TypeScript compiler settings | TypeScript 5.0 |
| `tsconfig.node.json` | TypeScript for Node/build scripts | TypeScript 5.0 |
| `tailwind.config.js` | Tailwind theme and content paths | Tailwind CSS 3.4 |
| `postcss.config.js` | PostCSS plugins (Tailwind, Autoprefixer) | PostCSS |
| `lighthouserc.json` | Lighthouse CI assertions | Lighthouse CI |
| `.gitignore` | Git exclusion patterns | Git |
| `CHANGELOG.md` | Version history (Keep a Changelog format) | Markdown |
| `README.md` | Project overview and setup instructions | Markdown |
| `LICENSE` | MIT license | Plain text |
| `commit.prompt.md` | Conventional Commits guide | Markdown |

## 2. Source Code Structure (`src/`)

```
src/
├── components/                 # React components (Atomic Design)
│   ├── animations/            # Animation components
│   │   ├── CyclicText.tsx
│   │   ├── FadeInOnScroll.tsx
│   │   ├── HoverLift.tsx
│   │   ├── MorphingText.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── ProgressiveReveal.tsx
│   ├── github/                # GitHub integration components
│   │   ├── GitHubContributions.tsx
│   │   ├── GitHubRepos.tsx
│   │   └── GitHubStats.tsx
│   ├── layout/                # Layout components
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── lazy/                  # Lazy loading utilities
│   │   └── LazySection.tsx
│   ├── sections/              # Page sections (organisms)
│   │   ├── AboutSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LearningJourneySection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── SkillsSection.tsx
│   └── ui/                    # Reusable UI components (atoms/molecules)
│       └── [future components]
├── data/                      # Re-export layer for virtual modules
│   ├── blogs.ts
│   ├── contact.ts
│   ├── learningJourney.ts
│   ├── projects.ts
│   ├── skills.ts
│   └── websites.ts
├── hooks/                     # Custom React hooks
│   ├── useActiveSection.ts
│   ├── useContactForm.ts
│   ├── useDevicePerformance.ts
│   ├── useFocusReturn.ts
│   ├── useGitHub.ts
│   ├── usePerformanceMonitoring.ts
│   ├── useScrollAnimation.ts
│   ├── useScrollTo.ts
│   └── __tests__/            # Hook tests
│       └── [hook test files]
├── services/                  # External API and service integrations
│   ├── contactService.ts
│   ├── githubAPI.ts
│   └── __tests__/            # Service tests
│       └── [service test files]
├── types/                     # TypeScript type definitions
│   ├── index.ts              # Central type exports
│   └── virtual-modules.d.ts  # Virtual module declarations
├── utils/                     # Utility functions
│   ├── iconColorGenerator.ts
│   ├── markdownParser.ts
│   └── serviceWorker.ts
├── vite/                      # Custom Vite plugins
│   ├── contentDataPlugin.ts
│   └── journeyDataPlugin.ts
├── __tests__/                 # Global test setup and utilities
│   ├── accessibility.test.tsx
│   └── setup.ts
├── App.tsx                    # Root application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and Tailwind directives
```

### 2.1 Component Organization (`src/components/`)

**Atomic Design Hierarchy:**

```
components/
├── ui/                        # Atoms (basic building blocks)
│   ├── Button.tsx            # [Future] Basic button component
│   ├── Badge.tsx             # [Future] Badge/tag component
│   ├── Input.tsx             # [Future] Form input component
│   └── Card.tsx              # [Future] Card container
├── [molecules]/               # [Future] Composite components
│   ├── ProjectCard.tsx       # Project display card
│   ├── SkillBadge.tsx        # Skill tag with icon
│   └── NavLink.tsx           # Navigation link component
├── [organisms]/               # [Future] Complex composites
│   ├── ProjectGrid.tsx       # Grid of project cards
│   ├── SkillsList.tsx        # Skills categorization display
│   └── ContactForm.tsx       # Complete contact form
├── sections/                  # Templates (page sections)
│   └── [7 section components]
├── layout/                    # Page-level layout components
│   ├── Navigation.tsx        # Site navigation
│   └── Footer.tsx            # Site footer
├── animations/                # Animation-specific components
│   └── [6 animation components]
└── github/                    # Domain-specific components
    └── [3 GitHub components]
```

**Component File Structure:**

```typescript
// ComponentName.tsx
import { useState } from 'react';
import type { ComponentProps } from './types'; // Co-located types if complex

/**
 * Brief description of component purpose
 * @param {ComponentProps} props - Component properties
 */
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Event handlers
  const handleEvent = () => {};

  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}

// Co-located types (if not in src/types/)
interface ComponentProps {
  prop1: string;
  prop2?: number;
}
```

**Test Co-location Pattern:**

```
components/
├── sections/
│   ├── HeroSection.tsx
│   └── HeroSection.test.tsx      # Co-located test
└── ui/
    ├── Button.tsx
    └── Button.test.tsx            # Co-located test
```

### 2.2 Data Layer (`src/data/`)

**Purpose:** Re-export virtual modules with fallback data and type safety

**Pattern:**

```typescript
// src/data/projects.ts
import { projectsData } from 'virtual:projects-data';
import type { Project } from '@/types';

const fallbackProjects: Project[] = [
  {
    id: 'fallback-1',
    title: 'Example Project',
    description: 'Fallback data',
    technologies: ['React', 'TypeScript'],
  },
];

export const projects: Project[] =
  Array.isArray(projectsData) && projectsData.length > 0
    ? projectsData
    : fallbackProjects;
```

**Files:**

- `blogs.ts` - Blog posts data
- `contact.ts` - Contact form configuration
- `learningJourney.ts` - Learning journey timeline
- `projects.ts` - Project portfolio items
- `skills.ts` - Technical skills data
- `websites.ts` - External links/websites

### 2.3 Hooks (`src/hooks/`)

**Custom Hook Pattern:**

```typescript
// useHookName.ts
import { useState, useEffect } from 'react';

export function useHookName(param?: string) {
  const [state, setState] = useState();

  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [param]);

  return { state, setState };
}
```

**Current Hooks:**

- `useActiveSection.ts` - Track visible section in viewport
- `useContactForm.ts` - Contact form state management
- `useDevicePerformance.ts` - Device capability detection
- `useFocusReturn.ts` - Accessibility focus management
- `useGitHub.ts` - GitHub API data fetching
- `usePerformanceMonitoring.ts` - Performance metrics tracking
- `useScrollAnimation.ts` - Scroll-based animation triggers
- `useScrollTo.ts` - Smooth scroll navigation

### 2.4 Services (`src/services/`)

**Service Pattern:**

```typescript
// serviceName.ts
export class ServiceName {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || '';
  }

  async fetchData(): Promise<DataType> {
    // API call logic
  }
}

// Or functional pattern
export async function fetchServiceData(): Promise<DataType> {
  // API call logic
}
```

**Current Services:**

- `contactService.ts` - Contact form submission handling
- `githubAPI.ts` - GitHub API integration

### 2.5 Types (`src/types/`)

**Type Organization:**

```typescript
// index.ts - Central type exports
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

export interface LearningJourneyEntry {
  id: string;
  term: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
}
```

**Virtual Module Declarations:**

```typescript
// virtual-modules.d.ts
declare module 'virtual:home-data' {
  export const homeData: HomeData;
}

declare module 'virtual:projects-data' {
  export const projectsData: Project[];
}

declare module 'virtual:blogs-data' {
  export const blogsData: BlogPost[];
}

declare module 'virtual:skills-data' {
  export const skillsData: Skill[];
}

declare module 'virtual:contact-data' {
  export const contactData: ContactData;
}

declare module 'virtual:learning-journey-data' {
  export const learningJourneyData: LearningJourneyEntry[];
}
```

### 2.6 Vite Plugins (`src/vite/`)

**Plugin Structure:**

```typescript
// contentDataPlugin.ts
import type { Plugin } from 'vite';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export function contentDataPlugin(): Plugin {
  return {
    name: 'vite-plugin-content-data',
    
    resolveId(id: string) {
      if (id.startsWith('virtual:')) {
        return '\0' + id;
      }
      return null;
    },
    
    load(id: string) {
      // Virtual module generation logic
    },
    
    handleHotUpdate({ file, server }) {
      // HMR logic
    },
  };
}
```

**Current Plugins:**

- `contentDataPlugin.ts` - Transforms 6 content sections (Home, About, Skills, Projects, Blogs, Contact)
- `journeyDataPlugin.ts` - Transforms Learning Journey timeline data

## 3. Content Structure (`content/`)

```
content/
├── 1-home/                    # Hero section content
│   ├── Home.md               # Main hero content
│   └── hero.md               # Alternative hero version
├── 2-about/                   # About section content
│   └── About.md
├── 2.5-skills/                # Skills section content
│   └── Skills.md
├── 3-projects/                # Projects section content
│   ├── Projects.md           # Projects list
│   └── project-portfolio.md  # Portfolio metadata
├── 5-blogs/                   # Blog section content
│   ├── Blogs.md              # Blog posts list
│   └── blog-content-pipeline.md
├── 6-contact/                 # Contact section content
│   └── Contact.md
├── learningJourney/           # Learning journey content
│   ├── LearningJourney.md    # Overview
│   ├── term-1/               # First term entries
│   │   ├── career-start.md
│   │   └── college-return.md
│   └── term-2/               # Second term entries
│       ├── leetcode-journey.md
│       └── tryhackme-security.md
└── md-content.md              # Content authoring guidelines
```

### 3.1 Content File Structure

**Markdown Format with YAML Frontmatter:**

```markdown
---
title: "Section Title"
author: "Author Name"
date: 2025-12-09
categories: ["Category1", "Category2"]
tags: ["tag1", "tag2"]
summary: "Brief description for SEO and previews"
---

# Main Heading

## Subsection

Content with **Markdown** formatting.

### Lists

- Bullet point 1
- Bullet point 2

### Code Blocks

\`\`\`typescript
const example = "code";
\`\`\`
```

**Frontmatter Fields (Standard):**

- `title` - Section/entry title
- `author` - Content author
- `date` - Publication/update date (YYYY-MM-DD)
- `categories` - Category array
- `tags` - Tag array
- `summary` - Brief description
- `ai_note` - Context for AI-assisted development (optional)

### 3.2 Content Naming Conventions

**Directory Naming:**

- Numbered prefixes for ordering: `1-home/`, `2-about/`, `3-projects/`
- Descriptive names: `learningJourney/`, `term-1/`, `term-2/`

**File Naming:**

- PascalCase for section files: `Home.md`, `About.md`, `Projects.md`
- kebab-case for entry files: `career-start.md`, `leetcode-journey.md`
- Descriptive names matching content purpose

## 4. Documentation Structure (`docs/`)

```
docs/
├── PHASE-2/                   # Phase 2 documentation
│   ├── Project_Architecture_Blueprint.md
│   ├── Technology_Stack_Blueprint.md
│   ├── Folder_Structure_Blueprint.md (this file)
│   ├── epic-core-plugin-infrastructure/
│   │   ├── epic.md           # Epic PRD
│   │   ├── arch.md           # Architecture specification
│   │   └── features/         # Feature PRDs
│   │       ├── f1-vite-plugin-core/
│   │       │   └── prd.md
│   │       ├── f2-file-discovery/
│   │       │   └── prd.md
│   │       └── f3-parsing-pipeline/
│   │           └── prd.md
│   ├── epic-content-section-migration/
│   │   ├── epic.md
│   │   ├── arch.md
│   │   └── features/         # [Future] 19 feature PRDs
│   └── epic-testing-validation/
│       ├── epic.md
│       ├── arch.md
│       └── features/         # [Future] 13 feature PRDs
├── spec/                      # Technical specifications
│   └── markdown-content-system.md
├── CONTRIBUTING.md            # Contribution guidelines
└── feature-prd-creation-plan.md  # Feature PRD tracking
```

### 4.1 Documentation File Types

| Type | Purpose | Location | Format |
|------|---------|----------|--------|
| **Blueprint** | Comprehensive system documentation | `docs/PHASE-2/` | Markdown |
| **Epic PRD** | Product requirements for epic | `docs/PHASE-2/epic-*/epic.md` | Markdown |
| **Architecture Spec** | Technical design for epic | `docs/PHASE-2/epic-*/arch.md` | Markdown |
| **Feature PRD** | Detailed feature requirements | `docs/PHASE-2/epic-*/features/*/prd.md` | Markdown |
| **Technical Spec** | Implementation specifications | `docs/spec/` | Markdown |
| **Tracking Plan** | Progress tracking document | `docs/` | Markdown |

### 4.2 Documentation Naming Conventions

**Blueprint Files:**

- `Project_Architecture_Blueprint.md` - Underscores, capitalized
- `Technology_Stack_Blueprint.md` - Descriptive, specific
- `Folder_Structure_Blueprint.md` - Consistent pattern

**Epic Directories:**

- `epic-core-plugin-infrastructure/` - Kebab-case, descriptive
- `epic-content-section-migration/` - Clear purpose
- `epic-testing-validation/` - Action-oriented

**Standard Files:**

- `epic.md` - Product requirements document
- `arch.md` - Architecture specification
- `prd.md` - Product requirements document (feature-level)

## 5. Configuration Structure (`config/`)

```
config/
├── lighthouse.config.js       # Lighthouse custom configuration
├── prettier.config.cjs        # Prettier formatting rules
└── .eslintrc.json            # [Future] ESLint configuration
```

**Alternative Locations (Root):**

- `.eslintrc.json` - May be at root or in `config/`
- `.prettierrc` - May be at root or in `config/`
- `lighthouserc.json` - Lighthouse CI config at root

### 5.1 Configuration File Patterns

**ESLint Configuration:**

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["@typescript-eslint", "react", "react-hooks", "jsx-a11y"],
  "rules": {
    "no-console": "off",
    "prefer-const": "warn"
  }
}
```

**Prettier Configuration:**

```javascript
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  plugins: ['prettier-plugin-tailwindcss'],
};
```

## 6. Testing Structure

### 6.1 Test File Locations

**Unit Tests (Co-located):**

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   └── HeroSection.test.tsx      # Component test
│   └── ui/
│       ├── Button.tsx
│       └── Button.test.tsx            # Component test
├── hooks/
│   ├── useActiveSection.ts
│   └── __tests__/
│       └── useActiveSection.test.ts   # Hook test
├── services/
│   ├── githubAPI.ts
│   └── __tests__/
│       └── githubAPI.test.ts         # Service test
└── __tests__/
    ├── setup.ts                       # Global test setup
    └── accessibility.test.tsx         # Global accessibility tests
```

**E2E Tests (Future):**

```
e2e/                           # [Future] End-to-end tests
├── specs/
│   ├── home.spec.ts
│   ├── navigation.spec.ts
│   └── contact-form.spec.ts
└── fixtures/
    └── test-data.json
```

### 6.2 Test Naming Conventions

**Unit Tests:**

- Co-located with source: `ComponentName.test.tsx`
- Subdirectory for complex modules: `hooks/__tests__/hookName.test.ts`
- Test setup: `__tests__/setup.ts`

**E2E Tests:**

- Spec files: `feature-name.spec.ts`
- Use Playwright naming conventions

**Test Structure:**

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    // Test logic
  });

  describe('edge cases', () => {
    it('handles null props', () => {
      // Edge case test
    });
  });
});
```

## 7. Public Assets (`public/`)

```
public/
├── resume/                    # Resume documents
│   └── README.md
├── manifest.webmanifest       # PWA manifest
├── robots.txt                 # Search engine directives
└── sw.js                      # Service worker
```

**Public Assets Guidelines:**

- **No Processing:** Files copied as-is to build output
- **Direct URLs:** Accessible at `/filename.ext`
- **Static Only:** Images, fonts, favicons, manifest, robots.txt
- **No Imports:** Reference via absolute paths, not imports

**Future Assets:**

```
public/
├── images/                    # [Future] Images
│   ├── projects/
│   ├── profile/
│   └── icons/
├── fonts/                     # [Future] Custom fonts
└── favicon/                   # [Future] Favicon variants
    ├── favicon.ico
    ├── icon-192.png
    └── icon-512.png
```

## 8. Git & GitHub Configuration (`.github/`)

```
.github/
├── workflows/                 # GitHub Actions workflows
│   ├── ci.yml                # [Future] CI pipeline
│   ├── deploy.yml            # [Future] Deployment
│   └── lighthouse.yml        # [Future] Lighthouse CI
├── ISSUE_TEMPLATE/           # Issue templates
│   ├── bug_report.md
│   └── feature_request.md
├── PULL_REQUEST_TEMPLATE.md  # PR template
└── copilot-instructions.md   # GitHub Copilot workspace instructions
```

### 8.1 GitHub Actions Workflow Structure

**CI Workflow Example:**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, refactor/content]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

## 9. Development Utilities (`logging-system/`)

```
logging-system/
├── scripts/                   # Logging scripts
│   ├── log-entry.bat         # Windows batch script
│   ├── log-entry.ps1         # PowerShell script
│   └── simple-log.ps1        # Simplified logging
├── templates/                 # Log templates
│   ├── CAREER_TRANSITION_TRACKING.md
│   ├── DAILY_LOG_TEMPLATES.md
│   ├── PROJECT_MILESTONE_TEMPLATE.md
│   └── WEEKLY_REVIEW_TEMPLATE.md
├── docs/                      # Logging documentation
│   ├── AUTOMATION_SETUP.md
│   ├── CAREER_BENEFITS.md
│   ├── ENTRY_TYPES_REFERENCE.md
│   └── LOGGING_SYSTEM_GUIDE.md
└── README.md                  # Logging system overview
```

**Purpose:** Development progress tracking and career documentation

## 10. Technical Specifications (`spec/`)

```
spec/
├── docs-content-sections-spec.md    # Content section specifications
└── markdown-content-system.md       # Markdown system design
```

**Specification Format:**

- Technical design documents
- API contracts
- Data schemas
- Integration specifications

## 11. Naming Conventions Summary

### 11.1 Directories

| Context | Convention | Examples |
|---------|------------|----------|
| Source code | camelCase | `src/components/`, `src/hooks/` |
| Content sections | Numbered + kebab-case | `1-home/`, `2-about/` |
| Epic directories | Kebab-case with prefix | `epic-core-plugin-infrastructure/` |
| Feature directories | Kebab-case with f-prefix | `f1-vite-plugin-core/` |
| Test directories | `__tests__/` | `hooks/__tests__/` |

### 11.2 Files

| File Type | Convention | Examples |
|-----------|------------|----------|
| React components | PascalCase.tsx | `HeroSection.tsx`, `Button.tsx` |
| Hooks | camelCase.ts with `use` prefix | `useActiveSection.ts` |
| Services | camelCase.ts | `githubAPI.ts`, `contactService.ts` |
| Types | camelCase.ts or index.ts | `index.ts`, `virtual-modules.d.ts` |
| Utils | camelCase.ts | `markdownParser.ts` |
| Tests | Same as source + `.test` | `Button.test.tsx` |
| Config | kebab-case or dotfiles | `vite.config.ts`, `.eslintrc.json` |
| Markdown docs | PascalCase or kebab-case | `About.md`, `career-start.md` |
| Blueprints | Underscored PascalCase | `Technology_Stack_Blueprint.md` |

### 11.3 Code Exports

**Named Exports (Preferred):**

```typescript
// ✅ Good - Named exports
export function ComponentName() {}
export const utilityFunction = () => {};
export type TypeName = {};
```

**Default Exports (Avoid):**

```typescript
// ❌ Avoid - Default exports
export default function Component() {}
```

**Barrel Exports (index.ts):**

```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Badge } from './Badge';
```

## 12. Path Aliases & Imports

### 12.1 TypeScript Path Aliases

**Configuration (`tsconfig.json`):**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Vite Configuration (`vite.config.ts`):**

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 12.2 Import Patterns

**Absolute Imports (Preferred):**

```typescript
// ✅ Good - Absolute imports with alias
import { Button } from '@/components/ui/Button';
import { useActiveSection } from '@/hooks/useActiveSection';
import { Project } from '@/types';
```

**Relative Imports (Same directory or nearby):**

```typescript
// ✅ Acceptable - Relative for nearby files
import { ComponentHelper } from './ComponentHelper';
import { localUtils } from '../utils';
```

**Virtual Module Imports:**

```typescript
// Import from virtual modules (generated by Vite plugins)
import { homeData } from 'virtual:home-data';
import { projectsData } from 'virtual:projects-data';
```

**Import Order:**

1. External dependencies (React, libraries)
2. Internal absolute imports (@/components, @/hooks)
3. Internal relative imports (./ComponentHelper)
4. Type imports (import type)
5. Style imports (CSS)

```typescript
// Example import order
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/Button';
import { useActiveSection } from '@/hooks/useActiveSection';

import { ComponentHelper } from './ComponentHelper';

import type { Project } from '@/types';

import './styles.css';
```

## 13. Build Output Structure (`dist/`)

```
dist/                          # Production build output (gitignored)
├── assets/                    # Bundled and hashed assets
│   ├── index-[hash].js       # Main bundle
│   ├── vendor-[hash].js      # Vendor chunk (React, React DOM)
│   ├── ui-[hash].js          # UI libraries chunk (Framer Motion, Headless UI)
│   ├── index-[hash].css      # Compiled CSS
│   └── [asset]-[hash].[ext] # Other assets
├── index.html                 # Processed HTML entry point
├── manifest.webmanifest       # Copied from public/
├── robots.txt                 # Copied from public/
├── sw.js                      # Copied from public/
└── stats.html                 # Bundle analyzer output (if generated)
```

**Build Characteristics:**

- **Hash-based Naming:** All assets include content hash for cache busting
- **Manual Chunks:** Vendor and UI libraries separated for optimal caching
- **Minification:** ESBuild minification applied
- **Sourcemaps:** Generated for debugging (`sourcemap: true`)

## 14. Gitignored Directories

```
# Build outputs
/dist
/build

# Dependencies
/node_modules

# Environment
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Test coverage
/coverage

# Temporary files
.tmp/
.cache/
```

## 15. Future Structure Expansions

### 15.1 Planned Additions

**Component Library:**

```
src/components/
├── atoms/                     # [Future] Basic UI elements
├── molecules/                 # [Future] Composite components
└── organisms/                 # [Future] Complex sections
```

**Testing:**

```
e2e/                           # [Future] Playwright E2E tests
├── specs/
└── fixtures/
```

**Contexts (State Management):**

```
src/contexts/                  # [Future] React Context providers
├── ThemeContext.tsx
├── AuthContext.tsx           # [Future] If authentication added
└── index.ts
```

**API Layer:**

```
src/api/                       # [Future] API client layer
├── client.ts                 # Base API client
├── endpoints/
│   ├── projects.ts
│   └── blog.ts
└── types/
    └── responses.ts
```

### 15.2 Microservices / API (Future Consideration)

If expanding to include backend:

```
api/                           # [Future] Backend API (separate repo recommended)
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── services/
├── tests/
└── package.json
```

**Monorepo Structure (Alternative):**

```
packages/
├── web/                       # Frontend app (current structure)
├── api/                       # Backend API
└── shared/                    # Shared types and utilities
```

## 16. File Size & Organization Guidelines

### 16.1 Component Size Guidelines

**Component Lines of Code:**

- **Small:** < 100 lines (ideal)
- **Medium:** 100-300 lines (acceptable)
- **Large:** > 300 lines (consider splitting)

**When to Split:**

- Multiple responsibilities
- Complex state management
- Reusable sub-components identified

**Splitting Strategy:**

```
components/sections/ProjectsSection/
├── ProjectsSection.tsx        # Main section component
├── ProjectGrid.tsx            # Grid layout
├── ProjectCard.tsx            # Individual card
├── ProjectFilters.tsx         # Filter controls
└── index.ts                   # Barrel export
```

### 16.2 File Organization Principles

**Single Responsibility:**

- One component per file
- One hook per file
- One service per file

**Co-location:**

- Tests next to source files
- Component-specific types with component
- Component-specific styles with component (if not using Tailwind)

**Discoverability:**

- Clear directory names
- Logical grouping (by feature, by type)
- Barrel exports (index.ts) for cleaner imports

## 17. Documentation Standards

### 17.1 File Headers

**Source Code (TypeScript/TSX):**

```typescript
/**
 * ComponentName
 * 
 * Brief description of component purpose and usage.
 * 
 * @example
 * ```tsx
 * <ComponentName prop1="value" />
 * ```
 */
```

**Markdown Files:**

```markdown
---
title: "Document Title"
author: "Author Name"
date: 2025-12-09
summary: "Brief description"
---
```

### 17.2 File Footers

**All Documentation Files:**

```markdown
---

v1.0.0 | Approved | Last Updated: Dec 09 2025 - 15:00
```

**Version Format:**

- `v{major}.{minor}.{patch}`
- Status: Draft | In Review | Approved | Deprecated
- Timestamp: `MMM DD YYYY - HH:MM`

## 18. Migration from Current to Ideal Structure

### 18.1 Current State (Partial Implementation)

**Existing:**

- ✅ `src/components/sections/` - 7 section components
- ✅ `src/components/animations/` - 6 animation components
- ✅ `src/components/github/` - 3 GitHub components
- ✅ `src/components/layout/` - Navigation, Footer
- ✅ `src/hooks/` - 8 custom hooks
- ✅ `src/services/` - Contact, GitHub services
- ✅ `src/data/` - Re-export layer with fallbacks
- ✅ `src/vite/` - 2 custom Vite plugins
- ✅ `content/` - Markdown source files
- ✅ `docs/PHASE-2/` - Architecture documentation

**Missing:**

- ❌ `src/components/ui/` - Atomic UI components (planned)
- ❌ `src/components/molecules/` - Composite components (planned)
- ❌ `src/contexts/` - Global state management (minimal need currently)
- ❌ `e2e/` - Playwright E2E tests (planned in EPIC-003)
- ❌ `.github/workflows/` - CI/CD pipelines (planned)

### 18.2 Migration Steps (EPIC-002)

**Phase 1: Component Extraction**

1. Extract reusable UI atoms from sections
2. Create `src/components/ui/` directory
3. Migrate Button, Card, Badge components

**Phase 2: Molecule Creation**

1. Create `src/components/molecules/`
2. Build ProjectCard, SkillBadge, NavLink
3. Refactor sections to use molecules

**Phase 3: Testing Expansion**

1. Add E2E test directory structure
2. Implement Playwright tests
3. Add CI/CD workflows

## 19. Quick Reference - Common Paths

| Purpose | Path | Example |
|---------|------|---------|
| React component | `src/components/{category}/{Name}.tsx` | `src/components/sections/HeroSection.tsx` |
| Custom hook | `src/hooks/use{Name}.ts` | `src/hooks/useActiveSection.ts` |
| Type definition | `src/types/index.ts` | `src/types/index.ts` |
| Virtual module type | `src/types/virtual-modules.d.ts` | Declarations for virtual modules |
| Data re-export | `src/data/{name}.ts` | `src/data/projects.ts` |
| Service | `src/services/{name}Service.ts` | `src/services/contactService.ts` |
| Utility | `src/utils/{name}.ts` | `src/utils/markdownParser.ts` |
| Vite plugin | `src/vite/{name}Plugin.ts` | `src/vite/contentDataPlugin.ts` |
| Content Markdown | `content/{section}/{File}.md` | `content/1-home/Home.md` |
| Epic PRD | `docs/PHASE-2/epic-{name}/epic.md` | `docs/PHASE-2/epic-core-plugin-infrastructure/epic.md` |
| Architecture spec | `docs/PHASE-2/epic-{name}/arch.md` | Architecture for epic |
| Feature PRD | `docs/PHASE-2/epic-{name}/features/f{n}-{name}/prd.md` | Feature-level requirements |
| Blueprint | `docs/PHASE-2/{Name}_Blueprint.md` | `docs/PHASE-2/Technology_Stack_Blueprint.md` |
| Config file | `config/{tool}.config.{ext}` or root | `tailwind.config.js`, `vite.config.ts` |
| Static asset | `public/{file}` | `public/manifest.webmanifest` |

## 20. Tooling Integration

### 20.1 IDE Configuration Paths

**VSCode Settings:**

```
.vscode/
├── settings.json             # Workspace settings
├── extensions.json           # Recommended extensions
└── launch.json              # Debug configurations
```

**Recommended `.vscode/settings.json`:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### 20.2 Package Manager Files

```
/
├── package.json              # npm configuration
├── package-lock.json         # Locked dependencies (commit)
└── node_modules/            # Installed packages (gitignored)
```

## 21. Accessibility & Performance File Locations

### 21.1 Accessibility

**Automated Testing:**

- `src/__tests__/accessibility.test.tsx` - Global a11y tests
- `{component}.test.tsx` - Component-specific a11y tests

**Accessibility Reports:**

- `dist/a11y-report.json` - Generated by axe-core CLI

### 21.2 Performance

**Lighthouse Configuration:**

- `lighthouserc.json` - Lighthouse CI assertions (root)
- `config/lighthouse.config.js` - Custom Lighthouse config

**Bundle Analysis:**

- `dist/stats.html` - Rollup visualizer output
- Generated on `npm run analyze`

## 22. Security & Environment

### 22.1 Environment Variables

**Not Currently Used (Build-Time Only):**

If needed in future:

```
.env.example                  # Template for environment variables
.env.local                    # Local development (gitignored)
.env.production               # Production (gitignored)
```

**Access Pattern:**

```typescript
// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

// Usage in code
const apiUrl = import.meta.env.VITE_API_URL;
```

### 22.2 Security Files

**Dependency Security:**

- `package-lock.json` - Locked versions (commit)
- Run `npm audit` regularly

**Headers & CSP:**

- Configured in Vercel deployment settings
- `public/robots.txt` - Search engine directives

---

## Appendix A: Complete Directory Tree

```
myPortfolio/
├── .github/
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── copilot-instructions.md
├── .husky/
│   └── pre-commit
├── config/
│   ├── lighthouse.config.js
│   └── prettier.config.cjs
├── content/
│   ├── 1-home/
│   │   ├── Home.md
│   │   └── hero.md
│   ├── 2-about/
│   │   └── About.md
│   ├── 2.5-skills/
│   │   └── Skills.md
│   ├── 3-projects/
│   │   ├── Projects.md
│   │   └── project-portfolio.md
│   ├── 5-blogs/
│   │   ├── Blogs.md
│   │   └── blog-content-pipeline.md
│   ├── 6-contact/
│   │   └── Contact.md
│   ├── learningJourney/
│   │   ├── LearningJourney.md
│   │   ├── term-1/
│   │   │   ├── career-start.md
│   │   │   └── college-return.md
│   │   └── term-2/
│   │       ├── leetcode-journey.md
│   │       └── tryhackme-security.md
│   └── md-content.md
├── docs/
│   ├── PHASE-2/
│   │   ├── Project_Architecture_Blueprint.md
│   │   ├── Technology_Stack_Blueprint.md
│   │   ├── Folder_Structure_Blueprint.md
│   │   ├── epic-core-plugin-infrastructure/
│   │   │   ├── epic.md
│   │   │   ├── arch.md
│   │   │   └── features/
│   │   │       ├── f1-vite-plugin-core/
│   │   │       │   └── prd.md
│   │   │       ├── f2-file-discovery/
│   │   │       │   └── prd.md
│   │   │       └── f3-parsing-pipeline/
│   │   │           └── prd.md
│   │   ├── epic-content-section-migration/
│   │   │   ├── epic.md
│   │   │   └── arch.md
│   │   └── epic-testing-validation/
│   │       ├── epic.md
│   │       └── arch.md
│   ├── spec/
│   │   └── markdown-content-system.md
│   ├── CONTRIBUTING.md
│   └── feature-prd-creation-plan.md
├── logging-system/
│   ├── scripts/
│   │   ├── log-entry.bat
│   │   ├── log-entry.ps1
│   │   └── simple-log.ps1
│   ├── templates/
│   │   ├── CAREER_TRANSITION_TRACKING.md
│   │   ├── DAILY_LOG_TEMPLATES.md
│   │   ├── PROJECT_MILESTONE_TEMPLATE.md
│   │   └── WEEKLY_REVIEW_TEMPLATE.md
│   ├── docs/
│   │   ├── AUTOMATION_SETUP.md
│   │   ├── CAREER_BENEFITS.md
│   │   ├── ENTRY_TYPES_REFERENCE.md
│   │   └── LOGGING_SYSTEM_GUIDE.md
│   └── README.md
├── public/
│   ├── resume/
│   │   └── README.md
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── sw.js
├── spec/
│   └── docs-content-sections-spec.md
├── src/
│   ├── components/
│   │   ├── animations/
│   │   │   ├── CyclicText.tsx
│   │   │   ├── FadeInOnScroll.tsx
│   │   │   ├── HoverLift.tsx
│   │   │   ├── MorphingText.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── ProgressiveReveal.tsx
│   │   ├── github/
│   │   │   ├── GitHubContributions.tsx
│   │   │   ├── GitHubRepos.tsx
│   │   │   └── GitHubStats.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── lazy/
│   │   │   └── LazySection.tsx
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LearningJourneySection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── SkillsSection.tsx
│   │   └── ui/
│   ├── data/
│   │   ├── blogs.ts
│   │   ├── contact.ts
│   │   ├── learningJourney.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── websites.ts
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   ├── useContactForm.ts
│   │   ├── useDevicePerformance.ts
│   │   ├── useFocusReturn.ts
│   │   ├── useGitHub.ts
│   │   ├── usePerformanceMonitoring.ts
│   │   ├── useScrollAnimation.ts
│   │   ├── useScrollTo.ts
│   │   └── __tests__/
│   ├── services/
│   │   ├── contactService.ts
│   │   ├── githubAPI.ts
│   │   └── __tests__/
│   ├── types/
│   │   ├── index.ts
│   │   └── virtual-modules.d.ts
│   ├── utils/
│   │   ├── iconColorGenerator.ts
│   │   ├── markdownParser.ts
│   │   └── serviceWorker.ts
│   ├── vite/
│   │   ├── contentDataPlugin.ts
│   │   └── journeyDataPlugin.ts
│   ├── __tests__/
│   │   ├── accessibility.test.tsx
│   │   └── setup.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── CHANGELOG.md
├── commit.prompt.md
├── index.html
├── LICENSE
├── lighthouserc.json
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

**Blueprint Metadata:**

- **Generated:** December 9, 2025
- **Project Type:** Single-app (React SPA)
- **Architecture:** 6-layer system with Atomic Design
- **Depth Level:** Comprehensive
- **Output Format:** Markdown

**Next Steps:**

- Use this blueprint for consistent file/folder organization
- Follow naming conventions for all new files
- Reference path aliases for cleaner imports
- Update blueprint when structure evolves

---

v1.0.0 | Approved | Last Updated: Dec 09 2025 - 15:30
