---
description: "Write an ADR that captures a technical decision, its context, and its consequences so future teams know why."
argument-hint: "[decision]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write an Architecture Decision Record for:

{decision}

Context: {context}

Structure (keep it short, one page):
- Title: the decision, as a short noun phrase.
- Status: proposed / accepted / superseded.
- Context: the forces and constraints that made this decision necessary: the
  technical, business, and team factors. What is true that makes this a
  decision worth recording.
- Decision: what we decided, stated plainly and actively ("We will use X").
- Consequences: what becomes easier and what becomes harder as a result. The
  tradeoffs accepted, the new constraints, the follow-on work. Be honest about
  the downsides: an ADR that only lists benefits is a sales pitch.
- Alternatives considered: the other options and the one-line reason each lost.

Rules: capture the WHY, because that is what future readers cannot recover from
the code (the code shows what, the ADR shows why). Concise: an ADR is a record,
not an essay. Honest about consequences, including the ones you dislike. If the
decision is still open, mark status proposed and note what would settle it.
Output in markdown.
