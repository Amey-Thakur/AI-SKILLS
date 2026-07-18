---
name: bdd-scenarios
description: Write given-when-then scenarios in domain language so stakeholders can read and confirm the behavior each test protects. Use when drafting acceptance criteria or Gherkin features for a user-facing rule.
---

# BDD scenarios

Behavior-driven development (BDD) scenarios earn their keep only when a
product owner reads one and agrees it describes the intended behavior. Padded
with UI clicks or written in code-speak, they become slow tests that nobody
outside engineering trusts. The whole discipline is keeping each scenario in
the language of the business, not the implementation.

## Method

1. **One scenario, one rule.** A scenario names a single behavior:
   `Applying an expired coupon leaves the price unchanged`. If the title
   needs "and" to be honest, split it. Twelve tight scenarios read better
   than three that each test four things.
2. **Given sets state, When is one action, Then is the observable result.**
   Given is prior facts (`Given a cart totaling $80`), When is the single
   trigger under test (`When the customer applies coupon SAVE10`), Then is
   what a user or the system can see (`Then the total is $72`). Never put an
   action in Given or a second When before the Then.
3. **Speak the domain, not the DOM.** Write `When the customer submits the
   order`, not `When I click #submit-btn`. Selectors and keystrokes belong in
   the step definitions, hidden from the reader. A scenario tied to markup
   breaks on a redesign that changed no behavior.
4. **Push the value matrix into Scenario Outline.** One outline with an
   Examples table covers `SAVE10`, `SAVE20`, and an expired code in three
   rows instead of three near-identical scenarios. Keep each row a distinct
   rule, not just a distinct number.
5. **Keep Background to shared facts only.** Background runs before every
   scenario in the file, so it holds setup common to all of them and nothing
   scenario-specific. If a Given appears in every scenario, promote it; if it
   appears in two, leave it inline.
6. **Bind steps to intent in the step layer.** With Cucumber, Behave,
   pytest-bdd, or SpecFlow, one step phrase maps to one function. Reuse
   phrases so the vocabulary stays small and the glue code stays shared.

## Litmus tests

- Can a non-engineer read the `.feature` file aloud and say whether it
  matches the intended rule?
- Does every Then assert something a user or downstream system observes,
  never an internal call or private field?
- If the UI were rebuilt with new markup, would the scenarios survive
  untouched while only step definitions changed?

## Boundaries

BDD is for behavior stakeholders care about, not for exhaustive edge cases:
push the empty, boundary, and malformed-input matrix down to unit tests where
it stays fast and cheap. Follow the team's existing feature-file layout and
tag scheme over the structure shown here.
