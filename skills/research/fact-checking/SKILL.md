---
name: fact-checking
description: Verify claims before stating them: trace to the source, corroborate independently, and separate fact from inference. Use when accuracy matters, especially before an agent asserts facts, numbers, or quotes.
---

# Fact-checking

A confident statement is not a true one. Fact-checking is the discipline of
verifying a claim before you assert it: finding where it actually comes
from, confirming it independently, and being honest about what you could
not confirm. It is the guard against passing on plausible falsehoods,
including your own.

## Method

1. **Isolate the checkable claim.** Separate the specific factual assertion
   (a number, a date, a quote, an event, a causal claim) from the
   surrounding interpretation. Vague claims cannot be checked; pin down
   exactly what is being asserted before verifying it.
2. **Trace to the primary source.** Follow the claim back to its origin:
   the study, the official record, the actual quote in context, the raw
   data (see web-research, source-evaluation). A statistic repeated across
   the web often traces to one source that said something narrower, older,
   or different. The original is the check.
3. **Corroborate independently.** Confirm important claims across sources
   that do not depend on each other. Many pages agreeing means little if
   they all copy one origin; independent confirmation from separate
   evidence is what verification requires. One source is a lead, not a
   confirmed fact.
4. **Check quotes and numbers in context.** Quotes get truncated to reverse
   their meaning; statistics get stripped of their caveats, denominators,
   and dates. Verify the exact wording and the full context, not the
   paraphrase. A number without its units, base, and as-of date is not
   yet a fact.
5. **Distinguish fact, inference, and opinion.** Be clear about what is
   established (verified fact), what is reasonable interpretation
   (inference you are drawing), and what is contested or unknown. Present
   each as what it is; dressing an inference as a fact is a subtle form of
   getting it wrong.
6. **Flag what you could not verify.** When a claim cannot be confirmed,
   say so plainly rather than asserting it or quietly dropping it.
   "Reported by X but not independently confirmed" and "I could not verify
   this" are honest and useful; confident assertion of the unverified is
   the failure to avoid.

## Boundaries

- Fact-checking scales with stakes and reach: a private low-stakes note
  needs a light touch; a public claim, a decision input, or anything an
  agent asserts to a user needs rigor, because a confident wrong answer
  does real harm.
- For an AI agent, this is the guard against confident confabulation:
  verify facts, numbers, and quotes against real sources before stating
  them, and never invent a citation (see llm-guardrails, structured-output's
  grounding).
- Verification reduces error; it cannot reach certainty on genuinely
  contested or unknowable questions. There, the honest output is the
  disagreement and the uncertainty, not a manufactured answer.
