---
title: "Technology Stack Blueprint - Growth Journey Portfolio"
source: ""
author: "Growth Journey Portfolio Team"
post_slug: "technology-stack-blueprint"
categories: ["Technology", "Documentation", "Stack Analysis"]
tags: ["react", "typescript", "vite", "tailwindcss", "technology-stack", "dependencies", "build-tools"]
ai_note: "Comprehensive technology stack analysis for the Growth Journey Portfolio. Documents all dependencies, versions, usage patterns, and implementation conventions for consistent code generation."
summary: "Complete technology stack blueprint documenting all frameworks, libraries, tools, and implementation patterns used in the Growth Journey Portfolio React + Vite + TypeScript application."
date: 2025-12-09
---

# Technology Stack Blueprint

## Executive Summary

The Growth Journey Portfolio is a modern React-based single-page application built with TypeScript, Vite, and Tailwind CSS. The stack emphasizes performance (Lighthouse 90+ target), accessibility (WCAG AA compliance), and developer experience through type safety, hot module replacement, and comprehensive testing.

**Primary Technology:** React.js 18.2 with TypeScript 5.0
**Build System:** Vite 7.0 with custom content pipeline plugins
**Styling:** Tailwind CSS 3.4 with custom theme extensions
**Deployment:** Vercel (Node.js 18+ runtime)

## 1. Core Technology Stack

### 1.1 Programming Languages

