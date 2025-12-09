---
title: Markdown Content Specs for Home, About, Skills, Projects, Blogs, Contact
version: 1.0
date_created: 2025-12-09
last_updated: 2025-12-09
owner: portfolio-team
tags: [content, architecture, markdown, vite, virtual-modules]
---

# Introduction

Defines AI-ready specifications for moving Home, About, Skills, Projects, Blogs, and Contact sections to markdown-driven data, aligned with the existing journey pipeline (`virtual:learning-journey-data`).

## 1. Purpose & Scope

Purpose: standardize markdown contracts and build-time processing for six sections.
Scope: frontmatter/schema, parsing rules, virtual modules, sorting/visibility rules, HMR behavior.
Audience: frontend devs, content authors, AI agents working on the pipeline.
Assumptions: Node 18+, Vite 5, React 18, TS 5, gray-matter available.

## 2. Definitions
- Virtual Module: Vite in-memory module (`\0virtual:*`).
- Frontmatter: YAML block at file start with required metadata.
- HMR: Hot Module Replacement during dev.
- Card: UI unit rendered in a section list (project, blog, contact).

## 3. Requirements, Constraints & Guidelines
- **REQ-001**: Parse `.md` under `content/{1-home,2-about,2.5-skills,3-projects,5-blogs,6-contact}`.
- **REQ-002**: Validate required frontmatter per section; warn and skip malformed files.
- **REQ-003**: Generate virtual modules per section (`virtual:home-data`, `virtual:about-data`, `virtual:skills-data`, `virtual:projects-data`, `virtual:blogs-data`, `virtual:contact-data`).
- **REQ-004**: Preserve existing interfaces in `src/data/*.ts`; replace static exports with virtual imports.
- **REQ-005**: Support HMR on markdown edits (<100ms target).
- **REQ-006**: Sorting: blogs by date desc; projects stable by filename or optional date; skills grouped by category; contacts ordered as listed; home/about singletons.
- **REQ-007**: Optional fields must degrade gracefully (render nothing, no crashes).
- **REQ-008**: Enforce enum domains (categories, types, proficiency); default safely.
- **SEC-001**: Restrict file reads to `content/` subtree.
- **SEC-002**: Sanitize text when rendering; no `dangerouslySetInnerHTML`.
- **PERF-001**: Build-time overhead <2s for 100 files; virtual module generation <500ms.
- **CON-001**: No runtime fetching/parsing in browser.
- **GUD-001**: Use slug-from-filename as ID; kebab-case.
- **GUD-002**: Log warnings with filename and reason; continue build.
- **PAT-001**: Use existing plugin pattern (`resolveId/load/handleHotUpdate`) from `journeyDataPlugin`.

## 4. Interfaces & Data Contracts

### Home (`content/1-home/hero.md`)
Frontmatter: `title, subtitle, ctaPrimary{label,href}, ctaSecondary?, highlights[], badges?, social[]`.
Sections: `## Hero Copy`, `## Highlights`, `## Notes`.
Virtual export: `export const home = { ... }` consumed by `HeroSection`.

### About (`content/2-about/about.md`)
Frontmatter: `headline, bio, strengths[], values[], currentFocus[], cta?`.
Sections: `## Narrative`, `## Highlights`, `## Values`, `## Current Focus`.
Virtual export: `about` object for `AboutSection`.

### Skills (`content/2.5-skills/skills.md`)
Frontmatter: `category, title, summary` per group.
Section `## Skills` list items with `name, proficiency (beginner|intermediate|advanced), icon?, description?`.
Virtual export: array of skill items grouped; defaults: category->`learning`, proficiency->`beginner`.

### Projects (`content/3-projects/project-*.md`)
Frontmatter: `title, description, technologies[], gradient?, demoUrl?, sourceUrl?, image?, status? (wip|live|archived)`.
Sections: `## Highlights`, `## Notes` optional.
ID: filename slug.
Virtual export: projects array for `ProjectsSection` / `ProjectCard`.

### Blogs (`content/5-blogs/blog-*.md`)
Frontmatter: `title, excerpt, date(ISO), tags[], readTime?, url?, status?(draft|published)`.
Sections: `## Summary`, `## Notes` optional.
Behavior: skip drafts in prod builds; include in dev if flag set.
Virtual export: blogs array for `BlogSection` cards.

### Contact (`content/6-contact/contact.md`)
Frontmatter: `headline, summary`.
Section `## Contacts` list items with `type(email|linkedin|github|phone), label, value, url?, icon?`.
Behavior: synthesize `mailto:`/`tel:` if missing for email/phone; fallback icon if absent.
Virtual export: contacts array for `ContactSection`.

## 5. Acceptance Criteria
- **AC-001**: Given valid project markdown, virtual module exports a typed object with id, title, technologies[] populated.
- **AC-002**: Given blog status `draft`, prod build excludes it; dev build includes with warning toggle.
- **AC-003**: Given missing optional fields (e.g., project image), UI renders fallback gradient without errors.
- **AC-004**: Given skill with invalid proficiency, value defaults to `beginner` and logs warning.
- **AC-005**: Given contact email without url, build synthesizes `mailto:` link.
- **AC-006**: Editing any markdown triggers HMR and updates section data within 100ms.
- **AC-007**: TypeScript compile passes with virtual module imports in all section components.

## 6. Test Automation Strategy
- Unit: parsers per section (frontmatter validation, list extraction), enum defaults.
- Integration: plugin(s) resolveId/load; virtual module JSON shape; sorting rules; draft filtering.
- E2E: dev HMR update; prod build generates data without errors; sections render from virtual data.
- Frameworks: Vitest (existing), Testing Library for sections, optional Playwright sanity for prod build output.
- Coverage: ≥80% overall, 100% on parsing/validation branches.

## 7. Rationale & Context
- Build-time virtual modules avoid shipping parsers to client and match existing journey pipeline.
- Slug-from-filename IDs reduce manual management and stabilize references.
- Enum defaults prevent author errors from breaking builds.
- Draft filtering for blogs keeps workflow flexible without separate CMS.

## 8. Dependencies & External Integrations
- Vite plugin API (same pattern as `journeyDataPlugin` in `vite.config.ts`).
- gray-matter for frontmatter parsing.
- Tailwind gradients used for visuals (projects, skills optional).
- React sections: `HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `BlogSection`, `ContactSection`.

## 9. Examples & Edge Cases
- Project without image → uses gradient fallback.
- Blog with invalid date → skip entry, log warning.
- Skill list missing proficiency → defaults to `beginner`.
- Contact missing icon → map type to default icon (email ✉️, linkedin ���, github ���, phone ☎️).
- Home missing secondary CTA → hide secondary button.

## 10. Validation Criteria
- Run `npm run build`: succeeds; virtual modules resolved; draft blogs excluded.
- Run `npm run dev`: HMR reloads on markdown edit.
- Type-check: no errors importing `virtual:*` modules; ensure `.d.ts` declarations added.
- Manual spot check: each section renders expected fields from markdown content.

## 11. Related Specifications / Further Reading
- `content/md-content.md` — system design overview
- `content/learningJourney/LearningJourney.md` — existing journey plan
- `spec/architecture-markdown-content-system.md` — architecture spec
- Vite Plugin API: https://vitejs.dev/guide/api-plugin.html
- gray-matter: https://github.com/jonschlinkert/gray-matter
