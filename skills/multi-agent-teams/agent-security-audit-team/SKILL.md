---
name: agent-security-audit-team
description: Run a security audit as agents that map the attack surface, review each surface in parallel, skeptic-test every finding, and assemble one report. Use when you want a codebase audited by a coordinated agent team instead of a single review pass.
---

# Security audit team of agents

A security audit run by one agent is one reviewer's blind spots applied to the
whole system. Split it: one agent maps the attack surface, one reviewer per
surface works in parallel, a skeptic demands a working trigger before anything
counts, and an assembler writes the report. The skeptic is the load-bearing
role, because an unverified finding is a pattern match wearing a severity score.

## Team

- **Recon** (`threat-modeling`, `penetration-test-prep`): enumerates surfaces
  and trust boundaries.
- **Reviewers** (`security-code-review`, `security-engineer-role`): one per
  surface, in parallel.
- **Exploit skeptic** (`vulnerability-triage`): demands reachability and a repro.
- **Assembler** (`technical-writer-role`): merges surviving findings into one
  report.

Shape: recon first, parallel fan-out of per-surface reviewers, a skeptic gate,
then assembly.

## Method

1. **Recon maps the surface before anyone reviews.** Enumerate entry points:
   routes, queues, file uploads, deserializers, third-party callbacks, auth
   model, and data classification. Output `surface-map.md`. One agent, up front.
2. **Assign one reviewer per surface, no overlap.** Each takes a trust boundary
   from the map and writes `findings.jsonl` records: surface, weakness class
   (CWE), location, evidence, and a claimed severity.
3. **Require a concrete trigger, not a smell.** A reviewer flags "user input
   reaches this query unparameterized," not "SQL looks risky." No evidence line,
   no finding.
4. **Run the exploit skeptic as a gate.** For each finding it asks: is the path
   reachable with realistic input, does auth block it, is there a compensating
   control. Downgrade or drop unreachable ones, keeping the CWE note as hardening.
5. **Score with CVSS adjusted for reachability, and dedupe.** The skeptic sets
   final severity; the reviewer's number is a claim. Collapse one root cause
   reported on two surfaces into a single finding.
6. **Assemble one report ordered by risk.** `audit-report.md`: summary, findings
   critical-first with repro and fix, the surfaces reviewed with nothing found so
   scope is legible, and residual risk. Stop when every surface has a verdict and
   every critical and high has a skeptic ruling.

## Run it

In Claude Code, run recon as a single subagent to produce `surface-map.md`, then
spawn one reviewer subagent per surface in a single parallel turn over a shared
directory; the skeptic runs as its own subagent over `findings.jsonl` before the
assembler reads only surviving rows. Port it to CrewAI as a recon task feeding
parallel review tasks then a synthesis task, to AutoGen as a GroupChat with the
skeptic gating turns, or to LangGraph as a fan-out from a recon node with a
triage node before assembly.

## Signals it works

- Every surface in `surface-map.md` has a verdict in the report, clean ones too.
- The skeptic drops or downgrades findings, so severity tracks reachability, not
  pattern count.
- A reader reproduces every critical from the report alone.

## Boundaries

This organizes an agent code audit; it is not a live penetration test, which
`penetration-test-prep` and human testers own, nor a full design threat model
beyond the recon pass. Agents miss novel logic and business-rule flaws and
anything needing real credentials. What counts as critical and the disclosure
path are your policy, and a human signs off before findings leave the team.
