# ADR-002: Virtual Modules vs Import Aliases

- **Status:** Accepted
- **Date:** 2025-12-09
- **Author:** Growth Journey Portfolio Team
- **Tags:** vite, build-system, developer-experience, typescript

## Context

Following ADR-001's decision to use build-time parsing, Vite plugins need a mechanism to expose parsed content data to React components. The plugin generates data during the build process, and components need to import this data. Two main patterns exist for exposing build-generated data in Vite:

1. **Virtual modules:** Use Vite's virtual module pattern with `virtual:` prefix
2. **Import aliases:** Use TypeScript path aliases like `@content/*` pointing to generated files

### Current State

- ADR-001 established build-time parsing with Vite plugins
- 7 content sections need to be exposed to React components
- Must integrate with TypeScript for type safety
- Must support HMR for developer experience

### Constraints

- Must work with Vite's plugin system
- Must support TypeScript IntelliSense
- Must be maintainable and understandable
- Must follow Vite ecosystem best practices

## Decision Drivers

- **Vite Ecosystem Alignment:** Follow established Vite patterns
- **TypeScript Integration:** Seamless type checking and IntelliSense
- **Developer Clarity:** Clear distinction between file imports and generated data
- **Maintainability:** Easy to understand and extend
- **Documentation:** Well-documented pattern in Vite community

## Options Considered

### Option A: Virtual Modules with `virtual:` Prefix

**Description:**

Use Vite's virtual module convention with `virtual:` prefix. Plugins intercept imports like `virtual:home-data` and return generated JavaScript code. Module IDs use null-byte prefix (`\0`) internally.

```typescript
// Component import
import { homeData } from 'virtual:home-data';

// Plugin implementation
export function contentDataPlugin(): Plugin {
  return {
    name: 'vite-plugin-content-data',
    resolveId(id) {
      if (id.startsWith('virtual:')) {
        return '\0' + id; // Null-byte prefix
      }
    },
    load(id) {
      if (id === '\0virtual:home-data') {
        const data = parseHomeContent();
        return `export const homeData = ${JSON.stringify(data)};`;
      }
    },
  };
}
```

**Pros:**

- ✅ **Vite native pattern:** Official convention used throughout Vite ecosystem
- ✅ **Clear intention:** `virtual:` prefix makes it obvious data is build-generated
- ✅ **No file system pollution:** No generated files to manage or ignore
- ✅ **TypeScript support:** Declare modules in `src/types/virtual-modules.d.ts`
- ✅ **Well-documented:** Extensive examples in Vite documentation and plugins
- ✅ **Clean separation:** Clearly distinguishes generated vs file-based imports
- ✅ **HMR friendly:** Virtual modules integrate seamlessly with Vite's HMR

**Cons:**

- ❌ **Null-byte requirement:** Must use `\0` prefix in plugin (minor implementation detail)
- ❌ **Learning curve:** Developers must understand virtual modules concept
- ❌ **No file inspection:** Can't view generated code easily (mitigated by plugin logging)

**Implementation Complexity:** Low (follows Vite conventions)

### Option B: Import Aliases to Generated Files

**Description:**

Configure TypeScript path aliases (`@content/*`) pointing to a generated directory. Plugin writes parsed data to files (e.g., `generated/home-data.ts`), and components import from aliases.

```typescript
// Component import
import { homeData } from '@content/home-data';

// Plugin implementation (writes files)
export function contentDataPlugin(): Plugin {
  return {
    name: 'content-data-plugin',
    buildStart() {
      const data = parseHomeContent();
      fs.writeFileSync(
        'generated/home-data.ts',
        `export const homeData = ${JSON.stringify(data)};`
      );
    },
  };
}

// tsconfig.json
{
  "paths": {
    "@content/*": ["./generated/*"]
  }
}
```

**Pros:**

- ✅ **Familiar pattern:** Standard TypeScript path alias
- ✅ **File inspection:** Can view generated code directly
- ✅ **Simple mental model:** Just files and imports

**Cons:**

- ❌ **File system pollution:** Generated files clutter workspace
- ❌ **Git management:** Must add `generated/` to `.gitignore`
- ❌ **Build timing issues:** Files must exist before TypeScript compilation
- ❌ **Cleanup required:** Stale files if sections removed
- ❌ **Not Vite idiomatic:** Fights against Vite's in-memory philosophy
- ❌ **HMR complexity:** More complex to invalidate file-based modules
- ❌ **Watch mode issues:** File watchers may trigger unnecessary rebuilds

**Implementation Complexity:** Medium (file management overhead)

### Option C: Hybrid Approach

**Description:**

Use virtual modules in development for HMR, generate files for production builds and type checking.

**Pros:**

- ✅ **Best of both:** Fast HMR in dev, inspectable files in production

**Cons:**

- ❌ **Complexity:** Two different code paths to maintain
- ❌ **Inconsistency:** Development and production behave differently
- ❌ **Confusion:** Developers must understand both patterns
- ❌ **Debugging difficulty:** Issues may only appear in one mode

**Implementation Complexity:** High

## Decision

**Selected:** Option A - Virtual Modules with `virtual:` Prefix

**Rationale:**

Virtual modules are the idiomatic Vite pattern and best serve our needs:

1. **Ecosystem Alignment:** Virtual modules are Vite's recommended approach for plugin-generated code. This pattern is used by official Vite plugins and is well-understood in the community.

