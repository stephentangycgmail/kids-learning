# Master Task

This is the highest-level project specification for `stephentangycgmail/kids-learning`.

## Project Vision

Kids Learning is a long-term educational platform for child-friendly learning activities. The project should stay simple to host, easy to maintain, and safe for students to use without live backend services.

The platform should grow through reviewed lesson content, predictable page behavior, and clear project governance.

## Platform Philosophy

1. Static-first: student-facing pages should work on GitHub Pages.
2. Local-first tooling: backend scripts may exist for local generation, validation, or maintenance.
3. Reviewed content: lesson materials should be committed as reviewed JSON under `frontend/data/`.
4. Backward compatibility: existing pages, layouts, JSON schemas, and lesson files should not be changed casually.
5. No student-facing paid API dependency: students should not need FastAPI, Azure OpenAI, Azure Speech, or any backend API during normal use.

## Repository Structure

```text
kids-learning/
+-- frontend/      # Student-facing static website
+-- backend/       # Legacy/local-only tooling and generated output
+-- docs/          # Governance, architecture, workflow, and planning docs
+-- index.html     # GitHub Pages redirect to frontend/index.html
+-- README.md      # Project overview and documentation index
+-- Dockerfile     # Existing container configuration
`-- .gitignore     # Secret and generated-file protection
```

## Folder Structure

The canonical folder reference is [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md).

High-level rules:

- Keep student-facing HTML, CSS, JavaScript, and JSON in `frontend/`.
- Keep reviewed learning JSON in `frontend/data/`.
- Keep local-only backend tooling in `backend/`.
- Keep project governance and planning documents in `docs/`.
- Do not add secrets, API keys, or local-only config to the repository.

## Development Workflow

The standard workflow is:

1. Analyze the current repository and documentation.
2. Plan the change before editing.
3. Implement the smallest reviewable change.
4. Validate that static GitHub Pages behavior still works.
5. Report changed files, validation, risks, and follow-up recommendations.

See [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for branch, review, and release workflow.

## GitHub Workflow

Preferred workflow for normal development:

1. Create a feature branch from `main`.
2. Make a focused change.
3. Validate locally.
4. Open a pull request with a concise summary and checklist.
5. Review docs, runtime behavior, and static-hosting compatibility.
6. Merge after approval.

Commit messages should be clear and milestone-oriented when applicable, for example:

```text
Epic 001 - Milestone 1 Project Governance
```

## Lesson Package Overview

A Lesson Package is the long-term unit for shipping reviewed learning content.

Expected package elements:

- Lesson metadata.
- Student-facing activity data.
- Vocabulary or grammar support data.
- Review checklist.
- Validation result.
- Notes about which page or module consumes the data.

Lesson Packages should preserve existing JSON schemas unless a schema change is explicitly planned and documented.

## Content Factory Overview

The Content Factory is the future workflow for creating, reviewing, validating, and publishing learning materials.

Target flow:

```text
Draft content
  -> generate or edit JSON
  -> validate JSON
  -> review educational quality
  -> commit under frontend/data/
  -> verify static pages load the content
```

Backend or AI-assisted tools may help generate drafts, but the student website should read reviewed static JSON.

## Quality Gate

Before changes are accepted:

1. No secrets or local config are committed.
2. GitHub Pages compatibility is preserved.
3. Existing UI layout is unchanged unless the task explicitly allows it.
4. Existing JSON schemas are unchanged unless the task explicitly allows it.
5. Student-facing pages do not require backend APIs.
6. Documentation links are valid.
7. Validation results are recorded in the final report or pull request.

## Future Roadmap

The canonical roadmap is [ROADMAP.md](ROADMAP.md).

Long-term direction:

- Version 2: governance foundation and static-site stability.
- Version 2.5: content workflow and validation.
- Version 3: lesson package system and richer learning modules.
- Future: scalable educational platform features while preserving static-first operation.
