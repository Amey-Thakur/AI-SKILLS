---
description: "Specify a technical diagram that answers one question at one level of abstraction."
argument-hint: "[system]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Design a diagram for:

{system}

Question it answers: {question}

Use technical-diagrams and architecture-diagrams.

Produce:
- The single question this diagram answers.
- The abstraction level, held consistently.
- Components shown, and what is deliberately omitted.
- Every arrow labelled with what flows and in which direction.
- Trust, network, and ownership boundaries.
- Diagram-as-code source so it can be versioned.
- What a second diagram would need to cover.

Rules: one question per diagram; do not mix system overview with
component internals. Label every arrow. Show boundaries, since they
carry most of the meaning. Prefer text-based source so it stays current.
