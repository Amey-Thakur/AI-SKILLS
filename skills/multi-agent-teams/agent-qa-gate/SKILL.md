---
name: agent-qa-gate
description: Place a QA agent as the last blocking node before output ships, verifying acceptance criteria against real test evidence with the power to veto. Use when builder agents keep declaring done on work that does not actually meet its criteria and you need one gate that runs the artifact instead of trusting the claim.
---

# Agent QA gate

Builder agents are optimists: they report success from reading their own output,
not from running it. A QA gate is the one node that refuses to take their word.
It holds the acceptance criteria fixed from before the build, executes the
artifact, maps each criterion to hard evidence, and can veto the ship. Its
authority is the whole point: a gate that can be talked past is decoration.

## Method

1. **Freeze acceptance criteria before the build.** Load `qa-engineer-role`.
   Criteria are written Given/When/Then and locked before any builder starts, so
   the target cannot drift to match whatever got produced. Vague criteria make
   the gate unenforceable.
2. **Run the artifact, do not read it.** The gate executes: it runs the tests,
   drives the user flow, calls the endpoint. A pass asserted from inspecting
   code is not a pass. The gate's job is to reproduce the claimed behavior
   itself.
3. **Demand evidence, not assertions.** Each criterion must map to an artifact:
   a test log, command output, a screenshot, a captured response. "It works" is
   rejected. The evidence bundle is what the verdict rests on.
4. **Map every criterion, fail on any gap.** Build a table: criterion, evidence,
   pass or fail. A criterion with no evidence is a fail, not a pending. Partial
   coverage is a no-go, because the unmapped criterion is exactly where the
   defect hides.
5. **Exercise the unhappy paths.** Empty input, malformed input, the permission
   edge, the concurrent case. A gate that only confirms the demo path has
   verified the least interesting part of the work.
6. **Hold veto power with one named override.** The gate blocks on any fail, and
   nothing ships past a block except by a named human accepting the risk in
   writing. No builder agent can override its own gate.

## Run it

In Claude Code, make the QA gate a subagent that runs after the builders and
actually executes their output through the Bash tool: run the suite, capture
output, drive the flow. Pass it the frozen criteria and the built artifact as
files; it returns an acceptance report, criterion to evidence to verdict, plus a
go or no-go. The orchestrator treats a no-go as terminal: route back to the
builders, do not proceed. To port, the gate is a CrewAI final task whose
guardrail fails the crew, an AutoGen agent with a termination check on evidence,
or a LangGraph conditional edge that loops back to the build node until every
criterion passes.

## Signals it works

- Every acceptance criterion links to a piece of executed evidence, none pending.
- The gate has actually run the artifact, not just read the diff.
- A no-go blocks the pipeline until a fix or a named human override, never a nag.

## Boundaries

The gate verifies against criteria, it does not write them: that is the PM's or
the spec's job. It also does not fix what it fails, it routes failures back to
the builders and defers the risk-acceptance call to a human release owner. For
iterative code correctness before the gate, use `agent-code-review-loop`.
