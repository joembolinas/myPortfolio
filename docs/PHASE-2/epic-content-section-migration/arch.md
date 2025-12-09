---
epic_id: EPIC-002
title: Architecture Specification - Content Section Migration
version: 1.0
created: 2025-12-09
status: draft
related_prd: epic.md
dependencies: [EPIC-001]
---

## 1. Epic Architecture Overview

The Content Section Migration epic orchestrates the transformation of seven portfolio sections from hardcoded TypeScript placeholders to a Markdown-driven content pipeline. The architecture builds upon the Core Plugin Infrastructure (EPIC-001) to enable a phased migration approach where each section follows a consistent pattern:

**Migration Pattern:** Schema Definition → Content Authoring → Parser Implementation → Component Integration → Validation

The migration maintains strict backward compatibility during development through a dual-source strategy: virtual modules provide real content when available, while TypeScript fallbacks ensure the UI never breaks. This enables incremental migration where sections can be completed independently without blocking overall progress.

**Key Architectural Principles:**

1. **Phased Migration**: Each section migrated independently, tested, and validated before moving to next
2. **Dual-Source Strategy**: Components support both virtual module and fallback data simultaneously
3. **Schema-First Design**: Define TypeScript interfaces before creating content or parsers
4. **Content Validation**: Build-time checks ensure schema compliance and data quality
5. **Zero Breaking Changes**: UI functionality preserved throughout migration process

## 2. System Architecture Diagram

