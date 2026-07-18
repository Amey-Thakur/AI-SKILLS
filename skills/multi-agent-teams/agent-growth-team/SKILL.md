---
name: agent-growth-team
description: Run a team of growth agents that designs an experiment, builds the variant, analyzes the result, and passes an ethics gate before anything ships. Use when you want product changes tested rigorously instead of shipped on a hunch, with a guardrail against manipulative tactics.
---

# Agent growth team

Growth work fails two ways: shipping changes nobody measured, and measuring
changes nobody should have shipped. A team splits it so neither slips through:
one agent designs the test, one builds the variant, one reads the numbers with
honest statistics, and one gate checks the whole thing does not manipulate the
user. The shape is a sequential pipeline with an ethics gate that sits before
launch, not after the win.

## Method

1. **Designer pre-registers the experiment.** Load `growth-engineer-role`.
   Output `experiment.yaml`: one hypothesis, one primary metric, the guardrail
   metrics that must not regress, the minimum detectable effect (MDE), the
   computed sample size, the fixed duration, and the target segment. A test with
   two primary metrics has none.
2. **Ethics gate reviews the design before code.** Load `ux-researcher-role`.
   Check `experiment.yaml` for manipulative defaults, missing consent, and
   targeting of vulnerable users. Output `ethics-review.md` with a pass or a
   block plus the specific change that clears a block. This gate runs first so a
   dark pattern dies on paper, not in production.
3. **Implementer builds the variant behind a flag.** Load
   `frontend-engineer-role`. Put every arm behind a feature flag with random,
   sticky assignment, and instrument the primary and guardrail metrics in the
   same commit. Output the branch and `variant.md`: what changed, flag key,
   events emitted. No metric, no launch.
4. **Hold the stopping rule.** Run to the pre-registered sample size or duration,
   whichever the design named. No peeking at significance to stop early, no
   adding a metric mid-flight. Both turn a real test into a story.
5. **Analyst reads the result honestly.** Load `data-scientist-role`. Check for
   sample-ratio mismatch first, since a skewed split invalidates everything after
   it. Output `analysis.md`: effect size with a confidence interval, every
   guardrail checked, and a verdict of ship, kill, or iterate tied to the MDE.
6. **Ship only past all three gates.** Roll out when the primary metric cleared
   the MDE, no guardrail regressed, and the ethics review still holds for the
   shipped variant. A win that trips a guardrail or the ethics gate does not
   ship, it goes back.

## Run it

In Claude Code, run designer, ethics, then implementer as subagents in sequence,
launch the flagged variant, and run the analyst once the sample is collected.
Pass `experiment.yaml`, `variant.md`, `analysis.md`, and `ethics-review.md` as
files on the experiment's branch, and gate the rollout on both the analyst's
verdict and the ethics sign-off. Terminate when the variant ships, is killed, or
is queued for one iteration; a third inconclusive run escalates to a human owner.
To port, use a CrewAI sequential Crew with a gating ethics task, an AutoGen
GroupChat with a critic enforcing the stopping rule, or a LangGraph pipeline with
an ethics gate node placed before the launch node.

## Signals it works

- The ethics review is dated before the launch, not after the result.
- Every shipped change cleared its MDE with guardrails intact, not a p-value fished from peeking.
- Analysis reports a confidence interval and a sample-ratio check, not just "it won".

## Boundaries

This team runs measured experiments, not pricing strategy or brand decisions, and
it defers the definition of a guardrail breach to the company's own metric
thresholds. It will not ship a variant the ethics gate blocked, and it leaves any
change touching regulated consent or minors to human legal review.
