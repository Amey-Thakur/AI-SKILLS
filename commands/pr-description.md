---
description: "Write a pull request description that helps reviewers: what changed, why, and how to verify, from a diff."
argument-hint: "[diff]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a pull request description for this change:

{diff}

Context: {context}

Structure:
- Title: a concise summary of the change (imperative, specific).
- What and why: what this PR does and the problem it solves, in a few
  sentences. Lead with the reason a reviewer should care.
- Changes: the key changes as a short list, so a reviewer knows where to look
  and in what order to read.
- How to test / verify: the concrete steps or the automated coverage that
  proves it works, plus anything that needs manual checking.
- Risk and rollout: anything risky (migrations, breaking changes, config), and
  how to roll back if needed. Note out-of-scope items deliberately left out.
- Link the issue/ticket.

Rules: write for the reviewer's time: help them review well and fast. Keep the
PR's actual scope honest (if the diff does two unrelated things, suggest
splitting). No filler; every line helps someone review or merge. Output the
description in markdown, ready to paste.
