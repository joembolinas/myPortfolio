<!-- Workspace-specific Copilot instructions -->

# Copilot Workspace Guide

**Growth Journey Portfolio - Comprehensive Development Standards**

## Project Snapshot

- **Phase**: Phase 3 Implementation Plan
- **Stack**: React 18.2 + Vite 7.0 + TypeScript 5.0 + Tailwind CSS 3.4 + Framer Motion 10.16
- **Targets**: 90+ Lighthouse scores, WCAG AA accessibility, performance-first UX
- **Runtime**: Node.js 18+, npm 9+, ES Modules (ESM)

## Core Workflow & Logging

- Follow `.project/workflow-config.json` (8-step flow); present a plan and wait for `CONFIRM or PROCEED` before implementing.
- Ask clarifying questions whenever anything is unclear.
- Log every major action to `project.log` with Unix timestamps; use action types INIT/DECISION/SETUP/CREATE/UPDATE/DELETE/DEPLOY/SYNTHESIS/IMPLEMENTATION/FEEDBACK/MILESTONE. Logging scripts live in `logging-system/`.
- No confirmation needed for `commit.prompt.md`; always suggest a Conventional Commit message after tasks.

## Delivery & Tone

- Keep explanations concise, friendly, and plain—avoid buzzwords and avoid the word "professional".
- Prioritize learning cues: explain the why, highlight trade-offs, and keep guidance relatable.

---

## TypeScript Standards (Strict Mode Enabled)

### Type Safety Requirements

- ✅ **NO implicit `any`** - Always provide explicit types
- ✅ **Null safety** - Handle `null` and `undefined` explicitly with `??` or optional chaining `?.`
- ✅ **Interface over type** - Prefer `interface` for object shapes
- ✅ **Explicit return types** - Functions should declare return types
- ✅ **No type assertions** - Avoid `as` unless absolutely necessary

### Example

```typescript
// ✅ GOOD: Explicit types, null handling
interface UserProfile {
  name: string;
  email: string;
  age?: number;
}

function formatUser(user: UserProfile): string {
  const age = user.age ?? 'unknown';
  return `${user.name} (${age})`;
}

// ❌ BAD: Implicit any, no null handling
function formatUser(user) {
  return user.name + ' (' + user.age + ')';
}
```

---

## Naming Conventions

### Files & Directories

- **Components**: `PascalCase.tsx` (e.g., `HeroSection.tsx`, `Navigation.tsx`)
- **Hooks**: `camelCase.ts` (e.g., `useActiveSection.ts`, `useScrollTo.ts`)
- **Utilities**: `camelCase.ts` (e.g., `markdownParser.ts`, `iconColorGenerator.ts`)
- **Tests**: `{name}.test.tsx` (e.g., `HeroSection.test.tsx`)
- **Config**: `kebab-case.{ext}` (e.g., `prettier.config.cjs`, `vite.config.ts`)
- **Markdown**: `kebab-case.md` (e.g., `project-portfolio.md`)

### Variables & Functions

```typescript
// camelCase for variables and functions
const activeSection = 'hero';
const userName = 'Joem Bolinas';

// PascalCase for components/classes
const HeroSection = () => { /* ... */ };
interface UserProfile { /* ... */ }

// SCREAMING_SNAKE_CASE for constants
const API_BASE_URL = 'https://api.github.com';
const MAX_RETRIES = 3;

// Prefix booleans with is/has/should/can
const isLoading = true;
const hasError = false;
```

### React Components

- **Pattern**: Named exports with `{ComponentName}Props` interface
- **Hooks**: `use{Capability}` (camelCase, starting with "use")

```typescript
interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return <section>{title}</section>;
};
```

---

## Code Formatting (Prettier)

- **Line length**: 100 characters max
- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Single quotes for strings, double for JSX attributes
- **Semicolons**: Required
- **Trailing commas**: Required for multiline

```typescript
// ✅ GOOD: Prettier-compliant
const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Growth Journey Portfolio',
    technologies: ['React', 'TypeScript', 'Vite'],
  },
];
```

---

## React Component Structure

