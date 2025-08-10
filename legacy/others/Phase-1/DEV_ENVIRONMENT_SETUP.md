# 🛠️ DEVELOPMENT ENVIRONMENT SETUP

This document provides comprehensive setup instructions for the Growth Journey Portfolio development environment.

## 📋 Package.json Configuration

```json
{
  "name": "growth-journey-portfolio",
  "version": "1.0.0",
  "description": "Interactive portfolio showcasing career growth from admin/procurement to tech professional",
  "type": "module",
  "scripts": {
    "dev": "vite --host",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "analyze": "vite-bundle-analyzer",
    "lighthouse": "lighthouse-ci",
    "a11y-test": "axe --dir ./dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "framer-motion": "^10.16.0",
    "lucide-react": "^0.263.1",
    "@headlessui/react": "^1.7.17",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "postcss": "^8.4.27",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.3",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vitest": "^0.34.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/user-event": "^14.4.3",
    "jsdom": "^22.1.0",
    "@playwright/test": "^1.37.0",
    "lighthouse-ci": "^12.0.0",
    "@axe-core/cli": "^4.7.0",
    "vite-bundle-analyzer": "^0.7.0"
  },
  "keywords": [
    "portfolio",
    "career-transition",
    "react",
    "typescript",
    "vite",
    "tailwindcss",
    "performance",
    "accessibility"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://growth-journey-portfolio.vercel.app",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/growth-journey-portfolio.git"
  },
  "bugs": {
    "url": "https://github.com/your-username/growth-journey-portfolio/issues"
  }
}
```

## 🔧 TypeScript Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/data/*": ["./src/data/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

## 🎨 ESLint Configuration

### .eslintrc.cjs

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-refresh", "@typescript-eslint", "jsx-a11y"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

### .eslintignore

```
dist
node_modules
.env
.env.local
.env.production
.env.development
coverage
build
public
*.config.js
*.config.ts
```

## 💅 Prettier Configuration

### .prettierrc

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### .prettierignore

```
dist
node_modules
.env
.env.local
.env.production
.env.development
coverage
build
public
package-lock.json
yarn.lock
```

## 🎨 Tailwind CSS Configuration

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      screens: {
        xs: "475px",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
```

### postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## ⚡ Vite Configuration

### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
});
```

## 🧪 Testing Configuration

### vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### src/test/setup.ts

```typescript
import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
  webServer: {
    command: "npm run preview",
    port: 4173,
  },
});
```

## 📁 Recommended File Structure

```
growth-journey-portfolio/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── timeline/
│   ├── icons/
│   ├── resume/
│   │   └── resume.pdf
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   └── index.ts
│   │   └── features/
│   │       ├── Hero/
│   │       ├── About/
│   │       ├── Timeline/
│   │       ├── Projects/
│   │       ├── Blog/
│   │       ├── Contact/
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useApi.ts
│   │   ├── useIntersectionObserver.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── api.ts
│   │   ├── components.ts
│   │   ├── global.ts
│   │   └── index.ts
│   ├── data/
│   │   ├── timeline.ts
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── test/
│   │   ├── setup.ts
│   │   ├── utils.tsx
│   │   └── mocks/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
│   ├── e2e/
│   │   ├── homepage.spec.ts
│   │   ├── navigation.spec.ts
│   │   ├── contact.spec.ts
│   │   └── accessibility.spec.ts
│   └── fixtures/
├── docs/
│   ├── CHANGELOG.md
│   ├── DEPLOYMENT.md
│   └── API.md
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy.yml
│   │   └── lighthouse.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── pull_request_template.md
│   └── copilot-instructions.md
├── .env.example
├── .env.local (git-ignored)
├── .gitignore
├── .eslintrc.cjs
├── .eslintignore
├── .prettierrc
├── .prettierignore
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
├── package-lock.json (or yarn.lock)
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── PROJECT_CHARTER.md
```

## 🌐 Environment Variables

### .env.example

```bash
# Application
VITE_APP_TITLE="Growth Journey Portfolio"
VITE_APP_DESCRIPTION="Interactive career transition portfolio"
VITE_APP_URL="https://growth-journey-portfolio.vercel.app"

# Analytics
VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
VITE_HOTJAR_ID="1234567"

# GitHub Integration
VITE_GITHUB_USERNAME="your-username"
VITE_GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Contact Form
VITE_CONTACT_FORM_ENDPOINT="https://api.example.com/contact"
VITE_CALENDLY_URL="https://calendly.com/your-username"

# Error Monitoring
VITE_SENTRY_DSN="https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@sentry.io/1234567"

# Performance Monitoring
VITE_LIGHTHOUSE_CI=true
VITE_BUNDLE_ANALYZER=false

# Development
VITE_DEBUG_MODE=false
VITE_MOCK_API=false
```

## 🚀 Quick Start Commands

```bash
# Initial setup
git clone https://github.com/your-username/growth-journey-portfolio.git
cd growth-journey-portfolio
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## 📊 Development Workflow

1. **Setup:** Clone repository and install dependencies
2. **Environment:** Configure environment variables
3. **Development:** Start development server with `npm run dev`
4. **Code Quality:** Use ESLint and Prettier for code quality
5. **Testing:** Write and run tests for new features
6. **Build:** Test production build with `npm run build`
7. **Deploy:** Push to main branch for automatic deployment

---

**Document Version:** 1.0  
**Last Updated:** August 3, 2025  
**Compatibility:** Node.js 18+, npm 9+
