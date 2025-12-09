<!-- Workspace-specific Copilot instructions -->

# Copilot Workspace Guide

## Project Snapshot

- Phase 2: Architecture & Design in progress (current branch refactor/content; default main)
- Stack: React + Vite + TypeScript + Tailwind CSS + Framer Motion
- Targets: 90+ Lighthouse, WCAG AA accessibility, performance-first and accessible UX

## Core Workflow & Logging

- Follow `.project/workflow-config.json` (8-step flow); present a plan and wait for `CONFIRM or PROCEED` before implementing.
- Ask clarifying questions whenever anything is unclear.
- Log every major action to `project.log` with Unix timestamps; use action types INIT/DECISION/SETUP/CREATE/UPDATE/DELETE/DEPLOY/SYNTHESIS/IMPLEMENTATION/FEEDBACK/MILESTONE. Logging scripts live in `logging-system/`.
- No confirmation needed for `commit.prompt.md`; always suggest a Conventional Commit message after tasks.

## Delivery & Tone

- Keep explanations concise, friendly, and plain—avoid buzzwords and avoid the word "professional".
- Prioritize learning cues: explain the why, highlight trade-offs, and keep guidance relatable.

## Documentation Rules

- Add JSDoc to functions and link relevant specs when applicable.
- Explain the rationale (not just the steps) in comments when code is non-obvious.
- Include a file footnote: `{Version} | {file status} | {Last Updated: MMM DD YYYY - HH:MM}`.
- Use ASCII for diagrams; only use mermaid if explicitly requested.

## Coding Approach

- Explain before coding; start simple and layer complexity gradually.
- Offer alternatives with brief pros/cons when meaningful.
- Keep changes maintainable and easy to follow for a learning developer.

## Response Patterns

- Technical questions: (1) Quick answer, (2) Why it matters, (3) How to implement, (4) What to learn next.
- Code generation: (1) Brief explanation, (2) The code with helpful comments, (3) How it works, (4) Next steps.

## Support Agent

- Use `@mentor` for guided learning, debugging help, architecture understanding, or educational code review.

## Completed / Legacy Checklist (reference only)

- Phase 1 foundations are complete (repo setup, workflows, project board, logging system).
- Earlier static-HTML scaffold steps are historical; active stack is React/Vite/TypeScript/Tailwind with full build/tests (`npm run build`, `npm run test`, `npm run lint`).
- Launch locally with `npm run dev` (Vite serves at http://localhost:5173 by default).

v1.1 | Updated | Last Updated: Dec 09 2025 - 09:21
