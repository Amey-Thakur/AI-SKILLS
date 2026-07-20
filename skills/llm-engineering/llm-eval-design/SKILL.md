---
name: llm-eval-design
description: Build LLM evaluations from real failures with calibrated judges and regression gates that catch quality drift. Use when an LLM feature needs quality measurement or prompts change without anyone knowing what broke.
---

# LLM eval design

Without evals, every prompt edit is a blind bet and every model
upgrade is a gamble. The eval suite is to LLM applications what the
test suite is to code: built from real failures, run on every
change, trusted because it is calibrated.

## Method

1. **Harvest the eval set from production reality.** Real
   (anonymized) inputs from logs (see llm-observability),
   especially the failures: user rephrases, thumbs-downs,
   support escalations, and the weird inputs nobody
   designed for; synthetic cases fill coverage gaps
   (edge lengths, adversarial phrasings, each language you
   support) but the spine is what users actually send
   (see ml-error-analysis: same loop, generative edition).
   Start small and honest: 50 well-chosen cases beat 5000
   scraped ones.
2. **Grade with the cheapest sufficient judge.** Exact/
   programmatic checks wherever possible (structured output
   validates against schema: see structured-output;
   retrieval cites the right doc; the SQL runs and returns
   the expected rows); LLM-as-judge only for genuine
   open-ended quality, with a rubric per criterion
   (correctness, groundedness, tone: separate scores, not
   one vibe number).
3. **Calibrate the judge against humans.** Label 50-100
   cases yourself, measure judge-human agreement, iterate
   the rubric until agreement is strong on the dimensions
   that matter; recheck after judge-model upgrades. Known
   judge biases (position, verbosity, self-preference)
   need mitigations (randomize orderings, cap length
   credit): an uncalibrated judge is a random number
   generator with confidence (see model-evaluation's
   calibration ethic).
4. **Gate changes on eval runs.** Every prompt edit, model
   swap, retrieval change, or parameter tune runs the
   suite before shipping (CI for prompts: see
   deployment-pipelines); compare against the incumbent
   with per-case diffs, not just aggregates: a +2% average
   hiding a regression on the refund-request cluster is a
   net loss (see model-evaluation's slicing). Version
   eval sets alongside prompts (see experiment-tracking).
5. **Test behaviors, not just answers.** Invariance
   (paraphrase in, same answer out), refusal correctness
   (should-refuse and should-not-refuse sets: see
   llm-guardrails), format stability under adversarial
   input, and multi-turn behaviors for conversational
   systems (context carried, corrections honored: see
   conversation-design): single-turn QA evals miss the
   failures users actually hit.
6. **Close the loop continuously.** New production
   failures enter the set weekly (the suite grows like a
   regression suite: every bug becomes a test: see
   regression-tests); sample live traffic for scheduled
   eval-in-production runs so drift (model provider
   updates, user-population shifts) surfaces on your
   dashboard, not in support tickets (see
   drift-monitoring's architecture aimed at quality).

## Boundaries

- Offline evals estimate quality, not business impact;
  user-visible metrics (task completion, escalation
  rate) come from experiments (see ab-test-design).
- Judge scores are ordinal opinions, not measurements;
  never average across dimensions or compare across
  rubric versions, and re-baseline whenever the rubric
  changes.
- Public benchmarks measure the model, not your
  application; a model's leaderboard score transfers to
  your workload only if your eval set says so.
