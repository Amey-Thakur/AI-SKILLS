---
name: chain-of-thought-prompting
description: Ask a model to reason before answering when the task needs intermediate steps, and know when it costs more than it gives. Use for multi-step reasoning, and avoid it for simple retrieval or formatting.
---

# Chain-of-thought prompting

Asking for reasoning before the answer improves multi-step tasks
substantially and does nothing for lookup or formatting, where it just
costs tokens. Newer reasoning models do this internally, which changes
the guidance considerably.

## Method

1. **Use it where steps genuinely exist.** Arithmetic, multi-constraint
   selection, and inference chains benefit; extraction, classification,
   and rewriting rarely do.
2. **Ask for the reasoning before the answer.** Reasoning generated
   after the conclusion rationalises it rather than producing it.
3. **Separate reasoning from the answer in the output.** A tagged
   section keeps working out from the deliverable, which downstream code
   and readers both need (see output-format-control).
4. **Prompt for the structure of the reasoning, not just for it.**
   Naming the steps to work through produces better reasoning than
   asking the model to think step by step.
5. **Do not add it to reasoning models.** Models that reason internally
   can be degraded by explicit chain-of-thought instructions, and the
   provider's guidance should be followed.
6. **Never treat the stated reasoning as the real cause.** It is
   generated text that correlates with the answer, not an explanation of
   how the model arrived at it.
7. **Measure whether it helps on your task.** The benefit varies enough
   that assuming it is not safe (see prompt-testing).

## Boundaries

Reasoning improves accuracy on some tasks and adds latency and cost to
all of them. Visible reasoning is not interpretability and should not be
shown to users as an explanation of the model's process. Long reasoning
consumes the output budget that the answer needs (see
context-window-management).
