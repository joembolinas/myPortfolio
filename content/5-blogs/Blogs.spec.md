---
title: Blogs Section Content & Data Contract
source: internal
author: portfolio-team
post_slug: blogs-section-spec
categories: [architecture, content]
tags: [blogs, articles, writing]
ai_note: Use this spec to structure markdown-driven blog metadata.
summary: Defines fields, sections, and flow for the Blogs section content.
date: 2025-12-09
---

# Blogs Section Dynamic Content Plan

## Overview
Markdown-driven blog metadata feeding `BlogSection` previews. Content resides in `content/5-blogs/` and compiles into a virtual data module; full posts can remain in a separate folder if needed.

## Directory Structure
```
content/
  5-blogs/
    Blogs.md            # this spec
    blog-*.md           # blog metadata + excerpt
    posts/              # optional full posts
```

## Data Model (Blog Card)
- `id`: string — from filename
- `title`: string
- `excerpt`: string
- `date`: string (ISO)
- `tags`: string[]
- `readTime`: string (optional)
- `url`: string (optional; external or internal route)
- `status`: enum — `draft | published` (optional)

## Markdown Format
```markdown
---
title: Building a Content Pipeline
excerpt: How markdown and Vite virtual modules power this portfolio.
date: 2025-11-30
tags: [content, vite, markdown]
readTime: 6 min
url: /blog/content-pipeline
status: published
---

## Summary
Short paragraph for the card preview.

## Notes
Optional author notes.
```

## Implementation Hooks
- Component: `BlogSection.tsx`
- Data: `src/data/blogs.ts` -> replace static with `virtual:blogs-data`
- Utils: reuse parser for tags, optional sections
- Vite: extend plugin to read `content/5-blogs/`

## Data Flow
```
content/5-blogs/blog-*.md -> Vite plugin -> virtual:blogs-data -> BlogSection
```

## Key Decisions
- Keep blog card data light; full posts can live elsewhere.
- Filename slug is ID; `status` controls visibility (skip drafts in prod).

## Success Criteria
- Blog cards show title, excerpt, tags, date; optional readTime and url.
- Drafts excluded from production renders.
- HMR reflects updates within 100ms.

## Steps to Author
1. Create `blog-slug.md` with frontmatter.
2. Add summary paragraph.
3. Verify render in blog cards.

## Notes & Edge Cases
- If `url` missing, card may link to internal modal or disable link.
- Ensure ISO date for consistent sorting.

{v1.0} | {Draft} | {Last Updated: Dec 09 2025 - 11:02}
