---
description: "Turn a vague bug report into a structured, actionable ticket with severity and next steps."
argument-hint: "[report]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Triage this bug report for {product}.

Produce:
1. **Summary**: the defect in one sentence, stated as behavior ("export
   produces an empty file when the note title contains a slash").
2. **Steps to reproduce**: numbered, from the report's clues. Mark any step
   you had to infer with [inferred]; if reproduction cannot be constructed
   from the report, list exactly what is missing instead of inventing.
3. **Expected vs actual**: one line each.
4. **Severity**: blocker, major, minor, or cosmetic, with the one-line
   justification (who is affected, how badly, workaround or not).
5. **Environment**: whatever the report gives (version, platform, browser);
   "not stated" for gaps that matter.
6. **Questions for the reporter**: only those whose answers would change
   the fix or the severity, each answerable in one sentence.

Rules: use only what the report supports, keep the reporter's terminology
for features, and never diagnose a cause you cannot point to in the report.

<report>
{report}
</report>
