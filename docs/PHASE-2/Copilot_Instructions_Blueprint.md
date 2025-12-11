---
title: "Copilot Instructions Blueprint - Growth Journey Portfolio"
source: ""
author: "Growth Journey Portfolio Team"
post_slug: "copilot-instructions-blueprint"
categories: ["AI", "Documentation", "Coding Standards", "Development Guidelines"]
tags: ["copilot", "ai-assisted-development", "code-standards", "best-practices", "typescript", "react"]
ai_note: "Comprehensive Copilot instructions for AI-assisted development. Provides technology stack context, coding standards, naming conventions, and project-specific patterns for consistent code generation."
summary: "Complete AI assistant instructions documenting technology stack, coding standards, naming conventions, file organization, import patterns, error handling, and project-specific development guidelines for the Growth Journey Portfolio."
date: 2025-12-09
---
# Copilot Instructions Blueprint

## Executive Summary

This document provides comprehensive instructions for AI-assisted development on the Growth Journey Portfolio project. It defines the technology stack, coding standards, naming conventions, file organization patterns, and project-specific guidelines to ensure consistent, high-quality code generation.

**Target AI Assistants:** GitHub Copilot, ChatGPT, Claude, and other code generation tools

**Purpose:** Provide complete context for accurate code generation aligned with project architecture, standards, and conventions

**Scope:** TypeScript/React development, build tooling, testing, accessibility, performance optimization

## 1. Technology Stack Overview

### 1.1 Core Stack

```yaml
Primary Language: TypeScript 5.0.2
Runtime: Node.js 18+
Framework: React 18.2.0
Build Tool: Vite 7.0.6
Styling: Tailwind CSS 3.4
Package Manager: npm 9+
Module System: ES Modules (ESM)
```

### 1.2 Key Libraries

**UI & Animation:**

- `framer-motion` ^10.16.0 - Animation and transitions
- `react-error-boundary` ^6.0.0 - Error handling
- `react-router-dom` ^7.10.1 - Client-side routing

**Markdown & Content:**

- `gray-matter` ^4.0.3 - YAML frontmatter parsing
- Virtual modules (`virtual:*-data`) - Build-time content pipeline

**Testing:**

- `vitest` ^3.2.4 - Unit testing framework
- `@testing-library/react` ^13.4.0 - Component testing
- `@testing-library/jest-dom` ^5.17.0 - DOM matchers
- `@axe-core/cli` ^4.7.0 - Accessibility testing

**Code Quality:**

- `eslint` ^8.57.1 - JavaScript/TypeScript linting
- `prettier` ^3.0.0 - Code formatting
- `typescript` ^5.0.2 - Type checking

### 1.3 Development Environment

```json
{
  "node": ">=18.0.0",
  "npm": ">=9.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest",
    "lint": "eslint . --ext js,jsx,ts,tsx --config config/.eslintrc.json --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  }
}
```

## 2. Coding Standards

### 2.1 TypeScript Configuration

**Strict Mode:** ENABLED (ADR-005)

```typescript
// tsconfig.json - Key compiler options
{
  "strict": true,                        // All strict checks enabled
  "noImplicitAny": true,                 // Explicit types required
  "strictNullChecks": true,              // Null/undefined safety
  "noUnusedLocals": true,                // No unused variables
  "noUnusedParameters": true,            // No unused function params
  "noFallthroughCasesInSwitch": true    // Switch statement safety
}
```

**Type Safety Requirements:**

- ✅ **NO implicit `any`** - Always provide explicit types
- ✅ **Null safety** - Handle `null` and `undefined` explicitly
- ✅ **Interface over type** - Prefer `interface` for object shapes
- ✅ **Explicit return types** - Functions should declare return types
- ✅ **No type assertions** - Avoid `as` unless absolutely necessary

**Example - Correct TypeScript:**

```typescript
// ✅ GOOD: Explicit types, null handling, interface
interface UserProfile {
  name: string;
  email: string;
  age?: number; // Optional explicitly marked
}

function formatUser(user: UserProfile): string {
  const age = user.age ?? 'unknown'; // Null coalescing
  return `${user.name} (${age})`;
}

// ❌ BAD: Implicit any, no null handling
function formatUser(user) {
  return user.name + ' (' + user.age + ')';
}
```

