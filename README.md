[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-Performance%2090%2B-brightgreen?style=for-the-badge&logo=lighthouse)](https://growth-journey-portfolio.vercel.app)
[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse-Accessibility%2090%2B-brightgreen?style=for-the-badge&logo=lighthouse)](https://growth-journey-portfolio.vercel.app)
[![WCAG AA Compliant](https://img.shields.io/badge/WCAG-AA%20Compliant-blue?style=for-the-badge)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

<div align="center">
  <h1>Growth Journey Portfolio</h1>
  <p><strong>Interactive career transition story from Admin/Procurement to Tech Professional</strong></p>

[Live Demo](https://growth-journey-portfolio.vercel.app) • [Overview](#overview) • [Features](#features) • [Getting Started](#getting-started) • [Development](#development) • [Tech Stack](#tech-stack)

</div>

---

## Overview

This is an interactive portfolio and career transformation tool built with modern web technologies. It showcases my journey from SNR Admin/Procurement to an emerging technology professional, combining strategic storytelling with technical excellence.

The portfolio emphasizes performance-first development (90+ Lighthouse scores), accessibility-first design (WCAG AA compliant), and user experience. It features real-time GitHub integration, an interactive career timeline, animated components, a contact system, and a blog showcasing my learning journey with TryHackMe, LeetCode, and roadmap.sh.

**Current Phase:** Phase 2.4 - Contact System Implementation and Testing

## Features

### Core Portfolio

- **Interactive Career Timeline** - Visual progression from admin/procurement to tech with milestone markers
- **Skills Progression Visualization** - Learning journey tracking with TryHackMe, LeetCode, and roadmap.sh integration
- **Real-time GitHub Integration** - Live contribution charts, repository showcase, and activity tracking
- **Project & Blog Section** - Curated projects with demos and technical insights
- **Contact System** - Professional form with validation, anti-spam protection, and email submission
- **Resume Download** - One-click PDF download feature

### Technical Excellence

- **Performance Optimized** - Code splitting, lazy loading, image optimization, 90+ Lighthouse scores
- **Accessibility First** - WCAG AA compliant with screen reader support, keyboard navigation, reduced motion
- **Modern Stack** - React 18, Vite 5, TypeScript, Tailwind CSS, Framer Motion
- **Animated UX** - Microsoft Viva-inspired effects with performance adaptation
- **SEO Ready** - Meta tags, structured data, semantic HTML

## Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (included with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Quick Start

Clone the repository:

```bash
git clone https://github.com/joembolinas/myPortfolio.git
cd myPortfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or the port Vite assigns).

### Environment Setup (Optional - GitHub Integration)

To enable real-time GitHub data, create a `.env.local` file in the project root:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

Generate a token at [GitHub Settings → Tokens](https://github.com/settings/tokens)
- Required scopes: `public_repo` (read-only access)

> [!NOTE]
> The site works without this token, but GitHub data will be limited to public API requests (60 requests/hour).

## Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm run test              # Single run
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report

# Run end-to-end tests
npm run test:e2e

# Accessibility testing
npm run test:a11y

# Linting & formatting
npm run lint             # Check for issues
npm run lint:fix         # Auto-fix issues
npm run format          # Format code
npm run format:check    # Check formatting

# Performance
npm run analyze         # Bundle analysis
npm run lighthouse      # Lighthouse CI check
```

### Project Structure

```
src/
├── components/          # React components
│   ├── animations/      # Framer Motion effects
│   ├── github/          # GitHub integration
│   ├── layout/          # Navigation, footer
│   ├── sections/        # Page sections
│   ├── ui/              # Reusable UI components
│   └── lazy/            # Lazy-loaded sections
├── hooks/               # Custom React hooks
├── services/            # API services (GitHub, contact)
├── data/                # Static data (projects, skills, etc.)
├── utils/               # Helper functions
├── types/               # TypeScript types
└── vite/                # Vite plugins

public/                  # Static assets
config/                  # Build config (Tailwind, ESLint, etc.)
```

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React 18** | UI framework with concurrent features |
| **Vite** | Lightning-fast build tool and dev server |
| **TypeScript** | Static type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Advanced animations |
| **Vitest** | Unit testing |
| **Playwright** | E2E testing |

## Performance

All pages target these Lighthouse metrics:

- **Performance:** 90+
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 95+

Check live metrics with `npm run lighthouse`.

## Accessibility

This site is built with accessibility as a core principle:

- Keyboard navigation fully supported
- Screen reader compatible (tested with NVDA, JAWS)
- WCAG 2.1 AA compliant
- Color contrast ratios meet standards
- Reduced motion support
- Semantic HTML throughout
- ARIA labels and landmarks

Run automated checks with `npm run test:a11y`.

## Browser Support

Modern browsers with ES2020+ support:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Deployment

The portfolio is configured for deployment to Vercel (recommended) but works with any static host.

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Vercel auto-deploys on push to main

### Manual Build

```bash
npm run build
# Deploy the 'dist/' folder to your hosting
```

The build is optimized for production with tree-shaking, code splitting, and minification.

## Learning Resources

The portfolio documents my learning journey with these resources:

- [roadmap.sh](https://roadmap.sh/) - Structured learning paths
- [TryHackMe](https://tryhackme.com/) - Security & ethical hacking
- [LeetCode](https://leetcode.com/) - Data structures & algorithms
- [Microsoft Viva](https://www.microsoft.com/en-us/microsoft-viva/) - Design inspiration

## Support & Feedback

Found an issue or have feedback?

- **Issues:** [Open an issue](https://github.com/joembolinas/myPortfolio/issues)
- **Email:** [Contact form](https://growth-journey-portfolio.vercel.app/#contact)
- **Social:** Find me on [GitHub](https://github.com/joembolinas)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Status:** Phase 2.4 in progress - Contact form system complete, testing and documentation underway. See [CHANGELOG](CHANGELOG.md) for detailed updates.