**Component Style**: Function components with hooks (NO class components)

```typescript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  title: string;
  items: string[];
  onSelect?: (item: string) => void;
}

export const Component: React.FC<ComponentProps> = ({ title, items, onSelect }) => {
  // 1. State hooks
  const [selected, setSelected] = useState<string | null>(null);

  // 2. Effect hooks
  useEffect(() => {
    return () => {
      // Cleanup
    };
  }, [selected]);

  // 3. Event handlers (handle* prefix)
  const handleItemClick = (item: string) => {
    setSelected(item);
    onSelect?.(item);
  };

  // 4. JSX return
  return (
    <section aria-labelledby="component-heading">
      <h2 id="component-heading">{title}</h2>
      {/* Component markup */}
    </section>
  );
};
```

**Key Patterns:**

- ✅ Named exports (not default)
- ✅ Props interface named `{ComponentName}Props`
- ✅ Hooks at top, before event handlers
- ✅ Event handlers prefixed with `handle*`
- ✅ Optional callbacks with optional chaining `?.`

---

## Import Organization

```typescript
// 1. React (always first)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Path alias imports (@/*)
import { useActiveSection } from '@/hooks/useActiveSection';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types';

// 3. Virtual module imports (virtual:*)
import { projectsData } from 'virtual:projects-data';

// 4. Relative imports
import { formatDate } from './utils';

// 5. Assets and styles
import './styles.css';
```

**Rules:**

- One blank line between each group
- No blank lines within groups
- Prefer named imports for components/utilities
- Use `import type` for types (helps tree-shaking)

---

## Path Aliases & Virtual Modules

### Path Aliases (tsconfig.json)

```typescript
import { Component } from '@/components/Component';  // src/components/
import { useHook } from '@/hooks/useHook';          // src/hooks/
import { util } from '@/utils/util';                // src/utils/
import type { Type } from '@/types';                // src/types/
```

### Virtual Modules (Vite plugins)

```typescript
// Available virtual modules
import { projectsData } from 'virtual:projects-data';
import { skillsData } from 'virtual:skills-data';
import { blogsData } from 'virtual:blogs-data';
import { contactData } from 'virtual:contact-data';
import { aboutData } from 'virtual:about-data';
import { homeData } from 'virtual:home-data';
import { learningJourney } from 'virtual:learning-journey-data';
```

---

## Error Handling Patterns

### Async Error Handling

```typescript
async function fetchGitHubData(): Promise<GitHubUser | null> {
  try {
    const response = await fetch('https://api.github.com/users/joembolinas');
  
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  
    const data = await response.json();
    return data as GitHubUser;
  
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch GitHub data:', error.message);
    }
    return null; // Explicit failure handling
  }
}
```

### Hook Error Handling

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
```

### Form Validation

```typescript
interface FormErrors {
  email?: string;
  message?: string;
}

function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}
```

---

## Accessibility Patterns (WCAG AA)

### Semantic HTML

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

// ❌ BAD: Divs without semantics
<div className="nav">
  <div>Home</div>
</div>
```

### Keyboard Navigation

```typescript
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
```

### Screen Reader Support

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

---

## Performance Patterns

### Lazy Loading

```typescript
import { lazy, Suspense } from 'react';

const GitHubSection = lazy(() => import('@/components/sections/GitHubSection'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubSection />
    </Suspense>
  );
}
```

### Memoization

```typescript
import { useMemo, useCallback } from 'react';

// Memoize expensive computations
const sortedProjects = useMemo(() => {
  return projects.sort((a, b) => a.title.localeCompare(b.title));
}, [projects]);

// Memoize callbacks passed to children
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);
```

---

## Documentation Rules

### JSDoc Comments

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

**Requirements:**

- ✅ All exported functions must have JSDoc
- ✅ Explain why, not what
- ✅ Document all parameters with `@param`
- ✅ Document return values with `@returns`
- ✅ Add `@example` when helpful

### File Footnotes

Include at end of each file:

```
v1.0.0 | Active | Last Updated: Dec 11 2025 - 14:30
```

### Comments

