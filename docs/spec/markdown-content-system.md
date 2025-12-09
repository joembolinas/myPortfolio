---
title: Markdown-Driven Dynamic Content System Architecture Specification
version: 1.0
date_created: 2025-12-09
last_updated: 2025-12-09
owner: Portfolio Development Team
tags: [architecture, content-system, vite-plugin, markdown, build-time-processing]
---

# Introduction

This specification defines the architecture, interfaces, and requirements for implementing a markdown-driven dynamic content system that transforms static hardcoded data arrays into a maintainable, scalable content management approach for the portfolio application. The system leverages Vite's virtual module capabilities to process markdown files at build time, generating type-safe TypeScript data structures.

## 1. Purpose & Scope

### Purpose
Transform the hardcoded `learningJourney` array in `src/data/learningJourney.ts` into a dynamic system that loads content from markdown files organized in the `content/learningJourney/` directory, with the architecture extensible to other content types (blogs, projects, skills, websites, contact).

### Scope
- **In Scope**: 
  - Build-time markdown processing via Vite plugin
  - YAML frontmatter extraction and validation
  - Markdown section parsing and structure preservation
  - Type-safe virtual module generation
  - Icon and color mapping based on categories
  - Hot Module Replacement (HMR) support for content changes
  - Error handling and graceful degradation
  
- **Out of Scope**:
  - Runtime markdown parsing
  - Client-side markdown rendering
  - Content versioning or history tracking
  - Multi-language content support (i18n)
  - Content authentication or access control

### Intended Audience
- Frontend developers implementing the system
- Content creators adding learning journey entries
- AI agents tasked with implementation or maintenance
- DevOps engineers configuring build pipelines

### Assumptions
- Node.js 18+ runtime environment
- Vite 5.0+ as the build tool
- React 18+ for UI rendering
- TypeScript 5.0+ for type safety
- Existing `gray-matter` library for YAML parsing

## 2. Definitions

| Term | Definition |
|------|------------|
| **Vite Plugin** | A JavaScript module that extends Vite's build capabilities through hooks like `resolveId` and `load` |
| **Virtual Module** | A module that exists only in memory during build time, identified by a null byte prefix (`\0`) in Vite |
| **YAML Frontmatter** | Metadata block at the beginning of a markdown file, delimited by `---` |
| **HMR** | Hot Module Replacement - automatic browser update without full page refresh when files change |
| **Build-time Processing** | Operations performed during the build phase, not at runtime |
| **Category** | Classification type for content: `education`, `work`, `skill`, `project`, or `certification` |
| **Term** | Academic term identifier (e.g., `T1-AY2024`, `T2-AY2024`) |
| **Expanded Content** | Detailed sections within a learning journey item (overview, key learnings, achievements, etc.) |

## 3. Requirements, Constraints & Guidelines

### Functional Requirements

- **REQ-001**: The system SHALL parse all `.md` files from `content/learningJourney/` directory and subdirectories
- **REQ-002**: The system SHALL extract YAML frontmatter containing: title, date, period, category, description, skills, tags, term, type
- **REQ-003**: The system SHALL parse markdown sections: Overview, Key Learnings, Technologies, Achievements, Challenges, Next Steps, Academic Reflection Essay
- **REQ-004**: The system SHALL convert bullet-point lists to string arrays
- **REQ-005**: The system SHALL generate unique IDs based on file path (e.g., `term-1/career-start`)
- **REQ-006**: The system SHALL map categories to emoji icons and Tailwind CSS gradient classes
- **REQ-007**: The system SHALL sort entries chronologically by `period` field
- **REQ-008**: The system SHALL generate type-safe TypeScript code for the virtual module
- **REQ-009**: The system SHALL support HMR for markdown file changes during development
- **REQ-010**: The system SHALL maintain the existing `LearningJourneyItem` interface contract

### Performance Requirements

- **PERF-001**: Build-time processing SHALL add no more than 2 seconds to total build time
- **PERF-002**: Virtual module generation SHALL complete in less than 500ms for up to 100 markdown files
- **PERF-003**: HMR updates SHALL propagate in less than 100ms after file save
- **PERF-004**: Generated bundle size SHALL not increase by more than 5% compared to hardcoded equivalent

