# Changelog

Release identity and deployment evidence are maintained in
[`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md).

## 2026-07-17 - Untagged Production Deployment

### Deployed

- Deployed `main` commit `a3c6610` to GitHub Pages.
- Included Offline English Grammar Practice changes made after the `v1.0.0`
  tag.
- Preserved static production without Azure, FastAPI, backend APIs, login, or
  `/api/health`.

### Notes

- This deployment is not represented by a later release tag.
- No new version or GitHub Release is inferred.

## 2026-07-17 - Offline English Grammar Practice

### Added

- Added a static English Grammar Practice module with Short & Long Answer, Sentence Rearrangement, and Mixed Practice modes.
- Added 630 validated offline questions across seven grammar categories.
- Added browser-local practice autosave, result review, and parent-friendly practice history using IndexedDB with a localStorage fallback.
- Added deterministic question generation, question-bank validation, automated tests, and a manual test checklist.

### Notes

- The feature uses committed JSON files and does not require an API, backend service, login, or new Service Worker.
- Historical project notes reported manual desktop and mobile testing before
  deployment. A dated retained manual test record is not present in the
  repository.

## 2026-07-03 - v1.0.0 Tagged Baseline

### Released

- Created the immutable `v1.0.0` tag at commit `c2cbcba`.
- Confirmed GitHub Pages static hosting from `main`.
- Confirmed production did not require Azure, FastAPI, backend APIs, login, or
  `/api/health`.

### Notes

- No GitHub Release is present for this tag.
- Later production changes do not alter the tagged commit.
- The project moved into maintenance-oriented development after this baseline.

## 2026-07-16 - Grammar Gold Lessons and Acceptance Fixes

### Added

- Added catalog-driven Grammar Gold Lessons for core Primary 4 grammar topics.
- Added optional 5-question quizzes to supported Grammar lessons.
- Added Grammar lesson navigation and Dictation deep-link support.

### Fixed

- Refined English Dictation resume behavior and Speech API fallback.
- Fixed Chinese Dictation pause/resume behavior during acceptance testing.
- Improved Grammar page layout for normal browser scrolling.

## 2026-06-30 - Epic001-G3 Automation and Quality Gate

### Added

- Added `.github/workflows/validate-json.yml` to parse repository JSON files on pull requests and pushes to `main` or `develop`.
- Added `.github/workflows/check-markdown-links.yml` to check local Markdown links on pull requests and pushes to `main` or `develop`.

### Notes

- Automation-only milestone.
- No website UI, learning functionality, frontend runtime, backend code, or lesson content changes were intended.

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

## 2026-06-30 - Epic001-G1 Governance Foundation

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
- No frontend, backend, CSS, JavaScript, JSON, lesson content, or GitHub Pages runtime changes were intended.

## 2026-06-29 - Initial Documentation Cleanup

### Added

- Added project documentation structure under `docs/`.
- Added `README.md` project overview.
- Confirmed `.gitignore` protects local configuration and generated files.
- Confirmed `backend/config.example.json` exists as a safe template without secrets.

### Notes

- Existing website behavior was not intentionally changed.
- No new learning content was added in this cleanup phase.
- Live API-based content generation was planned to be replaced gradually by reviewed static JSON files.