- Explain the rationale (not just the steps) when code is non-obvious
- Use ASCII for diagrams; only use mermaid if explicitly requested
- Keep comments up to date during refactoring

---

## Testing Patterns

### Component Testing

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

### Accessibility Testing

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

---

## Coding Approach

- Explain before coding; start simple and layer complexity gradually
- Offer alternatives with brief pros/cons when meaningful
- Keep changes maintainable and easy to follow for a learning developer
- Prioritize readability over cleverness

---

## Response Patterns

- **Technical questions**: (1) Quick answer, (2) Why it matters, (3) How to implement, (4) What to learn next
- **Code generation**: (1) Brief explanation, (2) The code with helpful comments, (3) How it works, (4) Next steps

---

## Git Commit Conventions

**Format**: `<type>(<scope>): <subject>`

**Types**:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Build/tooling changes

**Example**:

```
feat(hero): add animated gradient background

Implemented Framer Motion gradient animation with performance optimizations.
Uses GPU-accelerated transforms for 60fps on low-end devices.

Closes #42
```

---

## AI Code Generation Checklist

When generating code:

- ✅ Use TypeScript strict mode - No implicit any
- ✅ Named exports - Avoid default exports
- ✅ Function components - No class components
- ✅ Explicit props interfaces - Named `{Component}Props`
- ✅ JSDoc comments - Document all exported functions
- ✅ Accessibility first - Include ARIA, semantic HTML, keyboard support
- ✅ Error handling - Return error states, use ErrorBoundary
- ✅ Path aliases - Use `@/*` imports
- ✅ Virtual modules - Import content from `virtual:*-data`

**Avoid**:

- ❌ Class components
- ❌ Default exports
- ❌ Implicit `any` types
- ❌ Inline styles (use Tailwind classes)
- ❌ Non-semantic HTML (`<div>` buttons, etc.)
- ❌ Missing accessibility attributes
- ❌ Runtime markdown parsing (use virtual modules)

---

## Project Structure

```
myPortfolio/
├── src/
│   ├── components/          # React components
│   │   ├── animations/     # Reusable animation components
│   │   ├── github/         # GitHub integration components
│   │   ├── layout/         # Layout (Nav, Footer)
│   │   ├── lazy/           # Lazy loading wrappers
│   │   ├── sections/       # Page sections (Hero, About, etc.)
│   │   └── ui/             # Atomic UI (Button, Card, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Pure utility functions
│   ├── services/           # API and external services
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Static data and content imports
│   └── vite/               # Vite plugins
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

---

## Support Agent

- Use `@mentor` for guided learning, debugging help, architecture understanding, or educational code review

---

## Architecture Decision Records

Reference these ADRs for architectural context:

- **ADR-001**: Build-Time vs Runtime Parsing - Use Vite plugins
- **ADR-002**: Virtual Modules vs Import Aliases - Use `virtual:*` prefix
- **ADR-003**: Single vs Multiple Plugins - Use two plugins (content + journey)
- **ADR-004**: Markdown vs CMS - Use Markdown files in Git
- **ADR-005**: TypeScript Strict Mode - Enable full strict mode

See `docs/PHASE-2/adr/` for details.

---

## Related Documentation

- `docs/PHASE-2/Technology_Stack_Blueprint.md` - Complete dependency documentation
- `docs/PHASE-2/Folder_Structure_Blueprint.md` - Directory organization guide
- `docs/PHASE-2/Architecture_Blueprint.md` - High-level architecture overview
- `docs/PHASE-2/Copilot_Instructions_Blueprint.md` - Comprehensive AI instructions (source for this file)
- `.github/instructions/typescript-5-es2022.instructions.md` - TypeScript guidelines

---

## Completed / Legacy Checklist (reference only)

- Phase 1 foundations are complete (repo setup, workflows, project board, logging system)
- Earlier static-HTML scaffold steps are historical; active stack is React/Vite/TypeScript/Tailwind with full build/tests
- Commands: `npm run dev` (local), `npm run build`, `npm run test`, `npm run lint`
- Vite serves at http://localhost:5173 by default

---

v2.0 | Active | Last Updated: Dec 11 2025 - 14:30