### Security Requirements

- **SEC-001**: The system SHALL sanitize all markdown content to prevent XSS attacks
- **SEC-002**: The system SHALL validate file paths to prevent directory traversal attacks
- **SEC-003**: The system SHALL restrict file reading to the `content/` directory only
- **SEC-004**: The system SHALL validate YAML frontmatter structure before processing

### Data Quality Requirements

- **DQ-001**: Invalid or missing category values SHALL default to `skill`
- **DQ-002**: Missing required frontmatter fields SHALL trigger build warnings but not fail the build
- **DQ-003**: Malformed markdown files SHALL be skipped with logged warnings
- **DQ-004**: Empty sections SHALL return empty arrays or empty strings, not null/undefined

### Constraints

- **CON-001**: The system MUST run at build time only (no runtime parsing)
- **CON-002**: Markdown files MUST be UTF-8 encoded
- **CON-003**: The virtual module identifier MUST be `virtual:learning-journey-data`
- **CON-004**: File path structure MUST follow `content/learningJourney/term-X/*.md` pattern
- **CON-005**: Category values MUST be one of: `education`, `work`, `skill`, `project`, `certification`
- **CON-006**: The system MUST be compatible with Vite's development and production builds
- **CON-007**: Generated code MUST be compatible with TypeScript strict mode

### Guidelines

- **GUD-001**: Prefer explicit error messages over silent failures
- **GUD-002**: Log informational messages for successful processing (file count, processing time)
- **GUD-003**: Use consistent naming conventions: kebab-case for files, camelCase for functions
- **GUD-004**: Comment complex regex patterns and parsing logic
- **GUD-005**: Keep parser functions pure and testable
- **GUD-006**: Separate concerns: parsing, enrichment, and code generation
- **GUD-007**: Use TypeScript type guards for runtime validation

### Architectural Patterns

- **PAT-001**: Plugin Pattern - Vite plugin with `resolveId` and `load` hooks
- **PAT-002**: Pipeline Pattern - Sequential processing (discover → parse → enrich → compile)
- **PAT-003**: Virtual Module Pattern - Memory-only modules with null-byte prefix
- **PAT-004**: Factory Pattern - Icon/color generator functions
- **PAT-005**: Builder Pattern - Gradual construction of `LearningJourneyItem` objects

## 4. Interfaces & Data Contracts

### YAML Frontmatter Schema

```yaml
# Required fields
title: string           # Display title of the entry
period: string          # Time period (e.g., "2018-2023", "2024-Present")
category: string        # One of: education, work, skill, project, certification
description: string     # Brief summary (1-2 sentences)

# Optional fields
date: string            # ISO 8601 date (defaults to current date)
skills: string[]        # Array of skill names
tags: string[]          # Array of tags for categorization
term: string            # Academic term identifier (e.g., "T1-AY2024")
type: string            # Content type (typically matches category)
```

### Markdown Section Structure

```markdown
## Overview
Single paragraph describing the experience or learning.

## Key Learnings
- Bullet point 1
- Bullet point 2

## Technologies
- Technology or skill 1
- Technology or skill 2

## Achievements
- Achievement 1
- Achievement 2

## Challenges
- Challenge 1
- Challenge 2

## Next Steps
- Next step 1
- Next step 2

## Academic Reflection Essay
Long-form reflection content (optional).
```

### LearningJourneyItem Interface

```typescript
export interface LearningJourneyItem {
  id: string;                    // Generated from file path
  title: string;                 // From frontmatter
  period: string;                // From frontmatter
  category: 'education' | 'work' | 'skill' | 'project' | 'certification';
  description: string;           // From frontmatter
  expandedContent: {
    overview: string;            // From ## Overview section
    keyLearnings: string[];      // From ## Key Learnings section
    technologies?: string[];     // From ## Technologies section (optional)
    achievements?: string[];     // From ## Achievements section (optional)
    challenges?: string[];       // From ## Challenges section (optional)
    nextSteps?: string[];        // From ## Next Steps section (optional)
  };
  icon: string;                  // Generated from category mapping
  color: string;                 // Tailwind gradient classes from category
  isExpanded?: boolean;          // UI state (not from markdown)
}
```

