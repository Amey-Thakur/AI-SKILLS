---
description: "Write clear documentation for code, an API, or a feature, structured for the reader who needs to use it."
argument-hint: "[subject]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write documentation for:

{subject}

Audience: {audience}

Structure for how the reader will use it:
- Start with what it is and what problem it solves, in one or two sentences.
- A quickstart: the fastest path to a working result, with a copy-pasteable
  example and the expected output. Show it working before explaining options.
- Usage: the main capabilities, each with a concrete example.
- Reference: parameters/options/return values, and the errors it can produce
  with how to fix them.
- Keep it scannable: clear headings, short paragraphs, examples over prose.

Rules: examples must be correct and runnable, not pseudo-code that would
error. Explain why, not just what, where the reason is non-obvious. Do not
document what the code plainly shows; document what the reader cannot infer.
Match the depth to the audience: a quickstart for users, full reference for
integrators. If the subject is unclear enough that you would have to guess at
behavior, say what you assumed.
