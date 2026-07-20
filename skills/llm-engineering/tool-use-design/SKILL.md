---
name: tool-use-design
description: Design LLM tools with descriptions that steer, granularity that composes, and error returns the model can act on. Use when building agent tool sets or debugging wrong-tool and wrong-argument failures.
---

# Tool use design

The model chooses tools by reading their descriptions and recovers
from failures by reading their errors. Both are prompts wearing API
clothing: write them for the model as carefully as you write the
system prompt.

## Method

1. **Describe when, not just what.** Each tool's description
   states what it does, *when to reach for it*, and when
   not to ("search internal docs; use for company-specific
   questions; do not use for general knowledge"): the
   model's tool-selection errors trace to descriptions
   that only name the mechanism. Disambiguate overlapping
   tools explicitly in both descriptions, or merge them.
2. **Size tools at task granularity.** One tool per
   coherent capability (`search_orders`, `refund_order`),
   not one per REST endpoint (forcing the model to
   orchestrate your API's accidents) and not one mega-tool
   with a `mode` argument (hiding the real choice inside a
   parameter). The test: can the model achieve common
   goals in 1-3 calls? (see api-design's consumer-first
   ethic: the model is the consumer).
3. **Design parameters for a language model.** Few, named
   plainly, enums over free strings, defaults for the
   optional, descriptions with examples and formats
   ("ISO date, e.g. 2026-07-20"): every parameter
   description is instruction text (see
   structured-output's schema rules: same discipline,
   the arguments *are* structured output). Validate
   arguments server-side like any untrusted input (see
   request-validation): the model will eventually send
   the impossible.
4. **Return errors the model can act on.** "date_range
   exceeds 90 days: split into smaller ranges" beats
   `400 Bad Request`: the error message is the model's
   recovery prompt (see error-messages, applied to a new
   reader). Distinguish retryable from permanent in
   words; include what *was* valid so the model does not
   discard correct arguments while fixing the wrong one.
5. **Bound the blast radius.** Tools that mutate carry
   the automation-guardrails posture: least-privilege
   credentials per tool (see iam-design), dry-run or
   confirmation steps for destructive actions (the model
   proposes, the human or a policy layer approves),
   idempotency on everything retryable (see
   idempotency-keys: the model *will* retry), and audit
   logs of every call with arguments (see audit-logging,
   llm-observability).
6. **Evaluate tool use as its own suite.** Cases for:
   right tool chosen (including "no tool" cases:
   over-calling is a failure mode), arguments correct,
   errors recovered, multi-step compositions completing
   (see llm-eval-design); log production tool-call
   traces and mine the failures back into the suite.
   Tool description edits are behavior changes: they go
   through the eval gate like prompt edits.

## Boundaries

- More tools degrade selection: past a few dozen,
  group/namespace them or gate by context
  (progressive disclosure; the api-surface-minimalism
  instinct). A tool nobody's eval shows being chosen
  correctly is surface area without value.
- Long tool results are context spend: return the
  decision-relevant slice with pagination/handles for
  the rest (see context-window-management step 4).
- The security boundary is the tool implementation,
  never model politeness: prompt-injected instructions
  will reach your tools, and only server-side authz
  and validation stand between them and your data
  (see llm-guardrails, authz-design).