### ParsedMarkdownContent Interface

```typescript
export interface ParsedMarkdownContent {
  frontMatter: {
    title: string;
    date: string;
    period: string;
    category: 'education' | 'work' | 'skill' | 'project' | 'certification';
    description: string;
    skills: string[];
    tags: string[];
    term: string;
    type: string;
  };
  sections: {
    overview: string;
    keyLearnings: string[];
    achievements: string[];
    challenges: string[];
    technologies?: string[];
    nextSteps?: string[];
    reflection?: string;
  };
}
```

### Icon/Color Mapping Contract

```typescript
type Category = 'education' | 'work' | 'skill' | 'project' | 'certification';

interface IconColorMapping {
  icon: string;       // Emoji character
  color: string;      // Tailwind gradient classes (e.g., "from-green-500 to-green-600")
}

const ICON_COLOR_MAP: Record<Category, IconColorMapping> = {
  education: { icon: '���', color: 'from-green-500 to-green-600' },
  work: { icon: '���', color: 'from-blue-500 to-blue-600' },
  skill: { icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
  project: { icon: '���', color: 'from-indigo-500 to-indigo-600' },
  certification: { icon: '���', color: 'from-purple-500 to-purple-600' }
};
```

### Vite Plugin Interface

```typescript
export function journeyDataPlugin(): Plugin {
  return {
    name: 'journey-data-plugin',
    
    resolveId(id: string): string | null {
      if (id === 'virtual:learning-journey-data') {
        return '\0' + id;  // Null byte prefix for virtual modules
      }
      return null;
    },
    
    load(id: string): string | null {
      if (id === '\0virtual:learning-journey-data') {
        const data = generateJourneyData();  // Build-time processing
        return `export const learningJourney = ${JSON.stringify(data, null, 2)};`;
      }
      return null;
    },
    
    handleHotUpdate({ file, server }): void {
      if (file.includes('content/learningJourney') && file.endsWith('.md')) {
        const mod = server.moduleGraph.getModuleById('\0virtual:learning-journey-data');
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      }
    }
  };
}
```

### Virtual Module Type Declaration

```typescript
// src/vite-env.d.ts or src/types/virtual-modules.d.ts
declare module 'virtual:learning-journey-data' {
  import { LearningJourneyItem } from './data/learningJourney';
  export const learningJourney: LearningJourneyItem[];
}
```

## 5. Acceptance Criteria

### Content Processing

- **AC-001**: Given a markdown file with valid YAML frontmatter and sections, When the plugin processes the file, Then a complete `LearningJourneyItem` object SHALL be generated
- **AC-002**: Given a markdown file in `content/learningJourney/term-1/sample.md`, When processed, Then the ID SHALL be `term-1/sample`
- **AC-003**: Given a category value of `education`, When enriched, Then icon SHALL be `���` and color SHALL be `from-green-500 to-green-600`
- **AC-004**: Given a bullet list with 5 items in "Key Learnings" section, When parsed, Then `keyLearnings` array SHALL contain exactly 5 strings

### Error Handling

- **AC-005**: Given a markdown file with missing frontmatter, When processed, Then build SHALL log a warning and skip the file
- **AC-006**: Given a markdown file with invalid category, When processed, Then category SHALL default to `skill`
- **AC-007**: Given no markdown files in `content/learningJourney/`, When plugin loads, Then virtual module SHALL export an empty array
- **AC-008**: Given a malformed YAML frontmatter, When parsed, Then build SHALL log error with filename and continue processing other files

### Build Integration

- **AC-009**: Given the plugin is registered in `vite.config.ts`, When running `npm run dev`, Then virtual module SHALL be resolvable
- **AC-010**: Given the plugin is active, When running `npm run build`, Then production bundle SHALL contain the compiled journey data
- **AC-011**: Given a markdown file is edited during dev mode, When file is saved, Then browser SHALL hot-reload with updated content within 100ms

### Type Safety

