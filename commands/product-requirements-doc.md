---
description: "Write a product requirements document (PRD) that defines the problem, the users, and success, without prescribing the build."
argument-hint: "[feature]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a PRD for:

{feature}

Context: {context}

Structure:
- Problem and opportunity: the user problem this solves, with evidence it is
  real and worth solving (see product-discovery thinking). Why now.
- Target users: who this is for, and their relevant needs and context. Be
  specific: "everyone" is not a user.
- Goals and success metrics: what outcome this should move and how you will
  know it worked (the metric, the target). Include guardrail metrics it must
  not harm.
- Requirements: what the product must do, as outcomes and user stories, not
  implementation. Separate must-have from nice-to-have.
- Scope: what is explicitly OUT of scope, so the build stays bounded.
- Open questions and risks: what is undecided, and the biggest risks.

Rules: define the WHAT and WHY (the problem, users, and success), and leave the
HOW to engineering: a PRD that dictates implementation oversteps. Anchor
requirements in the user problem, not feature wishlists. Every requirement
should trace to the problem. If success metrics are missing, the feature has no
definition of done: flag it. Mark assumptions that need validation.
