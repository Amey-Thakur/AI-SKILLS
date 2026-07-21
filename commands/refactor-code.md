---
description: "Suggest refactorings that improve readability and structure without changing behavior, ranked by payoff."
argument-hint: "[code]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Refactor this code. Preserve behavior exactly.

{code}

Primary concern: {concern}

Approach:
1. State in one sentence what this code does, so we agree on the behavior
   that must not change.
2. Identify the 2-4 highest-payoff improvements, ranked. For each: the
   problem (a name, a smell, a duplication, a deep nesting), and why it
   matters here.
3. Show the refactored code. Keep it idiomatic to the language and consistent
   with the style already present; do not rewrite in your preferred style.
4. Call out anything you changed that could subtly alter behavior (edge
   cases, error paths, ordering), so it can be verified.

Rules: refactoring changes structure, not behavior. Do not add features, do
not change the public interface unless asked, and do not gold-plate. If the
code is already clean, say so rather than inventing changes.
