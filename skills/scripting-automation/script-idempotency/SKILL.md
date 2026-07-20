---
name: script-idempotency
description: Write scripts whose reruns are always safe through check-then-act steps, atomic writes, and dry-run modes. Use when automation may run twice, die halfway, or need a safe retry.
---

# Script idempotency

Every script eventually runs twice: a retry, a duplicated cron slot, a
nervous operator. Idempotent means the second run converges to the
same end state without damage: design each step to check reality
before changing it.

## Method

1. **Write steps as desired-state assertions.** Not "create the
   directory" but "ensure the directory exists"
   (`mkdir -p`, `ln -sfn`, `INSERT ... ON CONFLICT`,
   `kubectl apply`): each step describes an end state and is a
   no-op when reality already matches. Commands that fail on
   re-execution (`mkdir`, `useradd`, plain `INSERT`) get guarded:
   check-then-act, or use the tool's idempotent form (the
   declarative instinct of infrastructure-as-code, at script
   scale).
2. **Make mutations atomic.** Write to a temp file in the same
   filesystem, then `mv` into place (rename is atomic; a killed
   script leaves the old file intact, never a half-written one);
   database changes in transactions; multi-file updates staged
   then swapped via symlink flip. A script killed at any line
   should leave either the old state or the new state, never a
   hybrid (see graceful-shutdown's crash-window thinking).
3. **Track progress for resumable multi-step work.** Long scripts
   record completed units (a state file of processed IDs, a
   `done/` marker per item, a database progress row) and skip
   them on rerun: crash recovery becomes "run it again" (see
   background-jobs checkpointing; data work gets this from
   partition-overwrite: see data-pipeline-design). Guard the
   state file updates with the same atomic-write rule.
4. **Separate side effects that cannot be repeated.** Sending
   email, charging, posting to chat: gate behind a dedup record
   checked in the same step ("send unless sent-marker exists;
   write marker atomically after"), or route through systems
   with idempotency keys (see idempotency-keys,
   idempotent-consumers). A rerunnable script with one
   unrepeatable side effect in the middle is not rerunnable.
5. **Build --dry-run as a first-class mode.** Every mutating
   action routed through a helper that logs-instead-of-does under
   the flag (`run() { $DRY && echo "would: $*" || "$@"; }`);
   dry-run output is how operators verify a fix before trusting
   it and how reviews check blast radius (see
   automation-guardrails; PowerShell gets this free via
   -WhatIf: see powershell-essentials).
6. **Test the rerun and the interruption.** The test matrix: run
   twice (second run must be a clean no-op, verifiable in
   output), kill mid-run then rerun (must converge), run against
   already-partially-converged state. Ten minutes of this testing
   catches what makes 3am retries terrifying (see
   chaos-testing's ethic at the smallest scale).

## Boundaries

- Idempotency covers rerunning the same version with the same
  inputs; concurrent runs of the same script need locking on top
  (see scheduled-jobs, distributed-locks).
- Rollback is a separate capability: converging forward is not
  the same as undoing; destructive transitions (dropping columns,
  deleting files) get backups or a two-phase expand-contract plan
  (see database-migrations, rollback-strategy).
- Some operations are inherently one-shot (rotating a secret,
  bumping a version); isolate them, label them, and make the
  script detect "already done" rather than pretending the whole
  run is uniform.
