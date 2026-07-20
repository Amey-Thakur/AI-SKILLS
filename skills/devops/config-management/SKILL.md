---
name: config-management
description: Separate config from code and secrets, keep environments at parity, and change config safely. Use when wiring application configuration for deployment or fixing environment-specific bugs and config drift.
---

# Config management

Config is what varies between environments; code and secrets are not
config. Keeping those three separate, and changing config as
deliberately as code, is what stops "works in staging" bugs and
2am misconfigurations.

## Method

1. **Draw the three-way line.** Code (same everywhere, in
   the immutable artifact: see artifact-versioning), config
   (varies per environment: URLs, limits, feature toggles,
   scaling), secrets (varies and must never be plaintext in
   git: see secrets-management). Config baked into the
   artifact forces a rebuild per environment (the drift
   anti-pattern); secrets in config files are a breach
   waiting for the wrong repo clone.
2. **Inject config at deploy, from a versioned source.**
   Environment variables, mounted config, or a config
   service resolved at startup (see
   scripting-automation's environment-config for the
   tool-level twin); the values live in a versioned,
   reviewed store (a config repo, GitOps: see
   gitops-workflow) so every change has a diff, an author,
   and a revert.
3. **Validate config at startup, fail loud.** Type-check
   and range-check config before serving (see
   request-validation's parse-don't-check, applied to your
   own config); a missing or malformed value fails the
   deploy or the health check (see health-checks), never
   surfaces as a mysterious 500 an hour later. Typed config
   objects beat scattered string lookups (see
   spring-boot-discipline, dotnet-dependency-injection for
   the framework versions).
4. **Keep environments at parity.** The same config *keys*
   across environments with different *values*; a key that
   exists only in production is where the untested code
   path hides (see test-environment-parity). Generate
   environment configs from one template so a new key lands
   everywhere at once, defaulted safely.
5. **Change config with deploy-grade caution.** Config
   changes cause outages as readily as code changes (a
   wrong limit, a flipped flag): review them, roll them out
   progressively where risky (feature flags are runtime
   config with the best rollout story: see
   feature-flags-hygiene), and mark them in monitoring so
   incidents correlate (see infrastructure-monitoring,
   rollback-strategy: config is often the fastest
   rollback).
6. **Document config as an interface.** Each setting: what
   it does, valid range, default, and blast radius: where
   operators and the next engineer will look (see
   onboarding-docs). Undocumented magic numbers in config
   are the same debt as magic numbers in code (see
   magic-numbers), with production consequences.

## Boundaries

- Feature flags overlap config but add per-user targeting
  and lifecycle concerns (flags must be retired: see
  feature-flags-hygiene); do not let flags become
  permanent undocumented config.
- Dynamic config (changed at runtime without deploy) is
  powerful and dangerous: it needs the same validation,
  audit, and rollback as deploys, or it becomes an
  ungoverned change channel (see automation-guardrails).
- Config-as-code stops at secrets; the encrypted-or-
  referenced rule (see secrets-management, gitops-workflow)
  is the hard boundary, because a leaked config repo must
  not be a leaked credential set.
