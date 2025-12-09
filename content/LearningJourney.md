# Learning Journey Dynamic Data System - Implementation Plan

## 🎯 Project Overview

Transform the hardcoded `learningJourney` array in  C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\src\data\learningJourney.ts  `src/data/learningJourney.ts` into a dynamic system that loads content from markdown files organized in the C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\content  `content/learningJourney/` directory.

---

## 📁 Directory Structure

```
project-root/
├── content/
│   └── learningJourney/
│       ├── term-1/
│       │   ├── career-start.md
│       │   ├── college-return.md
│       │   └── ...
│       ├── term-2/
│       │   ├── leetcode-journey.md
│       │   └── ...
│       ├── term-3/
│       │   └── database-project.md
│       │   └── ...
│       ├── blogs/              (future)
│       ├── contacts/           (future)
│       ├── projects/           (future)
│       ├── skills/             (future)
│       └── website/            (future)
│
├── src/
│   ├── data/
│   │   └── learningJourney.ts  (imports from virtual module)
│   ├── utils/
│   │   ├── markdownParser.ts   (NEW)
│   │   └── iconColorGenerator.ts (NEW)
│   └── vite/
│       └── journeyDataPlugin.ts (NEW - Vite plugin)
│
└── vite.config.ts              (register plugin)
```

---

## 📋 Markdown File Format

### File Location Pattern

`content/learningJourney/term-X/filename.md`

### Example: `content/learningJourney/term-1/career-start.md`

```markdown
---
title: Senior Admin/Procurement Officer
date: 2023-12-31
period: 2018-2023
category: work
description: Building foundational business and organizational skills in government service.
skills: [project management, procurement, budget management]
tags: [admin, government, leadership]
term: T1-AY2024
type: work
---

## Overview

Developed comprehensive administrative and procurement expertise while managing complex projects and stakeholder relationships in a fast-paced government environment.

## Key Learnings

- Project management and deadline coordination
- Stakeholder communication and relationship building
- Process optimization and workflow improvement
- Budget management and financial oversight
- Compliance and regulatory understanding

## Achievements

- Streamlined procurement processes, reducing processing time by 30%
- Managed multi-million peso procurement projects
- Led cross-departmental collaboration initiatives
- Implemented digital filing systems improving efficiency

## Challenges

- Balancing multiple competing priorities and deadlines
- Navigating complex regulatory requirements
- Managing stakeholder expectations across departments

## Academic Reflection Essay

(Optional - collapsible section, not displayed by default)
This section contains detailed academic reflection or optional bonus content that can be expanded in the UI.
```

---

## 🔧 Implementation Components

### 1. **Markdown Parser** C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\src\utils\markdownParser.ts  (`src/utils/markdownParser.ts`)

- Reads `.md` files
- Extracts YAML front matter (title, period, category, description, skills, tags, type, date)
- Parses markdown sections: Overview, Key Learnings, Achievements, Challenges, Academic Reflection
- Converts bullet lists to string arrays
- Returns structured object

### 2. **Icon & Color Generator** C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\src\utils\iconColorGenerator.ts (`src/utils/iconColorGenerator.ts`)

- Maps category to icon emoji and Tailwind color classes
- Sorting helper for `period` field

```typescript
Category Mappings:
- education  → 🎓 / from-green-500 to-green-600
- work       → 💼 / from-blue-500 to-blue-600
- skill      → ⚡ / from-yellow-500 to-yellow-600
- project    → 🚀 / from-indigo-500 to-indigo-600
- certification → 🏆 / from-purple-500 to-purple-600
```

### 3. **Vite Plugin** C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\src\vite\journeyDataPlugin.ts  (`src/vite/journeyDataPlugin.ts`)

- Virtual module: `virtual:learning-journey-data`
- Runs at **build time**
- Reads all `.md` files from `content/learningJourney/`
- Parses each file using markdown parser
- Generates TypeScript code for `LearningJourneyItem[]`
- Sorts by `period` field
- Exports as virtual module

### 4. **Updated learningJourney.ts** (`src/data/learningJourney.ts`)

- Import from virtual module: `import { learningJourney } from 'virtual:learning-journey-data'`
- Keep interface exports unchanged
- Export the loaded array

### 5. **Vite Config Update** C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\vite.config.ts  (`vite.config.ts`)

- Register the journey data plugin
- Add `.md` files to watched dependencies

---

## 🔀 Data Flow

```
content/learningJourney/term-1/career-start.md
         ↓
    [Markdown Parser]
         ↓
    {parsed object with YAML + sections}
         ↓
    [Icon & Color Generator]
         ↓
    {complete LearningJourneyItem}
         ↓
    [Vite Plugin]
         ↓
    {collects all items + sorts by period}
         ↓
    virtual:learning-journey-data
         ↓
    src/data/learningJourney.ts (imports)
         ↓
    React Components (display)
```

---

## 🎯 Key Decisions

| Decision   | Choice                  | Rationale                                |
| ---------- | ----------------------- | ---------------------------------------- |
| ID Format  | `'term-1/sample.md'`  | Path-based, consistent, scalable         |
| Icon/Color | Generated from category | DRY principle, maintainable              |
| Build Time | Vite Plugin             | Zero runtime overhead, optimized bundles |
| Sorting    | By `period` field     | Chronological order                      |

---

## ✅ Success Criteria

- [X] All markdown files in `content/learningJourney/` are parsed
- [X] `LearningJourneyItem` interface is fully satisfied
- [X] Icons and colors are correctly mapped
- [X] Data is sorted by period
- [X] No hardcoded data in `learningJourney.ts`
- [X] Build succeeds with no errors
- [X] UI renders cards correctly
- [X] Hot reload works in dev mode

---

## 🚀 Implementation Steps in C:\Users\ADMIN\Desktop\developerFiles\myPortfolio\

1. **Setup utilities** - Create parser and generator
2. **Create Vite plugin** - Implement file scanning and compilation
3. **Update config** - Register plugin in vite.config.ts
4. **Update learningJourney.ts** - Import from virtual module
5. **Create sample markdown** - Add test files in content/learningJourney/
6. **Test & verify** - Run dev server and build
7. **Logging** - Update project.log

---

## 📝 Notes

- The system is **extensible** for future content types (blogs, projects, skills, etc.)
- Markdown files can be **easily edited** without touching code
- The plugin runs at **build time only**, improving runtime performance
- **Period sorting** ensures chronological presentation
- **Icon/color mapping** is centralized for easy customization

---

**Status**: Ready for Implementation
**Last Updated**: 2025-12-09
