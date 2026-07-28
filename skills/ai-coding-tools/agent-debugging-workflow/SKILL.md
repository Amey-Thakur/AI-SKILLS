---
name: agent-debugging-workflow
description: Work with an agent on a bug by supplying evidence and letting it form hypotheses, rather than asking it to guess from a description. Use when debugging with an agent's help.
---

# Agent debugging workflow

Agents debug well with evidence and badly with descriptions. The common
failure is describing the symptom and receiving plausible speculation,
when the actual error output would have been decisive.

## Method

1. **Give the raw evidence first.** Error message, stack trace, logs,
   and the exact reproduction steps, rather than your summary of them
   (see stack-trace-reading).
2. **Withhold your theory initially.** Stating your suspicion anchors
   the agent on it, and independent hypotheses are more useful (see
   debugging).
3. **Ask for hypotheses ranked by likelihood.** Several candidates with
   a way to distinguish them beats one confident answer.
4. **Let it instrument rather than guess.** Adding logging or a
   targeted test to narrow the cause is faster than reasoning about
   possibilities (see binary-search-debugging).
5. **Confirm the mechanism before accepting a fix.** A change that makes
   the symptom disappear without an explained cause is not a fix (see
   root-cause-analysis).
6. **Provide the failing test if one exists.** A reproduction converts
   debugging from discussion into verification.
7. **Record the cause when found.** The explanation belongs in the
   commit or an issue, since the next occurrence will look unfamiliar
   (see incident-postmortem).

## Boundaries

An agent cannot observe your running system and works only from what you
show it. Intermittent and environment-specific bugs are the hardest to
delegate. A fix that passes tests may still be wrong about the cause
(see test-flakiness-budget).
