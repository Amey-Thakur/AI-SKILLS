---
name: infrastructure-as-code
description: Manage infrastructure through declarative code with sane module design, state hygiene, and plan-review discipline. Use when adopting Terraform-style IaC or refactoring a sprawling configuration.
---

# Infrastructure as code

The repository is the source of truth; the cloud is a cache of it.
Everything follows from defending that invariant: no console edits, no
unreviewed applies, no state nobody owns.

## Method

1. **Structure as small root modules per blast radius.** One state per
   environment per subsystem (`prod/network`, `prod/database`,
   `staging/app`), not one monolithic state: applies stay fast, locks
   stay short, and a bad change cannot touch what its state does not
   hold. Compose from reusable child modules with explicit
   inputs/outputs.
2. **Design modules like APIs.** Few required variables, safe defaults
   (encryption on, public access off), validation blocks on inputs,
   documented outputs consumed by other stacks via remote state or
   data sources. A module needing 40 variables is a template, not an
   abstraction; split it.
3. **Guard the state like production data.** Remote backend with
   locking and versioning, encrypted, access-controlled (state contains
   secrets in plaintext more often than teams admit). Never edit state
   by hand; `state mv`/`import` for surgery, with a second person
   watching.
4. **Make plan review the real gate.** CI posts the plan on the PR;
   humans review the diff (destroys and replaces especially: know why
   an attribute forces replacement before approving), then CI applies
   the *same saved plan* on merge. Fresh-plan-at-apply can differ from
   what was reviewed. Pipeline detail in gitops-workflow and
   deployment-pipelines.
5. **Hunt drift on a schedule.** Nightly `plan` in CI alerting on
   non-empty diffs; drift means console edits or an outside actor,
   both worth investigating, then reconciling (import or revert) the
   same week. Standing drift teaches everyone the repo is a suggestion.
6. **Version and pin everything.** Providers and modules pinned
   (lockfiles committed), upgrades as deliberate PRs; tag module
   releases so consumers upgrade on their schedule. Policy-as-code
   checks (deny public buckets, require tags; see iam-design
   boundaries) run in CI where they cannot be skipped.
7. **Test at the right altitude.** Static: fmt, validate, lint,
   policy. Integration: spin ephemeral stacks for the modules whose
   failure is expensive (network, IAM). Do not chase 100% "unit
   coverage" on declarative code; the plan diff is the test for most
   changes.

## Boundaries

- Application deploys move faster than infrastructure; keep app config
  out of the infra state (see config-management) or every release
  waits on an infra lock.
- Imperative escape hatches (provisioners, local-exec scripts) trade
  idempotency away; quarantine them behind their own small stacks
  with documented manual recovery.
- IaC will not fix an unowned platform; every state file needs a team
  on its review path, or drift and secrets rot in the dark.