```mermaid
graph TB
    subgraph "Content Authoring Phase"
        AUTHOR[Portfolio Owner]
        AI[AI Content Assistant]
        
        AUTHOR -->|Creates Real Content| CONTENT
        AI -->|Assists Generation| CONTENT
    end

    subgraph "Content Layer - Markdown Files"
        CONTENT[content/ Directory]
        
        subgraph "Section 1: Home/Hero"
            HOME_MD[1-home/hero.md]
            HOME_SCHEMA{{YAML Frontmatter:<br/>title, subtitle,<br/>ctaPrimary, highlights}}
            HOME_MD --> HOME_SCHEMA
        end
        
        subgraph "Section 2: About"
            ABOUT_MD[2-about/About.md]
            ABOUT_SCHEMA{{YAML Frontmatter:<br/>headline, bio,<br/>strengths, values}}
            ABOUT_MD --> ABOUT_SCHEMA
        end
        
        subgraph "Section 3: Skills"
            SKILLS_MD[2.5-skills/*.md]
            SKILLS_SCHEMA{{YAML Frontmatter:<br/>name, category,<br/>proficiency, icon}}
            SKILLS_MD --> SKILLS_SCHEMA
        end
        
        subgraph "Section 4: Projects"
            PROJECTS_MD[3-projects/project-*.md]
            PROJECTS_SCHEMA{{YAML Frontmatter:<br/>title, description,<br/>technologies, status}}
            PROJECTS_MD --> PROJECTS_SCHEMA
        end
        
        subgraph "Section 5: Blogs"
            BLOGS_MD[5-blogs/blog-*.md]
            BLOGS_SCHEMA{{YAML Frontmatter:<br/>title, excerpt,<br/>date, tags, status}}
            BLOGS_MD --> BLOGS_SCHEMA
        end
        
        subgraph "Section 6: Contact"
            CONTACT_MD[6-contact/Contact.md]
            CONTACT_SCHEMA{{YAML Frontmatter:<br/>headline, summary<br/>contacts array}}
            CONTACT_MD --> CONTACT_SCHEMA
        end
        
        subgraph "Section 7: Learning Journey"
            JOURNEY_MD[learningJourney/term-*/*.md]
            JOURNEY_SCHEMA{{YAML Frontmatter:<br/>title, period, category<br/>expandedContent}}
            JOURNEY_MD --> JOURNEY_SCHEMA
        end
        
        CONTENT --> HOME_MD
        CONTENT --> ABOUT_MD
        CONTENT --> SKILLS_MD
        CONTENT --> PROJECTS_MD
        CONTENT --> BLOGS_MD
        CONTENT --> CONTACT_MD
        CONTENT --> JOURNEY_MD
    end

    subgraph "Processing Layer - Parser Implementation"
        PLUGIN[contentDataPlugin.ts]
        JOURNEY_PLUGIN[journeyDataPlugin.ts]
        
        subgraph "Section-Specific Parsers"
            PARSE_HOME[parseHome<br/>Single-file parser]
            PARSE_ABOUT[parseAbout<br/>Single-file parser]
            PARSE_SKILLS[parseSkills<br/>Multi-file aggregator]
            PARSE_PROJECTS[parseProjects<br/>Multi-file with slug ID]
            PARSE_BLOGS[parseBlogs<br/>Multi-file + draft filter]
            PARSE_CONTACT[parseContact<br/>Single-file + URL synthesis]
            PARSE_JOURNEY[parseJourney<br/>Recursive + enrichment]
        end
        
        HOME_MD --> PARSE_HOME
        ABOUT_MD --> PARSE_ABOUT
        SKILLS_MD --> PARSE_SKILLS
        PROJECTS_MD --> PARSE_PROJECTS
        BLOGS_MD --> PARSE_BLOGS
        CONTACT_MD --> PARSE_CONTACT
        JOURNEY_MD --> PARSE_JOURNEY
        
        PARSE_HOME --> PLUGIN
        PARSE_ABOUT --> PLUGIN
        PARSE_SKILLS --> PLUGIN
        PARSE_PROJECTS --> PLUGIN
        PARSE_BLOGS --> PLUGIN
        PARSE_CONTACT --> PLUGIN
        
        PARSE_JOURNEY --> JOURNEY_PLUGIN
    end

    subgraph "Virtual Module Generation"
        VM_HOME[virtual:home-data<br/>HomeData | null]
        VM_ABOUT[virtual:about-data<br/>AboutData | null]
        VM_SKILLS[virtual:skills-data<br/>SkillDataItem[]]
        VM_PROJECTS[virtual:projects-data<br/>ProjectDataItem[]]
        VM_BLOGS[virtual:blogs-data<br/>BlogDataItem[]]
        VM_CONTACT[virtual:contact-data<br/>ContactData | null]
        VM_JOURNEY[virtual:learning-journey-data<br/>LearningJourneyItem[]]
        
        PLUGIN --> VM_HOME
        PLUGIN --> VM_ABOUT
        PLUGIN --> VM_SKILLS
        PLUGIN --> VM_PROJECTS
        PLUGIN --> VM_BLOGS
        PLUGIN --> VM_CONTACT
        
        JOURNEY_PLUGIN --> VM_JOURNEY
    end

    subgraph "Data Re-export Layer - Migration Bridge"
        RE_HOME[src/data/home.ts]
        RE_ABOUT[src/data/about.ts]
        RE_SKILLS[src/data/skills.ts]
        RE_PROJECTS[src/data/projects.ts]
        RE_BLOGS[src/data/blogs.ts]
        RE_CONTACT[src/data/contact.ts]
        RE_JOURNEY[src/data/learningJourney.ts]
        
        FALLBACK[Hardcoded Placeholder Data]
        
        VM_HOME --> RE_HOME
        VM_ABOUT --> RE_ABOUT
        VM_SKILLS --> RE_SKILLS
        VM_PROJECTS --> RE_PROJECTS
        VM_BLOGS --> RE_BLOGS
        VM_CONTACT --> RE_CONTACT
        VM_JOURNEY --> RE_JOURNEY
        
        FALLBACK -.->|Backup if empty| RE_HOME
        FALLBACK -.->|Backup if empty| RE_ABOUT
        FALLBACK -.->|Backup if empty| RE_SKILLS
        FALLBACK -.->|Backup if empty| RE_PROJECTS
        FALLBACK -.->|Backup if empty| RE_BLOGS
        FALLBACK -.->|Backup if empty| RE_CONTACT
        FALLBACK -.->|Backup if empty| RE_JOURNEY
    end

    subgraph "Component Integration Layer"
        COMP_HOME[HeroSection Component]
        COMP_ABOUT[AboutSection Component]
        COMP_SKILLS[SkillsSection Component]
        COMP_PROJECTS[ProjectsSection Component]
        COMP_BLOGS[BlogsSection Component]
        COMP_CONTACT[ContactSection Component]
        COMP_JOURNEY[JourneyTimeline Component]
        
        RE_HOME --> COMP_HOME
        RE_ABOUT --> COMP_ABOUT
        RE_SKILLS --> COMP_SKILLS
        RE_PROJECTS --> COMP_PROJECTS
        RE_BLOGS --> COMP_BLOGS
        RE_CONTACT --> COMP_CONTACT
        RE_JOURNEY --> COMP_JOURNEY
    end

    subgraph "Validation Layer"
        TS_CHECK[TypeScript Type Check]
        SCHEMA_VAL[Schema Validation]
        BUILD_TEST[Build Test]
        HMR_TEST[HMR Test]
        
        VM_HOME -.->|Validates| TS_CHECK
        VM_ABOUT -.->|Validates| TS_CHECK
        VM_SKILLS -.->|Validates| TS_CHECK
        VM_PROJECTS -.->|Validates| TS_CHECK
        VM_BLOGS -.->|Validates| TS_CHECK
        VM_CONTACT -.->|Validates| TS_CHECK
        VM_JOURNEY -.->|Validates| TS_CHECK
        
        HOME_SCHEMA -.->|Validates| SCHEMA_VAL
        ABOUT_SCHEMA -.->|Validates| SCHEMA_VAL
        SKILLS_SCHEMA -.->|Validates| SCHEMA_VAL
        PROJECTS_SCHEMA -.->|Validates| SCHEMA_VAL
        BLOGS_SCHEMA -.->|Validates| SCHEMA_VAL
        CONTACT_SCHEMA -.->|Validates| SCHEMA_VAL
        JOURNEY_SCHEMA -.->|Validates| SCHEMA_VAL
    end

    subgraph "Runtime - Browser"
        BROWSER[Production Application]
        
        COMP_HOME --> BROWSER
        COMP_ABOUT --> BROWSER
        COMP_SKILLS --> BROWSER
        COMP_PROJECTS --> BROWSER
        COMP_BLOGS --> BROWSER
        COMP_CONTACT --> BROWSER
        COMP_JOURNEY --> BROWSER
    end

    style AUTHOR fill:#e1f5ff
    style AI fill:#e1f5ff
    style CONTENT fill:#fff4e6
    style HOME_MD fill:#fff4e6
    style ABOUT_MD fill:#fff4e6
    style SKILLS_MD fill:#fff4e6
    style PROJECTS_MD fill:#fff4e6
    style BLOGS_MD fill:#fff4e6
    style CONTACT_MD fill:#fff4e6
    style JOURNEY_MD fill:#fff4e6
    style HOME_SCHEMA fill:#ffebee
    style ABOUT_SCHEMA fill:#ffebee
    style SKILLS_SCHEMA fill:#ffebee
    style PROJECTS_SCHEMA fill:#ffebee
    style BLOGS_SCHEMA fill:#ffebee
    style CONTACT_SCHEMA fill:#ffebee
    style JOURNEY_SCHEMA fill:#ffebee
    style PLUGIN fill:#f3e5f5
    style JOURNEY_PLUGIN fill:#f3e5f5
    style PARSE_HOME fill:#e8f5e9
    style PARSE_ABOUT fill:#e8f5e9
    style PARSE_SKILLS fill:#e8f5e9
    style PARSE_PROJECTS fill:#e8f5e9
    style PARSE_BLOGS fill:#e8f5e9
    style PARSE_CONTACT fill:#e8f5e9
    style PARSE_JOURNEY fill:#e8f5e9
    style VM_HOME fill:#e3f2fd
    style VM_ABOUT fill:#e3f2fd
    style VM_SKILLS fill:#e3f2fd
    style VM_PROJECTS fill:#e3f2fd
    style VM_BLOGS fill:#e3f2fd
    style VM_CONTACT fill:#e3f2fd
    style VM_JOURNEY fill:#e3f2fd
    style FALLBACK fill:#fce4ec
    style TS_CHECK fill:#fff9c4
    style SCHEMA_VAL fill:#fff9c4
    style BUILD_TEST fill:#fff9c4
    style HMR_TEST fill:#fff9c4
    style BROWSER fill:#efebe9
```

