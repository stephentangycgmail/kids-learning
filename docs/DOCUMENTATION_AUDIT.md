# Documentation Audit

> **Historical snapshot:** This audit records repository state and findings at
> the baseline below. It is evidence, not the current governance or task
> authority. Use root [`AGENTS.md`](../AGENTS.md) for AI instructions and the
> current documents linked from [`README.md`](../README.md) for active rules.

Audit date: 2026-07-26

Audit baseline:

- Repository: `stephentangycgmail/kids-learning`
- Branch: `develop`
- Commit: `930231ce82079ee2a8c0de049cddd7a5971b8298`
- Production branch: `main`
- Production commit: `a3c661012c16a3215cc9d3c52c4eb34a376ff41f`

## Executive Summary

- Documentation completeness: **76%**
- Overall result: **ACTION REQUIRED**
- Markdown documents reviewed: **45**
- Broken relative Markdown links: **0**
- Missing local HTML asset references: **2**
- Registered screenshots or Markdown image references: **0**
- Highest priority: **P1**
- Estimated total documentation effort: **Medium to Large**

The repository has a strong current documentation core. `AGENTS.md`,
`README.md`, `MASTER_TASK.md`, `TECHNICAL_OVERVIEW.md`,
`DEPLOYMENT_GUIDE.md`, `CONTENT_STANDARD.md`, and the Grammar Practice
development guide broadly match the static GitHub Pages implementation.
Automated JSON, Markdown, and Grammar Practice validation also passes.

The main risks are release identity drift, stale backend/Docker documentation,
two missing stylesheet references in current pages, outdated historical
documents that are not always clearly separated from current instructions,
and missing release/build/user documentation.

The completeness percentage is a qualitative coverage score across the
requested documentation areas: repository identity, structure, implementation,
content rules, build, deployment, tests, GitHub Pages, releases, AI workflow,
business rules, links, historical-document control, user guidance, and
configuration/security.

## Repository Standards

The audit treated these files as authoritative:

- `AGENTS.md`
- `README.md`

These optional standards are not present:

- `PROJECT_INDEX.md`
- `VERSION_MANAGEMENT.md`
- `WORKSPACE_GUIDE.md`

`docs/VERSIONING.md` exists, but it governs future Lesson Package content
versions rather than repository releases, Git tags, GitHub Releases, or
deployed application versions.

## Files Reviewed

### Root

- `AGENTS.md`
- `README.md`

### Current and supporting documentation

