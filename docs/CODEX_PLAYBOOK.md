# Codex Implementation Playbook

This playbook contains project-specific implementation guidance. Root
[`AGENTS.md`](../AGENTS.md) is authoritative for Git, scope, security,
validation honesty, and release/deployment authorization.

The standard task sequence is maintained in
[`CODEX_WORKFLOW.md`](CODEX_WORKFLOW.md). Contributor and branch workflow is in
[`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md).

## Static Runtime Rules

- Preserve GitHub Pages compatibility.
- Keep student-facing runtime static unless an approved architecture task says
  otherwise.
- Prefer existing plain HTML, CSS, JavaScript, and JSON patterns.
- Do not add live API dependencies or production backend requirements without
  explicit approval.
- Keep AI Teacher disabled until a reviewed implementation task changes that
  decision.
- Use browser SpeechSynthesis for existing speech features.

## Content Rules

- Store reviewed learning content under `frontend/data/`.
- Follow [`CONTENT_STANDARD.md`](CONTENT_STANDARD.md).
- Preserve existing schemas, IDs, paths, and filenames unless a migration is
  approved.
- Update the relevant catalog or manifest when catalog-driven files change.
- Validate JSON and consuming-page behavior.
- Do not commit unreviewed generated content.

## Frontend Rules

- Preserve current learning flow and layout unless the task requests a design
  change.
- Keep placeholder pages linked and explicit.
- Test relative paths under the GitHub Pages repository subpath.
- Check browser speech fallbacks for affected pages.
- Do not claim a clean static-reference check while the known
  `css/styles.css` defect remains.

## Tool and Test Rules

- Prefer standard-library tools already used in `tools/`.
- Avoid new dependencies unless approved and documented.
- Add or update tests when shared behavior, storage, scoring, generation, or
  validation changes.
- Use [`TESTING_GUIDE.md`](TESTING_GUIDE.md) for commands and evidence.

## Documentation Rules

- Current architecture: [`TECHNICAL_OVERVIEW.md`](TECHNICAL_OVERVIEW.md)
- Historical architecture:
  [`SYSTEM_ARCHITECTURE_V1.md`](SYSTEM_ARCHITECTURE_V1.md)
- Current structure: [`FOLDER_STRUCTURE.md`](FOLDER_STRUCTURE.md)
- Current roadmap: [`ROADMAP.md`](ROADMAP.md)
- Release identity: [`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md)

Do not rewrite historical reports as current specifications. Add a
classification notice and point to the current authority.

## Review Checklist

- Scope matches the request.
- Runtime and data compatibility are preserved.
- Catalog references and local assets are checked.
- Required validation ran and skipped checks are explicit.
- No secrets, local config, generated output, or unrelated files are included.
- Documentation claims are supported by repository or environment evidence.
