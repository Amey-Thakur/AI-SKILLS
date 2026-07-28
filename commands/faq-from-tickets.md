---
description: "Turn recurring support tickets into a FAQ that deflects them, using the customer's own phrasing."
argument-hint: "[tickets]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Build a FAQ from:

{tickets}

Product: {product}

Use knowledge-base-design and customer-feedback-loop.

Produce:
- Questions phrased as customers actually ask them, ordered by frequency.
- Direct answers in the first sentence.
- Steps where an action is required.
- Which questions signal a product problem worth fixing instead.
- Where each entry should be surfaced in the product.

Rules: use the customer's words, not internal terminology. Answer
directly rather than explaining background first. Flag the questions that
should be designed away rather than documented. Note the entries that
will go stale and need an owner.