### 2.2 Code Formatting (Prettier)

```javascript
// config/prettier.config.cjs
module.exports = {
  printWidth: 100,           // Max line length
  tabWidth: 2,               // 2 spaces per indent
  semi: true,                // Semicolons required
  singleQuote: true,         // Single quotes for strings
  trailingComma: 'all',      // Trailing commas everywhere
  bracketSpacing: true,      // Spaces in object literals
  arrowParens: 'always',     // Always wrap arrow function params
  endOfLine: 'lf',           // Unix line endings
  overrides: [
    { files: '*.md', options: { proseWrap: 'always' } },
    { files: '*.json', options: { printWidth: 80 } },
  ],
};
```

**Key Rules:**

- **Line length:** 100 characters max
- **Indentation:** 2 spaces (no tabs)
- **Quotes:** Single quotes for strings, double for JSX attributes
- **Semicolons:** Required
- **Trailing commas:** Required for multiline

**Example:**

```typescript
// ✅ GOOD: Prettier-compliant formatting
const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Growth Journey Portfolio',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
]; // <- Trailing comma

// ❌ BAD: Inconsistent formatting
const projects:Project[]=[{id:"portfolio",title:"Growth Journey Portfolio",technologies:["React","TypeScript","Vite"]}]
```

### 2.3 React Patterns

**Component Style:** Function components with hooks (NO class components)

**Component Structure Pattern:**

```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 1. Type definitions
interface ComponentProps {
  title: string;
  items: string[];
  onSelect?: (item: string) => void;
}

// 2. Component function with explicit FC type
export const Component: React.FC<ComponentProps> = ({ title, items, onSelect }) => {
  // 3. State hooks
  const [selected, setSelected] = useState<string | null>(null);

  // 4. Effect hooks
  useEffect(() => {
    // Side effects here
    return () => {
      // Cleanup
    };
  }, [selected]);

  // 5. Event handlers (arrow functions with handle* prefix)
  const handleItemClick = (item: string) => {
    setSelected(item);
    onSelect?.(item); // Optional chaining for callbacks
  };

  // 6. JSX return
  return (
    <section>
      <h2>{title}</h2>
      {/* Component markup */}
    </section>
  );
};
```

**Key Patterns:**

- ✅ **Named exports** (not default) for components
- ✅ **PascalCase** component names
- ✅ **Props interface** named `{ComponentName}Props`
- ✅ **Hooks at top** of function, before event handlers
- ✅ **Event handlers** prefixed with `handle*`
- ✅ **Optional callbacks** with optional chaining `?.`

### 2.4 Comment Style

**Single-line comments:**

```typescript
// Brief explanation for the next line
const result = calculateTotal(items);
```

**Multi-line comments:**

```typescript
/**
 * Calculate the total price including tax and shipping
 * 
 * @param items - Array of cart items
 * @param taxRate - Tax rate as decimal (0.08 = 8%)
 * @returns Total price including tax and shipping
 */
function calculateTotal(items: CartItem[], taxRate: number): number {
  // Implementation
}
```

**JSDoc Requirements:**

- ✅ **All exported functions** - Must have JSDoc
- ✅ **Complex logic** - Explain why, not what
- ✅ **@param and @returns** - Document all parameters and return values
- ✅ **Interfaces** - Document purpose at top

**Example:**

```typescript
/**
 * Custom hook to track which section is currently visible in viewport
 * Uses IntersectionObserver for performance-efficient scroll tracking
 * 
 * @param sectionIds - Array of section IDs to observe
 * @returns Currently active section ID
 */
export const useActiveSection = (sectionIds: string[]): string => {
  // Implementation
};
```

## 3. Naming Conventions

### 3.1 Files & Directories

**File Naming Rules:**

| Type                 | Convention       | Example                                              |
| -------------------- | ---------------- | ---------------------------------------------------- |
| **Components** | PascalCase.tsx   | `HeroSection.tsx`, `Navigation.tsx`              |
| **Hooks**      | camelCase.ts     | `useActiveSection.ts`, `useScrollTo.ts`          |
| **Utilities**  | camelCase.ts     | `markdownParser.ts`, `iconColorGenerator.ts`     |
| **Types**      | camelCase.ts     | `index.ts` (in types/)                             |
| **Tests**      | {name}.test.tsx  | `accessibility.test.tsx`, `HeroSection.test.tsx` |
| **Config**     | kebab-case.{ext} | `prettier.config.cjs`, `vite.config.ts`          |
| **Markdown**   | kebab-case.md    | `project-portfolio.md`, `career-start.md`        |

