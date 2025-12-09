# ADR-003: Single Plugin vs Multiple Plugins

- **Status:** Accepted
- **Date:** 2025-12-09
- **Author:** Growth Journey Portfolio Team
- **Tags:** vite, code-organization, maintainability

## Context

Seven content sections require Markdown parsing (Home, About, Skills, Projects, Blogs, Contact, Learning Journey). The Learning Journey has unique requirements (recursive parsing of term subdirectories), while the other six sections share similar parsing logic.

The architectural question: Should all sections use one monolithic plugin, seven individual plugins, or a hybrid approach?

## Decision Drivers

- **Code Organization:** Clear separation of concerns
- **Maintainability:** Easy to understand and modify
- **Reusability:** Share common code where appropriate
- **Complexity:** Balance between fragmentation and monolithic design
- **Performance:** Build time and HMR efficiency

## Options Considered

### Option A: Single Monolithic Plugin

**Description:**

One `contentDataPlugin.ts` handles all 7 sections with conditional logic.

**Pros:**

- ✅ Single plugin to configure in `vite.config.ts`
- ✅ All parsing logic in one file
- ✅ Easy to share utility functions

**Cons:**

- ❌ Large, complex file (500+ lines)
- ❌ Mixes concerns (standard vs recursive parsing)
- ❌ Harder to test individual section parsers
- ❌ Difficult to optimize specific sections

**Implementation Complexity:** Low

### Option B: Seven Individual Plugins

**Description:**

Separate plugin for each section: `homeDataPlugin.ts`, `aboutDataPlugin.ts`, etc.

**Pros:**

- ✅ Maximum separation of concerns
- ✅ Easy to test each plugin independently
- ✅ Can optimize plugins individually

**Cons:**

- ❌ Excessive fragmentation (7 plugins to configure)
- ❌ Code duplication (each implements similar logic)
- ❌ More boilerplate (7 × plugin structure)
- ❌ Harder to maintain consistency

**Implementation Complexity:** High (due to duplication)

### Option C: Two Plugins (Hybrid)

**Description:**

- `contentDataPlugin.ts` - 6 standard sections (Home, About, Skills, Projects, Blogs, Contact)
- `journeyDataPlugin.ts` - Learning Journey with recursive parsing

**Pros:**

- ✅ Clear separation: standard vs complex parsing
- ✅ Shared utilities for similar sections
- ✅ Learning Journey optimized independently
- ✅ Reasonable file sizes (~200 lines each)
- ✅ Easy to understand and maintain

**Cons:**

- ⚠️ Two plugins instead of one (minor overhead)
- ⚠️ Some boilerplate duplication (acceptable trade-off)

**Implementation Complexity:** Medium

## Decision

**Selected:** Option C - Two Plugins (Hybrid Approach)

**Rationale:**

The hybrid approach with two plugins provides the best balance:

1. **Separation of Concerns:** Learning Journey's recursive parsing is fundamentally different from flat section parsing. Separating it clarifies intent and makes both plugins easier to understand.

2. **Code Reusability:** Six similar sections share common parsing utilities in `contentDataPlugin.ts`. No need to duplicate this logic seven times.

3. **Maintainability:** Each plugin is ~200 lines—large enough to be useful, small enough to comprehend quickly.

4. **Independent Optimization:** Learning Journey can implement caching or performance optimizations without affecting standard sections.

5. **Testing:** Can test standard section parsing separately from recursive parsing logic.

## Consequences

### Positive

- ✅ Clear separation between standard and complex parsing
- ✅ Learning Journey parser independently optimizable
- ✅ Shared utilities for 6 similar sections
- ✅ Reasonable file sizes (~200 lines each)
- ✅ Easy to test and maintain

### Negative

- ⚠️ Two plugins to register in `vite.config.ts` (one extra line)
- ⚠️ Slight duplication of plugin structure boilerplate

### Neutral

- ℹ️ Total code similar to single plugin approach
- ℹ️ Two plugins still far less fragmented than seven

## Implementation Notes

### Plugin Structure

```typescript
// vite.config.ts
import { contentDataPlugin } from './src/vite/contentDataPlugin';
import { journeyDataPlugin } from './src/vite/journeyDataPlugin';

export default defineConfig({
  plugins: [
    react(),
    contentDataPlugin(),    // Home, About, Skills, Projects, Blogs, Contact
    journeyDataPlugin(),    // Learning Journey (recursive)
  ],
});
```

### Content Data Plugin Scope

- `virtual:home-data`
- `virtual:about-data`
- `virtual:skills-data`
- `virtual:projects-data`
- `virtual:blogs-data`
- `virtual:contact-data`

### Journey Data Plugin Scope

- `virtual:learning-journey-data`
- Recursive parsing of `content/learningJourney/term-*/**/*.md`

## Related Decisions

- [ADR-001: Build-Time vs Runtime Parsing](./001-build-time-vs-runtime-parsing.md)
- [ADR-002: Virtual Modules vs Import Aliases](./002-virtual-modules-vs-import-aliases.md)

## References

- [EPIC-001 Architecture](../epic-core-plugin-infrastructure/arch.md)
- [Feature F4.8: Learning Journey Parser](../epic-core-plugin-infrastructure/arch.md#f48-learning-journey-parser)

## Follow-Up Actions

- [x] Implement `contentDataPlugin.ts` with 6 section parsers (EPIC-001-F2, F3, F4.1-F4.6)
- [x] Implement `journeyDataPlugin.ts` with recursive parsing (EPIC-001-F4.8)
- [x] Share common utilities between plugins
- [ ] Document plugin architecture and separation rationale

---

**Revision History:**

| Date | Author | Changes |
|------|--------|---------|
| 2025-12-09 | Growth Journey Team | Initial version extracted from Architecture_Blueprint.md |

---

v1.0.0 | Accepted | Last Updated: Dec 09 2025 - 16:00
