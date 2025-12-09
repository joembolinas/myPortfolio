---
title: About Section Content & Data Contract
source: internal
author: portfolio-team
post_slug: about-section-spec
categories: [architecture, content]
tags: [about, summary, narrative]
ai_note: Use this spec to structure markdown-driven about content.
summary: Defines fields, sections, and flow for the About section content.
date: 2025-12-09
---

# About Section Dynamic Content Plan

## Overview
Provide markdown-driven narrative for `AboutSection`, including bio, highlights, and values. Content resides in `content/2-about/` and compiles via the Vite content pipeline.

## Directory Structure
```
content/
  2-about/
    About.md          # this spec
    about.md          # primary about copy and lists
```

## Data Model (About)
- `headline`: string — section heading
- `bio`: string — short paragraph bio
- `strengths`: string[] — bullet list of capabilities
- `values`: string[] — bullet list of principles
- `currentFocus`: string[] — bullet list of current learning/building
- `cta`: { label: string; href: string } — optional

## Markdown Format
```markdown
---
headline: About Me
bio: Builder focused on performant, accessible products.
values: ["Accessibility-first", "Performance mindset", "Learning culture"]
strengths: ["TypeScript", "React", "Systems thinking"]
currentFocus: ["Animations", "A11y automation", "Content pipeline"]
cta: { label: "View Projects", href: "#projects" }
---

## Narrative
A 2-3 paragraph story connecting past roles to current tech focus.

## Highlights
- Bullet 1 (strength)
- Bullet 2 (strength)

## Values
- Bullet 1 (value)
- Bullet 2 (value)

## Current Focus
- Bullet 1
- Bullet 2
```

## Implementation Hooks
- Component: `AboutSection.tsx`
- Data: could live in `virtual:about-data` or extended journey plugin
- Utils: reuse bullet parsing; keep sections consistent with parser expectations
- Vite: register a dedicated plugin or extend existing to include `content/2-about/`

## Data Flow
```
content/2-about/about.md -> Vite plugin -> virtual:about-data -> AboutSection
```

## Key Decisions
- Frontmatter powers primary fields; body provides narrative.
- Bullets for strengths/values/focus ensure consistent rendering.
- IDs derived from filename (e.g., `about`).

## Success Criteria
- About section renders headline, bio, lists, and optional CTA from markdown.
- Empty optional arrays produce no UI gaps; CTA hidden if absent.
- HMR reflects changes under 100ms.

## Steps to Author
1. Create `content/2-about/about.md` with frontmatter.
2. Write narrative and bullets.
3. Verify render in `AboutSection`.

## Notes & Edge Cases
- Keep bio ≤ 80 words for layout stability.
- If `values` omitted, hide that list.

{v1.0} | {Draft} | {Last Updated: Dec 09 2025 - 10:59}
