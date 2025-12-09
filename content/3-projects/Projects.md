---
title: Projects Section Content & Data Contract
source: internal
author: portfolio-team
post_slug: projects-section-spec
categories: [architecture, content]
tags: [projects, portfolio, case-studies]
ai_note: Use this spec to structure markdown-driven projects content.
summary: Defines fields, sections, and flow for the Projects section content.
date: 2025-12-09
---

# Projects Section Dynamic Content Plan

## Overview
Markdown-driven project entries feed `ProjectsSection` and `ProjectCard`. Content resides in `content/3-projects/` and compiles to a virtual data module.

## Directory Structure
```
content/
  3-projects/
    Projects.md          # this spec
    project-*.md         # individual project entries
```

## Data Model (Project)
- `id`: string — derived from filename
- `title`: string
- `description`: string
- `technologies`: string[]
- `gradient`: string — Tailwind gradient (optional if generated)
- `demoUrl`: string (optional)
- `sourceUrl`: string (optional)
- `image`: string (optional)
- `highlights`: string[] (optional)
- `status`: enum — `wip | live | archived` (optional)

## Markdown Format
```markdown
---
title: Analytics Dashboard
description: Real-time analytics with React and D3.
technologies: [React, TypeScript, D3]
demoUrl: https://demo.example.com
sourceUrl: https://github.com/user/repo
image: /images/projects/analytics.png
status: live
---

## Highlights
- Built streaming charts with WebSockets
- 90+ Lighthouse scores
- Implemented a11y testing with axe-core

## Notes
Any extra details or lessons learned.
```

## Implementation Hooks
- Components: `ProjectsSection.tsx`, `ProjectCard.tsx`
- Data: `src/data/projects.ts` -> replace static array with `virtual:projects-data`
- Utils: can reuse gradient generator; consider deriving gradients by tag
- Vite: extend plugin to read `content/3-projects/`

## Data Flow
```
content/3-projects/project-*.md -> Vite plugin -> virtual:projects-data -> ProjectsSection
```

## Key Decisions
- Each file = one project; filename slug becomes ID.
- Highlights optional; omit section if empty.
- Status used for badges/filters.

## Success Criteria
- Projects render with title, description, tech list, links, optional image.
- Missing optional fields do not break layout; links hidden if absent.
- Sorting stable by filename or optional date if added later.

## Steps to Author
1. Create `project-my-app.md` with frontmatter.
2. Add highlights bullets as needed.
3. Verify render in `ProjectsSection`.

## Notes & Edge Cases
- Ensure `technologies` array is non-empty for card chips; default to [].
- If image missing, use gradient background fallback.

{v1.0} | {Draft} | {Last Updated: Dec 09 2025 - 11:01}
