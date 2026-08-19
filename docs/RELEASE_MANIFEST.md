# Release Manifest

This manifest records verified repository and production evidence. It does not
create or redefine a release.

## v1.2.2 Release Candidate

| Field | Verified value |
| --- | --- |
| Version | `1.2.2` |
| Preparation branch | `develop` |
| Preparation commit | Grammar navigation fix `f0c20ca422a00c0a45803bf5351f4ba6ecf11b6d` plus release documentation |
| Scope | Responsive Grammar lesson navigation only |
| Validation | Desktop 1024px/wider desktop and 390px mobile smoke tests; no horizontal overflow or console errors |
| Status | Pending merge, Pages deployment, tag, and production verification |

## Current Official Release: v1.2.1

| Field | Verified value |
| --- | --- |
| Version | `1.2.1` |
| Tag | `v1.2.1` (annotated) |
| Status | Published and verified before the `v1.2.2` merge |
| Release commit | `d66eaf79b7c2e022a8a89eb28e6fa0b7bd56477b` |
| Production platform | GitHub Pages static hosting |
| GitHub Release | Published 2026-08-19 |
| Scope | Corrected final-question completion in choice Practice / Quiz |
| Rollback baseline | `v1.2.1` |

## v1.2.0 Release

| Field | Verified value |
| --- | --- |
| Version | `1.2.0` |
| Preparation branch | `develop` |
| Release commit | The immutable annotated `v1.2.0` tag |
| Production platform | GitHub Pages static hosting |
| Question Words bank | 50 questions |
| Quantifiers bank | 54 questions |
| Choice Practice / Quiz | 12 / 10 questions |
| Status | Published and verified |

## v1.1.0 Release

| Field | Verified value |
| --- | --- |
| Version | `1.1.0` |
| Tag | `v1.1.0` (annotated) |
| Status | Published and verified |
| Preparation base | `develop` commit `b423155acbda554b50d2c0d5d2e7302a8e5c2dd3` |
| Production platform | GitHub Pages static hosting |
| Release artifact | N/A; production serves committed static files |
| Docker | Retained unsupported legacy artifact; not a release path |
| Release commit | `67bf0d38282fa50e761b7c437cc40d12ac71a8f0` |
| GitHub Release | Published 2026-07-31 |
| Pages deployment | Built from release commit on 2026-07-31 |
| Production verification | HTTP and browser smoke passed |
| Rollback baseline | `v1.1.0` |

The minor version is required because the release includes Offline English
Grammar Practice, a backward-compatible student feature added after `v1.0.0`.
The release commit, tag, deployment, validation evidence, and rollback baseline
above were recorded from completed release gates.

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

## Previous Verified Production Deployment

| Field | Verified value |
| --- | --- |
| Branch | `main` |
| Commit | `a3c661012c16a3215cc9d3c52c4eb34a376ff41f` |
| Deployment date | 2026-07-17 |
| Pages source | `main`, repository root `/` |
| Pages state | Built, public, HTTPS enforced |
| Version classification | Untagged post-v1.0.0 production deployment |

This deployment contained the Offline English Grammar Practice work added after
the `v1.0.0` tag and was superseded by the verified `v1.1.0` deployment.

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

## Known Boundaries

- The earlier stylesheet filename mismatch is resolved in the `v1.1.0`
  release candidate and protected by local-asset regression coverage.
- The tracked Dockerfile starts `kids_ai_teacher:app`, but
  `backend/kids_ai_teacher.py` is not present. It is retained as an unsupported
  legacy artifact and is not a release path.
- Historical backend architecture documents describe files and endpoints that
  are not present in the current tracked tree.
- Browser speech behavior varies by browser, platform, installed voices, and
  user settings.

## Evidence Maintenance

Update this file only with verified commits, tags, deployments, test results,
and known issues. Follow [`RELEASE_POLICY.md`](RELEASE_POLICY.md) for future
official releases.
