# Codex Workflow

This document describes the recommended workflow for future code changes.

## Recommended Process

```text
1. User describes the change request
2. ChatGPT clarifies and prepares a precise task brief
3. Codex implements the task in GitHub
4. ChatGPT reviews the changed files
5. User approves and keeps the final version
```

## Why Not Ask Codex Directly First

Codex works best when the task is already clear. For this project, many changes affect learning flow, JSON formats, and frontend behavior. A planning step helps avoid accidental rewrites or format mismatches.

## Codex Task Brief Template

Use this format when giving work to Codex:

```markdown
# Task

## Goal
Describe the intended result.

## Scope
List files or folders that may be changed.

## Do Not Change
List files, formats, or functions that must remain unchanged.

## Requirements
Detailed bullet points.

## Validation
How to check the result manually or with tests.

## Notes
Any project-specific constraints.
```

## Safety Rules

Codex must not commit or expose:

```text
backend/config.json
.env
.env.*
API keys
passwords
tokens
```

Codex should not rewrite the whole project unless explicitly requested.

## First Cleanup Phase Rules

During the current cleanup phase:

- Do not add new教材.
- Do not change existing JSON formats.
- Do not remove working pages.
- Do not migrate away from Azure code yet.
- Only document, secure, and prepare the project for future work.

## Future Content Generation Rule

When adding new教材 later, prefer:

```text
Generate JSON → save under frontend/data/ → website reads static JSON
```

rather than adding live API calls.
