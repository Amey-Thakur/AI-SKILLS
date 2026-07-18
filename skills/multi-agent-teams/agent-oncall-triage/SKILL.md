---
name: agent-oncall-triage
description: Run alert triage as agents that dedup the storm, rate severity by user impact, match a runbook, and draw a hard human-escalation line. Use when you want incoming alerts sorted and enriched by an agent team before they reach the on-call engineer.
---

# On-call triage team of agents

An alert storm handled by one agent is fifty pages for one bad deploy and no
memory of what already cleared. Split triage the way a mature on-call rotation
does: one agent collapses duplicates, one rates real impact, one finds the
matching runbook, and one draws the line where a human gets paged. The line is
the point, because an agent that auto-resolves an alert it did not understand is
worse than no triage at all.

## Team

- **Deduper**: fingerprints and clusters alerts into incidents.
- **Severity rater** (`site-reliability-engineer`): scores blast radius.
- **Runbook matcher**: links the runbook and proposes the first step.
- **Escalation gate** (`incident-commander-role`): decides page, ticket, or
  suppress.

Shape: a per-alert pipeline looping over the alert stream, ending at a human
escalation line.

## Method

1. **Deduper collapses the storm into incidents.** Fingerprint on service, error
   signature, and affected tier, and group alerts inside a five-minute window
   into one record in `incidents.jsonl`. Fifty alerts for one deploy are one
   incident, not fifty pages.
2. **Suppress known noise before rating.** Match against a flapping list and
   maintenance windows; a blip that self-recovers within the window is logged,
   not escalated. Record the suppression so a muted-but-real alert stays auditable.
3. **Severity from user impact, not the alert label.** The rater scores blast
   radius (users affected, revenue path, data integrity) into SEV1 to SEV3, not
   the monitor's own priority field. A CPU spike on a spare replica is not a SEV1.
4. **Match a runbook and propose the first step, not the fix.** The matcher links
   the runbook for the signature and quotes the first diagnostic action ("check
   deploy 4471, roll back if error rate holds"). It suggests; it does not execute.
5. **Draw the human escalation line explicitly.** The gate pages a human for
   SEV1 and SEV2, anything touching data integrity, and anything with no matching
   runbook. Unknown means human; it never auto-closes an unmatched alert. Lower
   severities open a ticket.
6. **Hand off context a paged human can use cold.** `triage-<id>.md` carries what
   fired, the dedup count, severity and why, the runbook link, the suggested first
   step, and what was already ruled out. The 3 a.m. reader does not start at zero.
7. **Loop the stream and close on recovery.** Update the incident as new alerts
   arrive; close it when the source clears for a set window. Escalation and any
   mitigation stay a human decision.

## Run it

In Claude Code, run the pipeline as chained subagents triggered per incoming
alert batch over a shared `incidents.jsonl`, with the escalation gate as the
final subagent whose page or ticket output routes to a human channel and never
fires a mitigation. Port it to CrewAI as a sequential crew re-run per alert, to
AutoGen as agents where the gate's decision ends the chain, or to LangGraph as a
linear graph looping over an alert queue with a conditional edge at the
escalation node.

## Signals it works

- One bad deploy produces one incident and at most one page, not a storm.
- Every unmatched alert reaches a human; none is auto-closed by an agent.
- A paged engineer acts from `triage-<id>.md` without re-deriving context.

## Boundaries

This triages and routes; it does not mitigate, which stays a human decision, and
it does not replace the on-call engineer, only the sorting before them. Agents
mis-cluster novel failure signatures and cannot judge impact they have no
telemetry for. Severity ladders, paging policy, and suppression lists are your
on-call convention; see `oncall-handoff` for the shift boundary.
