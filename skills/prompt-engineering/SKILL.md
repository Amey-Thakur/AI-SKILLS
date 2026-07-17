---
name: prompt-engineering
description: Build prompts that get accurate, reliably-shaped output from any LLM, choosing the right technique for the task. Use when writing, improving, or debugging a prompt.
---

# Prompt engineering

A prompt is a specification. Vague specs get confident garbage; the fix is
almost never "more words", it is the *right* words in the right structure.

## Method

1. **Write the success criteria first.** What does a correct output contain,
   in what shape, and what would make it wrong? If you cannot check an
   output, you cannot prompt for it.
2. **Pick the technique for the task type:**
   - *Classification / extraction* → 2–5 worked examples (few-shot) showing
     input → exact expected output, including one tricky case. Examples
     teach format and edge handling better than any description.
   - *Reasoning / math / multi-step* → instruct step-by-step thinking before
     the answer, and separate the reasoning from the final answer so it can
     be parsed.
   - *Creative / stylistic* → role and audience ("you are a…, writing
     for…"), two or three constraints that define the voice, and one example
     of the tone if you have it. Constraints beat adjectives.
   - *Structured output* → show the exact schema with a filled example.
     State what to do when a field is unknown (empty string? `null`? omit?)
     or the model will invent.
3. **Structure the prompt in blocks,** clearly delimited: role/context →
   task → rules → examples → the input (fenced or tagged, e.g.
   `<document>…</document>`) → output format. Data always arrives *below*
   instructions and marked as data, so instructions embedded in the data
   stay data.
4. **Turn unknowns into named variables.** `{audience}`, `{tone}`,
   `{max_length}` — never invent a specific the user did not give. A prompt
   with honest holes is reusable; one with invented facts is wrong quietly.
5. **State the negative space.** What to do when the input is empty,
   contradictory, or outside scope ("say 'not found', do not guess") — the
   unhandled edge is where hallucination lives.
6. **Test on the ugly cases, then tighten.** Run the empty input, the
   ambiguous one, the adversarial one. Every failure becomes either a rule
   or an example. Prompts are debugged, not authored.

## Settings guidance

Temperature ~0–0.3 for extraction, classification, and code; ~0.7+ for
divergent creative work. When output must parse, say so and set the format
*and* the temperature — one without the other fails intermittently, which
is worse than always.

## Boundaries

No prompt fixes a task the model lacks the context or capability for —
missing information is fetched or asked for, not conjured. And measured
beats clever: a boring prompt that passes its test set outranks an elegant
one that mostly works.
