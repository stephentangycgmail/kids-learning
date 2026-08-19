# AI Handover

This is the fresh-session handover and resume point for Kids Learning. Read
root [`AGENTS.md`](../AGENTS.md) first, then inspect the relevant current
documentation and implementation. The repository, not prior chat or session
memory, is the source of truth.

## Project Overview and Current Version

Kids Learning is a child-friendly static website for English, Chinese, and
Math learning. It uses committed HTML, CSS, JavaScript, and reviewed JSON;
students do not need a login, production backend, Azure service, or paid API.

The current official production release is `v1.2.1`, tagged at
`d66eaf79b7c2e022a8a89eb28e6fa0b7bd56477b`. `v1.0.0` remains an immutable
prior baseline. `develop` contains the `v1.2.2` corrective Grammar navigation
release candidate. Confirm the live Git state before making release claims.

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
- Grammar lesson tabs wrap at constrained widths so Question Words and
  Quantifiers do not displace the Quiz or Dictation actions; the navigation
  layout has been smoke-tested at desktop and 390px mobile widths.
- Choice Grammar Practice uses `frontend/grammar_practice_choice.html`,
  `frontend/js/grammar_practice_choice.js`, and
  `frontend/data/grammar_practice_choice.json`.
- `backend/` and the Dockerfile are not the production path. Docker support is
  undecided because its referenced application module is absent.

## Grammar Question Words and Quantifiers

Question Words and Quantifiers are production Grammar lessons and choice-based
Grammar Practice topics. The former Preview page and assets are retired.

- **Question Words:** eight visual learning cards for What, Who, Where, When,
  Why, Which, Whose, and How, plus a 50-question UAT bank with unique IDs and
  concise Traditional Chinese explanations. The lesson includes an 8-question
  guided mini-practice and choice Practice / Quiz modes.
- **Quantifiers:** six visual learning cards for `some`, `any`, `a few`, `a
  little`, `many`, and `much`; `a lot of`, `few`, and `little` are not preview
  target items. Its 54-question bank includes six Countable / Uncountable
  questions. It introduces countable versus uncountable nouns and compares the
  same large glass at 18% water for `a little` and 85% water for `much`. A
  lesson includes the same visual teaching, an 8-question guided mini-practice,
  and choice Practice / Quiz modes.
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
  different feature. `tests/grammar_practice_choice_validation.js` validates
  bank IDs and required coverage; rendered browser behavior remains a smoke
  check.

## Practice and History Storage

Released Grammar Practice stores sessions primarily in IndexedDB database
`kidsLearningGrammarPractice`, with localStorage fallback key
`kidsLearning.grammarPractice.sessions.v1`. Choice completion uses the same
history and stores mode, topic, completion time, score, total, and percentage
where applicable. Existing 20-question records remain compatible; choice
Practice uses 12 questions and choice Quiz uses 10. Clearing browser site data
removes these local records; no history is sent to a server.

## Current Resume Point

Question Words and Quantifiers Phase 3 was released as `v1.2.0`. Resume normal
maintenance from the current `develop` state.

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
