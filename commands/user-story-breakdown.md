---
description: "Break a feature idea into small, testable user stories with acceptance criteria and honest unknowns."
argument-hint: "[feature]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Break this feature into user stories: {feature}

Context: {context}

For each story:
- **Story**: As a {user type}, I want {capability}, so that {outcome}. The
  outcome must be a user benefit, not a system behavior.
- **Acceptance criteria**: 2-5 testable statements ("given X, when Y, then
  Z"). Each one checkable by a person or a test without interpretation.
- **Size flag**: if a story cannot ship inside one iteration, split it and
  show the split.

Rules:
- Order stories by dependency, then value: the smallest end-to-end slice
  that a user could touch comes first (walking skeleton), enhancements
  after.
- Include the unglamorous stories reality requires: empty states, errors,
  permissions, the migration for existing data - if the context implies
  them.
- Do not invent requirements the context does not support. Collect real
  gaps under **Open questions** at the end, each phrased so a product owner
  can answer it in one sentence.
