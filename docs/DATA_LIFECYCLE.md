# Data Lifecycle

This document defines how learning content moves from draft to published material.

The lifecycle applies to future Lesson Packages. Existing flat JSON files remain unchanged unless a dedicated migration milestone is approved.

## 1. Create

Purpose:

- Draft new learning content.
- Decide package ID and metadata.
- Create activity JSON files only for needed modules.

Rules:

- Start with `metadata.status = "draft"`.
- Use the naming rules in [NAMING_STANDARD.md](NAMING_STANDARD.md).
- Use the metadata rules in [METADATA_STANDARD.md](METADATA_STANDARD.md).
- Do not publish unreviewed generated content.

## 2. Validate

Purpose:

- Confirm content is structurally valid and safe to publish.

Validation checks:

- JSON parses successfully.
- Required fields exist.
- IDs are stable and correctly formatted.
- Package folder name matches `metadata.id`.
- Version follows [VERSIONING.md](VERSIONING.md).
- No secrets or private data are present.
- Content is suitable for child learners.

## 3. Publish

Purpose:

- Make reviewed content available to the static website or future selectors.

Rules:

- Set `metadata.status = "published"`.
- Update relevant indexes.
- Keep paths relative and GitHub Pages compatible.
- Record validation in the pull request or final report.

## 4. Update

Purpose:

- Correct or improve published content.

Patch updates:

- Typo fixes.
- Translation fixes.
- Minor wording cleanup.

Minor updates:

- Add examples.
- Add optional fields.
- Add new reviewed activities without breaking existing consumers.

Major updates:

- Schema changes.
- Removed required fields.
- Incompatible content restructuring.

Version changes must follow [VERSIONING.md](VERSIONING.md).

## 5. Archive

Purpose:

- Keep old content available for reference while removing it from normal active use.

Rules:

- Set `metadata.status = "archived"`.
- Keep package files available unless removal is explicitly approved.
- Update indexes to show archived status or move entries to an archive index in a future milestone.

## 6. Deprecate

Purpose:

- Mark content as no longer recommended while giving future tools time to migrate away.

Rules:

- Set `metadata.status = "deprecated"`.
- Explain replacement content when available.
- Do not delete deprecated content during the same change unless explicitly approved.

## Lifecycle Status Values

Recommended values:

```text
draft
reviewed
published
archived
deprecated
```

## Deletion Rule

Published learning content should not be deleted casually. Prefer archive or deprecate first.