2. **Clean Abstractions:** The `virtual:` prefix creates clear semantic distinction:
   - `import { Button } from '@/components/ui/Button'` - file-based module
   - `import { homeData } from 'virtual:home-data'` - build-generated module

3. **Zero File System Overhead:** No generated files to manage, ignore, or clean up. Everything stays in memory during builds.

4. **TypeScript Integration:** Virtual module declarations work seamlessly with TypeScript:
   ```typescript
   // src/types/virtual-modules.d.ts
   declare module 'virtual:home-data' {
     export const homeData: HomeData;
   }
   ```
   Provides full IntelliSense and type checking without physical files.

5. **HMR Simplicity:** Vite's module graph naturally handles virtual module invalidation. When content changes, plugin invalidates the virtual module, triggering component re-render.

6. **Developer Experience:** Once understood, virtual modules are simpler:
   - No file watchers to configure
   - No stale file issues
   - No build artifacts to clean
   - Clear separation of concerns

The null-byte prefix requirement is a minor implementation detail well-documented in Vite's plugin API. The learning curve for virtual modules is offset by cleaner architecture and better alignment with Vite's design philosophy.

## Consequences

### Positive

- ✅ **Vite best practices:** Follows official recommendations and ecosystem patterns
- ✅ **Clear semantics:** `virtual:` prefix makes build-time generation explicit
- ✅ **Clean workspace:** No generated files to manage or ignore in Git
- ✅ **Excellent TypeScript support:** Virtual module declarations provide full type safety
- ✅ **Simple HMR:** Natural integration with Vite's module graph
- ✅ **No file timing issues:** Data always available when needed
- ✅ **Well-documented pattern:** Extensive examples and community support

### Negative

- ⚠️ **Learning curve:** Team must understand virtual modules concept (mitigated by documentation)
- ⚠️ **Null-byte prefix:** Plugin code requires `\0` prefix (minor implementation detail)
- ⚠️ **Generated code not inspectable:** Can't easily view generated module code (mitigated by plugin logging and debug mode)

### Neutral

- ℹ️ **Plugin API usage:** Requires `resolveId` and `load` hooks (standard Vite plugin pattern)
- ℹ️ **Virtual module declarations:** Must maintain type declarations file (one-time setup)

## Implementation Notes

### Plugin Hook Requirements

```typescript
export function contentDataPlugin(): Plugin {
  return {
    name: 'vite-plugin-content-data',
    
    // Resolve virtual module IDs
    resolveId(id: string) {
      if (id.startsWith('virtual:')) {
        return '\0' + id; // Null-byte prefix marks as virtual
      }
      return null;
    },
    
    // Load virtual module content
    load(id: string) {
      if (id === '\0virtual:home-data') {
        const data = parseHomeContent();
        return `export const homeData = ${JSON.stringify(data)};`;
      }
      // ... other sections
      return null;
    },
    
    // Handle hot module replacement
    handleHotUpdate({ file, server }) {
      if (file.includes('content/1-home/')) {
        const mod = server.moduleGraph.getModuleById('\0virtual:home-data');
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          return [];
        }
      }
    },
  };
}
```

### TypeScript Declaration Pattern

```typescript
// src/types/virtual-modules.d.ts
declare module 'virtual:home-data' {
  export const homeData: HomeData;
}

declare module 'virtual:projects-data' {
  export const projectsData: Project[];
}

// ... other virtual modules
```

### Component Usage Pattern

```typescript
// src/components/sections/HeroSection.tsx
import { homeData } from 'virtual:home-data';

export function HeroSection() {
  return (
    <section>
      <h1>{homeData.title}</h1>
      <p>{homeData.subtitle}</p>
    </section>
  );
}
```

### Re-Export Layer (Optional but Recommended)

```typescript
// src/data/projects.ts
import { projectsData } from 'virtual:projects-data';

// Fallback data for development
const fallbackProjects: Project[] = [
  {
    id: 'example',
    title: 'Example Project',
    description: 'Placeholder',
    technologies: ['React', 'TypeScript'],
  },
];

// Export with fallback
export const projects: Project[] =
  Array.isArray(projectsData) && projectsData.length > 0
    ? projectsData
    : fallbackProjects;
```

## Related Decisions

- [ADR-001: Build-Time vs Runtime Parsing](./001-build-time-vs-runtime-parsing.md) - Prerequisite decision
- [ADR-003: Single vs Multiple Plugins](./003-single-vs-multiple-plugins.md) - Plugin organization
- [ADR-005: TypeScript Strict Mode](./005-typescript-strict-mode.md) - Type safety requirements

## References

- [Vite Virtual Modules Convention](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [TypeScript Module Declarations](https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules)
- [Technology Stack Blueprint - Vite Plugins Section](../Technology_Stack_Blueprint.md#36-vite-plugins)
- [REQ-002: Virtual Module Pattern](../Architecture_Blueprint.md#req-002)

## Follow-Up Actions

- [x] Implement virtual module pattern in contentDataPlugin (EPIC-001-F1)
- [x] Implement virtual module pattern in journeyDataPlugin (EPIC-001-F1)
- [x] Create virtual module TypeScript declarations (EPIC-001-F7)
- [x] Document virtual module usage in developer guide
- [ ] Add debug logging for virtual module generation
- [ ] Create troubleshooting guide for virtual module issues

---

**Revision History:**

| Date | Author | Changes |
|------|--------|---------|
| 2025-12-09 | Growth Journey Team | Initial version extracted from Architecture_Blueprint.md |

---

v1.0.0 | Accepted | Last Updated: Dec 09 2025 - 15:55
