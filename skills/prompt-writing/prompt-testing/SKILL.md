---
name: prompt-testing
description: Test prompts like code, with a case set, pass criteria, and regression runs on every change including model upgrades. Use when a prompt is in production and its behaviour matters.
---

# Prompt testing

A prompt in production is code with non-deterministic behaviour, which
makes testing harder and more necessary. Without it, a model upgrade or
a small edit silently changes behaviour for every user.

## Method

1. **Define pass criteria per case.** Exact match where the output is
   structured, and a rubric or a judge where it is prose. Undefined
   criteria mean the test proves nothing.
2. **Run each case several times.** Output varies between runs, so a
   single pass may be luck, and the pass rate matters more than a single
   result (see agent-ensemble-voting).
3. **Include adversarial and boundary cases.** Empty input, very long
   input, contradictory instructions, and injection attempts (see
   prompt-injection).
4. **Test on every model you deploy.** Behaviour differs between
   providers and versions enough that one model's results do not
   transfer.
5. **Re-run before every model upgrade.** A provider updating a model
   changes your product, and this is the only warning you will get.
6. **Track cost and latency alongside accuracy.** A prompt that is
   marginally better and twice the cost is a trade-off to make
   deliberately.
7. **Automate it in the pipeline.** A test suite that must be run
   manually is run rarely and never at the moment it matters (see
   agent-eval-design).

## Boundaries

Testing shows behaviour on the tested cases; the long tail remains
unknown. Judge-based scoring inherits the judge's biases and needs
periodic human calibration. Non-determinism means thresholds rather than
guarantees, and flaky tests need statistical handling (see
flaky-test-management).
