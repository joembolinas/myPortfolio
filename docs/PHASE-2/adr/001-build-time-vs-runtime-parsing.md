# ADR-001: Build-Time vs Runtime Content Parsing

- **Status:** Accepted
- **Date:** 2025-12-09
- **Author:** Growth Journey Portfolio Team
- **Tags:** performance, build-system, content-pipeline, vite

## Context

The Growth Journey Portfolio displays content from Markdown files containing YAML frontmatter. This content needs to be parsed and transformed into JavaScript data structures that React components can consume. There are two fundamental approaches to when this parsing occurs:

1. **Runtime parsing:** Parse Markdown files in the browser when the application loads
2. **Build-time parsing:** Parse Markdown files during the Vite build process and generate static data modules

### Current State

- 7 content sections (Home, About, Skills, Projects, Blogs, Contact, Learning Journey)
- All content authored in Markdown with YAML frontmatter
- Target: Lighthouse Performance score ≥90 (PERF-001)
- Requirement: Zero unnecessary runtime overhead (PERF-004)

### Constraints

- Must support hot module replacement (HMR) for developer experience
- Must maintain type safety across content data
- Must work offline (no API calls to external CMS)
- Must be performant on low-end devices

## Decision Drivers

- **Performance:** Minimize client bundle size and runtime overhead
- **Type Safety:** Ensure TypeScript can validate content data structures
- **Developer Experience:** Fast feedback loop during content authoring
- **Simplicity:** Minimize complexity in React components
- **Bundle Size:** Meet performance budget (PERF-002: <500KB initial bundle)

## Options Considered

### Option A: Runtime Parsing (Browser)

**Description:**

Import `gray-matter` and markdown parsing libraries in the browser. Fetch Markdown files at runtime, parse them client-side, and render content.

**Pros:**

- ✅ Simple implementation initially
- ✅ Content changes don't require rebuild
- ✅ Could support dynamic content updates

**Cons:**

- ❌ Adds 50KB+ to client bundle (gray-matter + dependencies)
- ❌ Parsing overhead on every page load
- ❌ Slower initial render (must wait for parsing)
- ❌ Type safety difficult (runtime data structure)
- ❌ Performance penalty on mobile devices
- ❌ Violates PERF-004 requirement

**Implementation Complexity:** Low (initially), Medium (with optimization)

**Performance Impact:**

- Bundle size: +50-70KB
- Parse time: ~10-20ms per file on desktop, 50-100ms on mobile

### Option B: Build-Time Parsing (Vite Plugin)

**Description:**

Create custom Vite plugins that parse Markdown files during build, generate virtual modules with pre-parsed data, and provide type-safe imports to React components.

**Pros:**

- ✅ Zero runtime parsing overhead
- ✅ No parsing libraries in client bundle (-50KB+)
- ✅ Full TypeScript type safety with virtual module declarations
- ✅ Pre-validated data at build time
- ✅ Fast HMR updates during development
- ✅ Instant data availability (no async loading)
- ✅ Better performance on low-end devices
- ✅ Meets PERF-004 requirement

**Cons:**

- ❌ More complex build configuration
- ❌ Content changes require rebuild (mitigated by fast HMR)
- ❌ Requires understanding of Vite plugin API
- ❌ Custom tooling to maintain

**Implementation Complexity:** Medium

**Performance Impact:**

- Bundle size: No parsing library overhead
- Runtime: Zero parsing time
- Build time: +100-200ms per section (one-time cost)

### Option C: Hybrid Approach

**Description:**

Parse critical content at build time, lazy-load and parse non-critical content at runtime.

**Pros:**

- ✅ Optimizes initial bundle size
- ✅ Fast initial render for critical content

**Cons:**

- ❌ Increased complexity (two parsing strategies)
- ❌ Still includes parsing libraries in bundle
- ❌ Harder to maintain consistency
- ❌ Split-brain problem (which content is critical?)

**Implementation Complexity:** High

## Decision

**Selected:** Option B - Build-Time Parsing with Vite Plugins

**Rationale:**

Build-time parsing with Vite plugins best satisfies our performance and developer experience requirements:

1. **Performance Alignment:** Directly supports PERF-004 (eliminate runtime overhead) and PERF-002 (bundle size budget). Removing 50KB+ parsing libraries from the client bundle is significant.

2. **Type Safety:** Build-time generation enables TypeScript virtual module declarations, providing compile-time type checking and IntelliSense for all content data (REQ-003).

3. **Developer Experience:** Vite's HMR capabilities mean content changes trigger fast rebuilds (typically <200ms), providing near-instant feedback. This is acceptable compared to true runtime editing.

