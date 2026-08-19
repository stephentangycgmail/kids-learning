# AI Handover

This is the fresh-session handover and resume point for Kids Learning. Read
root [`AGENTS.md`](../AGENTS.md) first, then inspect the relevant current
documentation and implementation. The repository, not prior chat or session
memory, is the source of truth.

## Project Overview and Current Version

Kids Learning is a child-friendly static website for English, Chinese, and
Math learning. It uses committed HTML, CSS, JavaScript, and reviewed JSON;
students do not need a login, production backend, Azure service, or paid API.

The current official production release is `v1.1.0`, tagged at
`67bf0d38282fa50e761b7c437cc40d12ac71a8f0`. `v1.0.0` remains an immutable
prior baseline at `c2cbcba61a680c809ad31c9f7696f74318dee7a4`. Production is
stable on `main`; `develop` currently contains unreleased Grammar Preview UAT
work. Confirm the live Git state before making release claims.

## Branch Model and Deployment

- `main` is the production branch served by GitHub Pages.
- `develop` is the normal integration branch for maintenance and approved work.
- Use focused `feature/*`, `fix/*`, or `docs/*` branches when appropriate, then
  integrate through `develop`.
- Release flow is reviewed `develop -> main`, then an explicitly approved tag,
  GitHub Release, Pages verification, and production smoke test.

GitHub Pages is the only production deployment path. It serves repository-root
static content, whose root `index.html` redirects to `frontend/index.html`.
Azure, FastAPI, Docker, backend endpoints, and `/api/health` are not part of
production. Do not merge, tag, publish, or deploy without explicit user
instruction.

## Where to Start

