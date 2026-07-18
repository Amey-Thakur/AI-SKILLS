---
name: sast-integration
description: Wire a static analysis scanner into CI so it blocks real security bugs while staying under a defined noise budget. Use when adding a SAST tool to a pipeline or when an existing one is being ignored.
---

# SAST integration

Static analysis earns its place only when developers trust its output. A scanner
that dumps 400 findings on every pull request gets muted inside a week, and it
drags the three real bugs down with it. The problem is not running the tool; it
is keeping the signal high enough that people keep reading it.

## Method

1. **Match the scanner to the stack.** Semgrep for polyglot and custom rules,
   CodeQL for deep dataflow, Bandit for Python, gosec for Go, Snyk or `npm audit`
   for dependencies. Turn on the security ruleset, not the full style-and-lint
   pile that buries security findings in formatting noise.
2. **Baseline the existing code first.** Snapshot current findings and suppress
   them as a known baseline so the pipeline reports only what a change adds. A
   greenfield gate pointed at a legacy repo fails on day one and is switched off
   by day two.
3. **Set a noise budget and measure against it.** Target well under one
   developer-facing finding per ten reviewed pull requests. If the false positive
   rate climbs past roughly 20 percent, tune or cut rules before adding any:
   track the number, do not eyeball it.
4. **Gate only on high-confidence, high-severity.** Block on Critical and High at
   high confidence; render Medium and Low as inline annotations that do not stop
   the merge. A noisy blocking gate only trains people to hit the override.
5. **Make every suppression explicit and reviewed.** Require an inline comment
   with a reason (`// nosemgrep: reason`) or a tracked exception, never a blanket
   config exclusion. Suppressions expire or get audited so they cannot silently
   harden into blind spots.
6. **Scan diffs on every PR, the full repo on a schedule.** Analyze only changed
   files per pull request for fast feedback; run the deep full-repo scan nightly
   or weekly and route those results to a backlog, not the blocking gate.
7. **Deliver findings where they get fixed.** Post them as annotations on the
   exact line in the pull request, not to a dashboard nobody opens, and feed
   dependency alerts into the same triage flow.

## Signals

- What fraction of the last 50 findings were acted on rather than dismissed?
- Does a clean pull request ever get blocked by an unrelated legacy finding?
- Can a developer see, and defend, every suppression in the file they touched?

## Boundaries

SAST catches pattern-matchable bugs and misses the business-logic and
authorization flaws that need security-code-review. Which individual rules to
enable is per-repo tuning; this skill fixes the budget and the gating policy,
not the rule list.
