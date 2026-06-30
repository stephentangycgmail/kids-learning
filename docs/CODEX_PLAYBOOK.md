# Codex Playbook

This handbook defines how Codex should operate in this repository.

## Repository Rules

1. Preserve GitHub Pages compatibility.
2. Keep student-facing runtime static unless a task explicitly approves otherwise.
3. Do not redesign UI, layout, or learning flow unless requested.
4. Do not remove backend files; treat them as legacy/local-only tooling.
5. Do not add API keys, tokens, secrets, or `backend/config.json`.
6. Keep changes small, reviewable, and scoped to the task.

## Coding Standards

- Follow existing file style and structure.
- Prefer plain HTML/CSS/JavaScript patterns already used in `frontend/`.
- Avoid new dependencies for student-facing pages unless explicitly approved.
- Use browser SpeechSynthesis for student-facing speech features.
- Keep placeholder pages simple and linked back to the appropriate menu.

## Documentation Rules

- Update documentation when project rules, workflows, folder structure, or JSON schemas change.
- Use `docs/MASTER_TASK.md` as the highest-level project specification.
- Use `docs/FOLDER_STRUCTURE.md` as the canonical folder reference.
- Keep historical sprint reports as history; avoid rewriting them as if they were current specs.
- Prefer relative Markdown links for local documentation.

## JSON Rules

- Store reviewed learning content under `frontend/data/`.
- Do not change an existing JSON schema without a task that explicitly approves it.
- Validate JSON syntax before reporting completion.
- Do not include secrets, private data, or unreviewed generated content.
- Document new JSON file patterns in `docs/JSON_SPECIFICATION.md` or a successor schema document.

## Commit Message Rules

Use concise, task-oriented commit messages.

Recommended forms:

```text
Epic 001 - Milestone 1 Project Governance
Migrate frontend to static GitHub Pages runtime
Disable AI Teacher for static site
```

Avoid vague messages such as:

```text
updates
misc fixes
stuff
```

## Testing Checklist

For documentation-only changes:

1. Confirm no runtime files changed unexpectedly.
2. Confirm required docs exist.
3. Check Markdown links.
4. Confirm repository structure is still valid.

For frontend changes:

1. Homepage loads.
2. Chinese menu loads.
3. English menu loads.
4. Linked module pages open.
5. Required JSON files load.
6. Browser console has no unexpected `/static/`, `/api/`, or backend 404 errors.
7. Speech features use browser SpeechSynthesis.

For JSON changes:

1. JSON parses successfully.
2. Consuming page can load the file.
3. Schema matches the existing frontend expectation.
4. Content is suitable for child learners.

## Pull Request Checklist

- Summary explains the purpose of the change.
- Files changed are within the requested scope.
- Validation steps are listed.
- Risks and remaining issues are disclosed.
- GitHub Pages compatibility is considered.
- No secrets or local-only files are included.

## Files Requiring Approval Before Modification

Do not modify these without explicit approval:

- `frontend/data/*.json` lesson data.
- `frontend/*.html` layout or learning flow.
- `frontend/js/*.js` runtime behavior.
- `frontend/css/*` styling.
- `backend/config.json` or any local secret file.
- Backend API behavior in `backend/`.
- Existing lesson filenames.
- Generated audio or media assets.

Documentation-only milestones may modify `docs/` and `README.md` when the task requests governance or documentation work.
