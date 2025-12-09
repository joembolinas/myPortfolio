---
description: 'Architecture blueprint generator tailored for the Academic Journey Portfolio (AJP). Produces Phase 2 documentation that aligns with the Phase 1 Project Specification and the Technology Stack Blueprint, reinforcing JAMstack, atomic design, and GitHub Pages constraints.'
agent: 'agent'
---

# Academic Journey Portfolio — Architecture Blueprint Generator

## Reference Inputs (must be read first)
- `docs/PHASE-1/Project_Specification.md` (source of FR/NFR/CON/GUD/PAT IDs)
- `docs/PHASE-2/Technology_Stack_Blueprint.md` (layer map, tooling, decisions)

## Configuration Variables
${DETAIL_LEVEL="Standard|Comprehensive|Implementation-Ready"} `<!-- Controls depth of narration, diagrams, and tables -->`
${INCLUDE_ASCII_DIAGRAMS=true|false} `<!-- Render architecture diagrams as ASCII only -->`
${INCLUDE_REQUIREMENT_MATRIX=true|false} `<!-- Map sections to FR/NFR/CON IDs -->`
${INCLUDE_DECISION_LOG=true|false} `<!-- Append ADR-style log referencing spec + blueprint -->`
${INCLUDE_RISK_REGISTER=true|false} `<!-- Include risks/mitigations for open items -->`
${INCLUDE_TEST_ALIGNMENT=true|false} `<!-- Highlight how architecture enables validation in Section 7 of spec -->`
${OUTPUT_FORMAT="Markdown"} `<!-- Keep markdown output to satisfy docs validator -->`
${VERSION_TAG="v1.0.0"} `<!-- Used in document footer {Version | status | timestamp} -->`

## Generated Prompt

"Author `docs/PHASE-2/Project_Architecture_Blueprint.md` for the Academic Journey Portfolio using the following rules:

### A. Document Envelope
1. **Front Matter**: include YAML front matter required by `.github/instructions/markdown.instructions.md` — `title`, `source` (blank), `author`, `post_slug`, `categories`, `tags`, `ai_note`, `summary`, `date`.
2. **Tone**: instructional, systems-architecture level; cite requirement IDs from `Project_Specification.md` (e.g., `FR-003`, `NFR-004`, `CON-005`).
3. **Structure**: use `##` and `###` headings only; plain ASCII diagrams (no mermaid) when `${INCLUDE_ASCII_DIAGRAMS}` is true.
4. **Footer**: end with `{${VERSION_TAG} | Draft | Last Updated: <MMM DD YYYY - HH:MM>}`.

### B. Mandatory Sections (aligned to reference docs)
1. **Architecture Overview & Drivers**
   - Summarize JAMstack scope, GitHub Pages constraints, and atomic design goals.
   - Create a table mapping business goals to requirement IDs; include pointers to technology layers.
2. **Layered System Architecture**
   - Reuse stack layers from Technology Stack Blueprint (Delivery, Presentation, Build, Content, Automation, Development).
   - For each layer: purpose, key technologies, primary responsibilities, references to FR/NFR.
   - If `${INCLUDE_ASCII_DIAGRAMS}` true, include a multi-layer ASCII diagram showing dependency direction (top → bottom) with labels from blueprint (e.g., `Node.js 18+`, `Eleventy/Astro`).
3. **Content & Build Pipelines**
   - Describe content ingestion → validation → build → deploy; cite `FR-001`, `FR-010`, `VAL` series.
   - Provide sequence/flow diagram text plus tables for inputs/outputs and tooling (gray-matter, AJV, Eleventy, GitHub Actions).
4. **Component & Presentation Architecture**
   - Detail Atomic Design stack (Atoms/Molecules/Organisms/Templates/Pages) referencing `PAT-005`.
   - Document semantic HTML, BEM, progressive enhancement; mention accessibility hooks (ARIA, keyboard handling) referencing `NFR-004`, `VAL-011` to `VAL-015`.
   - Include sample directory outline and coding conventions that align with Technology Stack Blueprint.
5. **Data & Metadata Architecture**
   - Reference front matter schema; include JSON Schema excerpt and mapping of metadata fields to usage in components.
   - Document validation strategy (AJV) and error-reporting workflow.
6. **Cross-Cutting Concerns**
   - Accessibility, performance budgets, security headers, content security policy, caching strategies with references (`NFR-003`, `SEC`, `VAL-016` to `VAL-020`).
   - Show how progressive enhancement and asset optimization satisfy performance targets.
7. **CI/CD, Testing, and Quality Gates**
   - Align with Project Specification Section 7 and Technology Stack testing section.
   - Outline pipeline stages (lint → validate → test → lighthouse → deploy), required tools, and pass/fail criteria.
   - If `${INCLUDE_TEST_ALIGNMENT}` true, add matrix linking each stage to requirement IDs (`VAL-*`, `AC-*`).
8. **Extension & Evolution Strategy**
   - Describe how to add new terms, components, or integrations without breaking constraints (`NFR-014`, `CON-002`).
   - Provide guidelines for feature additions, refactors, and AI-assisted contributions referencing `.github/copilot-instructions.md`.
9. **Architectural Decision Log** (toggle via `${INCLUDE_DECISION_LOG}`)
   - Document at least five ADR-style entries (e.g., Eleventy vs Astro, Vanilla JS vs frameworks) referencing prior docs.
   - Include context, decision, status, consequences, and follow-up actions.
10. **Risk & Mitigation Register** (toggle via `${INCLUDE_RISK_REGISTER}`)
    - Identify open questions, dependencies (e.g., pending Eleventy vs Astro choice), and mitigation steps.
11. **Requirement Coverage Matrix** (toggle via `${INCLUDE_REQUIREMENT_MATRIX}`)
    - Build a table mapping blueprint sections to FR/NFR/CON/AC IDs, highlighting satisfied and open requirements.
    - Note validation evidence or planned work for each mapping.

### C. Writing Checklist
- Cross-reference both input documents; do not contradict existing specifications.
- Use tables for requirement mappings, responsibilities, and technology associations.
- Keep line length ≤400 characters; prefer soft line breaks for paragraphs.
- Provide succinct explanatory comments before complex code/pseudocode blocks when necessary.
- Ensure all terminology remains WCAG-friendly and accessible (avoid jargon without context).

### D. Validation Notes
- Mention that generated document must pass markdown lint plus custom validators (front matter, line length, headings).
- Reinforce ASCII-only diagrams and absence of mermaid unless user explicitly requests otherwise.
- Remind to include verification steps for ongoing maintenance (e.g., “Next Steps: run `npm run validate`”).

Return only the fully rendered markdown content ready to save at `docs/PHASE-2/Project_Architecture_Blueprint.md`."
