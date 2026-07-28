---
name: prompt-structure
description: Order a prompt so the model knows its task, its material, and its output before it starts generating. Use when writing any non-trivial prompt or fixing one that produces the wrong shape of answer.
---

# Prompt structure

A prompt is read in order, and models weight the beginning and end more
than the middle. Structure decides what the model treats as instruction,
what it treats as data, and what it thinks the output should look like,
which is most of prompt quality.

## Method

1. **Lead with the task in one sentence.** What to produce, for whom.
   A model that reads three paragraphs of context before learning its
   job interprets the context without a frame.
2. **Separate instructions from material explicitly.** Delimiters or
   tags around provided content, with a statement that it is data rather
   than instruction, which also blunts injection (see llm-guardrails).
3. **Put the output specification near the end.** The requirement
   closest to generation has the strongest effect on format (see
   output-format-control).
4. **Order constraints by importance.** Models drop instructions under
   load, and the ones buried mid-list go first.
5. **Keep one prompt to one task.** A prompt asking for a summary, a
   translation, and a critique does all three worse than three prompts.
6. **Use consistent internal vocabulary.** Referring to the same thing
   three ways within a prompt creates ambiguity the model resolves
   arbitrarily.
7. **Cut everything that does not change the output.** Politeness,
   preamble, and restated context dilute the instructions that matter.

## Boundaries

Structure improves reliability; it cannot make a model capable of a task
beyond it. Optimal ordering differs somewhat between model families, so
a prompt tuned to one may need adjustment (see prompt-testing). Very
long prompts degrade regardless of structure (see context-placement).
