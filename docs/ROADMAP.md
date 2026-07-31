# Roadmap

This is the authority for future Kids Learning priorities. Durable product
constraints belong in [`MASTER_TASK.md`](MASTER_TASK.md); current status
belongs in [`PROJECT_DASHBOARD.md`](PROJECT_DASHBOARD.md).

## Current Phase: Maintenance

Kids Learning has a `v1.0.0` tagged baseline and a later untagged GitHub Pages
deployment. Current priorities are:

- preserve production stability and GitHub Pages compatibility;
- fix verified runtime defects through focused implementation tasks;
- improve reviewed learning content without breaking catalogs or schemas;
- maintain credible validation and release evidence;
- keep AI Teacher disabled until a separately approved design exists.

## Completed Foundation

- Static GitHub Pages student runtime.
- Root redirect and subject menus.
- English and Chinese Dictation using static JSON and browser speech.
- Catalog-driven Grammar Gold Lessons and supported quizzes.
- Offline English Grammar Practice with local history and automated tests.
- AI Teacher disabled for production.
- JSON and Markdown GitHub Actions validation.
- Repository governance, content standards, and documentation audit.
- BUG-001 Dictation resume verification and static asset regression coverage.
- Vocabulary and AI Teacher shared stylesheet path correction.

## Next Priorities

### P1: Reliability

- Preserve the verified Dictation playback-state behavior and static asset
  checks.
- Keep Docker outside supported runtime and deployment paths unless a separate
  approved task restores it.

### P2: Quality

- Expand automated/static reference coverage beyond Grammar Practice.
- Record dated browser, device, speech, and production validation evidence.
- Improve reviewed English, Chinese, and Math learning content through small,
  catalog-compatible changes.
- Improve accessibility and mobile usability without broad redesign.

### P3: Maintainability

- Continue reducing obsolete documentation after references are understood.
- Keep current architecture separate from historical backend records.
- Consolidate content-generation and review procedures as they are exercised.

## Deferred Content Package Direction

Future Lesson Packages, metadata, lifecycle states, and indexes remain a
documented design direction. They are not the current runtime model.

Any implementation must first reconcile:

- [`CONTENT_STANDARD.md`](CONTENT_STANDARD.md)
- [`LESSON_PACKAGE_STANDARD.md`](LESSON_PACKAGE_STANDARD.md)
- [`INDEX_STANDARD.md`](INDEX_STANDARD.md)
- current `catalog.json`, `grammar_catalog.json`, and
  `grammar_practice_manifest.json`

Do not create parallel indexes or migrate existing content without an approved
implementation and compatibility plan.

## Longer-Term Possibilities

- More grammar and dictation material.
- Vocabulary review modes.
- Reading comprehension.
- Phonics or pronunciation practice.
- Quiz improvements.
- Better offline/PWA behavior.
- Optional teacher/admin tooling that does not weaken the static student
  runtime.
- Carefully reviewed backend services only if static hosting no longer meets a
  clearly defined need.

## Roadmap Rules

- Prefer small, reviewable milestones.
- Do not add paid API dependencies to student-facing pages.
- Do not change JSON schemas without explicit migration planning.
- Do not redesign existing UI without a dedicated approved milestone.
- Do not treat a roadmap item as implemented until repository evidence exists.
