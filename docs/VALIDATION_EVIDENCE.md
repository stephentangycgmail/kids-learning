# Validation Evidence

This file records dated validation evidence. It is not a substitute for
production acceptance testing and does not retroactively prove release checks.

## 2026-10-28 Untagged Darko and Appearance Dictation Deployment

This is a content maintenance deployment, not a new official release. The
release baseline remains `v1.3.1`; no version, tag, or GitHub Release was created.

- Content commit: `62be7b26172e2d9a86f6c5fd3930ab87eb1acbbe`.
- Integration: PR #19, merge `a8b076becd232a7a52f394e79f5f2d71a75b2fd2`.
- Production: PR #20, merge `79968c86353bc8da6d95e10cabd750184bff4a5d`.
- Pages run `40672993224`: build and deployment succeeded for that exact
  production commit; the Pages API also reported that commit as built.
- Scope: six approved Dr Darko / Star Diamond sentences in Dictation 01 and
  four appearance sentences in Dictation 02, Traditional Chinese translations,
  46 additional vocabulary entries, and contextual `look like` help.

| Check | Observed result |
| --- | --- |
| `git diff --check` | Passed |
| `node --test tests/grammar_practice.test.js tests/static_site.test.js tests/dictation_tts.test.js` | 30 passed, including English Dictation vocabulary coverage; rerun on integrated develop |
| `node tests/grammar_practice_choice_validation.js` | Passed: 50 Question Words and 54 Quantifiers items |
| `python -m unittest tests/test_grammar_practice_questions.py` | 5 passed |
| `python tools/validate_grammar_practice_questions.py` | 630 questions; zero errors or warnings |
| Exact embedded Node validators from the JSON and Markdown-link workflows | 30 JSON and 55 Markdown files passed |
| Content assertions | All ten English sentences exactly match the approved text; translations are nonempty; all 63 normalized words have nonempty `cn`, `usage`, and `tenses`; existing vocabulary entries are unchanged except the reviewed `like` expansion |
| GitHub JSON checks | Passed on both content PRs and production merge |
| Local Dictation browser smoke | Both lessons load; clicked vocabulary help is present |
| Production HTTP smoke | All 11 static page/catalog URLs required by DEPLOYMENT_GUIDE, plus the shared stylesheet, returned HTTP 200 |
| Production data identity | Both Dictation JSON files and `vocab_ai.json` match the parsed committed production data exactly |
| Production Dictation browser smoke | Both lessons and translations load; `diamond`, `subway`, `Who’s`, `He’s`, `like`, and `curly` show meanings, examples, and grammar notes; no Dictation console warnings or errors |
| Other production page smoke | Root redirects to subject menu; English menu, Vocabulary local word list, catalog-based Grammar lesson, Grammar Practice setup/topic banks, and disabled AI Teacher state load |

Documentation impact: content, testing, TTS, user workflow, build, and deployment
rules remain accurate; no behavior or schema changed. This dated entry records
the observed production evidence without redefining the release identity.

Limits: no real-voice listening, physical-device/mobile acceptance, or full
Grammar session acceptance was rerun. The unchanged Vocabulary page emits its
existing Tailwind CDN production-use warning. GitHub Pages also reports
platform Node-runtime/runner migration annotations; its build and deployment
nevertheless succeeded. No application code or dependency was changed to
address these unrelated warnings.

## 2026-07-31 v1.1.0 Release Validation

Baseline:

- Branch: `release/kids-learning-next`
- Preparation base: `b423155acbda554b50d2c0d5d2e7302a8e5c2dd3`
- Release and production commit: `67bf0d38282fa50e761b7c437cc40d12ac71a8f0`

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

GitHub pull-request checks passed. The GitHub Pages build completed for the
release commit, and direct production HTTP/browser checks confirmed the home,
Vocabulary, AI Teacher, Dictation, Chinese Dictation, Grammar, Grammar Practice,
history, stylesheet, and Service Worker resources were available. Vocabulary
and AI Teacher loaded normally without a stylesheet 404.

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