| Language | Version | Usage | File Extensions |
|----------|---------|-------|-----------------|
| TypeScript | 5.0.2 | Primary application language | \`.ts\`, \`.tsx\` |
| JavaScript | ES2020+ | Configuration files, build scripts | \`.js\`, \`.mjs\` |
| HTML | HTML5 | Entry point, semantic structure | \`.html\` |
| CSS | CSS3 | Base styles, Tailwind output | \`.css\` |
| Markdown | CommonMark | Content authoring | \`.md\` |
| YAML | YAML 1.2 | Frontmatter metadata | \`.md\` frontmatter |

### 1.2 Runtime & Build Environment

**Node.js Requirements:**

- **Version:** 18.0.0 or higher
- **Package Manager:** npm 9+
- **Module System:** ES Modules (ESM)
- **Type:** \`"type": "module"\` in package.json

**Environment Variables:**

- \`NODE_ENV\`: Development/production mode
- Build-time only (no runtime env vars in client bundle)

## 2. Frontend Framework & Libraries

### 2.1 React Ecosystem

**React Core:**

\`\`\`json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
\`\`\`

**Purpose:** UI component library and rendering engine

**Key Features Used:**

- Function components with Hooks (no class components)
- \`useState\` for local state management
- \`useEffect\` for side effects and lifecycle
- \`useContext\` for global state (minimal usage)
- \`useCallback\` and \`useMemo\` for performance optimization
- Custom hooks for reusable logic

**Component Pattern:**

\`\`\`typescript
// Standard function component pattern
import { useState, useEffect } from 'react';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export function Component({ title, onAction }: ComponentProps) {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Side effects here
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div>
      <h2>{title}</h2>
      {/* Component JSX */}
    </div>
  );
}
\`\`\`

**React Router:**

\`\`\`json
{
  "react-router-dom": "^6.15.0"
}
\`\`\`

**Purpose:** Client-side routing (future enhancement - currently single-page)

**Usage Pattern:** Hash-based routing for GitHub Pages compatibility

**React Error Boundary:**

\`\`\`json
{
  "react-error-boundary": "^6.0.0"
}
\`\`\`

**Purpose:** Error handling and graceful degradation

**Implementation Pattern:**

\`\`\`typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  return <div role="alert">Error: {error.message}</div>;
}

// Wrap components
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <Component />
</ErrorBoundary>
\`\`\`

### 2.2 UI & Animation Libraries

**Framer Motion:**

\`\`\`json
{
  "framer-motion": "^10.16.0"
}
\`\`\`

**Purpose:** Declarative animations and transitions

**Usage Patterns:**

- Scroll-triggered animations
- Page transitions
- Component enter/exit animations
- Gesture-based interactions

**Common Implementation:**

\`\`\`typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
\`\`\`

**Headless UI:**

\`\`\`json
{
  "@headlessui/react": "^1.7.17"
}
\`\`\`

**Purpose:** Unstyled, accessible UI components

**Components Used:**

- \`Disclosure\` for expandable sections
- \`Dialog\` for modals (future)
- \`Menu\` for dropdowns (future)

**Integration with Tailwind:**

\`\`\`typescript
import { Disclosure } from '@headlessui/react';

<Disclosure>
  {({ open }) => (
    <>
      <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary-100 px-4 py-2">
        Toggle
      </Disclosure.Button>
      <Disclosure.Panel className="px-4 pt-4 pb-2">
        Content
      </Disclosure.Panel>
    </>
  )}
</Disclosure>
\`\`\`

**Lucide React:**

\`\`\`json
{
  "lucide-react": "^0.263.1"
}
\`\`\`

**Purpose:** Icon library (tree-shakeable SVG icons)

**Usage Pattern:**

\`\`\`typescript
import { Github, Linkedin, Mail } from 'lucide-react';

<Github className="h-6 w-6" aria-label="GitHub" />
\`\`\`

### 2.3 Utility Libraries

**clsx:**

\`\`\`json
{
  "clsx": "^2.0.0"
}
\`\`\`

**Purpose:** Conditional className composition

**Pattern:**

\`\`\`typescript
import clsx from 'clsx';

const className = clsx(
  'base-class',
  isActive && 'active-class',
  isPrimary ? 'primary-variant' : 'secondary-variant'
);
\`\`\`

**date-fns:**

\`\`\`json
{
  "date-fns": "^2.30.0"
}
\`\`\`

**Purpose:** Date formatting and manipulation

**Usage:**

\`\`\`typescript
import { format, parseISO } from 'date-fns';

const formatted = format(parseISO(isoDate), 'MMM dd, yyyy');
\`\`\`

## 3. Build System & Tooling

### 3.1 Vite Build System

**Vite Core:**

\`\`\`json
{
  "vite": "^7.0.6",
  "@vitejs/plugin-react": "^4.0.3"
}
\`\`\`

**Configuration (\`vite.config.ts\`):**

\`\`\`typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { journeyDataPlugin } from './src/vite/journeyDataPlugin';
import { contentDataPlugin } from './src/vite/contentDataPlugin';

export default defineConfig({
  plugins: [
    react(),              // React Fast Refresh + JSX transform
    journeyDataPlugin(),  // Custom: Learning Journey content
    contentDataPlugin(),  // Custom: 6 content sections
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', '@headlessui/react'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
\`\`\`

**Custom Vite Plugins:**

1. **\`contentDataPlugin.ts\`** - Transforms 6 content sections (Home, About, Skills, Projects, Blogs, Contact)
2. **\`journeyDataPlugin.ts\`** - Transforms Learning Journey timeline

**Plugin Hook Implementation:**

\`\`\`typescript
// Pattern for custom Vite plugins
export function contentDataPlugin(): Plugin {
  return {
    name: 'vite-plugin-content-data',
    
    // Resolve virtual module IDs
    resolveId(id: string) {
      if (id.startsWith('virtual:')) {
        return '\\0' + id; // Null-byte prefix
      }
      return null;
    },
    
    // Load virtual module content
    load(id: string) {
      if (id.startsWith('\\0virtual:home-data')) {
        const data = parseHomeContent();
        return \`export const homeData = \${JSON.stringify(data)};\`;
      }
      return null;
    },
    
    // Handle hot module replacement
    handleHotUpdate({ file, server }) {
      if (file.includes('content/')) {
        // Invalidate virtual modules
        const mod = server.moduleGraph.getModuleById('\\0virtual:home-data');
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
        }
      }
    },
  };
}
\`\`\`

**Build Optimization:**

- **Code Splitting:** Manual chunks for vendor and UI libraries
- **Minification:** ESBuild (faster than Terser)
- **Sourcemaps:** Enabled for debugging
- **Target:** esnext (modern browsers only)

### 3.2 TypeScript Configuration

**TypeScript Compiler:**

\`\`\`json
{
  "typescript": "^5.0.2"
}
\`\`\`

**Configuration (\`tsconfig.json\`):**

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "jsx": "react-jsx",
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
\`\`\`

**Key Settings:**

- **Strict Mode:** Enabled (\`strict: true\`)
  - \`strictNullChecks\`
  - \`strictFunctionTypes\`
  - \`strictBindCallApply\`
  - \`noImplicitAny\`
  - \`noImplicitThis\`

- **Module Resolution:** Bundler mode (Vite-optimized)
- **Path Aliases:** \`@/*\` maps to \`src/*\`
- **JSX Transform:** \`react-jsx\` (new React 17+ transform)

**Type Declaration Patterns:**

\`\`\`typescript
// Component props
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

// Data interfaces
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
}

// Virtual module declarations
declare module 'virtual:projects-data' {
  export const projectsData: Project[];
}
\`\`\`

### 3.3 Content Processing

**gray-matter:**

\`\`\`json
{
  "gray-matter": "^4.0.3"
}
\`\`\`

**Purpose:** YAML frontmatter parsing (build-time only)

**Usage in Vite Plugins:**

\`\`\`typescript
import matter from 'gray-matter';

function parseMarkdownFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdown } = matter(content);
  
  return {
    frontmatter: data,
    body: markdown,
  };
}
\`\`\`

**Not Bundled in Client:** Build-time dependency only (PERF-004 requirement)

## 4. Styling & Design System

### 4.1 Tailwind CSS

**Tailwind Core:**

\`\`\`json
{
  "tailwindcss": "^3.4.17",
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.6"
}
\`\`\`

**Configuration (\`tailwind.config.js\`):**

\`\`\`javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          800: '#1f2937',
          900: '#111827',
        },
      },
      animation: {
        'bg-pan': 'bg-pan 20s linear infinite',
      },
      keyframes: {
        'bg-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
\`\`\`

**Utility-First Approach:**

\`\`\`tsx
<button
  className="
    rounded-lg bg-primary-500 px-6 py-3
    text-white font-semibold
    hover:bg-primary-600
    focus:outline-none focus:ring-2 focus:ring-primary-400
    transition-colors duration-200
  "
>
  Click Me
</button>
\`\`\`

**Responsive Design Pattern:**

\`\`\`tsx
<div className="
  grid grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
">
  {/* Responsive grid */}
</div>
\`\`\`

**Dark Mode Support (Future):**

Configuration supports dark mode but not yet implemented.

### 4.2 CSS Organization

**Global Styles (\`src/index.css\`):**

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* CSS custom properties for theming */
  :root {
    --primary: #3b82f6;
    --text-primary: #111827;
  }
  
  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  /* Reusable component classes */
  .btn-primary {
    @apply rounded-lg bg-primary-500 px-6 py-3 text-white;
    @apply hover:bg-primary-600 transition-colors;
  }
}
\`\`\`

**Component-Scoped Styles:**

Prefer Tailwind utilities over separate CSS files. If needed, use CSS modules (not currently used).

## 5. Testing Infrastructure

### 5.1 Unit & Integration Testing

**Vitest:**

\`\`\`json
{
  "vitest": "^3.2.4",
  "jsdom": "^22.1.0"
}
\`\`\`

**Configuration (in \`vite.config.ts\`):**

\`\`\`typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    css: true,
  },
});
\`\`\`

**React Testing Library:**

\`\`\`json
{
  "@testing-library/react": "^13.4.0",
  "@testing-library/jest-dom": "^5.17.0",
  "@testing-library/user-event": "^14.4.3"
}
\`\`\`

**Test Pattern:**

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Component } from './Component';

describe('Component', () => {
  it('renders with correct text', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  it('handles user interaction', async () => {
    const { user } = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByRole('button'));
    // Assert state changes
  });
});
\`\`\`

**Coverage Target:** ≥80% (configured in package.json scripts)

### 5.2 End-to-End Testing

**Playwright:**

\`\`\`json
{
  "@playwright/test": "^1.37.0"
}
\`\`\`

**Usage:**

\`\`\`typescript
import { test, expect } from '@playwright/test';

test('home page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('h1')).toContainText('Growth Journey');
});
\`\`\`

**Test Scope:**

- Section rendering validation
- Navigation flows
- Accessibility keyboard navigation
- Cross-browser compatibility

### 5.3 Accessibility Testing

**axe-core:**

\`\`\`json
{
  "@axe-core/cli": "^4.7.0",
  "jest-axe": "^7.0.1"
}
\`\`\`

**Automated Accessibility Audits:**

\`\`\`bash
npm run test:a11y  # Runs axe on built site
\`\`\`

**Integration with Tests:**

\`\`\`typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
\`\`\`

### 5.4 Performance Testing

**Lighthouse CI:**

\`\`\`json
{
  "@lhci/cli": "^0.15.1"
}
\`\`\`

**Configuration (\`lighthouserc.json\`):**

\`\`\`json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:5173"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
\`\`\`

**Performance Budgets:**

- Performance: ≥90
- Accessibility: ≥90
- Best Practices: ≥90
- SEO: ≥90

## 6. Code Quality & Linting

### 6.1 ESLint

**ESLint & Plugins:**

\`\`\`json
{
  "eslint": "^8.57.1",
  "@typescript-eslint/eslint-plugin": "^8.39.0",
  "@typescript-eslint/parser": "^8.39.0",
  "eslint-plugin-jsx-a11y": "^6.10.2",
  "eslint-plugin-react": "^7.37.5",
  "eslint-plugin-react-hooks": "^4.6.2",
  "eslint-plugin-react-refresh": "^0.4.20"
}
\`\`\`

**Configuration (\`config/.eslintrc.json\`):**

\`\`\`json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "no-unused-vars": "off",
    "no-console": "off",
    "prefer-const": "warn",
    "no-undef": "off"
  }
}
\`\`\`

**ESLint Plugins Used:**

- **\`@typescript-eslint\`:** TypeScript-specific linting rules
- **\`eslint-plugin-react\`:** React best practices
- **\`eslint-plugin-react-hooks\`:** Hooks rules (dependency arrays, etc.)
- **\`eslint-plugin-jsx-a11y\`:** Accessibility linting for JSX
- **\`eslint-plugin-react-refresh\`:** Vite HMR compatibility

**Run Commands:**

\`\`\`bash
npm run lint       # Check for issues
npm run lint:fix   # Auto-fix issues
\`\`\`

### 6.2 Prettier

**Prettier & Plugins:**

\`\`\`json
{
  "prettier": "^3.0.0",
  "prettier-plugin-tailwindcss": "^0.5.3"
}
\`\`\`

**Prettier Config (\`.prettierrc\` or package.json):**

\`\`\`json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
\`\`\`

**Tailwind Plugin:** Automatically sorts Tailwind classes for consistency

**Run Commands:**

\`\`\`bash
npm run format        # Format all files
npm run format:check  # Check formatting without changes
\`\`\`

### 6.3 Husky & lint-staged

**Pre-commit Hooks:**

\`\`\`json
{
  "husky": "^8.0.3",
  "lint-staged": "^16.1.2"
}
\`\`\`

**Configuration (\`package.json\`):**

\`\`\`json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
\`\`\`

**Automatic Checks:**

- ESLint + Prettier run on staged TypeScript files
- Prettier runs on JSON, CSS, Markdown files
- Runs before \`git commit\` (via Husky)

## 7. Development Workflow & Tooling

### 7.1 npm Scripts

**Development:**

\`\`\`bash
npm run dev           # Start Vite dev server (http://localhost:5173)
npm run preview       # Preview production build locally
\`\`\`

**Build:**

\`\`\`bash
npm run build         # TypeScript check + Vite production build
npm run type-check    # Run TypeScript compiler (no emit)
\`\`\`

**Testing:**

\`\`\`bash
npm run test          # Run Vitest tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:e2e      # Run Playwright E2E tests
npm run test:a11y     # Run axe accessibility audit
\`\`\`

**Code Quality:**

\`\`\`bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint issues
npm run format        # Format with Prettier
npm run format:check  # Check Prettier formatting
\`\`\`

**Performance:**

\`\`\`bash
npm run analyze       # Bundle size analysis
npm run lighthouse    # Lighthouse CI
npm run lhci          # Lighthouse CI autorun
\`\`\`

### 7.2 Build Output Analysis

**Rollup Plugin Visualizer:**

\`\`\`json
{
  "rollup-plugin-visualizer": "^6.0.3",
  "vite-bundle-analyzer": "^0.7.0"
}
\`\`\`

**Configuration (in \`vite.config.ts\`):**

\`\`\`typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
\`\`\`

**Output:** Generates \`dist/stats.html\` with interactive bundle visualization

### 7.3 IDE Configuration

**Recommended IDE:** Visual Studio Code (VSCode)

**Extensions:**

- **ESLint:** Real-time linting
- **Prettier:** Code formatting
- **TypeScript:** IntelliSense and type checking
- **Tailwind CSS IntelliSense:** Class name autocomplete
- **Error Lens:** Inline error display

**VSCode Settings (\`.vscode/settings.json\`):**

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
\`\`\`

## 8. Component Architecture & Patterns

### 8.1 Atomic Design Structure

**Directory Organization:**

\`\`\`
src/components/
├── atoms/              # Basic UI elements
│   ├── Button.tsx
│   ├── Icon.tsx
│   └── Badge.tsx
├── molecules/          # Simple composites
│   ├── Card.tsx
│   ├── NavLink.tsx
│   └── SkillBadge.tsx
├── organisms/          # Complex sections
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ProjectGrid.tsx
├── sections/           # Page sections
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── BlogSection.tsx
│   ├── ContactSection.tsx
│   └── LearningJourneySection.tsx
├── animations/         # Animation components
│   ├── FadeInOnScroll.tsx
│   ├── MorphingText.tsx
│   └── ParticleBackground.tsx
├── github/            # GitHub integration
│   ├── GitHubStats.tsx
│   ├── GitHubRepos.tsx
│   └── GitHubContributions.tsx
├── layout/            # Layout components
│   ├── Navigation.tsx
│   └── Footer.tsx
└── lazy/              # Lazy loading wrappers
    └── LazySection.tsx
\`\`\`

### 8.2 Component Naming Conventions

**File Naming:**

- PascalCase for component files: \`HeroSection.tsx\`
- Match component name: file \`Button.tsx\` exports \`Button\`
- Co-locate tests: \`Button.test.tsx\`

**Component Naming:**

\`\`\`typescript
// ✅ Good
export function HeroSection() { }
export function ProjectCard() { }

// ❌ Avoid
export default function heroSection() { }
export const project_card = () => { }
\`\`\`

**Props Naming:**

\`\`\`typescript
// ✅ Good
interface HeroSectionProps {
  title: string;
  onCtaClick: () => void;
}

// Component-specific suffix
interface ButtonProps { }
interface CardProps { }
\`\`\`

### 8.3 State Management Patterns

**Local State (useState):**

\`\`\`typescript
function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  
  return (/* JSX */);
}
\`\`\`

**Global State (Context):**

\`\`\`typescript
// contexts/ThemeContext.tsx
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
\`\`\`

**Custom Hooks Pattern:**

\`\`\`typescript
// hooks/useActiveSection.ts
import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>('');
  
  useEffect(() => {
    const handleScroll = () => {
      // Logic to determine active section
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return activeSection;
}
\`\`\`

### 8.4 Data Flow Pattern

**Virtual Module Imports:**

\`\`\`typescript
// Import content data from virtual modules
import { homeData } from 'virtual:home-data';
import { projectsData } from 'virtual:projects-data';

function HeroSection() {
  // homeData is type-safe and validated at build time
  return (
    <section>
      <h1>{homeData?.title}</h1>
      <p>{homeData?.subtitle}</p>
    </section>
  );
}
\`\`\`

**Re-export Layer with Fallback:**

\`\`\`typescript
// src/data/projects.ts
import { projectsData } from 'virtual:projects-data';

const fallbackProjects: Project[] = [
  {
    id: 'example',
    title: 'Example Project',
    description: 'Placeholder',
    technologies: ['React', 'TypeScript'],
  },
];

export const projects: Project[] =
  Array.isArray(projectsData) && projectsData.length > 0
    ? projectsData
    : fallbackProjects;
\`\`\`

## 9. Performance Optimization Strategies

### 9.1 Code Splitting

**Manual Chunks (Vite Config):**

\`\`\`typescript
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      ui: ['framer-motion', '@headlessui/react'],
    },
  },
}
\`\`\`

**Lazy Loading (Future):**

\`\`\`typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

### 9.2 Asset Optimization

**Image Optimization:**

- Use modern formats (WebP, AVIF)
- Responsive images with \`srcset\`
- Lazy loading with \`loading="lazy"\`

**Font Optimization:**

- Subset fonts to reduce file size
- Use \`font-display: swap\`
- Preload critical fonts

### 9.3 Build-Time Processing

**Zero Runtime Overhead:**

- All Markdown parsing at build time
- Content data inlined as JavaScript constants
- No \`gray-matter\` in client bundle

**Virtual Module Benefits:**

- Type-safe content access
- No fetch requests for content
- Instant data availability

## 10. Accessibility Implementation

### 10.1 Semantic HTML

**Landmark Regions:**

\`\`\`tsx
<header>
  <nav aria-label="Main navigation">
    {/* Navigation */}
  </nav>
</header>

<main>
  <section id="home" aria-labelledby="hero-heading">
    <h1 id="hero-heading">Title</h1>
  </section>
</main>

<footer>
  {/* Footer content */}
</footer>
\`\`\`

### 10.2 ARIA Attributes

**Interactive Elements:**

\`\`\`tsx
<button
  aria-label="Toggle menu"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
>
  <MenuIcon />
</button>

<div
  id="mobile-menu"
  role="menu"
  aria-hidden={!isOpen}
>
  {/* Menu items */}
</div>
\`\`\`

### 10.3 Keyboard Navigation

**Focus Management:**

\`\`\`tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only"
>
  Skip to main content
</a>

<button
  className="
    focus:outline-none
    focus:ring-2
    focus:ring-primary-400
    focus:ring-offset-2
  "
>
  Interactive Element
</button>
\`\`\`

**Screen Reader Only Class:**

\`\`\`css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
\`\`\`

## 11. Deployment & Infrastructure

### 11.1 Vercel Deployment

**Platform:** Vercel Edge Network

**Configuration (\`vercel.json\`):**

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm ci",
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
        }
      ]
    }
  ]
}
\`\`\`

**Build Settings:**

- **Node Version:** 18.x
- **Build Command:** \`npm run build\`
- **Output Directory:** \`dist/\`
- **Install Command:** \`npm ci\`

### 11.2 Environment Variables

**Build-Time Only:**

No runtime environment variables exposed to client bundle.

**Example for Future API Integration:**

\`\`\`typescript
// vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

// Usage
const apiUrl = import.meta.env.VITE_API_URL;
\`\`\`

## 12. Technology Decision Rationale

### 12.1 Why Vite Over Create React App

**Advantages:**

- ⚡ **Faster Dev Server:** ESBuild-powered, instant HMR
- ��� **Better Build Performance:** 10-100x faster than Webpack
- ��� **Modern Defaults:** Native ESM, modern browser targets
- ��� **Plugin Ecosystem:** Custom content pipeline plugins
- ��� **Bundle Size:** Smaller output with Rollup

### 12.2 Why TypeScript

**Benefits:**

- ✅ **Type Safety:** Catch errors at compile time
- ��� **Better IntelliSense:** IDE autocomplete and refactoring
- ��� **Self-Documenting:** Type definitions serve as documentation
- ��� **Refactoring Confidence:** Safe large-scale changes
- ���‍��� **AI-Friendly:** Better code generation with type context

### 12.3 Why Tailwind CSS

**Rationale:**

- ��� **Rapid Development:** Utility-first approach for fast styling
- ��� **Small Bundle:** Purges unused CSS automatically
- ��� **Consistent Design:** Theme configuration enforces standards
- ��� **Customizable:** Easy to extend with custom utilities
- ♿ **Accessibility:** Focus visible utilities built-in

### 12.4 Why Framer Motion

**Benefits:**

- ��� **Declarative Animations:** React-friendly API
- ⚡ **Performance:** GPU-accelerated, optimized animations
- ��� **Gestures:** Built-in drag, hover, tap interactions
- ♿ **Accessibility:** Respects \`prefers-reduced-motion\`
- ��� **Type Safety:** Full TypeScript support

## 13. Dependency Licenses

| Dependency | Version | License | Use Case |
|------------|---------|---------|----------|
| React | 18.2.0 | MIT | UI framework |
| TypeScript | 5.0.2 | Apache-2.0 | Type safety |
| Vite | 7.0.6 | MIT | Build tool |
| Tailwind CSS | 3.4.17 | MIT | Styling |
| Framer Motion | 10.16.0 | MIT | Animations |
| gray-matter | 4.0.3 | MIT | YAML parsing |
| Vitest | 3.2.4 | MIT | Testing |
| Playwright | 1.37.0 | Apache-2.0 | E2E testing |
| ESLint | 8.57.1 | MIT | Linting |
| Prettier | 3.0.0 | MIT | Formatting |

**All Dependencies:** MIT or Apache-2.0 (permissive open-source licenses)

## 14. Upgrade Paths & Compatibility

### 14.1 Current Versions & Constraints

**Node.js:** 18.0.0+ (LTS)
**npm:** 9.0.0+

**Browser Targets:**

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- No IE11 support (ES2020+ target)

### 14.2 Planned Upgrades

**React 19 (Future):**

- Compiler optimization
- Server Components (if needed)

**Vite 6+ (Future):**

- Monitor for Vite 6 release
- Evaluate Rolldown bundler

**TypeScript 5.x:**

- Stay on latest 5.x minor versions
- Monitor for TypeScript 6.0

## 15. Technology Relationship Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                   DEVELOPER WORKFLOW                        │
│  VSCode + Extensions → Git → npm Scripts                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   BUILD SYSTEM (VITE)                       │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Vite      │  │  TypeScript  │  │   ESBuild    │     │
│  │   Core      │→ │  Compiler    │→ │  Minifier    │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
│         ↓                                                   │
│  ┌─────────────────────────────────────────────────┐      │
│  │          CUSTOM VITE PLUGINS                    │      │
│  │  ┌──────────────────┐  ┌──────────────────┐   │      │
│  │  │ contentDataPlugin│  │ journeyDataPlugin│   │      │
│  │  └──────────────────┘  └──────────────────┘   │      │
│  │         ↓ (uses gray-matter)                   │      │
│  │  ┌──────────────────────────────────────┐     │      │
│  │  │     Virtual Modules Generated        │     │      │
│  │  │  virtual:home-data                   │     │      │
│  │  │  virtual:about-data                  │     │      │
│  │  │  virtual:skills-data                 │     │      │
│  │  │  virtual:projects-data               │     │      │
│  │  │  virtual:blogs-data                  │     │      │
│  │  │  virtual:contact-data                │     │      │
│  │  │  virtual:learning-journey-data       │     │      │
│  │  └──────────────────────────────────────┘     │      │
│  └─────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   REACT APPLICATION                         │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   React     │  │  React DOM   │  │  React       │     │
│  │   18.2      │→ │              │→ │  Router      │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
│         ↓                                                   │
│  ┌─────────────────────────────────────────────────┐      │
│  │          UI LIBRARIES                           │      │
│  │  ┌──────────────┐  ┌─────────────────┐         │      │
│  │  │Framer Motion │  │  Headless UI    │         │      │
│  │  │ (animations) │  │  (components)   │         │      │
│  │  └──────────────┘  └─────────────────┘         │      │
│  │  ┌──────────────┐  ┌─────────────────┐         │      │
│  │  │ Lucide React │  │  clsx           │         │      │
│  │  │  (icons)     │  │  (classnames)   │         │      │
│  │  └──────────────┘  └─────────────────┘         │      │
│  └─────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   STYLING SYSTEM                            │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Tailwind   │→ │   PostCSS    │→ │ Autoprefixer │     │
│  │    CSS      │  │              │  │              │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   TESTING STACK                             │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Vitest    │  │  React       │  │  Playwright  │     │
│  │   (unit)    │  │  Testing Lib │  │  (E2E)       │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
│  ┌─────────────┐  ┌──────────────┐                       │
│  │ axe-core    │  │  Lighthouse  │                       │
│  │ (a11y)      │  │  CI (perf)   │                       │
│  └─────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   CODE QUALITY                              │
│                                                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   ESLint    │  │   Prettier   │  │    Husky     │     │
│  │  (linting)  │  │ (formatting) │  │ (pre-commit) │     │
│  └─────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   DEPLOYMENT (VERCEL)                       │
│  Static Assets → Edge CDN → Global Distribution            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 16. Implementation Checklist for New Features

### Adding a New Component

- [ ] Create component file in appropriate directory (atoms/molecules/organisms/sections)
- [ ] Define TypeScript interface for props
- [ ] Implement component with function component pattern
- [ ] Add JSDoc comments explaining purpose
- [ ] Use Tailwind classes for styling
- [ ] Add ARIA attributes for accessibility
- [ ] Implement keyboard navigation if interactive
- [ ] Write unit tests with React Testing Library
- [ ] Add to Storybook (future)
- [ ] Update component index exports

### Adding a New Content Section

- [ ] Define TypeScript interface in \`src/types/index.ts\`
- [ ] Create Markdown files in \`content/\` directory
- [ ] Add virtual module declaration in \`src/types/virtual-modules.d.ts\`
- [ ] Update appropriate Vite plugin (contentDataPlugin or journeyDataPlugin)
- [ ] Implement parser function for section
- [ ] Create re-export layer with fallback in \`src/data/\`
- [ ] Build React section component consuming virtual module
- [ ] Write unit tests for parser function
- [ ] Write integration tests for virtual module
- [ ] Write E2E tests for section rendering
- [ ] Update documentation

### Adding a Third-Party Dependency

- [ ] Evaluate license compatibility (prefer MIT/Apache-2.0)
- [ ] Check bundle size impact with \`npm run analyze\`
- [ ] Verify TypeScript support (\`@types/*\` package or native types)
- [ ] Install: \`npm install <package>\`
- [ ] Install types if needed: \`npm install -D @types/<package>\`
- [ ] Document usage pattern in this blueprint
- [ ] Update dependency table with version and license
- [ ] Test that build still succeeds
- [ ] Verify Lighthouse scores not degraded

## 17. Maintenance & Updates

### Regular Maintenance Tasks

**Weekly:**

- Review dependency security alerts
- Run \`npm audit\` and address vulnerabilities
- Check for Vite/React/TypeScript updates

**Monthly:**

- Update dependencies: \`npm update\`
- Review and update ESLint/Prettier rules
- Analyze bundle size trends
- Review Lighthouse CI trends

**Quarterly:**

- Major version updates (React, Vite, TypeScript)
- Review and update this blueprint
- Audit unused dependencies
- Performance optimization review

### Dependency Update Strategy

**Patch Updates (x.x.X):** Update automatically
**Minor Updates (x.X.x):** Review changelog, update if safe
**Major Updates (X.x.x):** Review breaking changes, plan migration

**Update Command:**

\`\`\`bash
npm update           # Update within semver ranges
npm outdated         # Check for newer versions
npm install <pkg>@latest  # Update specific package
\`\`\`

---

**Blueprint Metadata:**

- **Generated:** December 9, 2025
- **Technology Type:** React.js + TypeScript
- **Depth Level:** Comprehensive
- **Categorization:** Layer + Technology Type
- **Output Format:** Markdown

**Next Steps:**

- Use this blueprint as reference for consistent code generation
- Update blueprint when adding new technologies or patterns
- Share with AI agents for context-aware assistance
- Review quarterly for technology updates

---

v1.0.0 | Approved | Last Updated: Dec 09 2025 - 15:00
