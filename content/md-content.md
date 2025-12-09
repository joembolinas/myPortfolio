
# System Design: Dynamic Markdown-Driven Portfolio Content System

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BUILD TIME LAYER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐        ┌────────────────────────────┐        │
│  │  Content Layer   │        │    Processing Layer        │        │
│  │  (File System)   │───────▶│    (Vite Plugin)           │        │
│  └──────────────────┘        └────────────────────────────┘        │
│         │                              │                            │
│         │                              ▼                            │
│         │                    ┌──────────────────────┐              │
│         │                    │  Markdown Parser     │              │
│         │                    │  + YAML Extractor    │              │
│         │                    └──────────────────────┘              │
│         │                              │                            │
│         ▼                              ▼                            │
│  content/learningJourney/    ┌──────────────────────┐              │
│  ├─ term-1/                  │  Data Enrichment     │              │
│  │  ├─ career-start.md       │  (Icon/Color Maps)   │              │
│  │  └─ college-return.md     └──────────────────────┘              │
│  ├─ term-2/                            │                            │
│  │  └─ leetcode-journey.md             ▼                            │
│  └─ term-3/                  ┌──────────────────────┐              │
│     └─ database-project.md   │  Virtual Module      │              │
│                               │  Generator           │              │
│                               └──────────────────────┘              │
│                                        │                            │
└────────────────────────────────────────┼────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        RUNTIME LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────┐          │
│  │  virtual:learning-journey-data                       │          │
│  │  (Compiled TypeScript with LearningJourneyItem[])    │          │
│  └──────────────────────────────────────────────────────┘          │
│                         │                                           │
│                         ▼                                           │
│  ┌──────────────────────────────────────────────────────┐          │
│  │  src/data/learningJourney.ts                         │          │
│  │  (Re-exports typed data)                             │          │
│  └──────────────────────────────────────────────────────┘          │
│                         │                                           │
│                         ▼                                           │
│  ┌──────────────────────────────────────────────────────┐          │
│  │  React Components                                     │          │
│  │  └─ LearningJourneySection.tsx                       │          │
│  │     └─ Card Components                                │          │
│  └──────────────────────────────────────────────────────┘          │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 📦 Component Architecture

### 1. **Content Layer** (Markdown Files)

```yaml
Purpose: Single source of truth for portfolio content
Location: content/learningJourney/**/*.md
Advantages:
  - Non-technical editing (no code changes)
  - Version control friendly
  - Portable and future-proof
  - Easy backup/migration
```

**File Structure:**

```
content/learningJourney/
├── term-1/           # Organized by academic term
│   ├── career-start.md
│   └── college-return.md
├── term-2/
│   ├── leetcode-journey.md
│   └── tryhackme-security.md
└── term-3/
    └── database-project.md
```

### 2. **Processing Layer** (Vite Plugin)

```typescript
┌─────────────────────────────────────────────────┐
│   journeyDataPlugin.ts                          │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. File Discovery                              │
│     └─ Glob content/learningJourney/**/*.md    │
│                                                 │
│  2. Content Parsing                             │
│     └─ markdownParser.ts                        │
│        ├─ Extract YAML frontmatter             │
│        ├─ Parse markdown sections              │
│        └─ Convert to structured data           │
│                                                 │
│  3. Data Enrichment                             │
│     └─ iconColorGenerator.ts                    │
│        ├─ Map category → icon emoji           │
│        ├─ Map category → Tailwind colors      │
│        └─ Generate unique IDs                  │
│                                                 │
│  4. Compilation                                 │
│     └─ Generate TypeScript code                │
│        ├─ Type-safe array literals             │
│        ├─ Sort by period                       │
│        └─ Export as virtual module             │
│                                                 │
│  5. HMR Support                                 │
│     └─ Watch .md files for changes             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3. **Utility Modules**

#### A. Markdown Parser (markdownParser.ts)

```typescript
Input:  Raw .md file content
Output: ParsedJourneyEntry

Functions:
├─ extractFrontMatter()    // YAML → JS object
├─ parseSection()          // MD heading → content
├─ parseBulletList()       // MD list → string[]
└─ parseMarkdownFile()     // Main orchestrator

Handles:
- YAML frontmatter validation
- Section extraction (Overview, Key Learnings, etc.)
- List parsing
- Error handling for malformed files
```

#### B. Icon/Color Generator (iconColorGenerator.ts)

```typescript
Mappings:
┌──────────────┬────────┬──────────────────────────────┐
│ Category     │ Icon   │ Gradient Classes             │
├──────────────┼────────┼──────────────────────────────┤
│ education    │ 🎓     │ from-green-500 to-green-600  │
│ work         │ 💼     │ from-blue-500 to-blue-600    │
│ skill        │ ⚡     │ from-yellow-500 to-yellow-600│
│ project      │ 🚀     │ from-indigo-500 to-indigo-600│
│ certification│ 🏆     │ from-purple-500 to-purple-600│
└──────────────┴────────┴──────────────────────────────┘

Functions:
├─ getCategoryIcon()      // category → emoji
├─ getCategoryColor()     // category → Tailwind classes
└─ sortByPeriod()         // Chronological ordering
```

### 4. **Virtual Module System**

```typescript
// Vite's Virtual Module Pattern

