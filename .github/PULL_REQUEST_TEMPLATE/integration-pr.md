<!-- Integration PR Template -->

## Summary

Describe the intent of this integration PR and which backend and frontend branches are being combined for verification.

## Related Issues

- Closes: 

## Changes

- List the high-level changes included in this integration branch.

## Contract Tests

- JSON Schemas: `docs/schemas/`
- Fixtures used: `tests/fixtures/`
- CI job: `.github/workflows/contract-tests.yml`

## How to run locally

1. Start backend (if available) on port 8000
2. Run `pytest -q`

## Acceptance Criteria

- Contract tests pass
- Frontend renders with no visual regressions
- Health endpoint returns 200

## Rollback Plan

- Revert this PR and restore previous deployment; restore content backup from `backups/`.

## Notes

- This PR is for combined verification only. Do not merge until CI and manual acceptance pass.
