---
name: tech-radar
description: Maintain a tech radar that sorts technologies into adopt, trial, assess, and hold against a real evidence bar, and pairs each adoption with a sunset. Use when an organization needs a shared, current view of which tools and techniques to reach for and which to retire.
---

# Tech radar

A tech radar, in the form ThoughtWorks made common, places technologies into four
rings so a whole organization shares one opinion about what to reach for. It
decays into a list of things someone thought were cool: entries with no evidence
behind the ring, nothing ever moving to hold, and adoptions that quietly pile new
tools on top of the old without ever removing anything. A radar earns its keep
by having a bar and by retiring as deliberately as it adopts.

## Method

1. **Sort every entry into exactly one of four rings.** Adopt: proven here, use it
   by default. Trial: worth using on a real project with a fallback. Assess: worth
   a spike to understand, not yet a bet. Hold: do not start anything new with it.
   The ring is a recommendation for action, not a rating of how interesting a thing is.
2. **Require evidence to move inward, and raise the bar per ring.** Assess needs a
   credible reason to look. Trial needs at least one team that shipped something
   real with it. Adopt needs multiple teams, production mileage, and a story for
   operating it. "A senior engineer likes it" moves nothing on its own.
3. **Pair every adopt with a hold.** When you bless a new tool, name what it
   replaces and move that predecessor to hold in the same review. Adoption without
   retirement is how you accumulate three message queues and four ways to do
   config. The radar's discipline is subtraction, not just addition.
4. **Put a named sponsor and a date on each entry.** Someone owns the recommendation
   and the evidence behind it, and every entry carries when it last moved. An
   unsponsored, undated blip is folklore. If no one will put their name on an
   adopt, it is not one.
5. **Re-run the radar on a fixed cadence and let things move.** Quarterly or
   twice a year, revisit every ring. Things graduate inward with evidence, and
   things that disappointed move outward toward hold. A radar where nothing ever
   demotes is a monument, not a working document.
6. **Write a sentence of rationale per blip, including the risks.** Why this ring,
   what it is good for, and where it bites. The value is in the reasoning a reader
   can weigh, not the position on a chart. A ring with no "why" is an opinion
   asking to be obeyed.

## Signals

- Could someone justify each adopt entry with evidence stronger than enthusiasm?
- When something entered adopt, did anything actually move to hold to make room?
- Does every blip have a sponsor and a date it last changed rings?

## Boundaries

A radar records recommendations; it does not make the architectural decision for a
specific system, which belongs in a design doc weighing that context. Ring
definitions and cadence are conventions you set; the point is a consistent
evidence bar, not copying another company's exact rings.