## 3. High-Level Features & Technical Enablers

### High-Level Features

#### F1: Schema Definition & TypeScript Interfaces

**Description:** Define data contracts for all seven content sections

**Components:**

- `src/types/index.ts`: Core data interfaces
- `src/types/virtual-modules.d.ts`: Virtual module declarations

**Schema Details:**

```typescript
// Pseudocode - Schema hierarchy
interface HomeData {
  id: string;
  title: string;
  subtitle?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  highlights?: string[];
  badges?: string[];
  social?: Array<{ label: string; href: string }>;
  body?: string;
}

interface AboutData {
  id: string;
  headline: string;
  bio?: string;
  strengths?: string[];
  values?: string[];
  currentFocus?: string[];
  cta?: { label: string; href: string };
  narrative?: string;
}

interface SkillDataItem {
  id: string;
  name: string;
  category: 'dev' | 'network' | 'data' | 'ai' | 'tools' | 'learning';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  icon?: string;
  description?: string;
}

interface ProjectDataItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  gradient?: string;
  demoUrl?: string;
  sourceUrl?: string;
  image?: string;
  highlights?: string[];
  status?: 'wip' | 'live' | 'archived';
}

interface BlogDataItem {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime?: number;
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'coming-soon';
  featured?: boolean;
  url?: string;
  summary?: string;
}

interface ContactDataItem {
  type: 'email' | 'linkedin' | 'github' | 'phone';
  label: string;
  value: string;
  url?: string;
  icon?: string;
}

interface ContactData {
  headline?: string;
  summary?: string;
  contacts: ContactDataItem[];
}

interface LearningJourneyItem {
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
}
```

