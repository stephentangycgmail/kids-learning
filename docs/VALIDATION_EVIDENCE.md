# Validation Evidence

This file records dated validation evidence. It is not a substitute for
production acceptance testing and does not retroactively prove release checks.

## 2026-07-31 v1.1.0 Release-Candidate Validation

Baseline:

- Branch: `release/kids-learning-next`
- Preparation base: `b423155acbda554b50d2c0d5d2e7302a8e5c2dd3`
- Final release and production commits: pending completion of the release gates

Results:

| Check | Result |
| --- | --- |
| Node Grammar Practice and static-site regression tests | 16 passed |
| Python Grammar Practice tests | 5 passed |
| Grammar Practice bank validator | 630 questions; 0 errors; 0 warnings |
| Repository JSON parsing | 27 files passed |
| Markdown relative-link check | 54 files passed |
| Dictation catalog targets | 2 of 2 exist |
| Grammar catalog targets | 8 of 8 exist |
| Local HTML asset check | Passed; no missing local references |
| BUG-001 browser regression | Selected start, pause/resume, Stop reset, and completion reset passed |
| Vocabulary and AI Teacher stylesheet check | `css/styles.css` loaded; no CSS 404 |
| Responsive browser smoke | 1280 px desktop and 390 px mobile passed without horizontal overflow |
| Grammar Practice browser smoke | 20-question session, submission, review, history, resume, and abandon passed |

GitHub pull-request checks, the final GitHub Pages deployment, and direct
production verification remain pending until their respective release gates.

## 2026-07-26 Documentation Audit Baseline

Baseline:

- Branch: `develop`
- Commit: `930231ce82079ee2a8c0de049cddd7a5971b8298`

Results:

| Check | Result |
| --- | --- |
| Node Grammar Practice tests | 14 passed |
| Python Grammar Practice tests | 5 passed |
| Grammar Practice bank validator | 630 questions; 0 errors; 0 warnings |
| Repository JSON parsing | 27 files passed |
| Markdown relative-link check | 45 files passed before adding the audit report |
| Dictation catalog targets | 2 of 2 exist |
| Grammar catalog targets | 8 of 8 exist |
| Local HTML asset check | 2 known missing stylesheet references |
| GitHub Pages API evidence | Latest build succeeded for `a3c6610` |
| Direct production browser/HTTP smoke | Not completed in the audit environment |
| Manual desktop/tablet/mobile acceptance | Not rerun |

Known local asset failures:

- `frontend/ai_teacher.html` -> `css/styles.css`
- `frontend/vocab.html` -> `css/styles.css`

See [`DOCUMENTATION_AUDIT.md`](DOCUMENTATION_AUDIT.md) for the full audit and
[`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md) for release/deployment context.
