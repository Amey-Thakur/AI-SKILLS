---
name: user-story-writing
description: Write user stories around outcomes with testable acceptance criteria, sliced thin enough to ship in days. Use when turning product intent into buildable work or fixing a backlog of vague tickets.
---

# User story writing

A story is a placeholder for a conversation plus a definition of
done. Its job is carrying intent to the people building, so they can
make the hundred small decisions the ticket cannot enumerate.

## Method

1. **Anchor on the outcome, not the mechanism.** "As a
   returning customer, I want to reorder a past purchase in one
   step, so I skip rebuilding my cart": the *so that* clause is
   the test of every implementation choice. If you cannot fill
   it honestly, the story is a task wearing a costume: fine,
   but label it and trace it to a story that does have one.
2. **Write acceptance criteria as checkable scenarios.**
   Given/When/Then for the happy path, the important edge, and
   the failure ("Given the item is discontinued, When they
   reorder, Then substitutes are offered"): these become the
   demo script and the test cases (see bdd-scenarios).
   Criteria like "works well" or "is fast" get numbers or get
   cut (see performance-budgets for the fast ones).
3. **Slice vertically, thin.** Each story crosses the whole
   stack and delivers observable behavior in days: slice by
   scenario (happy path first, edges as follow-ups), by data
   subset (one payment method), by manual-behind-the-scenes
   (concierge backend; see mvp-scoping), never by layer
   ("database story", "API story"): horizontal slices ship
   nothing until everything ships (see
   pull-request-size's identical math).
4. **Carry the context the builders need.** Link the discovery
   evidence (see product-discovery), the design, the metric it
   should move (see product-metrics), and the out-of-scope
   list: what this story deliberately does *not* do prevents
   both gold-plating and "wait, I assumed it included X".
5. **Refine just-in-time, together.** Stories get detailed one
   iteration ahead, with engineers in the room surfacing
   unknowns (spikes for the genuinely unknown, timeboxed);
   a backlog detailed six months deep is inventory that rots
   (see quarterly-planning's altitude for what lives further
   out).
6. **Let the team own the how.** Criteria say what must be
   true; they do not prescribe components, schemas, or
   libraries (see technical-vision and the team's
   architecture for that). A PM writing implementation steps
   into tickets is a smell on both sides of that
   relationship (see agent-pm-eng-loop for the same contract
   between agents).

## Boundaries

- Stories are one tool: bugs, chores, and spikes have their
  own shapes; forcing "as a user I want the build to pass"
  helps nobody (see bug-report-triage for defects).
- The template is scaffolding, not liturgy; a mature team may
  compress the prose, but outcome + criteria + thin slice
  survive every format.
- Estimation debates beyond a size-check ("days or weeks?")
  usually signal a story that needs splitting or a spike, not
  better poker (see estimation-techniques).
