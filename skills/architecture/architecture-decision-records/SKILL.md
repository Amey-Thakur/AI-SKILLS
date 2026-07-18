---
name: architecture-decision-records
description: Capture each significant architecture decision as a short, immutable record of context, decision, and consequences with a tracked status. Use when a choice is costly to reverse or crosses teams and the reasoning must outlive the people who made it.
---

# Architecture decision records

A decision made in a meeting evaporates the moment the room clears, and six
months later someone reverses it without knowing what it cost the last time.
An ADR is the durable answer to "why is it built this way": one file, written
once, that a future maintainer can trust more than anyone's memory.

## Method

1. **One decision per record, numbered and immutable.** Name files
   `docs/adr/0007-use-postgres-for-billing.md`. The number never changes and
   the file is append-only after acceptance. A record that mixes two decisions
   cannot be superseded cleanly when only one of them ages out.
2. **Write the context as forces, not narrative.** State the constraints,
   requirements, and pressures in play: throughput targets, team skills,
   existing contracts, deadlines. The reader must feel the pressure that made
   the decision reasonable at the time, even if it looks wrong later.
3. **State the decision in the active voice.** "We will store billing events
   in Postgres and stream them to the warehouse nightly." Not "Postgres seems
   like a good option." A decision hedged into a suggestion is not a decision.
4. **Record consequences honestly, both signs.** List what gets easier and
   what gets harder: the new operational burden, the capability you gave up,
   the follow-on work this forces. An ADR with only upsides is marketing.
5. **Track status through a fixed lifecycle.** Proposed, accepted, deprecated,
   superseded. When a later ADR overrides this one, mark it "Superseded by
   ADR-0021" and link both directions. Never edit the decision of an accepted
   record: write a new one that replaces it.
6. **Keep the record next to the code it governs.** Store ADRs in the repo, not
   a wiki that drifts. Tools like `adr-tools` or the MADR template scaffold the
   file and the index; a link from the affected module's README closes the loop.

## Litmus tests

- Can a new engineer read the record and defend the decision to a skeptic
  without asking anyone what really happened?
- Does every accepted ADR name at least one consequence the team dislikes?
- When a decision is reversed, can you find the superseding record from the old
  one in a single click?

## Boundaries

Record decisions that are expensive to reverse or affect more than one team:
routine, two-way-door choices belong in the commit message, not an ADR. Adopt
your organization's existing RFC or ADR template where one is in use rather
than inventing a parallel format.
