# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Phase 2.3 Accessibility improvements: landmarks (main, banner, navigation, contentinfo)
- Skip link for keyboard users
- Semantic navigation with anchor links and aria-current
- Contact form ARIA: role=form, error associations, live region alerts
- Focus management utilities (useFocusReturn, focusSectionHeading)
- Reduced motion support via prefers-reduced-motion media query
- High contrast utility class and improved focus ring styling
- Automated axe accessibility test (jest-axe + vitest)

### Changed
- Converted nav buttons to list of links for better semantics and URL support
- Adjusted form inputs to include aria-invalid and aria-describedby

### Notes
- Color contrast for gradient text intentionally excluded from automated rule; manual verification required

### Added - Contact System Implementation (August 11, 2025)

- Complete contact form system with validation, submission handling, and user feedback
- `contactService.ts` with mock submission backend, honeypot spam filtering, and cooldown tracking
- `useContactForm.ts` custom hook with form state management, validation rules, and submission flow
- Enhanced ContactSection component with integrated contact form, social links, and resume download
- Form validation with email format checking, required field validation, and message length limits
- Anti-spam protection through honeypot fields and email-based submission cooldowns
- Accessibility features including ARIA live regions for form status and screen reader support
- Enhanced Button component with form submission support and type attribute handling
- Comprehensive test suite with Vitest for contact form validation and service functionality

## [2.2.0] - 2024-12-24

### Added - Animation System Implementation

- Complete Framer Motion animation system with Microsoft Viva-inspired effects
- FadeInOnScroll component for scroll-triggered animations
- HoverLift component with glow effects and card lifting
- ParticleBackground component with interactive particles for HeroSection
- MorphingText and CyclicText components for dynamic text animations
- ProgressiveReveal component with staggered element reveals
- useDevicePerformance and useAdaptiveAnimations hooks for performance optimization

### Added - Enhanced Sections & Features

- Interactive LearningJourneySection with 12 expandable timeline cards
- Modern BlogSection with category filtering and status management
- Enhanced ProjectsSection with Featured + Mini projects structure
- Enhanced HeroSection with particle background and cycling career titles
- Mini projects: Unit Converter, CSS Cheatsheet, Simple Calculator, Todo List
- Enhanced ProjectCard component with hover animations and tech indicators

### Changed - User Feedback Integration

- Skills structure: Separated AI from Data Analytics (now 4 categories: Dev/Network/Data/AI)
- Background design: Kept particle background in Hero, restored moving squares for Projects→Contact
- Excluded AboutSection from background animations for clean design
- Updated TypeScript interfaces to support new skill categories
- Restructured projects layout following wireframe specifications

### Removed

- WebsitesSection component (completely removed from app)
- Combined "Data Analytics & AI" category (separated into Data and AI)
- Static background from sections that now use moving squares pattern

### Performance

- Implemented 70% Performance : 30% Visual Effects ratio as requested
- Device-adaptive animation quality with automatic performance scaling
- Optimized animations for smooth 60fps experience
- Proper motion preference support for accessibility

### Technical Improvements

- Enhanced component architecture with proper TypeScript typing
- Improved data structure for skills, learning journey, and blog posts
- Updated navigation to match new section structure
- Build optimization and error-free compilation

## [2.1.0] - 2024-12-04

### Added

- Directory restructuring and cleanup for better organization
- MIT License (2025 Joem Bolinas)
- CHANGELOG.md for tracking project changes
- Minimal public assets (favicon, robots.txt, manifest, resume placeholder)
- Lighthouse configuration as JS module (config/lighthouse.config.js)

### Changed

- Moved primary documentation to docs/ directory
- Converted lighthouserc.json to lighthouse.config.js for consistency
- Reorganized project structure for Phase 2 development

### Moved

- legacy/css/ - Static CSS from previous HTML version
- legacy/js/ - Static JavaScript from previous HTML version
- legacy/others/ - Phase 1 planning documents and drafts
- docs/PROJECT_CHARTER.md - Project vision and goals
- docs/MASTER_OUTLINE.md - 5-phase development plan
- docs/PHASE1_COMPLETION_SUMMARY.md - Phase 1 achievements
- docs/PHASE2_BACKLOG.md - Phase 2 task breakdown
- docs/CONTRIBUTING.md - Development guidelines

### Removed

- Duplicate workflow configuration files from root directory
- Original lighthouserc.json (replaced by JS config)

### Deprecated

- others/ directory path (replaced by docs/ and legacy/others)

## [1.0.0] - 2025-08-11

### Added

- Initial portfolio project setup
- React + Vite + TypeScript + Tailwind CSS foundation
- Component architecture and data structure
- GitHub Actions CI/CD workflows
- Comprehensive logging system
- Phase 1 foundation completion

### Technical Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- ESLint + Prettier for code quality
- Vitest + Playwright for testing
- GitHub Actions for CI/CD