- **AC-012**: Given the virtual module is imported, When TypeScript compiler runs, Then no type errors SHALL occur
- **AC-013**: Given `learningJourney` array is exported, When accessed in components, Then TypeScript SHALL provide autocomplete for all `LearningJourneyItem` properties

### Data Quality

- **AC-014**: Given multiple markdown files with different periods, When sorted, Then entries SHALL be in chronological order
- **AC-015**: Given a section with no bullet points, When parsed, Then the corresponding array SHALL be empty (not null)
- **AC-016**: Given 10 markdown files totaling 50KB, When processed, Then build time SHALL increase by less than 1 second

## 6. Test Automation Strategy

### Test Levels

- **Unit Tests**: Parser functions, icon/color generators, validation logic
- **Integration Tests**: Vite plugin integration, virtual module resolution
- **E2E Tests**: Full build process, HMR functionality

### Frameworks

- **Vitest**: Unit and integration testing (already in project)
- **Testing Library**: Component testing with virtual module data
- **Vite Build Test**: Custom test script to validate production builds

### Test Cases

#### Unit Tests (Vitest)

```typescript
// src/utils/__tests__/markdownParser.test.ts
describe('parseMarkdownContent', () => {
  it('should extract frontmatter correctly', () => {
    const content = `---
title: Test Entry
period: 2024
category: skill
description: Test description
---

## Overview
Test overview content`;
    
    const result = parseMarkdownContent(content);
    expect(result.frontMatter.title).toBe('Test Entry');
    expect(result.frontMatter.category).toBe('skill');
  });
  
  it('should parse bullet lists into arrays', () => {
    const markdown = `## Key Learnings
- Learning 1
- Learning 2
- Learning 3`;
    
    const sections = parseMarkdownSections(markdown);
    expect(sections.keyLearnings).toHaveLength(3);
    expect(sections.keyLearnings[0]).toBe('Learning 1');
  });
  
  it('should default invalid category to skill', () => {
    const category = validateCategory('invalid-category');
    expect(category).toBe('skill');
  });
});

// src/utils/__tests__/iconColorGenerator.test.ts
describe('getIconAndColor', () => {
  it('should return correct icon for education', () => {
    const result = getIconAndColor('education');
    expect(result.icon).toBe('���');
    expect(result.color).toBe('from-green-500 to-green-600');
  });
  
  it('should return default for invalid category', () => {
    const result = getIconAndColor('invalid' as any);
    expect(result.icon).toBe('���');
    expect(result.color).toContain('gray');
  });
});
```

#### Integration Tests

```typescript
// src/vite/__tests__/journeyDataPlugin.test.ts
describe('journeyDataPlugin', () => {
  it('should resolve virtual module ID', () => {
    const plugin = journeyDataPlugin();
    const result = plugin.resolveId('virtual:learning-journey-data');
    expect(result).toBe('\0virtual:learning-journey-data');
  });
  
  it('should load and generate journey data', async () => {
    const plugin = journeyDataPlugin();
    const result = await plugin.load('\0virtual:learning-journey-data');
    expect(result).toContain('export const learningJourney');
    expect(() => JSON.parse(result.split('= ')[1])).not.toThrow();
  });
});
```

### Test Data Management

- Store sample markdown files in `src/__tests__/fixtures/`
- Use consistent test data across unit and integration tests
- Cleanup generated files after each test run

### CI/CD Integration

- Run tests on every push and pull request
- Enforce 80% code coverage threshold
- Include build test to ensure virtual module works in production

### Coverage Requirements

- Minimum 80% overall code coverage
- 100% coverage for critical paths (parsing, validation)
- Branch coverage for all error handling paths

### Performance Testing

- Benchmark plugin execution time with varying file counts (10, 50, 100 files)
- Measure HMR update latency
- Track bundle size impact in CI

## 7. Rationale & Context

### Why Build-time Processing?

**Decision**: Process markdown at build time via Vite plugin rather than runtime parsing.

**Rationale**:
- Zero runtime overhead - data is pre-compiled into JavaScript
- Type safety - TypeScript can validate generated code at build time
- Smaller bundle size - no markdown parser shipped to client
- Better performance - no async loading delays
- SEO benefits - content is directly in the bundle

