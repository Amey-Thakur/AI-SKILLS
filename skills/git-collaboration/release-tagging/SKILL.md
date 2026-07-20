---
name: release-tagging
description: Tag releases with semantic versions and signed tags, generate changelogs, and trigger builds from tags. Use when setting up a release process or fixing ambiguous, unsigned, or manual releases.
---

# Release tagging

A tag is an immutable, meaningful name for a commit that becomes a
release. Done well, tags give you semantic versions users can reason
about, provenance you can verify, and a release process that is one
`git tag` away from a built, published artifact.

## Method

1. **Version semantically and consistently.** MAJOR.MINOR.
   PATCH where major = breaking change, minor = additive,
   patch = fix (see api-versioning, api-change-management
   for what counts as breaking): so a consumer reads the
   version and knows the upgrade risk. Pick a scheme
   (semver, or CalVer for date-driven products) and hold it;
   inconsistent versioning makes the number meaningless.
2. **Tag immutably; never move a release tag.** A release
   tag points at one commit forever; if v1.2.0 is broken,
   you release v1.2.1, you do not re-point v1.2.0 (someone
   already built against it: the artifact-versioning
   immutability rule at the git layer). Moving tags breaks
   everyone who pinned them and destroys reproducibility.
3. **Sign tags for provenance.** GPG/SSH-signed annotated
   tags let consumers verify the release came from an
   authorized maintainer (see crypto-usage,
   supply-chain-defense): the same key that signs commits
   signs releases, so the chain of authenticity is
   checkable, not merely trusted. Annotated (not
   lightweight) tags carry the tagger, date, and message.
4. **Trigger the release pipeline from the tag.** Pushing a
   `v*` tag kicks off the build-sign-publish pipeline (see
   deployment-pipelines, artifact-versioning): the tag is
   the single action that turns a commit into a released
   artifact, reproducibly, with no manual build steps to
   forget. Guard it (validate the tag matches the version
   in the manifest) so a mistyped tag cannot ship.
5. **Generate the changelog from history.** Structured
   commit messages (conventional-commits-style: see
   commit-messages) let tooling generate the changelog
   grouped by type (features, fixes, breaking): honest,
   complete, and free (see changelog-writing for the human-
   facing polish on top). Hand-written changelogs drift and
   omit; generated-then-curated is the reliable middle.
6. **Handle pre-releases and patches explicitly.** Pre-
   release tags (`v2.0.0-rc.1`) for release candidates that
   tooling and users treat as unstable; patch releases
   cherry-picked onto a release branch for supported older
   versions (see branch-strategy's release-branch model).
   Know which versions you support and can patch before you
   promise it.

## Boundaries

- Tags name releases; they do not replace the release
  notes and communication users need (see
  changelog-writing, product-launch): the tag is the
  mechanism, the notes are the message.
- Automated version bumping from commit messages
  (semantic-release-style) reduces human error but couples
  releases tightly to commit discipline; adopt it when the
  team's commit hygiene is reliable (see
  git-history-hygiene).
- Monorepos complicate tagging (one version for all, or
  per-package tags: see monorepo-vs-polyrepo); decide the
  versioning granularity with the repo structure, as they
  are linked decisions.
