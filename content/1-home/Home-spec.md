---
title: Home Section Content & Data Contract
source: internal
author: portfolio-team
post_slug: home-section-spec
categories: [architecture, content]
tags: [home, hero, navigation, summary]
ai_note: Use this spec to structure markdown-driven home content.
summary: Defines fields, sections, and flow for the homepage/hero content.
date: 2025-12-09
---

# Home Section Dynamic Content Plan

## Overview
Design a markdown-driven source for the homepage/hero content powering `HeroSection` and shared navigation cues. Content lives under `content/1-home/` and is compiled at build-time through the existing Vite content pipeline.

## Directory Structure
```
content/
  1-home/
    Home.md            # this spec
    hero.md            # primary hero copy, CTA, spotlight bullets
```

## Data Model (Home)
- `title`: string — headline for hero
- `subtitle`: string — supporting line
- `ctaPrimary`: { label: string; href: string }
- `ctaSecondary`: { label: string; href: string }
- `highlights`: string[] — short bullet perks
- `badges`: string[] — optional badge labels (e.g., Lighthouse scores)
- `social`: { label: string; href: string }[] — optional links

## Markdown Format
```markdown
---
title: Hero Title
subtitle: Supporting statement
ctaPrimary: { label: "View Projects", href: "#projects" }
ctaSecondary: { label: "Contact", href: "#contact" }
highlights: ["Performance-first", "WCAG AA", "React 18"]
badges: ["Lighthouse 90+", "TypeScript 5"]
social:
  - { label: "GitHub", href: "https://github.com/joembolinas" }
---

## Hero Copy
Concise 2-3 sentences for the intro.

## Highlights
- Bullet 1
- Bullet 2

## Notes
Optional free-form notes.
```

## Implementation Hooks
- Components: `HeroSection.tsx`, `Navigation.tsx`
- Data: `src/data/hero` (to be added or virtualized), leverages virtual module pattern already used for learning journey
- Utils: reuse `markdownParser` patterns; minimal sections required
- Vite: `journeyDataPlugin` can be extended or a sibling plugin `homeDataPlugin`

## Data Flow
```
content/1-home/hero.md -> Vite plugin -> virtual:home-data -> HeroSection
```

## Key Decisions
- Frontmatter drives CTAs and badges for fast lookup.
- Markdown body used for main hero copy and highlights to keep authorship simple.
- IDs derived from filename (e.g., `hero`).

## Success Criteria
- Hero renders headline, subtitle, CTAs, highlights from markdown.
- Missing optional fields degrade gracefully (no crashes, empty arrays).
- HMR updates reflect within 100ms in dev.

## Steps to Author
1. Create `content/1-home/hero.md` with frontmatter fields above.
2. Write concise hero copy and highlight bullets.
3. Save and run dev server; verify Hero updates.

## Notes & Edge Cases
- If `ctaSecondary` omitted, hide secondary button.
- If `badges` empty, hide badge row.
- Keep hero copy under ~60 words for layout stability.

{v1.0} | {Draft} | {Last Updated: Dec 09 2025 - 10:58}