**Validation Rules:**

- Required fields enforced at parse time
- Enums validated with fallback to safe defaults
- Optional fields degrade gracefully

#### F2: Content File Creation - Real Portfolio Data

**Description:** Author authentic portfolio content replacing all placeholders

**Content Sections:**

**Home/Hero** (`content/1-home/hero.md`):

- Professional tagline and value proposition
- Primary CTA (View Projects) and secondary CTA (Contact)
- Key highlights (Performance-first, WCAG AA, Modern stack)
- Badge achievements (Lighthouse scores, certifications)
- Social links (GitHub, LinkedIn, Email)

**About** (`content/2-about/About.md`):

- Career transition narrative (Network Engineer → Full-Stack Developer)
- Core strengths (Problem-solving, Systems thinking, Continuous learning)
- Professional values (Quality, Accessibility, Performance)
- Current focus areas (React ecosystem, TypeScript mastery, Cloud architecture)

**Skills** (`content/2.5-skills/*.md`):

- Development: React, TypeScript, Node.js, Vite (advanced/intermediate)
- Networking: TCP/IP, Routing protocols, Network security (intermediate)
- Data: PostgreSQL, Redis, Data analysis (beginner/intermediate)
- AI/ML: GitHub Copilot integration, Prompt engineering (beginner)
- Tools: Git, Docker, VS Code, Vercel (intermediate/advanced)
- Learning: TryHackMe, AWS certification prep (in-progress)

**Projects** (`content/3-projects/project-*.md`):

- Portfolio V2 (this project): Markdown content pipeline, Vite plugins, Lighthouse 90+
- E-Commerce Platform: Full-stack app with tRPC, Stripe integration
- Network Monitor Dashboard: Real-time network analytics
- AI-Powered Resume Builder: GPT integration for content generation
- (5-10 real projects total)

**Blogs** (`content/5-blogs/blog-*.md`):

- "Building a Markdown Content Pipeline with Vite"
- "Career Transition: From Network Engineer to Developer"
- "Achieving Lighthouse 90+ Scores"
- "TypeScript Best Practices for React Applications"
- (Draft status for unpublished posts)

**Contact** (`content/6-contact/Contact.md`):

- Professional email with mailto: synthesis
- LinkedIn profile URL
- GitHub profile URL
- Optional phone with tel: synthesis

**Learning Journey** (`content/learningJourney/term-*/*.md`):

- Term 1: Career transition start, foundational courses
- Term 2: React/TypeScript deep dive, TryHackMe security learning
- Term 3: Advanced topics, certifications, portfolio projects
- (Chronologically sorted timeline entries)

**Content Quality Standards:**

- Factually accurate and up-to-date
- Professional tone and style
- SEO-friendly descriptions
- Accessibility-conscious alt text for images
- Consistent formatting across sections

#### F3: Parser Function Implementation

**Description:** Implement section-specific parsers in Vite plugins

**Implementation Strategy:**

**Phase 1: Single-File Parsers** (Home, About, Contact)