**Trade-offs**:
- Longer build times (acceptable for static content)
- No dynamic content loading (not needed for portfolio use case)

### Why Virtual Modules?

**Decision**: Use Vite's virtual module system instead of generating physical files.

**Rationale**:
- Clean separation - content files don't pollute src directory
- No .gitignore complexity - no generated files to exclude
- Atomic updates - changes are instantly reflected
- Type safety - can declare module types in TypeScript
- Developer experience - no intermediate build artifacts

### Why YAML Frontmatter + Markdown Sections?

**Decision**: Combine YAML for metadata with markdown for content sections.

**Rationale**:
- Human-readable and editable without code knowledge
- Version control friendly (git diffs work well)
- Widely supported format (GitHub, many CMSs)
- Separation of concerns - metadata vs content
- Portable - can migrate to other systems easily

**Alternatives Considered**:
- JSON files - less human-friendly, no markdown support
- Database - overkill for static content, deployment complexity
- CMS - unnecessary complexity for personal portfolio

### Why Category-based Icon/Color Mapping?

**Decision**: Derive visual attributes (icon, color) from category field.

**Rationale**:
- DRY principle - single source of truth for categorization
- Consistency - same category always looks the same
- Maintainability - change mapping in one place
- Scalability - easy to add new categories

### Why File Path as ID?

**Decision**: Generate IDs from file path (e.g., `term-1/career-start`).

**Rationale**:
- Automatic and predictable
- No manual ID management
- Reflects content organization
- Stable across builds (unless files move)
- Human-readable for debugging

## 8. Dependencies & External Integrations

### External Systems

- **EXT-001**: File System - Read markdown files from `content/learningJourney/` directory
  - **Access Pattern**: Synchronous file reads during build
  - **Error Handling**: Skip missing files, log warnings

### Third-Party Services

- **SVC-001**: Vite Build System - Host the plugin and virtual module system
  - **Required Capabilities**: Plugin hooks (`resolveId`, `load`, `handleHotUpdate`)
  - **SLA Requirements**: Compatible with Vite 5.0+

### Infrastructure Dependencies

- **INF-001**: Node.js Runtime - Required for file system access and build execution
  - **Version**: 18.0.0 or higher
  - **Rationale**: Native ESM support and modern JavaScript features

### Data Dependencies

- **DAT-001**: Markdown Content Files - Source of learning journey data
  - **Format**: Markdown with YAML frontmatter
  - **Location**: `content/learningJourney/**/*.md`
  - **Access**: Read-only during build
  - **Update Frequency**: On-demand by content creators

### Technology Platform Dependencies

- **PLT-001**: TypeScript Compiler - Type checking and compilation
  - **Version**: 5.0+ with strict mode enabled
  - **Rationale**: Type safety for generated virtual modules

- **PLT-002**: YAML Parser Library - Extract frontmatter metadata
  - **Required Capability**: Parse YAML block from markdown
  - **Current Implementation**: `gray-matter` package
  - **Rationale**: Mature, widely-used, handles edge cases

- **PLT-003**: React Framework - UI rendering of generated data
  - **Version**: 18.2+
  - **Integration Point**: Import virtual module in data layer

- **PLT-004**: Tailwind CSS - Styling framework for color classes
  - **Version**: 3.0+
  - **Dependency Type**: Generated color classes must match Tailwind palette

### Compliance Dependencies

- **COM-001**: Content Security Policy (CSP) - Prevent XSS from markdown content
  - **Impact**: All markdown must be sanitized before rendering
  - **Mitigation**: Use React's built-in XSS protection, avoid `dangerouslySetInnerHTML`

## 9. Examples & Edge Cases

### Example 1: Complete Markdown File