4. **Simplicity in Components:** React components import pre-parsed, type-safe data with simple `import` statements. No parsing logic, error handling, or loading states needed in UI layer.

5. **Build-Time Validation:** Content validation (schema checks, required fields) happens at build time, failing fast rather than at runtime.

6. **Mobile Performance:** Zero runtime parsing overhead particularly benefits low-end mobile devices.

The trade-off of requiring a build step for content changes is acceptable because:
- HMR makes rebuilds nearly instant during development
- Production deployments already require builds
- This is a solo developer project (no non-technical content editors)

## Consequences

### Positive

- ✅ **Zero runtime overhead:** No parsing libraries in client bundle, no parsing time on page load
- ✅ **Excellent type safety:** Full TypeScript support with virtual module declarations
- ✅ **Fast HMR:** Content changes reflect in browser within 200ms during development
- ✅ **Simplified components:** No async data loading, error handling, or parsing logic in UI layer
- ✅ **Build-time validation:** Catch content errors before deployment
- ✅ **Performance budget compliance:** Helps achieve Lighthouse 90+ and bundle size targets
- ✅ **Better mobile experience:** Instant content availability without parsing overhead

### Negative

- ⚠️ **Build step required:** Content changes require rebuild (mitigated by fast HMR in development, acceptable in production workflow)
- ⚠️ **Custom tooling:** Must maintain two Vite plugins (contentDataPlugin, journeyDataPlugin)
- ⚠️ **Learning curve:** Team needs to understand Vite plugin API and virtual modules pattern
- ⚠️ **Documentation burden:** Must document plugin architecture for maintainability

### Neutral

- ℹ️ **Build time increase:** ~100-200ms per content section (acceptable for 7 sections = ~1s total)
- ℹ️ **Virtual modules concept:** Novel pattern but well-documented in Vite ecosystem

## Implementation Notes

### Vite Plugin Implementation

Two plugins required:

1. **`contentDataPlugin.ts`** - Handles 6 standard sections (Home, About, Skills, Projects, Blogs, Contact)
2. **`journeyDataPlugin.ts`** - Handles Learning Journey with recursive parsing

### Plugin Hook Requirements

Each plugin must implement:

- `resolveId(id)` - Detect virtual module IDs (e.g., `virtual:home-data`)
- `load(id)` - Generate module code with parsed data
- `handleHotUpdate({ file, server })` - Invalidate modules when content changes

### Virtual Module Pattern

```typescript
// Virtual module ID
import { homeData } from 'virtual:home-data';

// Type declaration (src/types/virtual-modules.d.ts)
declare module 'virtual:home-data' {
  export const homeData: HomeData;
}

// Re-export layer with fallback (src/data/projects.ts)
export const projects: Project[] =
  Array.isArray(projectsData) && projectsData.length > 0
    ? projectsData
    : fallbackProjects;
```

### HMR Strategy

- Watch `content/` directory for changes
- On change, invalidate corresponding virtual module
- Vite triggers React component re-render with new data

## Related Decisions

- [ADR-002: Virtual Modules vs Import Aliases](./002-virtual-modules-vs-import-aliases.md) - Builds on this decision
- [ADR-003: Single vs Multiple Plugins](./003-single-vs-multiple-plugins.md) - Plugin organization
- [ADR-004: Markdown vs CMS](./004-markdown-vs-cms.md) - Content source decision

## References

- [PERF-004: Eliminate Runtime Content Parsing](../Architecture_Blueprint.md#perf-004)
- [REQ-003: Type-Safe Content Access](../Architecture_Blueprint.md#req-003)
- [Vite Plugin API Documentation](https://vitejs.dev/guide/api-plugin.html)
- [Virtual Modules Pattern](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- [Technology Stack Blueprint](../Technology_Stack_Blueprint.md#32-content-processing)

## Follow-Up Actions

- [x] Implement `contentDataPlugin.ts` with 6 section parsers (EPIC-001-F1, F2, F3)
- [x] Implement `journeyDataPlugin.ts` with recursive parsing (EPIC-001-F4.8)
- [x] Create virtual module TypeScript declarations (EPIC-001-F7)
- [x] Add re-export layer with fallbacks (EPIC-001-F9)
- [x] Document HMR behavior in development guide
- [ ] Measure and document build time impact (EPIC-003)
- [ ] Create plugin architecture documentation (EPIC-001)

---

**Revision History:**

| Date | Author | Changes |
|------|--------|---------|
| 2025-12-09 | Growth Journey Team | Initial version extracted from Architecture_Blueprint.md |

---

v1.0.0 | Accepted | Last Updated: Dec 09 2025 - 15:50
