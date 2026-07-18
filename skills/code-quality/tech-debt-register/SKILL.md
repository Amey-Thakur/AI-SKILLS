---
name: tech-debt-register
description: Track technical debt deliberately by framing each item as interest owed and budgeting steady paydown. Use when debt is piling up as vague complaints and you need to make it fundable work.
---

# Tech debt register

Technical debt is a metaphor with a sharp edge. Like financial debt it
carries interest: the recurring drag every future change pays until you
settle the principal. Untracked, debt is just a feeling that the code is bad.
A register turns it into named items with a cost, so paydown competes for
time on evidence instead of vibes.

## Method

1. **Log debt as items with a cost, not a mood.** Each entry names what is
   wrong, where, why it hurts, and the estimated fix: "auth checks copied
   across 6 controllers; a rule change means 6 edits and one miss is a hole."
   Keep it in the tracker beside features, not a wiki no one opens.
2. **Frame each item by its interest rate.** High-interest debt taxes
   frequent changes in a hot module everyone touches; low-interest debt sits
   in stable code no one edits. A messy file untouched for two years is debt
   at near-zero interest.
3. **Prioritize by interest, not principal.** Pay down what you keep paying
   interest on, even when the fix is large, before cheap fixes in cold code.
   The question is not "how ugly" but "how often does this ugliness cost us."
4. **Budget a standing slice of capacity.** Reserve a fixed fraction of each
   sprint, commonly 15 to 20 percent, for paydown. A named budget beats "when
   we have time," which never arrives. Track it like any other work.
5. **Attach debt to the features it blocks.** When an item slows a roadmap
   feature, record the link. Debt that gates revenue work gets funded; debt
   argued on principle alone loses to the next deadline. Make the drag
   visible to whoever sets priorities.
6. **Prune on a cadence.** Quarterly, walk the register: delete items made
   irrelevant by other changes, and re-cost interest as usage shifts. A
   register no one prunes becomes a graveyard, and graveyards get ignored.

## Signals

- Can you name the three highest-interest items and say what each one taxes?
- Did paydown actually get capacity this sprint, or lose to features
  silently?
- Would a new hire understand each entry's cost without asking you?

## Boundaries

A register organizes deliberate debt; it does not license shipping known-bad
code because "it is tracked." Bugs and security holes are defects, not debt:
route them through the normal bug flow. Defer prioritization ties to the
team's planning process and the product owner.