**Directory Naming:**

```
src/
├── components/        # PascalCase for component categories
│   ├── animations/   # Lowercase categories
│   ├── layout/
│   ├── sections/
│   └── ui/
├── hooks/            # Lowercase utility categories
├── utils/
├── types/
├── services/
└── data/
```

### 3.2 Variables & Constants

**Variable Naming:**

```typescript
// camelCase for variables and functions
const activeSection = 'hero';
const userName = 'Joem Bolinas';
let itemCount = 0;

// PascalCase for component/class names
const HeroSection = () => { /* ... */ };
interface UserProfile { /* ... */ }

// SCREAMING_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.github.com';
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT_MS = 5000;

// Prefix booleans with is/has/should/can
const isLoading = true;
const hasError = false;
const shouldRender = true;
const canSubmit = false;
```

### 3.3 React Component Naming

**Component Files:**

```typescript
// ✅ GOOD: Named export with PascalCase
export const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
  return <section>{title}</section>;
};

// ❌ BAD: Default export
export default function heroSection({ title }) {
  return <section>{title}</section>;
}
```

**Props Interfaces:**

```typescript
// Pattern: {ComponentName}Props
interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

interface NavigationProps {
  items: NavigationItem[];
  activeSection: string;
}
```

### 3.4 Hook Naming

**Pattern:** `use{Capability}` (camelCase, starting with "use")

```typescript
// ✅ GOOD: Clear capability naming
export const useActiveSection = (sections: string[]) => { /* ... */ };
export const useScrollAnimation = () => { /* ... */ };
export const useContactForm = () => { /* ... */ };

// ❌ BAD: Missing "use" prefix or unclear purpose
export const activeSection = () => { /* ... */ };
export const scroll = () => { /* ... */ };
```

### 3.5 Type & Interface Naming

```typescript
// Interface: PascalCase, descriptive noun
interface Project {
  id: string;
  title: string;
}

interface UserProfile {
  name: string;
  email: string;
}

// Type alias: PascalCase (same as interface)
type Status = 'pending' | 'success' | 'error';
type Theme = 'light' | 'dark' | 'system';

// Generic types: Single uppercase letter or PascalCase
function identity<T>(value: T): T {
  return value;
}

type AsyncResponse<TData> = {
  data: TData;
  error: Error | null;
};
```

## 4. Project File Organization

### 4.1 Directory Structure

```
myPortfolio/
├── src/
│   ├── components/          # React components
│   │   ├── animations/     # Reusable animation components
│   │   ├── github/         # GitHub integration components
│   │   ├── layout/         # Layout components (Nav, Footer)
│   │   ├── lazy/           # Lazy loading wrappers
│   │   ├── sections/       # Page sections (Hero, About, etc.)
│   │   └── ui/             # Atomic UI components (Button, Card, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Pure utility functions
│   ├── services/           # API and external services
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Static data and content imports
│   ├── vite/               # Vite plugins
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── content/                # Markdown content
│   ├── 1-home/
│   ├── 2-about/
│   ├── 2.5-skills/
│   ├── 3-projects/
│   ├── 5-blogs/
│   ├── 6-contact/
│   └── learningJourney/
├── public/                 # Static assets
├── docs/                   # Documentation
└── config/                 # Configuration files
```

### 4.2 Component Organization

**Atomic Design Hierarchy:**

```
components/
├── ui/                    # Atoms - smallest units
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Badge.tsx
├── layout/                # Molecules - layout components
│   ├── Navigation.tsx
│   └── Footer.tsx
├── sections/              # Organisms - full sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   └── ProjectsSection.tsx
└── animations/            # Specialized reusable components
    ├── FadeInOnScroll.tsx
    └── HoverLift.tsx
```

**File Co-location:**

```
components/
└── sections/
    ├── HeroSection.tsx           # Component
    ├── HeroSection.test.tsx      # Tests alongside component
    └── HeroSection.module.css    # Component-specific styles (if needed)
```