```markdown
---
title: TryHackMe Security Learning
date: 2024-06-15
period: 2024-Present
category: skill
description: Developing cybersecurity skills through hands-on challenges and learning paths.
skills: [penetration testing, network security, linux, scripting]
tags: [security, tryhackme, hacking, cybersecurity]
term: T2-AY2024
type: skill
---

## Overview

Engaged in structured cybersecurity training through TryHackMe's platform, completing learning paths in penetration testing, network security, and offensive security fundamentals.

## Key Learnings

- Network enumeration and reconnaissance techniques
- Linux command line proficiency and scripting
- Web application security testing
- Privilege escalation methods
- Security tool usage (nmap, burp suite, metasploit)

## Technologies

- Kali Linux
- Burp Suite
- Metasploit Framework
- Nmap
- Wireshark
- Python for security scripting

## Achievements

- Completed 50+ rooms across multiple difficulty levels
- Earned "Top 10%" rank in global leaderboard
- Successfully completed OWASP Top 10 learning path
- Built custom security tools and scripts
- Documented findings in structured reports

## Challenges

- Understanding complex attack vectors and defensive measures
- Time management between learning and hands-on practice
- Keeping up with rapidly evolving security landscape
- Balancing offensive and defensive security perspectives

## Next Steps

- Pursue OSCP certification preparation
- Contribute to CTF competitions
- Build personal security lab environment
- Share knowledge through blog posts
```

**Generated Output**:
```typescript
{
  id: 'term-2/tryhackme-security',
  title: 'TryHackMe Security Learning',
  period: '2024-Present',
  category: 'skill',
  description: 'Developing cybersecurity skills through hands-on challenges and learning paths.',
  expandedContent: {
    overview: 'Engaged in structured cybersecurity training through TryHackMe\'s platform...',
    keyLearnings: [
      'Network enumeration and reconnaissance techniques',
      'Linux command line proficiency and scripting',
      'Web application security testing',
      'Privilege escalation methods',
      'Security tool usage (nmap, burp suite, metasploit)'
    ],
    technologies: [
      'Kali Linux',
      'Burp Suite',
      'Metasploit Framework',
      'Nmap',
      'Wireshark',
      'Python for security scripting'
    ],
    achievements: [
      'Completed 50+ rooms across multiple difficulty levels',
      'Earned "Top 10%" rank in global leaderboard',
      'Successfully completed OWASP Top 10 learning path',
      'Built custom security tools and scripts',
      'Documented findings in structured reports'
    ],
    challenges: [
      'Understanding complex attack vectors and defensive measures',
      'Time management between learning and hands-on practice',
      'Keeping up with rapidly evolving security landscape',
      'Balancing offensive and defensive security perspectives'
    ],
    nextSteps: [
      'Pursue OSCP certification preparation',
      'Contribute to CTF competitions',
      'Build personal security lab environment',
      'Share knowledge through blog posts'
    ]
  },
  icon: '⚡',
  color: 'from-yellow-500 to-yellow-600',
  isExpanded: false
}
```

### Example 2: Minimal Valid File

```markdown
---
title: Quick Learning Note
period: 2024
category: skill
description: Brief learning entry
---

## Overview

Basic learning experience documented.
```

**Expected Behavior**: 
- All optional fields default to empty arrays or empty strings
- Technologies, achievements, challenges, nextSteps are undefined or empty
- Processing completes without errors

### Edge Case 1: Missing Category

```markdown
---
title: Entry Without Category
period: 2024
description: Test entry
---

## Overview
Content here.
```

**Expected Behavior**:
- Category defaults to `skill` (per **DQ-001**)
- Icon becomes `⚡`
- Color becomes `from-yellow-500 to-yellow-600`
- Build warning logged

### Edge Case 2: Invalid YAML Frontmatter

```markdown
---
title: Invalid Entry
period: [2024 - malformed array
category: work
---

## Overview
Content
```

**Expected Behavior**:
- YAML parsing fails
- File is skipped (per **AC-008**)
- Error logged with filename
- Build continues processing other files

### Edge Case 3: Empty Bullet List

```markdown
---
title: Empty Lists
period: 2024
category: education
description: Test
---

## Overview
Content

## Key Learnings

## Achievements
```

**Expected Behavior**:
- `keyLearnings` becomes `[]` (empty array)
- `achievements` becomes `[]` (empty array)
- Not `null` or `undefined` (per **DQ-004**)

### Edge Case 4: Mixed List Markers

