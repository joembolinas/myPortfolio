**Migration Master Plan — Canonical, Editable, Single Source**

Last updated: 2025-12-21

Purpose
-------
This document is the single canonical plan for migrating the project's backend responsibilities to a Python FastAPI service while keeping the frontend visuals identical. It contains the decisions, agreements, prohibitions, main requirements, process, risks, rollbacks, branching strategy, testing requirements, and AI collaboration rules. Treat this file as the authoritative memory for the migration — update via PR and record changes in the project board.

Non-negotiable decisions (current)
--------------------------------
1. Preserve UI: The frontend visuals, layout, and component behavior must remain unchanged unless explicitly approved in writing. The `frontend-freeze` branch stores the frozen UI snapshot.
2. Initial backend: FastAPI (Python) with filesystem-based storage (JSON/Markdown) — no database in the initial phase.
3. API-first & contract-driven: All endpoints must have Pydantic models and JSON Schemas; the frontend upgrade to use APIs is gated by contract tests.
4. Human review: All AI-generated code or major changes require a human review and at least one approving reviewer.

Scope (what this plan covers)
----------------------------
- Inventory of frontend data usage and mapping to source files.
- API contract design and Pydantic models.
- FastAPI scaffold and file-based adapters parsing JSON and Markdown.
- Contract tests, CI templates, and shared fixtures.
- Branching strategy, backups, cutover and rollback procedures.

Out of scope (for now)
----------------------
- Production DB migration or introducing persistent databases.
- Frontend visual redesign or UX changes.
- Authentication/authorization and complex infra orchestration (k8s) unless later approved.

High-level outcome choices and trade-offs
---------------------------------------
Path A (Filesystem-first, FastAPI):
- Pros: Minimal initial complexity; keeps content in repo; easy rollback; fast to scaffold and validate.
- Cons: Scalability limits for very large content; requires careful caching and async IO.

Path B (Database-backed API):
- Pros: Scales for large content, easier editing via admin UI, better query performance for complex queries.
- Cons: Requires migration plan, extra infra, downtime risk, more security and ops work.

Recommended approach for now: start with Path A (FastAPI + filesystem) to minimize risk and preserve UI, and plan database migration as a later phase if needed.

Process — Step-by-step (Agile iterations)
----------------------------------------
Sprint 0 — Prepare (1 week)
- Create and protect `frontend-freeze` branch.
- Inventory frontend data usage; map `frontend-key -> source-file`.
- Agree API contract skeleton (Pydantic models) and JSON Schemas.

Sprint 1 — Scaffold & Adapters (1–2 weeks)
- Scaffold FastAPI project structure and configuration.
- Implement file adapters for JSON and Markdown parsing.
- Implement basic endpoints returning canonical JSON.
- Add caching (in-memory TTL) and async file IO (`aiofiles`).

Sprint 2 — Tests & Contract Validation (1–2 weeks)
- Add unit tests for adapters and Pydantic models.
- Add contract tests validating endpoints vs JSON Schemas.
- Add fixtures derived from `src/data` for golden tests.

Sprint 3 — Integration & CI (1 week)
- Create `integration/*` branch binding backend and frontend service changes.
- Add CI job to run contract tests and smoke E2E checks.
- Verify no visual regressions by automated screenshot diff or manual review.

Sprint 4 — Cutover & Monitoring (1 week)
- Perform cutover on staging, run acceptance tests, then schedule production roll.
- Monitor health, logs, and metrics; be ready to rollback if needed.

API surface (initial editable list)
---------------------------------
- GET /api/home
- GET /api/about
- GET /api/projects
- GET /api/projects/{id}
- GET /api/blogs
- GET /api/blogs/{slug}
- GET /api/contact
- GET /api/learning-journey
- GET /health

Format negotiation
- Support `?format=html|md|json` on content endpoints; default JSON includes `content_markdown`.

Canonical data models (summary)
--------------------------------
- Home: id, title, subtitle, ctas, highlights, social, body
- About: id, headline, bio, strengths, values, currentFocus, cta
- Project: id, title, description, technologies, demoUrl, sourceUrl, image
- BlogPost: id, title, excerpt, content_markdown, content_html, publishDate, readTime, tags, status
- ContactMethod: type, label, value, url
- LearningJourneyItem: id, title, period, category, description, expandedContent

Branching strategy
------------------
- `main`: production-ready
- `dev`: active frontend development
- `frontend-freeze`: protected branch with UI snapshot
- `backend/fastapi/<epic>`: backend feature branches
- `integration/<id>`: combined verification branches

PR policy
---------
- All PRs must include: description, linked issue (if applicable), test coverage, link to JSON Schema, at least one reviewer, and passing CI.

Contract testing checklist (must pass before merge)
--------------------------------------------------
- Response status codes appropriate (200/404)
- JSON Schema validation of response body
- Health endpoint returns 200 and status ok
- CORS headers for frontend origin(s)
- Caching headers or ETag support for content endpoints

Backups & Rollback
------------------
- Before any cutover, archive `content/`, `src/data/` and tag the repo; store archive in `backups/` with timestamp.
- Rollback: revert integration PR, restore previous backend deployment, re-point frontend or restore previous content snapshot.

Risks & Mitigations
-------------------
- Risk: Frontend breaks due to API mismatch.
  - Mitigation: Contract-first design, schema validation, and integration tests.
- Risk: Rendering mismatch (server vs client markdown).
  - Mitigation: Keep renderer config consistent or return raw markdown and let frontend render.
- Risk: Performance issues serving many files.
  - Mitigation: Use async IO, caching, HTTP caching headers, and pagination for large lists.
- Risk: Secrets committed or leaked.
  - Mitigation: Enforce `.env` usage, pre-commit scanning, and CI secret checks.

Do's & Don'ts (short)
---------------------
Do:
- Treat the frontend UI as read-only until integration sign-off.
- Use environment variables for config.
- Write contract tests before frontend changes.

Don't:
- Don't switch to a DB mid-sprint without approval and a migration plan.
- Don't hardcode paths or secrets in code.

AI agent rules (persistent memory)
---------------------------------
- AI may scaffold code, generate models, draft tests and CI, and prepare documentation.
- Every AI-produced change must be reviewed by a human and labeled `ai:generated`.
- This document is the canonical AI/human contract: reference it for decisions and do not deviate without updating this file.

Governance & change record
--------------------------
- Update this file via PR; include a short changelog entry in the PR body.
- Record significant decisions in the project board and link to this file.

Edge cases to test
------------------
- Missing front-matter in markdown files — ensure adapter returns defaults and warnings.
- Broken relative image links — adapter should rewrite or surface warnings.
- Empty datasets — endpoints should return empty arrays, not errors.

Checklist before integration
---------------------------
1. `frontend-freeze` created and protected.
2. Inventory mapping completed and approved.
3. JSON Schemas defined for all endpoints.
4. Contract tests and fixtures added to repository.
5. CI job for contract tests configured.
6. Content backup taken and archived.

How to use this file
--------------------
- Reference this document when making decisions or creating PRs.
- If you propose a change that contradicts any non-negotiable decision, update this file first and get approval.

Next steps (for the team)
------------------------
1. Confirm this document; all reviewers sign-off or propose edits via PR.
2. Begin Discovery & Inventory to finalize exact field requirements.
3. Implement backend scaffold and adapters per plan.

Contact & owners
-----------------
- Project Lead: (TBD) — assign a contact in the repo.
- Maintainers: Core dev team.

Note: This file is intentionally the single canonical plan and memory for this migration. Keep it brief and update it as decisions evolve.
