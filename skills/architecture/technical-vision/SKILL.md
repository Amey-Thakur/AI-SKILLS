---
name: technical-vision
description: Write a north-star architecture document that sequences migrations and guides decisions without pretending to be a roadmap. Use when a team's technical direction is unclear or every design debate restarts from zero.
---

# Technical vision

A technical vision is the shared picture of where the architecture is
going and why, so that a hundred independent decisions pull in the
same direction instead of scattering. It is not a roadmap (no dates,
no deliverables) and not a fantasy (it sequences reachable steps); it
is the coherence that lets teams decide locally and still converge.

## Method

1. **State the destination and the why.** The target
   architecture in a few Container-level diagrams (see
   architecture-diagrams) and the forces driving it
   (scaling limits hit, team boundaries, a strategic
   capability the current shape cannot support): the *why*
   is what lets people apply the vision to situations it
   did not anticipate. A destination without a rationale
   gets cargo-culted or ignored.
2. **Anchor in current reality, honestly.** Describe the
   system as it actually is (the real diagram, not the
   aspirational one: see architecture-diagrams' honesty
   rule), including the debt and the ugly parts; a vision
   that pretends the starting point is clean produces a
   plan that does not survive contact with the codebase
   (see tech-debt-register).
3. **Sequence the path as principles, not a Gantt chart.**
   The order of movement (what must come first, what
   unlocks what) and the migration strategy (strangler-fig
   for the big moves: see strangler-fig), expressed as
   direction and next steps, not dated commitments. This
   is the difference from a roadmap (see
   roadmap-communication): the vision says "toward",
   the roadmap says "by when", and conflating them makes
   the vision brittle.
4. **Make it decision-useful.** The test of a vision: can a
   team facing a design choice consult it and know which
   option moves toward the destination? Encode the load-
   bearing principles (data ownership, sync vs async, build
   vs buy defaults: see managed-vs-selfhosted) so daily
   decisions (see architecture-decision-records) ladder up
   to it without a meeting. A vision nobody consults while
   deciding is decoration.
5. **Build it with the people who will execute it.** A
   vision handed down is resisted; one shaped with the
   engineers who will build it and the stakeholders it
   serves (see rfc-process, mentoring-engineers'
   collaboration) earns the buy-in that makes it real.
   Circulate it, take the disagreement seriously (the
   objections are usually load-bearing), and revise.
6. **Keep it alive and falsifiable.** Revisit as reality
   and strategy shift (the destination is a hypothesis,
   not a monument); mark what has been reached and what
   changed; retire it honestly when the business pivots
   past it. A three-year-old vision describing a strategy
   the company abandoned actively misleads (see
   feature-sunsetting's honesty about dead things).

## Boundaries

- A vision guides architecture decisions; it does not
  replace them (see architecture-decision-records) or
  the roadmap that schedules the work (see
  roadmap-communication). It is the layer above both.
- Vision without execution is a slide deck; the sequencing
  and migration steps (see strangler-fig,
  cloud-migration) are what make it real, and they belong
  to the teams, not the document.
- Over-specified visions (dictating implementation, not
  direction) rob teams of the local judgment that makes
  them effective; the vision sets the destination and the
  principles, the teams choose the path (see
  user-story-writing's let-the-team-own-the-how, at
  architecture scale).
