---
description: "Design an evaluation for an AI agent or LLM feature: what to test, how to grade it, and how to catch regressions."
argument-hint: "[system]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design an evaluation for: {system}

Known/feared failures: {failures}

Build the eval:
1. Define what "good" means for this system, concretely: the dimensions that
   matter (correctness, groundedness, format, tone, safety, task completion)
   and the bar for each. You cannot evaluate what you have not defined.
2. Assemble the eval set from real and hard cases: representative inputs, the
   failure modes above, edge cases (empty, huge, adversarial, each language),
   and cases mined from actual failures. Start small and honest (50 good cases
   beat 5000 scraped ones).
3. Choose the grader per dimension, cheapest sufficient first: programmatic
   checks where possible (schema valid, right answer, cites the right source),
   LLM-as-judge only for open-ended quality, with a rubric. Calibrate any LLM
   judge against human labels before trusting it.
4. Test behaviors, not just outputs: invariance (paraphrase in, same answer),
   correct refusals (should-refuse and should-not-refuse sets), multi-turn
   behavior, and tool-use correctness for agents.
5. Make it a regression gate: run on every prompt/model change, compare
   per-case not just averages (an average that hides a regression on one
   cluster is a net loss), and grow the set as new failures appear.

Rules: build the eval before optimizing (without it, every change is a blind
bet). Offline evals estimate quality, not business impact (that needs live
measurement). Every production failure becomes a new eval case. If the "good"
definition is unclear, that is step zero, not something to skip.
