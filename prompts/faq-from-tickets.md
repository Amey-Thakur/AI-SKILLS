---
name: faq-from-tickets
description: Turn recurring support tickets into a FAQ that deflects them, using the customer's own phrasing.
variables:
  - "{tickets}: recurring questions with their resolutions"
  - "{product}: the product and where the FAQ will live"
settings: "Temperature 0.3."
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