```typescript
// Pseudocode - Single-file parser pattern
function parseHome(file: MarkdownFile): HomeData | null {
  const { data, content } = matter(file.content);
  
  // Validate required fields
  if (!data.title) {
    logWarning(`Missing required field 'title' in ${file.path}`);
    return null;
  }
  
  // Extract sections
  const sections = splitSections(content);
  const highlights = extractBullets(sections['highlights']);
  
  // Build typed object
  return {
    id: slugFromPath(file.path),
    title: data.title,
    subtitle: data.subtitle || undefined,
    ctaPrimary: data.ctaPrimary,
    ctaSecondary: data.ctaSecondary,
    highlights,
    badges: ensureStringArray(data.badges),
    social: data.social || [],
    body: sections['hero copy'] || content
  };
}
```

**Phase 2: Multi-File Parsers** (Skills, Projects, Blogs)

```typescript
// Pseudocode - Multi-file aggregator pattern
function parseProjects(files: MarkdownFile[]): ProjectDataItem[] {
  return files
    .map(file => {
      const { data, content } = matter(file.content);
      
      // Validate required fields
      if (!data.title || !data.description) {
        logWarning(`Skipping ${file.path} - missing required fields`);
        return null;
      }
      
      // Extract sections
      const sections = splitSections(content);
      const highlights = extractBullets(sections['highlights']);
      
      // Generate ID from filename
      const id = slugFromPath(file.path);
      
      return {
        id,
        title: data.title,
        description: data.description,
        technologies: ensureStringArray(data.technologies),
        gradient: data.gradient,
        demoUrl: data.demoUrl,
        sourceUrl: data.sourceUrl,
        image: data.image,
        highlights,
        status: data.status || 'live'
      };
    })
    .filter(Boolean); // Remove null entries
}
```

**Phase 3: Specialized Parsers** (Blogs with draft filtering, Contact with URL synthesis)

```typescript
// Pseudocode - Draft filtering for blogs
function parseBlogs(files: MarkdownFile[]): BlogDataItem[] {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return files
    .map(file => {
      const { data } = matter(file.content);
      
      // Skip drafts in production
      if (isProduction && data.status === 'draft') {
        return null;
      }
      
      return {
        id: slugFromPath(file.path),
        title: data.title,
        excerpt: data.excerpt,
        publishDate: data.date,
        tags: ensureStringArray(data.tags),
        status: data.status || 'published',
        // ... additional fields
      };
    })
    .filter(Boolean);
}

// Pseudocode - URL synthesis for contact
function parseContact(file: MarkdownFile): ContactData | null {
  const { data, content } = matter(file.content);
  
  const contacts = data.contacts.map(contact => {
    // Synthesize URLs for email and phone if missing
    let url = contact.url;
    if (!url && contact.type === 'email') {
      url = `mailto:${contact.value}`;
    } else if (!url && contact.type === 'phone') {
      url = `tel:${contact.value}`;
    }
    
    // Fallback icons based on type
    const icon = contact.icon || getDefaultIcon(contact.type);
    
    return { ...contact, url, icon };
  });
  
  return {
    headline: data.headline,
    summary: data.summary,
    contacts
  };
}
```

**Phase 4: Learning Journey Parser** (Recursive, enrichment, sorting)

```typescript
// Pseudocode - Recursive parser with enrichment
function parseJourney(files: MarkdownFile[]): LearningJourneyItem[] {
  return files
    .map(file => {
      const { data, content } = matter(file.content);
      
      const sections = splitSections(content);
      const { icon, color } = getIconAndColor(data.category);
      
      return {
        id: slugFromPath(file.path),
        title: data.title,
        period: data.period,
        category: data.category,
        description: data.description,
        expandedContent: {
          overview: sections['overview'] || '',
          keyLearnings: extractBullets(sections['key learnings']),
          technologies: extractBullets(sections['technologies']),
          achievements: extractBullets(sections['achievements']),
          challenges: extractBullets(sections['challenges']),
          nextSteps: extractBullets(sections['next steps'])
        },
        icon,
        color
      };
    })
    .sort((a, b) => b.period.localeCompare(a.period)); // Descending chronological
}
```

#### F4: Component Integration & Updates

**Description:** Update React components to consume virtual module data

**Migration Pattern Per Component:**

1. **Import Update**: Change from local import to virtual module
2. **Type Annotation**: Add explicit type from interfaces
3. **Null Handling**: Add conditional rendering for empty data
4. **Remove Coupling**: Delete any hardcoded data dependencies

**Example Component Update:**

