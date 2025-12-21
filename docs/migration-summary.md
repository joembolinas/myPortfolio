**Migration Summary — Single Entry Point**

Last updated: 2025-12-21

Use this document as the entry point for the migration artifacts. It links the canonical plan, governance rules, discovery outputs, schema examples, fixtures, and test guidance. Review components below and follow the checklists in `docs/migration-master-plan.md` before implementation.

Core artifacts
--------------
- **Migration master plan**: [docs/migration-master-plan.md](docs/migration-master-plan.md)
- **Governance & decisions**: [docs/migration-governance.md](docs/migration-governance.md)
- **High-level plan**: [docs/backend-migration-plan.md](docs/backend-migration-plan.md)

Discovery & mapping
-------------------
- **Content inventory**: [docs/content-inventory.md](docs/content-inventory.md)
- **Discovery field mapping**: [docs/discovery-field-mapping.md](docs/discovery-field-mapping.md)

API contracts & models
----------------------
- **API schemas draft** (conceptual): [docs/api-schemas-draft.md](docs/api-schemas-draft.md)
- **Pydantic model templates**: [docs/pydantic-models.md](docs/pydantic-models.md)
- **JSON Schema examples**: [docs/json-schemas-examples.md](docs/json-schemas-examples.md)
- **Generated JSON Schemas**: [docs/schemas/](docs/schemas/)

Fixtures & tests
----------------
- **JSON fixtures**: `tests/fixtures/` (home.json, about.json, projects.json, blogs.json, contact.json, skills.json, learningJourney.json, websites.json)
- **Contract tests checklist**: [docs/contract-tests-checklist.md](docs/contract-tests-checklist.md)
- **Sample contract-test script**: [docs/sample-contract-test-script.md](docs/sample-contract-test-script.md)
- **CI workflow template (contract tests)**: [.github/workflows/contract-tests.yml](.github/workflows/contract-tests.yml)

Branches & templates
--------------------
- **Frontend freeze branch**: `frontend-freeze` (create and protect before backend work)
- **Integration branch template**: `.github/PULL_REQUEST_TEMPLATE/integration-pr.md` (used when creating `integration/*` branches)
- **Integration starter branch**: `integration/initial` (exists locally)

Next actions (recommended)
--------------------------
1. Review the `docs/migration-master-plan.md` and confirm non-negotiables.
2. Approve the `frontend-freeze` branch creation and protection.
3. Finalize API field requirements by inspecting component usage or confirm with product owner.
4. When ready, scaffold backend in `backend/` per `docs/pydantic-models.md` and generate JSON Schemas for CI.

How to change this summary
--------------------------
- Edit `docs/migration-summary.md` via PR and reference the change in the project board.

Contact
-------
- Project Lead: (TBD)
