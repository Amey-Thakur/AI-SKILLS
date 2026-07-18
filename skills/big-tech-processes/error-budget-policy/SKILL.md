---
name: error-budget-policy
description: Operate an error budget so reliability decisions follow a written policy instead of an argument: burn-rate alerts, feature freezes, and a clear escalation path. Use when a service has an SLO and you need to decide, without relitigating each incident, when to stop shipping features and fix reliability.
---

# Error budget policy

An error budget turns "how reliable is reliable enough" from a standing debate
into arithmetic: the SLO defines the budget, and spending it triggers agreed
consequences. The policy is Google SRE's mechanism for aligning the people who
want to ship and the people who carry the pager. Without the written rule, every
threshold becomes a negotiation at the worst possible moment.

## Method

1. **Derive the budget from the SLO, in minutes.** The budget is one minus the
   objective over a rolling window: a 99.9% availability SLO over 28 days allows
   about 43 minutes of unavailability. State it as a concrete quantity of bad
   events or downtime, because "we still have budget" only means something as a
   number.
2. **Alert on burn rate, not raw errors.** Configure multiwindow, multi-burn-rate
   alerts: page on a fast burn (14.4x, which spends 2% of a 30-day budget in an
   hour) confirmed over both a 1-hour and a 5-minute window, and open a ticket on
   a slow burn near 3x over a day. This catches the outage and the steady leak
   without paging on every blip.
3. **Write the policy before you need it.** The error budget policy is a document
   signed by the product owner and the on-call team stating exactly what happens
   at each threshold. Agreeing the rule in calm times is what ends the argument
   during an incident.
4. **Freeze features when the budget is spent.** The default consequence of a
   zeroed budget: stop shipping user-facing features and redirect that
   engineering to reliability until the budget recovers over the rolling window.
   Reliability fixes and approved security patches are exempt; new functionality
   is not.
5. **Make exceptions cost something.** Allow a documented override, a silver
   bullet, but require it be spent explicitly and escalated to a named senior
   owner (director or VP) with the reason recorded. If overrides are free, the
   freeze is theater and the budget means nothing.
6. **Fund reliability instead of loosening the SLO.** When a team keeps blowing
   the budget, the fix is engineering investment or an honest renegotiation of
   the SLO with its consumers, not quietly widening the objective until the
   number goes green.
7. **Review the budget and policy each quarter.** Check whether the SLO still
   matches what users need, whether the burn alerts fired correctly, and whether
   freezes happened when they should have. A policy no one enforces trains the
   team to ignore it.

## Signals

- When the budget last hit zero, did feature work actually stop, or did the team
  keep shipping and add a note?
- Can any engineer state the current remaining budget as a number without
  opening a debate?
- Is the override escalation path a named person, or a vague "leadership"?

## Boundaries

Error budgets assume a measurable SLO and a service where reliability trades
against feature velocity: they fit user-facing systems better than one-off batch
jobs or prototypes with no users to disappoint. The thresholds here are starting
points, not law, so tune the windows and burn rates to your traffic, and defer
defining the SLO itself to the production-readiness-review skill.
