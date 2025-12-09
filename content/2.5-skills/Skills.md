---
title: Skills Section Content & Data Contract
source: internal
author: portfolio-team
post_slug: skills-section-spec
categories: [architecture, content]
tags: [skills, taxonomy, visualization]
ai_note: Use this spec to structure markdown-driven skills content.
summary: Defines fields, sections, and flow for the Skills section content.
date: 2025-12-09
---

# Skills Section Dynamic Content Plan

## Overview
Define markdown-driven skills taxonomy powering `SkillsSection` (via `skills.ts` data and UI badges). Content resides in `content/2.5-skills/` and compiles into a virtual data source.

## Directory Structure
```
content/
  2.5-skills/
    Skills.md          # this spec
    skills.md          # skill categories and items
```

## Data Model (Skill Item)
- `name`: string — skill label
- `category`: enum — `dev | network | data | ai | tools | learning`
- `proficiency`: enum — `beginner | intermediate | advanced`
- `icon`: string (optional)
- `description`: string (optional)

## Markdown Format
```markdown
---
category: dev
title: Development Skills
summary: Core web development stack.
---

## Skills
- name: TypeScript
  proficiency: advanced
  icon: ���
  description: Strong typing, generics, tooling
- name: React
  proficiency: advanced
  icon: ⚛️
  description: Hooks, suspense, performance
- name: Node.js
  proficiency: intermediate
```

## Implementation Hooks
- Components: `SkillsSection.tsx`
- Data: `src/data/skills.ts` (replace static array with virtual module like `virtual:skills-data`)
- Utils: may reuse icon mapping; consider category → color mapping similar to journey
- Vite: extend plugin to read `content/2.5-skills/`

## Data Flow
```
content/2.5-skills/skills.md -> Vite plugin -> virtual:skills-data -> SkillsSection
```

## Key Decisions
- YAML frontmatter defines grouping metadata; list items define skills.
- Keep proficiency enum aligned with existing `Skill` type.
- Derive IDs from skill names (slugified) to avoid manual IDs.

## Success Criteria
- Skills render grouped by category with proficiency indicators.
- Missing optional `icon`/`description` do not break layout.
- HMR updates reflect within 100ms.

## Steps to Author
1. Create `content/2.5-skills/skills.md`.
2. Add frontmatter for grouping; list skills under `## Skills`.
3. Verify render in Skills section.

## Notes & Edge Cases
- Enforce allowed categories/proficiency; default to `learning` and `beginner` if invalid.
- Keep list sizes reasonable for mobile; consider pagination if >20 per group.

{v1.0} | {Draft} | {Last Updated: Dec 09 2025 - 11:00}