## 5. Import Ordering

### 5.1 Import Organization Pattern

```typescript
// 1. External dependencies (React first)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Path alias imports (@/*)
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types';

// 3. Virtual module imports (virtual:*)
import { projectsData } from 'virtual:projects-data';

// 4. Relative imports (same directory)
import { formatDate } from './utils';

// 5. Asset imports
import logo from './assets/logo.svg';
import './styles.css';
```

### 5.2 Import Rules

**Order:**

1. React (always first)
2. External npm packages (alphabetical)
3. Path alias imports (`@/*`) (alphabetical)
4. Virtual modules (`virtual:*`)
5. Relative imports (`./`, `../`)
6. Assets and styles (last)

**Blank lines:**

- One blank line between each group
- No blank lines within groups

**Named vs Default:**

- ✅ **Prefer named imports** for components and utilities
- ✅ **Use default imports** only for external libraries that require it

**Example:**

```typescript
// ✅ GOOD: Proper import organization
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card } from '@/components/ui/Card';
import type { Project, Skill } from '@/types';

import { projectsData } from 'virtual:projects-data';

import { formatDate } from './utils';

// ❌ BAD: Mixed order, no grouping
import './utils';
import { Card } from '@/components/ui/Card';
import React from 'react';
import type { Project } from '@/types';
import { motion } from 'framer-motion';
```

### 5.3 Type Imports

```typescript
// Prefer type-only imports for types (helps with tree-shaking)
import type { Project, Skill } from '@/types';
import type { ReactNode } from 'react';

// Regular import for values
import { projects } from '@/data/projects';
```

## 6. Error Handling Patterns

### 6.1 Component Error Boundaries

**Pattern:** Wrap sections with ErrorBoundary

```typescript
import { ErrorBoundary } from 'react-error-boundary';

// Error fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 rounded">
      <h2 className="text-red-800 font-bold">Something went wrong</h2>
      <pre className="text-sm text-red-600">{error.message}</pre>
    </div>
  );
}

// Usage
export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeroSection />
    </ErrorBoundary>
  );
}
```

### 6.2 Async Error Handling

**Pattern:** Try-catch with typed errors

```typescript
interface ApiError {
  message: string;
  status: number;
}

async function fetchGitHubData(): Promise<GitHubUser | null> {
  try {
    const response = await fetch('https://api.github.com/users/joembolinas');
  
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  
    const data = await response.json();
    return data as GitHubUser;
  
  } catch (error) {
    // Type guard for Error type
    if (error instanceof Error) {
      console.error('Failed to fetch GitHub data:', error.message);
    }
    return null; // Return null on error (explicit failure handling)
  }
}
```

### 6.3 Hook Error Handling

**Pattern:** Return error state from hooks

```typescript
interface UseGitHubReturn {
  data: GitHubUser | null;
  loading: boolean;
  error: Error | null;
}

export const useGitHub = (): UseGitHubReturn => {
  const [data, setData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchGitHubData()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

// Usage in component
function Component() {
  const { data, loading, error } = useGitHub();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <div>{data.name}</div>;
}
```

### 6.4 Form Validation

**Pattern:** Explicit validation with typed errors

```typescript
interface FormErrors {
  email?: string;
  message?: string;
}

function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

// Usage
const errors = validateContactForm(formData);
if (Object.keys(errors).length > 0) {
  setFormErrors(errors);
  return; // Don't submit
}
```

## 7. Accessibility Patterns (WCAG AA)

### 7.1 Semantic HTML

```typescript
// ✅ GOOD: Semantic elements with ARIA
<nav role="navigation" aria-label="Primary">
  <ul>
    <li><a href="#home">Home</a></li>
  </ul>
</nav>

<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Growth Journey Portfolio</h1>
  </section>
</main>

<footer role="contentinfo">
  <p>© 2025 Joem Bolinas</p>
</footer>

// ❌ BAD: Divs without semantics
<div className="nav">
  <div>Home</div>
</div>
```

### 7.2 Keyboard Navigation

```typescript
// Interactive elements must be keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
  aria-label="Submit form"
>
  Submit
</button>

// Custom interactive div (AVOID, prefer button)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  aria-label="Custom action"
>
  Click me
</div>
```

