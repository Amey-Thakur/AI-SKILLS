---
name: correlation-causation
description: Tell correlation from causation and avoid the confounding, selection, and reverse-causation traps. Use when data shows a relationship and someone is about to claim one thing causes another.
---

# Correlation vs causation

"X correlates with Y" is easy to measure and easy to over-read. The leap
to "X causes Y" is where analysis most often goes wrong, driving real
decisions off a relationship that is coincidence, confounding, or backwards.
Knowing when you can and cannot claim causation is a core data-science
guardrail.

## Method

1. **Default to "correlation is not causation".** A relationship in data
   has several possible explanations: X causes Y, Y causes X (reverse), a
   third factor Z causes both (confounding), selection into the sample
   created it, or pure chance. The correlation alone cannot distinguish
   them. Start skeptical of the causal story.
2. **Hunt the confounder.** The classic trap: ice cream sales correlate
   with drownings (summer causes both). Before claiming X causes Y, ask
   what Z could drive both. Confounders are everywhere (seasonality, age,
   wealth, the underlying trend); an uncontrolled comparison is a
   confounder waiting to be named (see mental-models' first-principles).
3. **Check the direction.** Does X cause Y, or does Y cause X? "Users of
   feature A retain better" may mean A drives retention, or that
   already-engaged users (who would retain anyway) adopt A. Reverse and
   bidirectional causation masquerade as forward causation constantly.
4. **Suspect selection effects.** If the sample was chosen in a way related
   to the variables (survivors, opt-ins, the treated group differing from
   the control at baseline), a relationship can appear from the selection
   itself, not any causal link. Ask how the data was collected and who is
   missing (see the sampling caution in statistical-inference).
5. **Reserve causal claims for causal evidence.** The strong evidence for
   causation is a randomized experiment (randomization breaks confounding;
   see ab-test-design, experiment-design-basics). Without it, causal
   inference needs careful methods (natural experiments, controlling for
   known confounders, instrumental variables) and still carries caveats.
   Observational correlation supports "associated with", not "causes".
6. **Frame conclusions honestly.** Say "associated with" or "predicts" for
   correlational findings, "causes" only when the evidence earns it. The
   discipline is in the wording: a decision-maker who hears "causes" acts
   as if intervening on X will move Y, which a mere correlation does not
   promise.

## Boundaries

- Prediction does not require causation: a model can use correlated
  features to predict well without any causing the target, and that is
  fine for forecasting (see ml-problem-framing). The trap is only when you
  act on the relationship as if intervening.
- Absence of proven causation is not proof of no causal link; correlational
  evidence plus mechanism and dose-response can build a strong (if not
  certain) causal case where experiments are impossible.
- Causal inference from observational data is a deep field; this skill is
  the guardrail against the common leap, not the full methodology (see
  experiment-design-basics, statistical-analysis).
