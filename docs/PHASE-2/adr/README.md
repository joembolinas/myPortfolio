# Architectural Decision Records (ADR)

This directory contains Architectural Decision Records for the Growth Journey Portfolio project.

## What is an ADR?

An Architectural Decision Record (ADR) documents an important architectural decision made along with its context and consequences.

## ADR Format

Each ADR follows this structure:

- **Title:** Short noun phrase describing the decision
- **Status:** Proposed | Accepted | Deprecated | Superseded
- **Context:** What is the issue we're facing?
- **Decision:** What is the change we're actually proposing or doing?
- **Consequences:** What becomes easier or harder because of this change?

## Index of ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [001](./001-build-time-vs-runtime-parsing.md) | Build-Time vs Runtime Content Parsing | Accepted | 2025-12-09 |
| [002](./002-virtual-modules-vs-import-aliases.md) | Virtual Modules vs Import Aliases | Accepted | 2025-12-09 |
| [003](./003-single-vs-multiple-plugins.md) | Single Plugin vs Multiple Plugins | Accepted | 2025-12-09 |
| [004](./004-markdown-vs-cms.md) | Markdown-First vs CMS Integration | Accepted | 2025-12-09 |
| [005](./005-typescript-strict-mode.md) | TypeScript Strict Mode | Accepted | 2025-12-09 |

## Creating New ADRs

When making a significant architectural decision:

1. Copy the template from `000-template.md`
2. Number it sequentially (e.g., `006-new-decision.md`)
3. Fill in all sections
4. Update this README index
5. Commit with message: `docs(adr): add ADR-006 for [decision topic]`

## ADR Lifecycle

- **Proposed:** Under discussion, not yet accepted
- **Accepted:** Decision has been made and is active
- **Deprecated:** No longer recommended but not replaced
- **Superseded:** Replaced by a newer ADR (reference the new ADR)

---

v1.0.0 | Approved | Last Updated: Dec 09 2025 - 15:45