// 1. Plugin declares virtual module
resolveId(id) {
  if (id === 'virtual:learning-journey-data') {
    return '\0' + id; // Null byte prefix = virtual
  }
}

// 2. Plugin generates TypeScript code
load(id) {
  if (id === '\0virtual:learning-journey-data') {
    return `
      export const learningJourney = [
        ${compiledData}
      ];
    `;
  }
}

// 3. TypeScript can import it
import { learningJourney } from 'virtual:learning-journey-data';
```

### 5. **Type System**

```typescript
// Existing interface (keep unchanged)
export interface LearningJourneyItem {
  id: string;
  title: string;
  period: string;
  category: 'education' | 'work' | 'skill' | 'project' | 'certification';
  description: string;
  expandedContent: {
    overview: string;
    keyLearnings: string[];
    technologies?: string[];
    achievements?: string[];
    challenges?: string[];
    nextSteps?: string[];
  };
  icon: string;
  color: string;
  isExpanded?: boolean;
}

// Add TypeScript declaration for virtual module
declare module 'virtual:learning-journey-data' {
  export const learningJourney: LearningJourneyItem[];
}
```

## 🔄 Data Flow Sequence

```
1. Developer edits:     content/learningJourney/term-2/new-entry.md
                                    ↓
2. Vite detects change: File watcher triggers plugin
                                    ↓
3. Plugin runs:         journeyDataPlugin.ts
                                    ↓
4. Parse markdown:      markdownParser.ts extracts YAML + sections
                                    ↓
5. Enrich data:         iconColorGenerator.ts adds icon/colors
                                    ↓
6. Compile:             Generate TypeScript array literal
                                    ↓
7. Serve virtual:       'virtual:learning-journey-data' exports array
                                    ↓
8. Import:              src/data/learningJourney.ts imports it
                                    ↓
9. React renders:       LearningJourneySection.tsx displays cards
                                    ↓
10. HMR updates:        Browser hot-reloads without full refresh
```

## 🎯 Design Decisions & Rationale

| Decision                     | Choice                                    | Why                                                        |
| ---------------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| **When to Process**    | Build time (Vite plugin)                  | Zero runtime overhead, optimized bundles, type safety      |
| **Content Format**     | Markdown + YAML                           | Human-readable, version control friendly, widely supported |
| **ID Generation**      | File path-based (`term-1/career-start`) | Stable, predictable, no manual management                  |
| **Icon/Color Mapping** | Derived from category                     | DRY, consistent, easy to extend                            |
| **Virtual Module**     | Vite's `\0` prefix pattern              | Clean separation, TypeScript support, no temp files        |
| **Sorting**            | By `period` field                       | Chronological consistency                                  |
| **Error Handling**     | Fallback to empty array                   | Graceful degradation if parsing fails                      |

## 🚀 Extension Strategy (Future Content Types)

The architecture supports extending to other content types:

```typescript
// Future plugin structure
export const contentPlugin = () => ({
  learningJourney: journeyDataPlugin(),
  blogs: blogDataPlugin(),           // content/blogs/**/*.md
  projects: projectDataPlugin(),     // content/projects/**/*.md
  skills: skillDataPlugin(),         // content/skills/**/*.json
  websites: websiteDataPlugin(),     // content/websites/**/*.yaml
});

// Virtual modules
import { learningJourney } from 'virtual:learning-journey-data';
import { blogs } from 'virtual:blog-data';
import { projects } from 'virtual:project-data';
```

## ⚡ Performance Characteristics

| Aspect                | Impact        | Details                        |
| --------------------- | ------------- | ------------------------------ |
| **Build time**  | +1-2s         | One-time cost during build     |
| **Bundle size** | No change     | Same data, different source    |
| **Runtime**     | Zero overhead | Pre-compiled at build time     |
| **HMR**         | Fast (<100ms) | Only affected files recompile  |
| **Type safety** | Full          | Virtual module types preserved |

## 🛡️ Error Handling Strategy

```typescript
// Plugin level
try {
  const files = glob.sync('content/learningJourney/**/*.md');
  const entries = files.map(parseMarkdownFile).filter(Boolean);
  // Continue with valid entries
} catch (error) {
  console.warn('Failed to load journey data:', error);
  return 'export const learningJourney = [];'; // Fallback
}

// Parser level
function parseMarkdownFile(filePath: string): LearningJourneyItem | null {
  try {
    // Parse logic
  } catch (error) {
    console.warn(`Skipping ${filePath}:`, error.message);
    return null; // Skip malformed files
  }
}
```

## 📊 System Benefits

✅ **Developer Experience:**

- Edit content without touching code
- Type-safe imports
- Fast HMR feedback
- Clear error messages

✅ **Maintainability:**

- Single source of truth (markdown files)
- No data duplication
- Easy to add new entries
- Version control friendly

✅ **Performance:**

- Build-time compilation (zero runtime cost)
- Optimized bundles
- No async loading overhead

✅ **Scalability:**

- Extensible to other content types
- Supports hundreds of entries
- Clean separation of concerns

This architecture provides a robust, performant, and maintainable foundation for content-driven portfolio development while maintaining the current TypeScript/React stack and build pipeline.
