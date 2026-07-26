# Release Manifest

This manifest records verified repository and production evidence. It does not
create or redefine a release.

## Tagged Baseline

| Field | Verified value |
| --- | --- |
| Version | `1.0.0` |
| Git tag | `v1.0.0` |
| Tag commit | `c2cbcba61a680c809ad31c9f7696f74318dee7a4` |
| Tag date | 2026-07-03 |
| Production platform | GitHub Pages static hosting |
| GitHub Release | Not present |
| Release artifact | N/A; production serves committed static files |
| Artifact checksum | N/A; no packaged artifact is published |
| Rollback baseline | `v1.0.0` |

The tag is an ancestor of current `main` and remains immutable.

## Current Verified Production Deployment

| Field | Verified value |
| --- | --- |
| Branch | `main` |
| Commit | `a3c661012c16a3215cc9d3c52c4eb34a376ff41f` |
| Deployment date | 2026-07-17 |
| Pages source | `main`, repository root `/` |
| Pages state | Built, public, HTTPS enforced |
| Version classification | Untagged post-v1.0.0 production deployment |

This deployment contains the Offline English Grammar Practice work added after
the `v1.0.0` tag. No later version or release tag is inferred.

## Validation Evidence

The documentation audit on 2026-07-26 ran against `develop` commit
`930231ce82079ee2a8c0de049cddd7a5971b8298` and recorded:

- Node Grammar Practice tests: 14 passed.
- Python Grammar Practice tests: 5 passed.
- Grammar Practice bank validation: 630 questions, 0 errors, 0 warnings.
- Repository JSON parsing: 27 files passed.
- Markdown relative-link validation: 45 files passed before the audit report
  was added.
- GitHub API: latest Pages build succeeded for production commit `a3c6610`.
- Direct production browser/HTTP smoke test: not completed in that audit
  environment.

This is repository validation evidence, not a claim that every check ran at
the time of the `v1.0.0` tag or the July 17 deployment.

## Known Issues

- `frontend/ai_teacher.html` and `frontend/vocab.html` reference missing
  `frontend/css/styles.css`; the tracked file is `frontend/css/tyles.css`.
  This is an implementation defect deferred to a separate bug-fix task.
- The tracked Dockerfile starts `kids_ai_teacher:app`, but
  `backend/kids_ai_teacher.py` is not present. Docker support has not been
  classified as supported or retired.
- Historical backend architecture documents describe files and endpoints that
  are not present in the current tracked tree.
- Browser speech behavior varies by browser, platform, installed voices, and
  user settings.

## Evidence Maintenance

Update this file only with verified commits, tags, deployments, test results,
and known issues. Follow [`RELEASE_POLICY.md`](RELEASE_POLICY.md) for future
official releases.