### 7.3 Focus Management

```typescript
import { useEffect, useRef } from 'react';

// Focus section heading after navigation
export function focusSectionHeading(sectionId: string): void {
  const section = document.getElementById(sectionId);
  const heading = section?.querySelector('h1, h2, h3');
  
  if (heading instanceof HTMLElement) {
    heading.setAttribute('tabindex', '-1'); // Allow programmatic focus
    heading.focus();
    heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
  }
}

// Skip to main content link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 7.4 Screen Reader Support

```typescript
// Live regions for dynamic content
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>

// Hidden text for context
<button aria-label="Close navigation menu">
  <span aria-hidden="true">×</span>
</button>

// Loading states
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

## 8. Performance Patterns

### 8.1 Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const GitHubSection = lazy(() => import('@/components/sections/GitHubSection'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubSection />
    </Suspense>
  );
}
```

### 8.2 Memoization

```typescript
import { useMemo, useCallback } from 'react';

// Memoize expensive computations
const sortedProjects = useMemo(() => {
  return projects.sort((a, b) => a.title.localeCompare(b.title));
}, [projects]);

// Memoize callbacks passed to children
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []); // Empty deps if no dependencies
```

### 8.3 Virtual Modules (Build-Time Data)

```typescript
// Import from virtual modules (build-time parsed)
import { projectsData } from 'virtual:projects-data';
import { skillsData } from 'virtual:skills-data';

// ✅ GOOD: Data parsed at build time (no runtime overhead)
export const projects: Project[] = projectsData ?? [];

// ❌ BAD: Parsing markdown at runtime (adds bundle size)
const markdown = await import('./projects.md?raw');
const parsed = parseMarkdown(markdown);
```

## 9. Testing Patterns

### 9.1 Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders title correctly', () => {
    render(<HeroSection title="Test Title" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
  });

  it('is keyboard accessible', () => {
    render(<HeroSection />);
    const button = screen.getByRole('button', { name: /view projects/i });
    expect(button).toHaveFocus();
  });
});
```

### 9.2 Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('has no WCAG violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 10. Content & Markdown Patterns

### 10.1 Frontmatter Structure

```yaml
---
title: Project Title
description: Brief project description
technologies: [React, TypeScript, Vite]
gradient: from-blue-500 to-purple-600
demoUrl: https://example.com
sourceUrl: https://github.com/user/repo
status: live
date: 2025-12-09
---
```

### 10.2 Virtual Module Imports

```typescript
// Import content data from virtual modules
import { projectsData } from 'virtual:projects-data';
import { skillsData } from 'virtual:skills-data';
import { blogsData } from 'virtual:blogs-data';
import { learningJourney } from 'virtual:learning-journey-data';

// Fallback pattern for missing data
export const projects: Project[] = Array.isArray(projectsData) && projectsData.length
  ? projectsData
  : fallbackProjects;
```

## 11. Git Commit Conventions

**Conventional Commits Format:**

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Build/tooling changes

**Examples:**

```
feat(hero): add animated gradient background

Implemented Framer Motion gradient animation with performance optimizations.
Uses GPU-accelerated transforms for 60fps on low-end devices.

Closes #42
```

```
fix(navigation): resolve focus trap in mobile menu

Fixed keyboard navigation issue where focus couldn't escape mobile nav.
Added proper ARIA attributes and focus management.

Fixes #58
```

## 12. AI-Specific Instructions

### 12.1 Code Generation Preferences

When generating code:

- ✅ **Use TypeScript strict mode** - No implicit any, explicit types
- ✅ **Named exports** - Avoid default exports
- ✅ **Function components** - No class components
- ✅ **Explicit props interfaces** - Named `{Component}Props`
- ✅ **JSDoc comments** - Document all exported functions
- ✅ **Accessibility first** - Include ARIA, semantic HTML, keyboard support
- ✅ **Error handling** - Return error states, use ErrorBoundary
- ✅ **Path aliases** - Use `@/*` imports, not relative paths outside directory
- ✅ **Virtual modules** - Import content from `virtual:*-data`

### 12.2 Common Patterns to Use

**Component Template:**

