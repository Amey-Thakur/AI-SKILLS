---
name: architecture-diagrams
description: Draw architecture diagrams at consistent C4-style levels, as code, kept honest and fit to the audience. Use when documenting a system's structure or when existing diagrams mislead more than they help.
---

# Architecture diagrams

A diagram's job is to build an accurate mental model fast. Most fail
by mixing altitudes (a load balancer beside a class), going stale the
week after they are drawn, or showing the aspirational architecture
instead of the real one. Pick a level, generate from truth, and label
what is real versus planned.

## Method

1. **Choose one altitude per diagram (C4 as the ladder).**
   Context (the system as one box, its users and external
   systems), Container (deployable units: services,
   databases, and how they talk), Component (inside one
   container), Code (rarely worth drawing: the IDE shows
   it). Each diagram stays at one level; the classic
   failure is a single picture mixing a whole-system view
   with one class's methods, useful to nobody.
2. **Match the diagram to the audience and question.**
   Executives and new joiners want Context (what is this,
   what does it touch); engineers designing an integration
   want Container; someone modifying a service wants
   Component (see technical-vision, exec-briefing for the
   altitude-per-audience rule). Draw the diagram that
   answers the reader's actual question, not the one that
   looks most complete.
3. **Diagram as code, versioned with the system.** Mermaid,
   PlantUML, or Structurizr in the repo (see
   markdown-mermaid-writing, docs-as-code): text diffs in
   pull requests, rendered in docs, updated in the same
   change that alters the architecture. Diagrams drawn in a
   GUI tool and pasted as images are stale by definition
   and no one updates them.
4. **Show the real system, label the aspirational.** The
   diagram of what exists (for understanding and
   debugging) and the diagram of the target (for planning:
   see technical-vision) are different documents; conflating
   them ("this is our architecture", showing services that
   do not exist yet) misleads everyone. Mark planned/
   deprecated components explicitly.
5. **Label the edges, not just the boxes.** The arrows
   carry the information: what protocol, sync or async,
   what data flows, which direction the dependency points
   (see coupling-analysis). A diagram of unlabeled boxes
   connected by unlabeled lines shows that things are
   connected, which the reader already assumed.
6. **Keep it legible and current.** A dozen boxes at most
   per diagram (split or zoom rather than cram);
   consistent notation (a legend if it is not obvious);
   and a review trigger: architecture changes update the
   diagram in the same PR, and periodic checks catch drift
   (see docs-maintenance). A confidently wrong diagram is
   worse than none, because readers trust it.

## Boundaries

- Diagrams complement prose and code, they do not replace
  the design record: the *why* lives in ADRs (see
  architecture-decision-records), the *what* in the
  diagram, the *how* in the code.
- Over-diagramming (a picture for every trivial
  interaction) is its own waste; diagram the things worth
  a shared mental model, not everything.
- Auto-generated dependency graphs show what the code
  actually does (ground truth) but are often too noisy
  for human understanding; hand-curated diagrams at
  chosen altitudes remain necessary for communication.
