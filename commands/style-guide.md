---
description: "Write a style guide specific enough to settle real disagreements rather than restating general advice."
argument-hint: "[scope]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a style guide for:

{scope}

Reference examples: {examples}

Use technical-writing, clear-writing, and agent-brand-guardian.

Cover:
- Voice, with examples of what qualifies and what does not.
- Terminology: one term per concept, with the chosen term and rejected
  alternatives.
- Formatting conventions for headings, lists, and code.
- Common mistakes with corrections.
- Words and phrases to avoid, with reasons.
- What is deliberately left to the writer.

Rules: every rule needs an example, since abstract guidance is not
checkable. Prefer showing to describing. Keep it short enough to be read.
State which rules are firm and which are preferences.
