---
name: agent-brand-guardian
description: Keep every outgoing artefact consistent in voice, claims, and terminology with agents that check against a written brand definition. Use when output comes from many sources and the product sounds like several different companies.
---

# Agent brand guardian

Consistency is the part of brand that scales badly with people and
perfectly with agents. A guardian holds one written definition and
applies it to everything, which is exactly the discipline that erodes
when five people write under deadline.

## Team

- **Voice checker**: applies the written voice definition to any draft.
- **Claims checker**: verifies every factual and comparative statement
  against a source.
- **Terminology keeper**: enforces the product lexicon and flags drift.

Shape: a standing gate that any outgoing artefact passes through.

## Method

1. **Write the brand definition down concretely.** Voice attributes with
   examples of what does and does not qualify, banned phrasing, and the
   product lexicon. Abstract adjectives cannot be checked.
2. **Check every outgoing artefact, whatever its source.** Marketing,
   docs, support replies, release notes, and error messages all shape
   perception, and error text is the most read and least reviewed.
3. **Verify claims against sources, always.** Performance numbers,
   comparisons, and customer outcomes need evidence or they are cut (see
   agent-marketing-studio).
4. **Enforce terminology mechanically.** One name per concept, applied
   everywhere, since synonyms in a product's own vocabulary confuse
   users and search alike (see documentation).
5. **Separate blocking from advisory findings.** A false claim blocks; a
   stylistic preference advises. Treating both as blocking makes the
   gate ignored.
6. **Feed real changes back into the definition.** When a deliberate
   exception is approved, the definition updates rather than the
   exception becoming folklore.
7. **Keep a human as the final arbiter of voice.** Taste is not
   checkable, and the guardian's job is consistency rather than
   judgement.

## Run it

In Claude Code, keep the brand definition as a tracked file and run the
three checkers as one subagent pass over any draft, producing a
marked-up findings file with blocking items separated. Publication stays
human. Port to CrewAI as a review crew invoked before any publish task.

## Signals it works

- Unsupported claims are caught before review, not after publication.
- One term is used for one concept across docs, UI, and marketing.
- The definition changes when an exception is deliberately accepted.

## Boundaries

The guardian enforces a written standard; it cannot invent a brand or
judge whether the voice is right for the market. Advertising claims are
regulated, and substantiation is a legal obligation (see
agent-legal-desk). Never let it rewrite someone's words in a personal
byline without consent.
