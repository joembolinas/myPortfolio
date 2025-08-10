# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