| Need | Current authority |
| --- | --- |
| Product constraints | [`MASTER_TASK.md`](MASTER_TASK.md) |
| Current architecture and entry points | [`TECHNICAL_OVERVIEW.md`](TECHNICAL_OVERVIEW.md) |
| Student workflow | [`USER_GUIDE.md`](USER_GUIDE.md) |
| Content and JSON rules | [`CONTENT_STANDARD.md`](CONTENT_STANDARD.md) |
| Tests and evidence boundaries | [`TESTING_GUIDE.md`](TESTING_GUIDE.md) |
| Local run/build boundary | [`BUILD_GUIDE.md`](BUILD_GUIDE.md) |
| GitHub Pages deployment | [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) |
| Release identity and approval | [`RELEASE_POLICY.md`](RELEASE_POLICY.md) and [`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md) |
| Contributor workflow | [`DEVELOPMENT_GUIDE.md`](DEVELOPMENT_GUIDE.md) |
| Future priorities | [`ROADMAP.md`](ROADMAP.md) |

Historical architecture, `.specs/`, sprint reports, completed Codex tasks,
changelog entries, validation evidence, and dated audits explain prior state;
they do not silently override the current authorities above.

## Architecture and Important Files

- Root `index.html` redirects to `frontend/index.html`.
- Student pages and scripts are under `frontend/`.
- Reviewed content and catalogs are under `frontend/data/`.
- Grammar Practice behavior is split across `frontend/js/grammar_practice_*`;
  tests are under `tests/` and generation/validation tools under `tools/`.
- Released Grammar lessons use `frontend/grammar.html` and
  `frontend/data/grammar_catalog.json`.
- Grammar Preview uses `frontend/grammar_preview.html`,
  `frontend/css/grammar_preview.css`, `frontend/js/grammar_preview.js`, and
  `frontend/data/grammar_preview_topics.json`.
- `backend/` and the Dockerfile are not the production path. Docker support is
  undecided because its referenced application module is absent.

## Grammar Preview / UAT

Grammar Preview is an unreleased, UAT-only page linked from `frontend/eng.html`.
Its JSON is intentionally absent from `grammar_catalog.json`, and it does not
modify released Grammar lessons or Grammar Practice question banks.

- **Question Words:** eight visual learning cards for What, Who, Where, When,
  Why, Which, Whose, and How, plus a 50-question UAT bank with unique IDs and
  concise Traditional Chinese explanations. A production lesson is implemented
  on `develop` with visual cards and an 8-question guided mini-practice, but is
  not released to `main`.
- **Quantifiers:** six visual learning cards for `some`, `any`, `a few`, `a
  little`, `many`, and `much`; `a lot of`, `few`, and `little` are not preview
  target items. Its 54-question UAT bank includes six Countable / Uncountable
  questions. It introduces countable versus uncountable nouns and compares the
  same large glass at 18% water for `a little` and 85% water for `much`. A
  production lesson is implemented on `develop` with the same visual teaching
  and an 8-question guided mini-practice, but is not released to `main`.
- Traditional Chinese support is present for topic subtitles and introductions,
  card meanings, and examples. Visual teaching uses emoji cards plus the water
  comparison for the two uncountable-water terms.
- Practice randomly selects 12 unique questions and safely randomizes answer
  option order. It gives immediate feedback after each answer: all choices are
  locked, the correct answer is shown, an incorrect choice is marked, and the
  English/Traditional Chinese explanation is displayed before Next.
- Quiz / Challenge randomly selects 10 unique questions. It does not show
  correctness during the session; completion shows score, percentage, and a
  review of wrong answers with selected answer, correct answer, and bilingual
  explanation. The released Grammar lesson quizzes in `grammar.html` remain a
  different feature. `tests/grammar_preview_validation.js` validates bank IDs
  and required coverage; rendered browser behavior remains a UAT check.

## Practice and History Storage

Released Grammar Practice stores sessions primarily in IndexedDB database
`kidsLearningGrammarPractice`, with localStorage fallback key
`kidsLearning.grammarPractice.sessions.v1`. Preview completion is separate:
`kidsLearning.grammarPreview.progress.v2` in localStorage stores topic-scoped
session records with mode, completion time, score, total, and percentage.
Clearing browser site data removes these local records; no history is sent to a
server. Preview completion never appears in released Grammar Practice History.

## Pending UAT Work and Resume Point

The Preview page has not been accepted or released and remains available for
comparison. Phase 2 has added production Grammar lessons for Question Words
and Quantifiers on `develop`, including visual cards and guided mini-practice.
Phase 3, which would integrate the larger Preview Practice and Quiz / Challenge
flows into released Grammar, remains pending. The new lessons are not yet on
`main` or the production site.

Resume by reviewing the current `develop` diff from `main`, then test
`frontend/grammar_preview.html` with its JSON data and confirm acceptance
before proposing any production integration. Do not add preview data to
`grammar_catalog.json` or released Grammar Practice history without explicit
approval.

## Content Rules

Follow [`CONTENT_STANDARD.md`](CONTENT_STANDARD.md). Keep reviewed content in
`frontend/data/`, preserve JSON compatibility and catalog updates, use
Traditional Chinese where the current lesson family provides Chinese support,
and validate JSON after content changes.

## Validation and Delivery

Use only checks relevant to the change and report omissions. Commands and
known baseline failures are in [`TESTING_GUIDE.md`](TESTING_GUIDE.md).
Documentation changes require the Markdown-link workflow equivalent and
`git diff --check`. Content changes require JSON parsing plus applicable
catalog, generator, validator, and consumer checks. Student-facing changes
require a static-site smoke test. The existing automated suite covers released
Grammar Practice and static local paths, not Grammar Preview behavior.

Do not merge to `main`, tag, create a GitHub Release, or deploy without
explicit approval. The normal release path is reviewed `develop -> main`,
followed by Pages verification and production smoke testing.

## AI / Codex Operating Rules and Release Safety

Read `AGENTS.md` before editing, inspect applicable documentation and code,
and do not depend on chat memory. Keep documentation synchronized whenever
functionality changes. When current documentation and implementation disagree,
stop and report the evidence before making a broad change. Never put API keys,
tokens, credentials, endpoints, or secrets in this repository. No merge to
`main`, push to `main`, tag, GitHub Release, or deployment is authorized unless
the user explicitly instructs it.

## Known Boundaries

- Docker references a missing backend module and is retained as an unsupported
  legacy artifact. GitHub Pages is the only official deployment path.
- BUG-001 Dictation resume behavior was verified during `v1.1.0` release
  preparation; retain its playback-state regression coverage.
- Browser speech varies by platform and installed voices; repository tests do
  not prove production speech behavior.

When documents and implementation materially disagree, report the evidence
before changing behavior. Never infer a release, production acceptance, or
completed manual test from historical wording alone.
