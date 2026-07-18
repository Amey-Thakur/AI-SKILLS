---
name: agent-release-train
description: Run release agents that draft the changelog, scan risk, verify the candidate, and gate publish behind a go/no-go check. Use when cutting a release and you want the boring parts automated and the risky parts caught before ship.
---

# Release train of agents

Releases go wrong in the gap between "the code is merged" and "the artifact is
live": an undocumented breaking change, a fresh CVE in a bumped dependency, a
rebuild that was never the thing that passed. A pipeline of release agents closes
that gap by making each step produce a record: what changed, what it risks,
whether it verified, and only then does a human approve the publish. The
conductor holds the gate; the agents fill it.

## Team

- **Conductor** (`release-manager-role`): cuts the manifest and holds go/no-go.
- **Changelog agent** (`technical-writer-role`): drafts the release notes.
- **Risk scanner** (`security-engineer-role`, `dependency-auditing`): flags
  hazards.
- **Verifier** (`qa-engineer-role`): confirms the candidate is green.

Shape: a sequential pipeline ending at a judge-style go/no-go gate.

## Method

1. **Cut the manifest.** The conductor fixes the commit range and version from
   the diff since the last tag into `manifest.md`, with the cut criteria stated
   up front.
2. **Generate the changelog from history.** The changelog agent groups merged
   PRs into features, fixes, and breaking changes in `CHANGELOG.md`, and flags
   every breaking change explicitly, not buried in a bullet.
3. **Scan risk over the diff.** The scanner lists new or bumped dependencies,
   known CVEs, database migrations, and config changes into a ranked `risk.md`,
   with a blast-radius note per item.
4. **Verify the exact candidate.** The verifier confirms required checks are
   green and smoke tests pass on the built artifact, never a rebuild, writing
   pass or fail per check to `verify.md`.
5. **Run the go/no-go gate.** The conductor reconciles the three files: any open
   blocker, unflagged breaking change, or failed check holds the train and routes
   to the owner. No selective reinterpretation at 5 p.m.
6. **Publish behind a human approval.** A person approves the actual tag,
   publish, or deploy; ship the artifact that passed, promoted gradually through
   canary or rings, watching error rate and latency.
7. **Record the go-live.** Append the go/no-go decision, attendees, and rollout
   result to `manifest.md` so the 2 a.m. on-call reads a real record.

## Run it

In Claude Code, run the four agents as subagents over one shared release
directory; the orchestrator sequences changelog, risk, and verify (those three
can run in parallel), then performs the go/no-go itself and stops for human
approval before any publish command runs. Port it to CrewAI as a sequential
process with a gating task, to AutoGen as a GroupChat whose conductor approves
transitions, or to LangGraph as a linear graph with a conditional edge that halts
on any red signal.

## Signals it works

- Breaking changes appear flagged in the changelog, not discovered by users.
- The published artifact is byte-identical to the one the verifier passed.
- A held train routes to a named owner instead of shipping around the gate.

## Boundaries

This automates the release record and the gate, not the fix for what the gate
catches, which goes back to the owning engineers. The cut criteria, rollout
policy, and who may approve a publish are company convention the conductor
follows, not invents. A human holds publish and rollback authority; agents
prepare the decision, they do not execute the irreversible click.