```typescript
import React, { useState } from 'react';
import type { ReactNode } from 'react';

interface ComponentNameProps {
  title: string;
  children?: ReactNode;
  onAction?: () => void;
}

/**
 * Brief component description
 * 
 * @param props - Component props
 * @returns Rendered component
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  children,
  onAction,
}) => {
  const [state, setState] = useState<string>('');

  return (
    <section aria-labelledby="component-heading">
      <h2 id="component-heading">{title}</h2>
      {children}
    </section>
  );
};
```

**Custom Hook Template:**

```typescript
import { useState, useEffect } from 'react';

interface UseHookReturn {
  data: Data | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook description
 * 
 * @param param - Parameter description
 * @returns Hook return value with data, loading, error states
 */
export const useHookName = (param: string): UseHookReturn => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Hook logic
  }, [param]);

  return { data, loading, error };
};
```

### 12.3 Patterns to Avoid

**Don't Generate:**

- ❌ Class components
- ❌ Default exports
- ❌ Implicit `any` types
- ❌ Inline styles (use Tailwind classes)
- ❌ Non-semantic HTML (`<div>` buttons, etc.)
- ❌ Missing accessibility attributes
- ❌ Relative imports across directories (use `@/*`)
- ❌ Runtime markdown parsing (use virtual modules)

## 13. Quick Reference

### 13.1 File Extensions

| Extension     | Purpose                                    |
| ------------- | ------------------------------------------ |
| `.tsx`      | React components with JSX                  |
| `.ts`       | TypeScript files (utilities, hooks, types) |
| `.test.tsx` | Component tests                            |
| `.test.ts`  | Utility function tests                     |
| `.md`       | Markdown content                           |
| `.json`     | Configuration and data                     |

### 13.2 Path Aliases

```typescript
// Available path aliases (tsconfig.json)
import { Component } from '@/components/Component';  // src/components/
import { useHook } from '@/hooks/useHook';          // src/hooks/
import { util } from '@/utils/util';                // src/utils/
import type { Type } from '@/types';                // src/types/
```

### 13.3 Virtual Modules

```typescript
// Available virtual modules (Vite plugins)
import { projectsData } from 'virtual:projects-data';
import { skillsData } from 'virtual:skills-data';
import { blogsData } from 'virtual:blogs-data';
import { contactData } from 'virtual:contact-data';
import { aboutData } from 'virtual:about-data';
import { homeData } from 'virtual:home-data';
import { learningJourney } from 'virtual:learning-journey-data';
```

### 13.4 Common Imports

```typescript
// React
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode, FC } from 'react';

// Animation
import { motion } from 'framer-motion';

// Error handling
import { ErrorBoundary } from 'react-error-boundary';

// Testing
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Types
import type { Project, Skill, BlogPost } from '@/types';
```

## 14. Architecture Decision Records (ADRs)

Reference these ADRs for architectural context:

- **[ADR-001: Build-Time vs Runtime Parsing](./adr/001-build-time-vs-runtime-parsing.md)** - Use Vite plugins for build-time content parsing
- **[ADR-002: Virtual Modules vs Import Aliases](./adr/002-virtual-modules-vs-import-aliases.md)** - Use `virtual:*` prefix for content modules
- **[ADR-003: Single vs Multiple Plugins](./adr/003-single-vs-multiple-plugins.md)** - Use two plugins (content + journey)
- **[ADR-004: Markdown vs CMS](./adr/004-markdown-vs-cms.md)** - Use Markdown files in Git
- **[ADR-005: TypeScript Strict Mode](./adr/005-typescript-strict-mode.md)** - Enable full strict mode

## 15. Related Documentation

- [Technology Stack Blueprint](./Technology_Stack_Blueprint.md) - Complete dependency documentation
- [Folder Structure Blueprint](./Folder_Structure_Blueprint.md) - Directory organization guide
- [Project Architecture Blueprint](./Architecture_Blueprint.md) - High-level architecture overview
- [Markdown Content System Spec](../spec/markdown-content-system.md) - Content pipeline documentation

---

**Revision History:**

| Date       | Author              | Changes                                               |
| ---------- | ------------------- | ----------------------------------------------------- |
| 2025-12-09 | Growth Journey Team | Initial version auto-generated from codebase analysis |

---

v1.0.1 | Active | Last Updated: Dec 11 2025

---