```typescript
// Before (hardcoded data)
import { projects } from '@/data/projects'; // Local TypeScript file

export function ProjectsSection() {
  return (
    <section>
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
}

// After (virtual module)
import { projects } from '@/data/projects'; // Re-export layer with fallback

export function ProjectsSection() {
  if (!projects || projects.length === 0) {
    return <EmptyState message="No projects available" />;
  }
  
  return (
    <section>
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
}
```

**Components Requiring Updates:**

- `src/components/sections/HeroSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/SkillsSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/BlogsSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/components/sections/JourneyTimeline.tsx`

**UI Preservation Requirements:**

- Maintain existing styling (Tailwind classes)
- Preserve animations (Framer Motion)
- Keep accessibility features (ARIA labels, semantic HTML)
- Retain performance optimizations (lazy loading, code splitting)

#### F5: Data Re-export Layer with Fallback Strategy

**Description:** Dual-source bridge enabling graceful degradation

**Implementation:**

```typescript
// Pseudocode - src/data/projects.ts
import { projectsData } from 'virtual:projects-data';

// Fallback data (can be removed after migration complete)
const fallbackProjects: ProjectDataItem[] = [
  {
    id: 'example-project',
    title: 'Example Project (Placeholder)',
    description: 'This is placeholder data shown when no real content exists',
    technologies: ['React', 'TypeScript'],
    status: 'wip'
  }
];

// Export with fallback logic
export const projects: ProjectDataItem[] = 
  Array.isArray(projectsData) && projectsData.length > 0
    ? projectsData
    : fallbackProjects;
```

**Rationale:**

- **Safety**: UI never breaks during development/migration
- **Incremental**: Sections can be migrated independently
- **Debugging**: Easy to identify which sections are using real vs placeholder data
- **Cleanup**: Fallbacks deleted once all content migrated and verified

#### F6: Content Validation & Quality Checks

**Description:** Build-time validation ensuring schema compliance

**Validation Levels:**

**Level 1: Required Field Validation**

- Parser returns `null` if required fields missing
- Warning logged with filename and field name
- Build continues (non-blocking)

**Level 2: Type Validation**

- Enum values validated (category, status, proficiency)
- Invalid values default to safe fallback
- Warning logged for corrections

**Level 3: Data Quality Checks**

- Empty arrays vs null/undefined (DQ-004)
- Malformed YAML skipped with error log (DQ-003)
- Missing category defaults to 'skill' (DQ-001)

**Level 4: Schema Compliance**

- TypeScript compiler validates interface contracts
- Virtual module exports match type declarations
- IDE shows errors for schema violations

**Validation Workflow:**

1. Parser validates required fields → logs warnings → returns null if invalid
2. TypeScript compiler checks virtual module types → fails build if mismatched
3. Developer reviews warnings → corrects content → re-builds
4. All sections validate successfully → migration complete

#### F7: HMR Verification & Development Workflow

**Description:** Ensure instant content preview updates

**Test Scenarios:**

1. Edit `content/1-home/hero.md` title → Save → Verify Hero updates <100ms
2. Add new project file → Save → Verify project card appears
3. Update skill proficiency → Save → Verify badge changes
4. Modify blog excerpt → Save → Verify card updates
5. Add Learning Journey entry → Save → Verify timeline updates

**HMR Flow:**

```
File Save
  ↓
File Watcher Detects Change
  ↓
handleHotUpdate Hook Triggered
  ↓
Virtual Module Cache Invalidated
  ↓
Parser Re-runs
  ↓
New Virtual Module Generated
  ↓
HMR Update Sent to Browser
  ↓
React Component Re-renders
  ↓
UI Updates (<100ms total)
```

**Debugging Tools:**

- Vite dev server console shows HMR events
- Browser console logs module updates
- React DevTools shows component re-renders
- Network tab confirms no full page reload

### Technical Enablers

#### TE1: Content Authoring Tools

**Markdown Editors:**

- VSCode with Markdown extensions (recommended)
- Obsidian (for richer Markdown experience)
- Any text editor with YAML support

**YAML Validation:**

- VSCode YAML extension for frontmatter validation
- Online YAML validators for syntax checking
- Linting via `yamllint` (optional)

#### TE2: Schema Documentation

**Specification Files:**

- `spec/specs-md-pipeline.md`: Complete schema reference
- `spec/docs-content-sections-spec.md`: Section-specific details
- JSDoc comments in parser functions

**Content Templates:**

- Example files for each section showing correct structure
- Frontmatter field descriptions and examples
- Common patterns and best practices

