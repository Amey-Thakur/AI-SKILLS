---
name: decision-journals
description: Record decisions with their context and predictions to enable honest calibration and defeat hindsight bias. Use when making consequential decisions you want to learn from later.
---

# Decision journals

You cannot improve decisions you cannot evaluate, and you cannot
evaluate them honestly after the fact because hindsight rewrites what
you knew. A decision journal captures the decision, its reasoning, and
its predicted outcome at the time, so later you can compare what
happened to what you expected and actually learn.

## Method

1. **Record the decision and its context at the time.** What
   was decided, the situation, the information available, and
   the alternatives considered (see architecture-decision-
   records for the technical-architecture instance, tradeoff-
   analysis for the comparison). Capture this *before* the
   outcome is known, because afterward memory reconstructs it
   to fit what happened.
2. **Write down the reasoning and the key assumptions.** Why
   this option, what you believed had to be true for it to
   work, and what would make it wrong: the load-bearing
   assumptions (see hypothesis-driven-work's falsifiability).
   When the decision plays out, you check which assumptions
   held, which is where the learning is.
3. **Make a falsifiable prediction with confidence.** What
   you expect to happen and how sure you are (a probability
   or a range): "70% this cuts support tickets by a third
   within two months". The prediction plus confidence is
   what makes calibration possible: without it, every
   outcome feels like what you expected (see estimation-
   techniques' error bars).
4. **Note your emotional and situational state.** Time
   pressure, who was pushing, how you felt: these shape
   decisions and reveal patterns (you decide worse under
   deadline, or defer too readily to the loudest voice: see
   receiving-feedback's self-model). The journal surfaces
   these biases across many entries.
5. **Review at the outcome, honestly.** When results are in,
   compare to the prediction: right for the right reasons,
   right by luck, wrong despite good process, or wrong
   because of a flaw you can name? Separate decision quality
   from outcome quality: a good decision can have a bad
   outcome (variance) and vice versa; judging decisions by
   outcomes alone (outcome bias) learns the wrong lessons.
6. **Aggregate for calibration and patterns.** Across many
   entries: are your 70%-confident predictions right about
   70% of the time (calibration)? Do certain decision types
   or states correlate with bad outcomes? The compounding
   value is not any single review but the pattern over
   dozens, which turns vague "I've gotten better at this"
   into measured improvement.

## Boundaries

- The journal captures decisions worth learning from
  (consequential, uncertain, recurring types), not every
  trivial choice; over-journaling is its own procrastination.
- Honesty is the whole mechanism; a journal written to look
  good in hindsight, or reviewed defensively, teaches
  nothing. The value requires admitting wrong predictions
  and bad reasoning (see the ego separation in receiving-
  feedback).
- Decision journaling improves individual and team
  calibration over time; it does not make any single hard
  decision easy (that is tradeoff-analysis, hypothesis-
  driven-work). It is a long-game learning tool.
