---
name: release-automation
description: Automate tagging, building, and publishing releases so shipping is repeatable and the artefacts match the tag. Use when releases are manual, inconsistent, or occasionally wrong.
---

# Release automation

A manual release is one where a tired person eventually skips a step.
Automation makes the process repeatable and, more importantly, makes the
published artefact provably correspond to the tagged source.

## Method

1. **Trigger from a tag, and verify it matches.** A guard checking that
   the tag matches the version in the manifests catches the most common
   release error before anything builds.
2. **Build every platform in one workflow.** Parallel jobs producing
   their artefacts, gathered by a final publishing step, so a partial
   platform failure blocks the release rather than shipping half of it.
3. **Generate release notes from the changelog.** Written as changes
   land rather than assembled at release time (see changelog-writing).
4. **Publish only after every build succeeds.** A publish step that
   depends on all builds prevents a release existing with missing
   assets.
5. **Sign artefacts and publish checksums.** Both so consumers can
   verify what they downloaded is what you built (see
   supply-chain-security).
6. **Keep publishing credentials scoped and audited.** Release tokens
   are the highest-value secret a repository holds (see
   actions-security).
7. **Make the process rerunnable.** Transient failures are common, and a
   release workflow that cannot be safely rerun turns a network blip
   into a manual recovery.

## Boundaries

Automation ensures consistency; it does not decide whether the release
is ready, which is a human judgement. Publishing to external registries
depends on their availability and rules. Version bumping across
manifests must stay consistent or the guard fails (see
semantic-versioning).