- `docs/API_DEPENDENCY_AUDIT.md`
- `docs/BUG_TRACKER.md`
- `docs/CHANGELOG.md`
- `docs/CODEX_PLAYBOOK.md`
- `docs/CODEX_WORKFLOW.md`
- `docs/CONTENT_GENERATION_PLAN.md`
- `docs/CONTENT_STANDARD.md`
- `docs/DATA_LIFECYCLE.md`
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/DEVELOPMENT_GUIDE.md`
- `docs/FOLDER_STRUCTURE.md`
- `docs/INDEX_STANDARD.md`
- `docs/JSON_SPECIFICATION.md`
- `docs/LESSON_PACKAGE_STANDARD.md`
- `docs/MASTER_TASK.md`
- `docs/METADATA_STANDARD.md`
- `docs/NAMING_STANDARD.md`
- `docs/PROJECT_DASHBOARD.md`
- `docs/PROJECT_MASTER_PLAN.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/project-structure.md`
- `docs/RELEASE_NOTES.md`
- `docs/ROADMAP.md`
- `docs/SPRINT_1_REPORT.md`
- `docs/SPRINT_2_REPORT.md`
- `docs/SYSTEM_ARCHITECTURE_V1.md`
- `docs/TECHNICAL_OVERVIEW.md`
- `docs/TEST_PLAN.md`
- `docs/TTS_SPECIFICATION.md`
- `docs/VERSIONING.md`

### Task, development, and review documentation

- `docs/CODEX_TASKS/001_DISABLE_AI_TEACHER.md`
- `docs/CODEX_TASKS/002_STATIC_GITHUB_PAGES_MIGRATION.md`
- `docs/CODEX_TASKS/003_CONTENT_ARCHITECTURE.md`
- `docs/development/catalog-generator.md`
- `docs/development/grammar-practice.md`
- `docs/development/grammar-practice-manual-test.md`
- `docs/review/EPIC-002-M1-Baseline.md`

### Specifications

- `.specs/EPIC-002/BUGFIX-Resume-From-Current-Word.md`
- `.specs/EPIC-002/M2-Lesson-Catalog.md`
- `.specs/EPIC-002/M3-Catalog-Generator.md`
- `.specs/EPIC-002/M4-Settings-Persistence.md`
- `.specs/EPIC-002/M5-Play-Button-Label-Fix.md`
- `.specs/EPIC-002/M6-Speech-API-Fallback.md`

### Implementation and operational evidence

The audit also inspected:

- all tracked repository paths and the current folder structure;
- all student-facing HTML, CSS, JavaScript, and static JSON paths;
- the root redirect and `frontend/service-worker.js`;
- Dictation, Grammar, Vocabulary, AI Teacher, and Grammar Practice behavior;
- all three content catalogs/manifests and their referenced files;
- local tools under `tools/`;
- tests under `tests/`;
- `.github/workflows/validate-json.yml`;
- `.github/workflows/check-markdown-links.yml`;
- `Dockerfile`, `.gitignore`, `backend/requirements.txt`, and
  `backend/config.example.json`;
- Git branches, history, the `v1.0.0` tag, and GitHub release state;
- GitHub Pages source, latest build, and deployment metadata.

## Verification Results

| Area | Result | Notes |
| --- | --- | --- |
| Current implementation | **Partial** | Current core docs match the static runtime; several historical/API documents do not match tracked files. |
| Folder structure | **Partial** | Core structure is accurate, but `.specs/` is omitted and backend inventories name removed files. |
| Build process | **Action required** | GitHub Pages needs no application build, but the tracked Dockerfile cannot start because `backend/kids_ai_teacher.py` is absent. |
| Deployment process | **Pass** | Pages is configured from `main` at `/`; latest recorded build succeeded. |
| Tests | **Partial** | Grammar Practice tests are accurate and pass; the general manual test plan is incomplete and stale. |
| GitHub Pages | **Pass with limitation** | GitHub API reports a built public site from `main`; direct HTTP smoke testing was unavailable in this audit environment. |
| Release status | **Action required** | Tag, deployment, dates, and post-tag feature state are not clearly separated. |
| AI workflow | **Pass with duplication** | Rules are consistent but spread across four overlapping documents. |
| Business rules | **Pass** | Static-first hosting, reviewed JSON, stable catalogs, disabled AI Teacher, and secret handling are consistent. |
| Markdown links | **Pass** | All relative Markdown links resolve. |
| Obsolete documents | **Action required** | Several old plans, tasks, and baseline reviews need explicit historical status or archival treatment. |
| Duplicate documents | **Warning** | Some duplication is intentional compatibility; other governance/planning overlap should be consolidated. |
| Release claims | **Action required** | Some claims lack a release manifest or retained test evidence. |
| Screenshots | **N/A** | No image assets or Markdown screenshot references exist. |
| Missing documentation | **Action required** | Repository release policy, release manifest, user guide, build/local-run guide, and current test evidence are absent or incomplete. |

## P1 Findings

### P1-1: Release identity and evidence are inconsistent

The immutable `v1.0.0` tag points to commit
`c2cbcba61a680c809ad31c9f7696f74318dee7a4` and was created on 2026-07-03.
The current GitHub Pages deployment is from later `main` commit
`a3c661012c16a3215cc9d3c52c4eb34a376ff41f`, deployed on 2026-07-17.
Grammar Practice was added after the tag.

`docs/CHANGELOG.md` labels 2026-07-18 as the v1.0.0 production release and
combines later production state with the earlier tag. No GitHub Release exists.
The tag is a valid ancestor of current `main`, but the documentation does not
clearly distinguish:

- the tagged v1.0.0 baseline;
- later untagged maintenance/features on `main`;
- the currently deployed Pages commit.

The changelog and release notes also claim completed manual desktop/mobile
testing, while the repository contains only an unchecked manual test checklist
and no dated release test record.

**Recommendation:** Confirm the intended version of the current deployed
commit. Then synchronize `README.md`, `AGENTS.md`, `MASTER_TASK.md`,
`PROJECT_DASHBOARD.md`, `CHANGELOG.md`, and `RELEASE_NOTES.md`. Add a repository
release policy and a release manifest containing tag, commit, deployment,
validation, known limitations, and rollback baseline.

**Estimated effort:** Medium, plus user confirmation.

### P1-2: Legacy backend and Docker documentation does not match tracked files

`docs/SYSTEM_ARCHITECTURE_V1.md` and `docs/API_DEPENDENCY_AUDIT.md` inventory:

- `backend/kids_ai_teacher.py`
- `backend/build_sentences_and_vocab_ai_azure.py`
- `backend/build_tenses_examples_azure.py`

None of these files exists in the current repository. The tracked `Dockerfile`
still runs `uvicorn kids_ai_teacher:app`, so that container cannot start from
the current tracked source.

Production documentation correctly states that GitHub Pages does not use the
backend or Dockerfile. The inconsistency still makes local build and backend
instructions misleading.

**Recommendation:** Decide whether Docker/backend runtime support is retired
or whether missing local tooling should be restored in a separate code task.
Update current architecture and API audit documents to describe only tracked
files. Clearly mark the old endpoint inventory as historical evidence.

**Estimated effort:** Small for documentation, Medium if runtime restoration is
required.

### P1-3: Current pages reference a missing stylesheet

These pages reference `frontend/css/styles.css`:

- `frontend/ai_teacher.html`
- `frontend/vocab.html`

The tracked stylesheet is `frontend/css/tyles.css`. The local HTML reference
check therefore reports two missing assets. `docs/SYSTEM_ARCHITECTURE_V1.md`
also documents `styles.css`, while the Dictation baseline review documents
`tyles.css`.

This is primarily an implementation defect, so it must not be corrected in a
documentation-only task.

**Recommendation:** Confirm the intended stylesheet name, fix the runtime
references or rename the file in a tested code change, then synchronize the
architecture documentation.

**Estimated effort:** Small.

## P2 Findings

### P2-1: General testing documentation is incomplete

`docs/TEST_PLAN.md` covers only a short Dictation, Vocabulary, Grammar, and
Reading checklist. It omits:

- catalog loading and failure behavior;
- Grammar Gold Lesson navigation and quizzes;
- Grammar Practice automated commands and validation;
- AI Teacher disabled behavior;
- placeholder pages;
- root redirect and GitHub Pages subpath behavior;
- local asset/reference checks;
- release evidence recording.

The detailed Grammar Practice manual test guide is accurate but every checkbox
is currently unchecked.

**Recommendation:** Replace or expand the general test plan into a current
testing guide and add a dated test-results record for releases.

**Estimated effort:** Medium.

### P2-2: Dictation baseline review is obsolete

`docs/review/EPIC-002-M1-Baseline.md` says Dictation uses a hard-coded
`DICTATION_FILES` list. The current page loads `frontend/data/catalog.json`.
The review also repeats old technical-debt findings already resolved by later
EPIC-002 specifications.

**Recommendation:** Mark the document with its reviewed commit/date and a
prominent historical notice, or move it to a clearly indexed historical area.
Link to the current technical overview and catalog specification.

**Estimated effort:** Small.

### P2-3: Planning and task status has drifted

`docs/ROADMAP.md`, `docs/PROJECT_MASTER_PLAN.md`, and
`docs/CODEX_TASKS/003_CONTENT_ARCHITECTURE.md` describe governance, validation,
and index work as future or required even though parts are complete and the
current runtime uses specific catalogs rather than the five proposed index
files.

The documents do not consistently state whether tasks are completed,
superseded, partially implemented, or intentionally deferred.

**Recommendation:** Make `ROADMAP.md` the current planning authority. Mark
completed/superseded task briefs as historical and reconcile the Lesson Package
index plan with the current catalog architecture.

**Estimated effort:** Medium.

### P2-4: Bug status conflicts with the dashboard

`docs/PROJECT_DASHBOARD.md` says no open bugs are documented.
`docs/BUG_TRACKER.md` contains BUG-001 with status `Fixed (Pending
Verification)` and unchecked regression steps.

**Recommendation:** Confirm verification status and align both documents.

**Estimated effort:** Small, with user verification.

### P2-5: No student/parent user guide

README describes the repository, but there is no consolidated guide for:

- navigating student modules;
- supported and placeholder areas;
- Dictation and Grammar controls;
- browser speech limitations;
- Grammar Practice history and local-only storage;
- clearing local data safely;
- accessibility/browser expectations.

**Recommendation:** Add `docs/USER_GUIDE.md` after current workflows are
verified.

**Estimated effort:** Medium.

### P2-6: No current build/local-run guide

The production application has no compile/build step, but this is not stated in
a dedicated build guide. Local static-server commands, supported runtimes for
tests/tools, and the retired/broken Docker boundary are not documented in one
place.

**Recommendation:** Add `docs/BUILD_GUIDE.md` or a concise build/local-run
section to `DEVELOPMENT_GUIDE.md`.

**Estimated effort:** Small.

## P3 Findings

### P3-1: Governance and AI workflow are duplicated

`AGENTS.md`, `docs/CODEX_PLAYBOOK.md`, `docs/CODEX_WORKFLOW.md`, and
`docs/DEVELOPMENT_GUIDE.md` repeat branch, security, static-hosting,
documentation, and validation rules.

The rules are broadly consistent, but future drift is likely.

**Recommendation:** Keep `AGENTS.md` authoritative, retain task workflow in
`CODEX_WORKFLOW.md`, retain contributor workflow in `DEVELOPMENT_GUIDE.md`,
and reduce `CODEX_PLAYBOOK.md` to project-specific implementation guidance.

**Estimated effort:** Small to Medium.

### P3-2: Planning and status documents overlap

`MASTER_TASK.md`, `PROJECT_MASTER_PLAN.md`, `PROJECT_DASHBOARD.md`, and
`ROADMAP.md` repeat vision, status, priorities, and future work.

**Recommendation:** Define one authority for each purpose:

- `MASTER_TASK.md`: durable product constraints;
- `PROJECT_DASHBOARD.md`: current status;
- `ROADMAP.md`: future priorities;
- archive or retire `PROJECT_MASTER_PLAN.md`.

**Estimated effort:** Small.

### P3-3: Duplicate project-structure compatibility files

`docs/PROJECT_STRUCTURE.md` and `docs/project-structure.md` contain the same
redirect to `FOLDER_STRUCTURE.md`. This duplication is explicitly described as
historical compatibility and is not currently harmful.

**Recommendation:** Keep both only while external references require them;
otherwise deprecate one with a documented transition.

**Estimated effort:** Trivial.

### P3-4: Configuration documentation is implicit

Security rules and `backend/config.example.json` are documented in several
places, but there is no concise current configuration guide explaining:

- production requires no configuration;
- backend configuration is local-only and currently has no tracked runtime;
- Grammar Practice and Dictation preferences use browser storage;
- clearing browser data removes local history/settings.

**Recommendation:** Add a short `docs/CONFIGURATION.md` or consolidate this
material into the user and development guides.

**Estimated effort:** Small.

## Missing Documents

| Document | Priority | Reason | Estimated effort |
| --- | --- | --- | --- |
| Repository release/version policy | P1 | Existing `VERSIONING.md` covers future content packages only. | Small |
| `RELEASE_MANIFEST.md` | P1 | Needed to reconcile tag, commit, Pages deployment, tests, and rollback. | Small |
| Current release test evidence | P2 | Manual completion claims have no retained dated evidence. | Small |
| `USER_GUIDE.md` | P2 | No consolidated student/parent workflow guide. | Medium |
| Build/local-run guide | P2 | Static no-build process and broken/retired Docker boundary are unclear. | Small |
| Configuration guide | P3 | Production, local backend, and browser-storage configuration is fragmented. | Small |

`PROJECT_INDEX.md` and `WORKSPACE_GUIDE.md` are not required for this
single-project repository unless a future repository standard explicitly
adopts them.

## Outdated or Misleading Documents

| Document | Issue | Priority |
| --- | --- | --- |
| `docs/SYSTEM_ARCHITECTURE_V1.md` | Removed backend files, old Grammar data path, and stale page/file observations. | P1 |
| `docs/API_DEPENDENCY_AUDIT.md` | Endpoint inventory depends on a missing backend module. | P1 |
| `docs/CHANGELOG.md` | Release date/state is blurred with post-tag deployment. | P1 |
| `docs/RELEASE_NOTES.md` | Does not distinguish tagged baseline from later untagged production changes. | P1 |
| `docs/review/EPIC-002-M1-Baseline.md` | Hard-coded Dictation list and resolved debt are no longer current. | P2 |
| `docs/TEST_PLAN.md` | Does not cover the current application or release checks comprehensively. | P2 |
| `docs/PROJECT_MASTER_PLAN.md` | Sprint plan overlaps newer governance and status documents. | P2 |
| `docs/CODEX_TASKS/003_CONTENT_ARCHITECTURE.md` | Proposed indexes are absent and task status is unclear. | P2 |
| `docs/ROADMAP.md` | Some Version 2 outcomes are already complete but remain presented as future priorities. | P2 |
| `docs/BUG_TRACKER.md` / `docs/PROJECT_DASHBOARD.md` | Pending verification conflicts with “no open bugs.” | P2 |

Historical sprint reports and completed task briefs are useful evidence and
should not be deleted merely because they describe an older state. They should
be dated, labeled historical/completed, and excluded from current operational
authority.

## Broken Links and References

### Markdown

- Relative Markdown links checked: all links in 45 Markdown files.
- Broken relative Markdown links: **0**.

### Runtime local references

- `frontend/ai_teacher.html` -> missing `css/styles.css`
- `frontend/vocab.html` -> missing `css/styles.css`

All Dictation and Grammar catalog targets exist:

- Dictation catalog entries: 2 of 2
- Grammar catalog entries: 8 of 8
- Grammar Practice bank references: 2 of 2

## Duplicate Documentation

### Intentional compatibility duplication

- `docs/PROJECT_STRUCTURE.md`
- `docs/project-structure.md`

Both point to the canonical `docs/FOLDER_STRUCTURE.md`.

### Consolidation recommended

- AI workflow: `AGENTS.md`, `CODEX_PLAYBOOK.md`, `CODEX_WORKFLOW.md`,
  `DEVELOPMENT_GUIDE.md`
- Product planning/status: `MASTER_TASK.md`, `PROJECT_MASTER_PLAN.md`,
  `PROJECT_DASHBOARD.md`, `ROADMAP.md`
- Historical architecture/API material overlaps current
  `TECHNICAL_OVERVIEW.md`

## Screenshots and Visual Instructions

- Repository image files found: **0**
- Markdown image references found: **0**
- Outdated screenshots found: **0**

Visual screenshot currency could therefore not be assessed. Current manual test
guidance describes responsive checks but provides no retained visual evidence.

## Validation Executed

| Check | Result |
| --- | --- |
| Node Grammar Practice tests | **14 passed** |
| Python Grammar Practice tests | **5 passed** |
| Grammar Practice bank validator | **630 valid; 0 errors; 0 warnings** |
| Repository JSON parsing | **27 files passed** |
| Markdown relative-link workflow equivalent | **45 files passed** |
| Dictation catalog targets | **2 of 2 exist** |
| Grammar catalog targets | **8 of 8 exist** |
| Local HTML asset references | **Failed: 2 missing stylesheet targets** |
| GitHub Pages configuration | **Built, public, HTTPS, source `main` at `/`** |
| Latest GitHub Pages build | **Succeeded for production commit `a3c6610`** |
| Direct production HTTP smoke test | **Not executed: audit environment returned HTTP `000` / blocked direct page access** |
| GitHub Release lookup | **No GitHub Release found** |
| Markdown linter | **Not available as a repository tool** |

## Recommended Update Order

1. **P1:** Confirm the intended version/release identity of current production.
2. **P1:** Add repository release policy and release manifest; synchronize
   release-facing documents.
3. **P1:** Decide whether Docker/backend runtime is retired or restored, then
   correct architecture and API documentation.
4. **P1:** Fix the missing stylesheet references in a separate tested code
   change and synchronize file-name documentation.
5. **P2:** Replace the incomplete general test plan and add dated validation
   evidence.
6. **P2:** Mark stale baseline reviews, sprint plans, and task briefs as
   historical, completed, superseded, or deferred.
7. **P2:** Reconcile bug verification and dashboard status.
8. **P2:** Add user and build/local-run guidance.
9. **P3:** Consolidate AI workflow, planning, and configuration duplication.

## Estimated Effort

| Workstream | Effort |
| --- | --- |
| Release identity and evidence | Medium |
| Backend/Docker documentation decision | Small documentation effort; Medium if code restoration is chosen |
| Runtime stylesheet correction | Small code task |
| Testing documentation and evidence | Medium |
| Historical-document classification | Medium |
| User/build/configuration guides | Medium |
| Governance and planning consolidation | Small to Medium |

Overall documentation effort: **Medium to Large**, mainly because release and
legacy-runtime decisions require confirmation rather than inference.

## Synchronization Follow-up

Documentation synchronization was performed from this audit under these
confirmed constraints:

- historical backend documentation was retained and labeled;
- current architecture was separated from historical architecture;
- Docker status was documented without deciding whether support is retired;
- the missing stylesheet references remain an explicit deferred
  implementation bug;
- the `v1.0.0` tag and Git history were not changed or redefined;
- the current later Pages deployment was documented as untagged.

Documentation work completed:

- repository release policy and verified release/deployment manifest;
- user, build/local-run, configuration, testing, and validation-evidence
  guides;
- release-note and changelog identity synchronization;
- current/historical architecture classification;
- test-plan, roadmap, task, dashboard, and bug-status synchronization;
- AI workflow and planning authority consolidation.

Intentionally deferred:

- runtime stylesheet correction;
- Docker support decision or backend restoration;
- BUG-001 manual verification;
- any new application version, tag, GitHub Release, or deployment;
- direct production browser/device acceptance evidence not actually run.

## Audit Limitations

- This was a read-only implementation audit except for creating this report.
- No source, tests, workflow, configuration, or existing documentation file
  was modified.
- The audit used the checked-out `develop` branch for current repository
  documentation and compared it with `origin/main` for production state.
- GitHub API evidence confirmed Pages configuration and the latest successful
  build, but direct browser/HTTP smoke testing was blocked in the audit
  environment.
- Manual desktop, tablet, mobile, speech, and visual behavior was not rerun.
- No screenshots exist to validate visually.
- No live backend or Azure service was accessed.