#### TE3: Migration Tooling

**Scripts:**

- Content validation script (check all files against schema)
- Migration progress tracker (which sections complete)
- Placeholder data cleanup script (remove fallbacks)

**Development Helpers:**

- TypeScript strict mode for maximum type safety
- ESLint rules for code quality
- Prettier for consistent formatting

#### TE4: Version Control Strategy

**Git Workflow:**

- Feature branch per content section (`content/home-section`, `content/projects-section`)
- Commits per content file for clear history
- Pull requests with migration checklists

**Content Organization:**

- Keep content separate from code commits when possible
- Tag major milestones (e.g., `v2.0-content-migration-complete`)
- Document migration progress in commit messages

## 4. Technology Stack

### Content Authoring

- **Markdown**: CommonMark specification
- **YAML**: Frontmatter syntax
- **Text Editors**: VSCode, Obsidian, or any Markdown editor

### Build System (from EPIC-001)

- **Vite 5.x**: Build engine and plugin host
- **gray-matter**: YAML frontmatter parsing
- **TypeScript 5+**: Type safety and interfaces

### Component Framework

- **React 18+**: UI components
- **Tailwind CSS**: Styling (unchanged)
- **Framer Motion**: Animations (unchanged)

### Validation Tools

- **TypeScript Compiler**: Type checking (`tsc --noEmit`)
- **Vite Build**: Virtual module validation
- **Browser DevTools**: HMR verification

### Development Tools

- **Git**: Version control for content
- **VSCode**: IDE with Markdown/YAML support
- **npm**: Package management

## 5. Technical Value

### Value Rating: **HIGH**

### Justification

#### Portfolio Authenticity

- Transforms placeholder content into real professional portfolio
- Showcases actual projects, skills, and career journey
- Demonstrates technical capability through implementation

#### Content Maintainability

- Reduces content update friction by 80% (code edits → file edits)
- Enables frequent updates without deployment overhead
- Supports AI-assisted content generation and management

#### Type Safety Preservation

- Maintains full TypeScript type checking across migration
- Compile-time validation prevents runtime errors
- IDE integration provides real-time feedback

#### Performance Maintenance

- Zero runtime overhead (build-time processing)
- Lighthouse 90+ scores preserved
- Bundle size unaffected by content volume

#### Scalability

- Architecture supports unlimited content growth
- Pattern reusable for future sections
- Foundation for potential multi-author workflows

#### Knowledge Demonstration

- Shows mastery of content pipeline architecture
- Demonstrates schema design and data modeling
- Proves ability to execute complex migrations

## 6. T-Shirt Size Estimate

### Size: **LARGE (L)**

### Breakdown

**Time Estimate:** 30-40 hours

**Complexity Factors:**

- **Content Authoring** (15-20 hours):
  - Writing real portfolio content for 7 sections
  - Creating 5-10 project descriptions
  - Crafting professional About/Hero narratives
  - Building comprehensive Learning Journey timeline
  - Drafting blog post previews

- **Parser Implementation** (6-8 hours):
  - Implementing 7 section-specific parsers
  - Adding validation logic and error handling
  - Testing with various content structures
  - Debugging edge cases

- **Component Integration** (4-6 hours):
  - Updating 7 React components
  - Adding null/empty state handling
  - Preserving UI/UX functionality
  - Testing HMR for each section

- **Validation & Testing** (3-4 hours):
  - Running TypeScript type checks
  - Verifying build success
  - Testing HMR workflow
  - Reviewing Lighthouse scores

- **Documentation & Cleanup** (2-3 hours):
  - Updating README with content authoring guide
  - Removing placeholder fallback data
  - Creating content templates
  - Migration completion checklist

**Risk Factors:**

- 🟢 **Low**: Technical implementation (built on EPIC-001 foundation)
- 🟡 **Medium**: Content quality and completeness (requires thoughtful authoring)
- 🟢 **Low**: Component integration (straightforward updates)
- 🟢 **Low**: Validation (automated via TypeScript)

**Dependencies:**

- ✅ EPIC-001 must be complete (blocker)
- ✅ Real portfolio content must be authored
- ✅ All schemas defined and documented

**Confidence Level:** High (clear scope, proven architecture, incremental approach)

---

**Version:** 1.0 | **Status:** Draft | **Last Updated:** Dec 09 2025 - 12:00
