---
name: design-diagram
description: Specify a technical diagram that answers one question at one level of abstraction.
variables:
  - "{system}: the system, its components, and how they relate"
  - "{question}: what the diagram must make clear, and for whom"
settings: "Temperature 0.3."
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