```markdown
## Key Learnings

- Learning with dash
* Learning with asterisk
  - Indented learning
- Another dash learning
```

**Expected Behavior**:
- All items extracted regardless of marker type (`-` or `*`)
- Indented items included if they match pattern
- Output: `['Learning with dash', 'Learning with asterisk', 'Indented learning', 'Another dash learning']`

### Edge Case 5: Special Characters in Content

```markdown
---
title: "Entry with 'quotes' and \"escapes\""
description: Content with <html> and & special chars
---

## Overview

Content with special characters: < > & " ' 
Code snippet: `const x = 'test';`
```

**Expected Behavior**:
- Quotes properly escaped in generated JavaScript
- HTML characters preserved as-is (React will handle escaping)
- Backticks and code preserved
- No script injection possible

### Edge Case 6: Large File (100+ Bullet Points)

```markdown
## Key Learnings

- Learning 1
- Learning 2
... (100 items total)
- Learning 100
```

**Expected Behavior**:
- All 100 items parsed into array
- Processing completes in under 500ms (per **PERF-002**)
- No memory issues
- Array properly serialized to JSON

## 10. Validation Criteria

### Build-time Validation

1. **Plugin Registration**
   - Run `npm run build`
   - Check build output for "journey-data-plugin" in plugin list
   - Verify no errors related to virtual module resolution

2. **Virtual Module Generation**
   - Run `npm run dev`
   - Import `virtual:learning-journey-data` in a test file
   - Verify TypeScript autocomplete works
   - Check browser console for data array

3. **Content Processing**
   - Add new markdown file to `content/learningJourney/term-1/`
   - Run build
   - Verify new entry appears in generated array
   - Confirm ID matches file path pattern

4. **HMR Functionality**
   - Start dev server
   - Edit existing markdown file
   - Save file
   - Verify browser updates within 100ms without manual refresh

### Type Safety Validation

1. **TypeScript Compilation**
   - Run `npm run type-check`
   - Verify no errors in files importing virtual module
   - Confirm autocomplete works for `LearningJourneyItem` properties

2. **Interface Compliance**
   - Generate journey data
   - Validate each item has all required `LearningJourneyItem` fields
   - Verify category is valid enum value
   - Confirm expandedContent structure matches interface

### Data Quality Validation

1. **Sorting Verification**
   - Create files with periods: "2020-2022", "2024-Present", "2018-2020"
   - Verify generated array is chronologically sorted
   - Oldest period should be first

2. **Icon/Color Mapping**
   - Create one file for each category
   - Verify each has correct icon and color
   - Confirm mapping consistency across builds

3. **Error Handling**
   - Create intentionally malformed file
   - Run build
   - Verify warning logged but build succeeds
   - Confirm other files processed correctly

### Performance Validation

1. **Build Time Impact**
   - Measure baseline build time without plugin
   - Enable plugin with 10 markdown files
   - Verify build time increase is < 2 seconds

2. **HMR Latency**
   - Edit markdown file
   - Measure time from save to browser update
   - Confirm latency < 100ms

3. **Bundle Size**
   - Compare bundle size with hardcoded data
   - Verify increase is < 5%

## 11. Related Specifications / Further Reading

### Internal Documentation
- [Content Organization Plan](../content/md-content.md)
- [Learning Journey Implementation Plan](../content/learningJourney/LearningJourney.md)
- [Project README](../README.md)

### External References
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)
- [Virtual Modules in Vite](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention)
- [YAML Specification](https://yaml.org/spec/1.2/spec.html)
- [Markdown Spec (CommonMark)](https://spec.commonmark.org/)
- [TypeScript Module Declarations](https://www.typescriptlang.org/docs/handbook/modules.html)
- [gray-matter Documentation](https://github.com/jonschlinkert/gray-matter)

### Architecture Patterns
- [Pipeline Pattern](https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html)
- [Virtual Filesystem Pattern](https://en.wikipedia.org/wiki/Virtual_file_system)
- [Builder Pattern](https://refactoring.guru/design-patterns/builder)

---

**Document Status**: Draft for Review
**Next Review Date**: 2025-12-16
**Version Control**: Track changes in Git with semantic commit messages
