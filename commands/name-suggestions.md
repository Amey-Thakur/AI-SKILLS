---
description: "Suggest clear, precise names for a variable, function, class, or feature, with tradeoffs."
argument-hint: "[thing]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Suggest names for: {thing}

Context (language, conventions, domain): {context}

Provide 5-7 candidates, best first. For each: the name and a one-line note on
what it emphasizes or where it might mislead.

Judge names by:
- Accuracy: says what the thing actually is or does, no more, no less.
- Precision: specific over generic (`retryCount` over `count`, `parseInvoice`
  over `handleData`); no vague fillers (data, info, manager, util, helper)
  unless genuinely apt.
- Convention: fits the language and codebase (casing, verb-for-functions,
  noun-for-values, boolean `is/has/should` prefixes).
- Length: as short as possible while staying clear; scope-appropriate (loop
  index can be terse, a module-level export cannot).

End with your single recommendation and why. If the naming difficulty signals
the thing is doing too much (hard to name = unclear responsibility), say so.
