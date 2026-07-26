# Release Policy

This policy governs repository releases and production deployments for Kids
Learning. Content-package versioning remains separately documented in
[`VERSIONING.md`](VERSIONING.md).

## Release Identity

Official repository releases use Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Git tags use a lowercase `v` prefix, for example `v1.0.0`.

- **Major:** incompatible application, data, URL, or workflow changes.
- **Minor:** backward-compatible student features or substantial content
  capabilities.
- **Patch:** backward-compatible fixes and documentation corrections.

A GitHub Pages deployment is not automatically a new release. Documentation
must distinguish:

- an immutable tagged release;
- a later untagged production deployment;
- the current `develop` documentation or integration state.

## Tag Policy

- Release tags are immutable.
- Never move, replace, delete, or reuse an existing release tag.
- A tag identifies the exact release commit.
- Correct a released issue through a new commit and, when approved, a new
  version and tag.
- Tagging, GitHub Release creation, and deployment require explicit user
  approval.

## Release Evidence

Every future official release should update:

- [`CHANGELOG.md`](CHANGELOG.md)
- [`RELEASE_NOTES.md`](RELEASE_NOTES.md)
- [`RELEASE_MANIFEST.md`](RELEASE_MANIFEST.md)
- relevant user, build, configuration, testing, and deployment guides

The release manifest records the tag, commit, date, production platform,
validation evidence, known issues, artifact status, and rollback baseline.
Use `N/A` with a reason instead of inventing evidence.

Before release, confirm the documentation-impact review required by root
[`AGENTS.md`](../AGENTS.md) is complete. Review the changelog, release notes,
release manifest, user guide, testing, deployment, configuration, architecture,
and known limitations where applicable; update only the affected authorities.

## Release Flow

The approved release path is:

```text
develop
  -> validation and review
  -> approved merge to main
  -> GitHub Pages deployment
  -> production verification
  -> approved tag and GitHub Release when creating an official release
```

The exact Git workflow and deployment checks are in
[`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md).

## Rollback

Rollback starts from a known commit or immutable release tag. Do not move a tag
to represent corrected code.

For production recovery:

1. Identify the approved rollback commit or tag.
2. Create a focused rollback or fix branch.
3. Validate the static site and affected learning behavior.
4. Merge and deploy through the approved workflow.
5. Record the resulting production commit and validation evidence.

## Current Verified State

- Tagged baseline: `v1.0.0`
- Tagged commit: `c2cbcba61a680c809ad31c9f7696f74318dee7a4`
- Tag date: 2026-07-03
- Current verified Pages deployment commit:
  `a3c661012c16a3215cc9d3c52c4eb34a376ff41f`
- Current deployment date: 2026-07-17
- GitHub Release for `v1.0.0`: not present

The current Pages commit contains changes made after the `v1.0.0` tag.
Documentation must not relabel that commit without an approved release
decision.
