# Roadmap

This roadmap organizes long-term platform work by version. It should guide planning without forcing large rewrites.

## Version 2 - Static Platform Foundation

Goal: make the existing student website stable, maintainable, and safe as a static GitHub Pages platform.

Priorities:

- Preserve current student-facing behavior.
- Keep GitHub Pages compatibility.
- Keep backend tooling local-only.
- Establish project governance documents.
- Maintain static JSON learning content under `frontend/data/`.
- Keep AI Teacher disabled until a reviewed design exists.
- Add validation practices for documentation, JSON, and static pages.

Expected outcomes:

- Clear repository rules.
- Clear development workflow.
- Canonical folder structure.
- Stable documentation baseline.
- No student-facing backend dependency.

## Version 2.5 - Content Factory and Quality Gates

Goal: create a repeatable workflow for producing, reviewing, validating, and publishing lesson content.

Priorities:

- Define Lesson Package structure.
- Expand JSON schema documentation.
- Add content review checklists.
- Add JSON validation scripts or documented validation commands.
- Separate draft/generated content from reviewed published content.
- Document how Codex or ChatGPT should help create content safely.

Expected outcomes:

- Reviewed lesson content workflow.
- Lower risk of malformed JSON.
- Better traceability for content changes.
- Clear approval path for new learning materials.

## Version 3 - Learning Platform Expansion

Goal: expand learning modules while preserving the static-first architecture.

Potential areas:

- More grammar modules.
- Improved dictation selection.
- Vocabulary review modes.
- Reading comprehension.
- Phonics or pronunciation practice.
- Quiz improvements.
- Progress-friendly UX that can still work without a backend.

Expected outcomes:

- Richer learning experience.
- More reusable lesson package patterns.
- Better content organization.
- Continued GitHub Pages compatibility.

## Future

Longer-term possibilities:

- Optional local tooling for content generation and validation.
- Optional teacher/admin workflows that do not affect student static runtime.
- Better offline/PWA behavior.
- Custom domain and deployment monitoring.
- Accessibility and mobile usability improvements.
- Carefully reviewed backend services only if static hosting can no longer meet a clearly defined need.

## Roadmap Rules

- Do not trade maintainability for speed.
- Do not add paid API dependencies to student-facing pages.
- Do not change JSON schemas without explicit migration planning.
- Do not redesign existing UI without a dedicated approved milestone.
- Prefer small, reviewable milestones.
