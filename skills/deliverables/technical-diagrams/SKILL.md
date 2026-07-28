---
name: technical-diagrams
description: Draw system, sequence, and flow diagrams that clarify rather than decorate, at a consistent level of abstraction. Use when explaining a system to people who did not build it.
---

# Technical diagrams

A diagram is a compression of a system for a specific audience and
question. Diagrams that try to show everything at once show nothing, and
the common failure is mixing levels of abstraction on one canvas.

## Method

1. **Decide the question the diagram answers.** How data flows, what
   calls what, or how a request is sequenced. One diagram, one question.
2. **Keep one level of abstraction per diagram.** Mixing a whole system
   with the internals of one component is what makes diagrams
   unreadable (see architecture-diagrams).
3. **Label every arrow with what flows and in which direction.** Unlabelled
   arrows are the most common source of misreading.
4. **Show boundaries explicitly.** Trust, network, and ownership
   boundaries carry most of the meaning in a system diagram.
5. **Prefer diagrams as code for anything maintained.** Text-based
   diagrams live in version control, diff, and update with the system
   rather than becoming stale images (see documentation).
6. **Use consistent shapes and colour with a legend.** Convention within
   your organisation matters more than any standard notation.
7. **Keep it small enough to read.** If it does not fit legibly on a
   screen, it is several diagrams (see scientific-schematics).

## Boundaries

Diagrams simplify by omitting, and every diagram is wrong in the ways it
compresses. They go stale faster than prose because systems change
faster than pictures get updated. A diagram cannot substitute for a
written explanation of why the design is as it is (see
architecture-decision-records).
