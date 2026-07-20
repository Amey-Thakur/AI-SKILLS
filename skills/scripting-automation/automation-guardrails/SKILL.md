---
name: automation-guardrails
description: Put confirmation gates, blast-radius limits, audit trails, and kill switches around automation that can destroy things. Use when building scripts or bots with destructive power.
---

# Automation guardrails

Automation scales mistakes as efficiently as it scales work. Guardrails
are the difference between "deleted one wrong file" and "deleted every
customer's files, alphabetically, at machine speed".

## Method

1. **Scope the blast radius before the first run.** Every
   destructive automation states what it can touch (paths,
   accounts, tags, environments) and enforces it: allowlists over
   denylists, explicit targeting (`--env staging` required, no
   default-to-prod), and the credentials it runs with scoped to
   exactly that surface (see least-privilege, iam-design): the
   permission boundary is the guardrail that holds when the code
   is wrong.
2. **Gate destruction behind dry-run and confirmation.**
   `--dry-run` prints the full would-do list (see
   script-idempotency step 5); the real run shows the same list
   plus a summary ("34 instances across 2 regions") and requires
   `--yes` for automation or typed confirmation for humans:
   confirming *the count* catches the wrong-filter disaster
   ("...34,000 instances?"). High-stakes operations name their
   target in the confirmation ("type the cluster name to
   proceed").
3. **Rate-limit and stage the execution.** Process in bounded
   batches with pauses, verify health between batches
   (error rates, a canary sample), and stop on anomaly: the
   canary-analysis pattern applied to bulk operations. A cap on
   total actions per run ("refuses to delete >5% of the fleet
   without --override-cap") converts bugs into halts (see
   backpressure's bounded-everything instinct).
4. **Leave an audit trail that survives the automation.** Every
   run logs: who/what invoked it, with which arguments, the
   resolved target list, and per-item outcomes: to durable logs,
   not the terminal (see audit-logging, structured-logging).
   The trail is how you answer "what did it actually do" during
   the incident and "who approved this" after (see
   security-incident-response).
5. **Build the kill switch before you need it.** A flag/file/env
   the automation checks between batches ("halt if
   /etc/automation-stop exists", a feature flag, the scheduler's
   disable button): documented in the runbook so 3am oncall can
   stop the machine without reading source (see runbook-writing,
   feature-flags-hygiene). Paired with idempotent resume (see
   script-idempotency), stopping is always safe, which means
   people will actually stop it early.
6. **Make recovery a designed path, not an aspiration.**
   Soft-delete with a grace window where the platform allows
   (trash-then-purge, deletion protection flags on crown-jewel
   resources), backups verified before mass mutation (see
   backup-restore), and the restore procedure tested at the same
   fidelity as the destroy procedure. Automation whose mistakes
   are unrecoverable gets a human in the loop permanently: that
   is a valid design outcome.

## Boundaries

- Guardrails add friction by design; calibrate to blast radius
  (read-only automation needs none of this) or teams will bypass
  the ceremony everywhere, including where it matters (see
  iam-design's same lesson).
- Confirmation gates do not fix wrong logic; testing against
  staging with production-shaped data (see
  test-environment-parity) is still where correctness comes
  from.
- Humans approve what they understand: a gate that shows a
  10,000-line diff gets rubber-stamped; summarize to the
  decision-relevant facts (counts, examples, anomalies) or the
  gate is theater (see code-review's severity-first reporting
  ethic).
