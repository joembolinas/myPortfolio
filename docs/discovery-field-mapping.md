**Discovery — Field Mapping & Source Files**

Last updated: 2025-12-21

Purpose
-------
Detailed field-level mapping from the frontend data layer (`src/data/*` and `content/`) to canonical API model fields. Use this for Pydantic model completion and adapter implementation.

Notes
-----
- Many `src/data/*.ts` modules import `virtual:*` modules generated at build-time by the Vite plugin. Adapters must read `content/` files and produce objects matching these modules or use the `src/data` fallbacks as golden examples.

Mapping
-------

Home (`GET /api/home`)
- Source: `src/data/home.ts`, `content/1-home/*.md`
- Fields:
  - `id` (string) [required]
  - `title` (string) [required]
  - `subtitle` (string) [optional]
  - `ctaPrimary` ({label:string, href:string}) [optional]
  - `ctaSecondary` ({label:string, href:string}) [optional]
  - `highlights` (string[]) [optional]
  - `badges` (string[]) [optional]
  - `social` ({label:string, href:string}[]) [optional]
  - `body` (string) [optional]

About (`GET /api/about`)
- Source: `src/data/about.ts`, `content/2-about/*.md`
- Fields:
  - `id` (string) [required]
  - `headline` (string) [required]
  - `bio` (string) [optional]
  - `strengths` (string[]) [optional]
  - `values` (string[]) [optional]
  - `currentFocus` (string[]) [optional]
  - `cta` ({label, href}) [optional]
  - `narrative` (string) [optional]

Projects (`GET /api/projects`, `GET /api/projects/{id}`)
- Source: `src/data/projects.ts`, `content/3-projects/*.md`
- Project item fields:
  - `id` (string) [required]
  - `title` (string) [required]
  - `description` (string) [optional]
  - `technologies` (string[]) [optional]
  - `gradient` (string) [optional]
  - `demoUrl` (string) [optional]
  - `sourceUrl` (string) [optional]
  - `image` (string) [optional]
  - `featured` (boolean) [optional]

Blogs (`GET /api/blogs`, `GET /api/blogs/{slug}`)
- Source: `src/data/blogs.ts`, `content/5-blogs/*.md`
- Fields for list and items:
  - `id` (string) [required]
  - `title` (string) [required]
  - `excerpt` (string) [optional]
  - `content` / `content_markdown` (string) [optional]
  - `content_html` (string) [optional; renderer produced]
  - `publishDate` (ISO date string) [optional/required depending on post]
  - `readTime` (integer minutes) [optional]
  - `category` (enum) [optional]
  - `tags` (string[]) [optional]
  - `featured` (boolean) [optional]
  - `status` (enum: published|draft|coming-soon) [required in fixtures]
  - `image` (string) [optional]
  - `url` (string) [optional]

Contact (`GET /api/contact`)
- Source: `src/data/contact.ts`, `content/6-contact/*.md`
- Fields:
  - `contacts` (array of ContactMethod)
    - ContactMethod: `type` (string), `icon` (string), `label` (string), `value` (string), `url` (string)
  - `navigationItems` (array) with `{id,label,href}` used by header nav

Skills (`GET /api/skills`)
- Source: `src/data/skills.ts`, `content/2.5-skills/*.md`
- Fields:
  - `skills` (array of Skill)
    - `name` (string), `category` (string enum: dev|network|data|ai), `proficiency` (string), `icon` (string)
  - `skillCategories` (object map) with metadata for each category

Learning Journey (`GET /api/learning-journey`)
- Source: `src/data/learningJourney.ts`, `content/learningJourney/*.md`
- Fields per item:
  - `id` (string), `title` (string), `period` (string), `category` (enum), `description` (string)
  - `expandedContent` (object): overview (string), keyLearnings (string[]), technologies?, achievements?, challenges?, nextSteps?
  - `icon` (string), `color` (string), `isExpanded` (boolean)

Websites (`GET /api/websites`)
- Source: `src/data/websites.ts`
- Fields per item: `id`, `title`, `icon`, `useCase`, `example`, `gradient`

Virtual modules & build-time notes
---------------------------------
- The repo uses `virtual:*` virtual modules (e.g., `virtual:projects-data`) resolved by a Vite plugin. The backend adapters must replicate the plugin's output shape.
- During migration, use the `src/data` fallback objects as canonical fixtures and confirm component expectations by inspecting component usage where necessary.

Field requirements matrix (quick view)

- Fields marked [required] are required by the frontend fallback data to render without errors.
- Fields marked [optional] may be absent, but adapters should provide defaults or omit safely.

Adapter behavior recommendations
------------------------------
- Parsing: For Markdown files, parse front-matter (YAML/TOML) into metadata and treat body as `content_markdown`.
- Rendering: Offer both raw markdown and HTML output; default to `content_markdown` and support `?format=html` to return `content_html`.
- Caching: Cache parsed results in-memory with TTL and include `ETag` or `Last-Modified` headers to help frontend caching.
- Errors: Return graceful, schema-compliant errors (HTTP 404 for missing resources; 200 with empty arrays for empty lists).

Next actions (discovery)
------------------------
1. Inspect component code to verify which fields are consumed (if deeper validation required).
2. Finalize Pydantic models using this mapping.
3. Review markdown front-matter variations and normalize parsing rules.

This file is a working document — update as discovery proceeds.
