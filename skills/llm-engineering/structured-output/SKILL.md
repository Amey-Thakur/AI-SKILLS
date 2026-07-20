---
name: structured-output
description: Get valid structured data from LLMs with schema-constrained generation, boundary validation, and repair loops. Use when LLM output feeds code, databases, or downstream systems.
---

# Structured output

When LLM output feeds a program, "usually valid JSON" is a parser
crash on a schedule. The architecture: constrain generation where
the platform allows, validate at the boundary always, and design
the schema so the model can succeed.

## Method

1. **Use the strongest constraint available.** Preference
   order: native structured-output/JSON-schema modes
   (grammar-constrained decoding: validity guaranteed),
   tool/function-call APIs (schema-guided, near-reliable),
   prompt-only JSON instructions (last resort, always with
   repair). Check what your provider actually enforces:
   "JSON mode" often guarantees syntax, not your schema
   (see claude-api-adjacent docs for your platform's
   contract).
2. **Design schemas the model can fill.** Flat over deeply
   nested, few required fields, enums for closed choices,
   descriptions on every field (they are prompt text:
   write them like instructions: see tool-use-design's
   same rule), and an explicit escape hatch
   (`"unknown"` enum value, nullable fields) so the model
   has a valid way to say "not present": otherwise it
   invents (see null-handling's philosophy at the
   schema level).
3. **Validate at the boundary like any untrusted input.**
   Parse into typed objects against the schema
   (zod/pydantic-class: see request-validation's
   parse-don't-check), range/consistency checks on
   values (dates parse, totals sum, IDs exist), and
   treat semantic validity separately from syntactic:
   the JSON can be perfect and the extraction wrong
   (see llm-eval-design for measuring that).
4. **Repair with a bounded loop.** On validation failure:
   re-prompt with the error and the offending output
   ("this failed validation: <error>; return corrected
   JSON only"), 1-2 attempts, then fall back (default
   value, human queue, hard error: the api-error-responses
   decision, internally). Log every repair (see
   llm-observability): rising repair rates mean the
   schema or prompt drifted, and silent repairs hide it.
5. **Extract, do not generate, where truth matters.**
   For extraction tasks, instruct fields to be quoted or
   grounded from the source, null when absent; validate
   spans against the source text where feasible
   (hallucinated "extractions" are the field's classic
   failure: see rag-pipeline's grounding discipline).
   Generation tasks (compose an email) tolerate freedom;
   extraction tasks must not.
6. **Version schemas as contracts.** Downstream consumers
   depend on the shape: evolve additively (new optional
   fields), version breaking changes, and run the eval
   suite per schema change (see schema-evolution,
   api-change-management: the same rules, because it is
   the same problem: an interface between systems).

## Boundaries

- Constrained decoding guarantees shape, not truth;
  validity and accuracy are separate axes, and only
  evals measure the second (see llm-eval-design).
- Very complex schemas degrade generation quality;
  when a schema fights the model, split the task
  (multiple focused calls) or post-process from a
  simpler intermediate (see function-size instincts
  applied to prompts).
- Streaming structured output to UIs needs incremental
  parsing and progressive rendering decisions; the
  boundary-validation rule still applies at completion
  (see loading-states for the UX half).
