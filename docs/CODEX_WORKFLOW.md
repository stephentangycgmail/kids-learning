# Codex Workflow

This document describes the recommended workflow for future Codex tasks in the maintenance-phase Kids Learning repository.

Root [`AGENTS.md`](../AGENTS.md) is authoritative for safety, Git, and release
authorization. This file defines task sequencing and should not duplicate or
weaken those rules.

## Current Context

- Kids Learning has a `v1.0.0` tagged baseline and a later untagged Pages
  deployment.
- Production is static hosting from `main`.
- Normal maintenance and development work happens on `develop` or a focused branch.
- Azure and backend APIs are not part of the current production deployment process.

## Recommended Process

```text
1. User describes the change request.
2. Codex reads AGENTS.md and relevant repository docs.
3. Codex inspects the relevant code or content files.
4. Codex confirms scope and risk when needed.
5. Codex implements the smallest reasonable change.
6. Codex validates with existing checks and relevant smoke tests.
7. Codex reports changed files, validation, skipped checks, and risks.
8. User reviews before commit, push, release, tag, or deployment when approval is required.
```

## Task Brief Template

Use this format when giving larger work to Codex:

```markdown
# Task

## Goal
Describe the intended result.

## Branch
Name the required branch.

## Scope
List files or folders that may be changed.

## Do Not Change
List files, formats, or functions that must remain unchanged.

## Requirements
Detailed bullet points.

## Validation
How to check the result manually or with tests.

## Commit / Push
State whether Codex should commit or push.

## Notes
Any project-specific constraints.
```

## Safety Rules

Follow the safety and authorization rules in root `AGENTS.md`. Configuration
boundaries are maintained in [`CONFIGURATION.md`](CONFIGURATION.md), and
release rules are maintained in [`RELEASE_POLICY.md`](RELEASE_POLICY.md).

## Content Rule

When adding or improving learning content, prefer:

```text
reviewed content -> static JSON under frontend/data/ -> catalog update if needed -> validation
```

Do not add live API calls to student-facing pages unless a future architecture task explicitly approves it.

## Documentation Rule

When behavior, structure, deployment, or workflow changes, update the relevant current document:

- [MASTER_TASK.md](MASTER_TASK.md)
- [TECHNICAL_OVERVIEW.md](TECHNICAL_OVERVIEW.md)
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- [CONTENT_STANDARD.md](CONTENT_STANDARD.md)
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- [TESTING_GUIDE.md](TESTING_GUIDE.md)
- [RELEASE_MANIFEST.md](RELEASE_MANIFEST.md)
