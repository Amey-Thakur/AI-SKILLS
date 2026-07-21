---
name: experiment-design-basics
description: Design experiments with controls, randomization, confound awareness, and pre-registered analysis. Use when testing a hypothesis empirically and needing the result to actually mean something.
---

# Experiment design basics

An experiment isolates cause from correlation. Its validity is decided
before any data is collected: what you control, how you assign, what
confounds you accounted for, and whether you decided the analysis in
advance. A poorly designed experiment produces confident, wrong
conclusions that are worse than no experiment.

## Method

1. **Define the causal claim and the measurable outcome.**
   Exactly what causes what, measured how: "adding onboarding
   step X increases 7-day retention" with retention defined
   precisely (see product-metrics, ml-problem-framing's
   target definition). A fuzzy outcome ("improves
   engagement") lets you find success in any result, which
   means the experiment cannot fail and therefore proves
   nothing.
2. **Establish a control.** Compare the treatment against a
   baseline (a control group, a before-period, the current
   version): the difference is the effect. Without a
   control, you cannot separate your intervention from
   everything else that changed (seasonality, other
   releases, the news): the single most common experimental
   failure is no control (see ab-test-design's control
   arm).
3. **Randomize assignment.** Assign subjects to treatment
   and control randomly, so the groups differ only by the
   treatment and not by some pre-existing trait (motivated
   users self-selecting into the new feature would fake an
   effect). Randomization is what turns correlation into
   causation; non-random assignment reintroduces the
   confounds (see train-test-discipline's leakage cousin).
4. **Identify and control confounds.** A confound is a
   variable affecting the outcome that also differs between
   groups: control for known ones (blocking, stratification,
   or including them in analysis), and randomize to handle
   unknown ones (see statistical-analysis, experimental-
   design for the rigorous versions). The confound you did
   not think of is why the surprising result later
   evaporates.
5. **Pre-register the analysis.** Decide the primary metric,
   the sample size (see statistical-power, ab-test-design's
   sizing), and the analysis method before collecting data:
   so you cannot (even unconsciously) fish for a significant
   result among many comparisons (see the peeking and
   p-hacking traps in ab-test-design). Analysis chosen after
   seeing data inflates false positives dramatically.
6. **Account for validity threats.** Internal validity (does
   the design really isolate the cause), external validity
   (does the result generalize beyond this sample and
   setting), and statistical validity (enough power, right
   test): a result strong on one axis and weak on another
   over-claims. State the threats you did not fully control
   so the conclusion is honest about its reach.

## Boundaries

- This is the pragmatic core; rigorous experimental design
  (factorial designs, power analysis, mixed models: see
  experimental-design, statistical-power, statistical-
  analysis) goes deeper where stakes and publication
  demand it.
- Not everything can be experimented on (ethics, cost,
  irreversibility); observational methods and natural
  experiments substitute, with weaker causal claims that
  must be stated as such (see scientific-critical-thinking).
- A well-designed experiment can still be wrong if
  underpowered or if the effect does not replicate; single
  experiments are evidence, not proof (see the replication
  ethic in reading-papers).
