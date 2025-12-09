[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-Performance%2090%2B-brightgreen?style=for-the-badge&logo=lighthouse)](https://growth-journey-portfolio.vercel.app)
[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse-Accessibility%2090%2B-brightgreen?style=for-the-badge&logo=lighthouse)](https://growth-journey-portfolio.vercel.app)
[![WCAG AA Compliant](https://img.shields.io/badge/WCAG-AA%20Compliant-blue?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

<div align="center">
  <h1>Growth Journey Portfolio</h1>
  <p><strong>Interactive career transformation story from Admin/Procurement to Tech Professional</strong></p>
  <p>
    <a href="https://growth-journey-portfolio.vercel.app">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#tech-stack">Tech Stack</a>
  </p>
</div>

---

## Overview

A performance-first, accessibility-focused portfolio showcasing career growth through strategic storytelling and technical execution. Built with React 18, TypeScript, and modern web technologies to achieve 90+ Lighthouse scores while maintaining WCAG AA compliance.

**Current Phase:** Phase 2 - Architecture & Design (refinement)

### Key Highlights

- Interactive career timeline with milestone tracking
- Performance-optimized animations with device adaptation
- Learning journey across Coursera, LMS, TryHackMe, LeetCode, and roadmap.sh
- Contact system with validation and anti-spam protection

## Features

### Portfolio Sections

**Hero & Timeline**

- Animated introduction with career archetype ("The Technical Storyteller")
- Interactive timeline showing progression from admin/procurement to tech
- Milestone markers highlighting key achievements and transitions

**Skills & Projects**

- Category-based skill visualization (Development, Networking, Data, AI/ML)
- Project showcase with live demos and source code links
- Technology stack badges and gradient-based visual hierarchy

**GitHub Integration**

- Live contribution graph with activity tracking
- Repository showcase with stars, forks, and primary language
- Automatic updates from GitHub API

**Learning Journey**

- Platform-specific progress (TryHackMe ranks, LeetCode stats, roadmap.sh paths)
- Expandable learning cards with detailed achievements
- Categorized by work experience, education, and technical skills

**Contact & Blog**

- Professional contact form with validation
- Blog section for ongoing learning insights
- Resume download capability

### Technical Features

- 
- **Performance**: Code splitting, lazy loading, image optimization
- **Accessibility**: WCAG AA compliant, keyboard navigation, screen reader support, reduced motion
- **UX**: Microsoft Viva-inspired animations that adapt to device performance
- **SEO**: Semantic HTML, meta tags, structured data
- **Testing**: Unit tests (Vitest), E2E tests (Playwright), accessibility tests (axe-core)
- **CI/CD**: Automated testing, Lighthouse CI, linting, and deployment

## Quick Start

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm 9+ (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/joembolinas/myPortfolio.git
cd myPortfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the portfolio in action.

### Optional: GitHub Integration

To enable real-time GitHub data, create a `.env.local` file:

```env
VITE_GITHUB_TOKEN=your_personal_access_token
```

> **Note:** Generate a token at [GitHub Settings → Tokens](https://github.com/settings/tokens) with `public_repo` scope. The site functions without this token but GitHub API requests will be rate-limited (60/hour).

## Development

### Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run end-to-end tests
npm run test:a11y        # Run accessibility tests

# Code Quality
npm run lint             # Check for linting issues
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking

# Performance
npm run analyze          # Analyze bundle size
npm run lighthouse       # Run Lighthouse CI
```

### Project Structure

```
myPortfolio/
├── src/
│   ├── components/          # React components
│   │   ├── animations/      # Framer Motion effects
│   │   ├── github/          # GitHub integration components
│   │   ├── layout/          # Navigation, Footer
│   │   ├── sections/        # Main page sections
│   │   ├── ui/              # Reusable UI components
│   │   └── lazy/            # Lazy-loaded sections
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services (GitHub, contact)
│   ├── data/                # Static data (projects, skills)
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript type definitions
│   └── __tests__/           # Test files
├── public/                  # Static assets
├── config/                  # Configuration files
├── docs/                    # Documentation
└── logging-system/          # Development logging utilities
```

## Tech Stack

### Core Technologies

| Technology                                   | Version | Purpose      |
| -------------------------------------------- | ------- | ------------ |
| [React](https://reactjs.org/)                   | 18+     | UI Framework |
| [TypeScript](https://www.typescriptlang.org/)   | 5.0+    | Type Safety  |
| [Vite](https://vitejs.dev/)                     | 5.0+    | Build Tool   |
| [Tailwind CSS](https://tailwindcss.com/)        | 3.0+    | Styling      |
| [Framer Motion](https://www.framer.com/motion/) | Latest  | Animations   |

### Development Tools

| Tool          | Purpose                |
| ------------- | ---------------------- |
| ESLint        | Code Quality           |
| Prettier      | Code Formatting        |
| Vitest        | Unit Testing           |
| Playwright    | E2E Testing            |
| Lighthouse CI | Performance Monitoring |
| axe-core      | Accessibility Testing  |

### Key Dependencies

- **UI Components**: `@headlessui/react`, `lucide-react`
- **Utilities**: `clsx`, `date-fns`, `gray-matter`
- **Routing**: `react-router-dom`
- **Error Handling**: `react-error-boundary`

## Performance & Accessibility

### Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### Accessibility Standards

- WCAG AA Compliant
- Keyboard navigation support
- Screen reader optimized
- Reduced motion support
- High contrast mode compatible
- Focus management utilities

### Optimization Strategies

- Code splitting with React.lazy
- Image optimization and lazy loading
- Device-adaptive animations
- Memory usage monitoring
- Bundle size analysis

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](docs/CONTRIBUTING.md) for details on:

- Code standards and conventions
- Testing requirements
- Pull request process
- Development workflow

## Roadmap

### Current Phase: Phase 2 - Architecture & Design

- [ ] Phase 1: Foundation & Setup
- [ ] Phase 2.1: Component Architecture
- [ ] Phase 2.2: Animation System
- [ ] Phase 2.3: Accessibility Implementation
- [ ] Phase 2.4: Contact System & Testing
- [ ] Phase 3: Content & Polish
- [ ] Phase 4: Deployment & Monitoring

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## Acknowledgments

Built with excellent open-source tools:

- [React Team](https://reactjs.org/) for the UI framework
- [Vite Team](https://vitejs.dev/) for the blazing-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

<div align="center">
  <p>Built with modern web technologies and a focus on performance, accessibility, and user experience.</p>
  <p>
    <a href="https://growth-journey-portfolio.vercel.app">View Live Demo</a> •
    <a href="https://github.com/joembolinas/myPortfolio">Star on GitHub</a>
  </p>
</div>
