---
name: agent-red-team-blue-team
description: Run attacker and defender agents in a fix-and-re-attack loop so exploitable bugs get found, triaged, fixed, and verified before ship. Use when you want a system probed and hardened by an agent team rather than one pass of review.
---

# Red team, blue team agents

A single review pass finds only what one agent thinks to look for. Pit an
attacker agent against a defender agent with an independent referee between
them, and security becomes a loop that keeps score: every fix is re-attacked,
every finding graded by someone who did not write it. Skip the referee and the
attacker inflates its own exploits while the defender declares victory on the
first patch.

## Team

- **Red agent** (`security-engineer-role`, `penetration-test-prep`): attacks an
  assigned surface and files findings.
- **Blue agent** (`security-code-review`): fixes the highest-ranked findings and
  writes fix notes.
- **Referee** (`vulnerability-triage`): dedupes, scores, and confirms, so
  neither side marks its own homework.

Shape: an adversarial pair driven around a fix-and-re-attack loop.

## Method

1. **Assign the surface with rules of engagement.** Split targets by trust
   boundary: authentication, input parsing, multi-tenancy, deserialization.
   Hand red a scope file listing in-bounds targets and forbidding the rest, so
   it probes the system, not the harness or third-party hosts.
2. **Run the red pass into `findings.jsonl`.** One record per finding: target,
   technique, repro steps, evidence, claimed severity. Require a working repro;
   a finding without one is a hypothesis the referee will drop.
3. **Triage before anyone fixes.** The referee dedupes, scores with CVSS
   adjusted for reachability, and cuts false positives into a ranked
   `triage.md`. Attackers over-rate severity and defenders under-rate it; a
   neutral score ends that argument.
4. **Blue fixes highest risk first.** For each finding id, patch and write a fix
   note stating what changed and why the whole bug class is closed, not just the
   one repro.
5. **Red re-verifies against the patched build.** Re-run every fixed finding
   (pass or fail) plus a regression sweep for new surface the patch opened.
   Verdicts return to `findings.jsonl` as verified or reopened.
6. **Loop to the bar.** Stop when a full red pass yields no new critical or high
   and all triaged criticals are verified closed, or a round budget of three to
   five is spent. Ship remaining mediums under a written risk acceptance.

## Run it

In Claude Code, spawn red and blue as separate subagents with their role skills
loaded and one shared directory for the artifact files; the orchestrator runs
red, referee, blue, red again, reading each file to pick the next call, and
keeps the referee distinct so scoring stays independent. Port the loop to CrewAI
as three agents in a sequential process re-queued each round, to AutoGen as a
GroupChat whose referee gates turns, or to LangGraph as a cyclic graph with a
conditional edge on the termination check.

## Signals it works

- The referee reopens some fixes, proving verification is real, not a rubber
  stamp.
- Shipped severity is the referee's number, not red's or blue's.
- New-critical count per round trends to zero instead of oscillating.

## Boundaries

This runs the adversarial loop; it does not replace a human penetration test or
a design threat model, which `threat-modeling` owns. Agents miss novel logic
flaws and anything needing real credentials or physical access. Rules of
engagement, disclosure, and the meaning of "critical" are your organization's
policy, and a human signs the final risk acceptance.
