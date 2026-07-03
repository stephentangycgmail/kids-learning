# Changelog

## 2026-06-30 - Epic001-G3 Automation and Quality Gate

### Added

- Added `.github/workflows/validate-json.yml` to parse repository JSON files on pull requests and pushes to `main` or `develop`.
- Added `.github/workflows/check-markdown-links.yml` to check local Markdown links on pull requests and pushes to `main` or `develop`.

### Notes

- Automation-only milestone.
- No website UI, learning functionality, frontend runtime, backend code, or lesson content changes are intended.

## 2026-06-30 - Epic001-G2 Content Standards

### Added

- Added `docs/LESSON_PACKAGE_STANDARD.md` for future lesson package structure.
- Added `docs/METADATA_STANDARD.md` for package metadata fields.
- Added `docs/INDEX_STANDARD.md` for future package discovery indexes.
- Added `docs/NAMING_STANDARD.md` for future IDs, folders, files, and indexes.
- Added `docs/DATA_LIFECYCLE.md` for create, validate, publish, update, archive, and deprecate flow.
- Added `docs/VERSIONING.md` for semantic versioning rules.

### Changed

- Expanded `docs/JSON_SPECIFICATION.md` from a placeholder into common JSON principles and future package rules.
- Updated `README.md` documentation index with content standards.

### Notes

- Documentation-only milestone.
- Existing JSON files, lesson content, frontend code, backend code, and GitHub Pages behavior were not modified.

## 2026-06-30

### Added

- Added `docs/MASTER_TASK.md` as the highest-level project specification.
- Added `docs/CODEX_PLAYBOOK.md` for Codex operating rules.
- Added `docs/FOLDER_STRUCTURE.md` as the canonical repository structure reference.
- Added `docs/DEVELOPMENT_GUIDE.md` for branch, feature, review, and release workflow.
- Added `docs/RELEASE_NOTES.md` for milestone history.

### Changed

- Updated `docs/ROADMAP.md` into Version 2, Version 2.5, Version 3, and Future planning.
- Updated project-structure documents to point to the canonical folder structure document.

### Notes

- Documentation-only milestone.
- No frontend, backend, CSS, JavaScript, JSON, lesson content, or GitHub Pages runtime changes are intended.

## 2026-06-29

### Added

- Added project documentation structure under `docs/`.
- Added `README.md` project overview.
- Confirmed `.gitignore` protects local configuration and generated files.
- Confirmed `backend/config.example.json` exists as a safe template without secrets.

### Notes

- Existing website behavior was not intentionally changed.
- No new learning content was added in this cleanup phase.
- Live API-based content generation is planned to be replaced gradually by reviewed static JSON files.
