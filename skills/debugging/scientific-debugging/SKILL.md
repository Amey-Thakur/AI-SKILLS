---
name: scientific-debugging
description: Debug by turning a belief about the code into a falsifiable hypothesis, predicting an observable, and running the one probe that can refute it. Use when a bug resists guesswork and shotgun edits are making the code murkier instead of the cause clearer.
---

# Scientific debugging

A bug is a disagreement between what you believe the program does and what it
actually does. Editing at random until the symptom moves papers over that
disagreement: the test goes green and you still cannot say why. Treating each
belief as a claim you actively try to disprove keeps every step informative
and every green result earned.

## Method

1. **Pin the symptom in exact values.** Record the precise input, the observed
   output, and the expected output on one line: "`discount(100, 0.2)` returns
   0, expected 80." A numeric symptom is testable; "discounts look off" is not.
2. **Write one hypothesis that can be false.** "The rate arrives as a string
   and multiplies to 0" is refutable. "Something with types" is not. Hold to a
   single hypothesis per cycle, or no probe can tell you which claim it answered.
3. **Predict the reading before you run.** Commit out loud: if this is right,
   `type(rate)` is `str` and the product is `""`. Writing the expected value
   first stops you from rationalizing whatever the probe happens to show.
4. **Probe with the sharpest discriminating test.** Add one assertion or one
   log at the exact boundary the hypothesis names. If a probe prints the same
   thing whether you are right or wrong, it discriminates nothing: replace it.
5. **Bisect the cause space between known-good points.** You trust the input
   and distrust the output. Probe the midpoint of the call chain, keep the half
   still showing the fault, and repeat. Each cycle halves suspects, never shifts
   them sideways.
6. **Keep a three-column log: hypothesis, prediction, result.** A refuted
   hypothesis is progress because it deletes a region of the search space for
   good. The log is what stops you retesting the same dead end at 2 a.m.
7. **Close only when the fix reproduces your prediction.** The patch is done
   when the value you predicted appears and the symptom is gone, not when the
   symptom happens to vanish and you shrug.

## Litmus tests

- Can you state the single observation that would prove your current
  hypothesis wrong, and have you gone and looked for it?
- Does your log show the suspect region strictly shrinking, probe by probe?
- When an edit made the bug disappear, can you name which hypothesis it confirmed?

## Boundaries

A hypothesis you cannot trigger on demand is a guess with better grammar:
stabilize the failure with reproduction-first before you reason about it. When
the question is which commit introduced the regression, hand the search to
git-bisect rather than probing by hand.
