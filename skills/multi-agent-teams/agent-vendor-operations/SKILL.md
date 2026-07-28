---
name: agent-vendor-operations
description: Track every vendor's cost, renewal, usage, and access with agents that flag waste and surface renewals before they auto-renew. Use when software spend grows quietly and nobody knows what is still in use.
---

# Agent vendor operations

Vendor spend grows through accumulation rather than decision: tools
adopted for a project, auto-renewing forever, with seats for people who
left. The work of tracking it is dull, continuous, and exactly what a
standing desk handles well.

## Team

- **Inventory keeper**: maintains the register of vendors, owners,
  costs, and renewal dates.
- **Usage analyst**: compares seats and consumption against what is
  paid for.
- **Renewal watcher**: surfaces upcoming renewals with a recommendation
  in time to act.

Shape: a standing register with scheduled usage checks and renewal
alerts.

## Method

1. **Build the register from billing, not from memory.** Card and
   invoice records find the subscriptions nobody remembers, which are
   usually the wasteful ones (see agent-finance-desk).
2. **Give every vendor an internal owner.** Unowned tools are never
   cancelled and never reviewed, and ownership is the single most
   effective control here.
3. **Compare seats to active users.** Departed staff and unused licences
   are the most common overspend and the easiest to fix (see
   agent-people-ops-desk).
4. **Alert on renewal with enough notice to act.** Before the notice
   period, not before the renewal date, since the notice period is what
   actually binds you.
5. **Track access alongside cost.** Which vendors hold your data and
   which have production access matters more than their price (see
   vendor-data-processing).
6. **Review overlap deliberately.** Two tools doing one job is common
   after any growth period, and consolidation is easier to justify at
   renewal.
7. **Record the decision at each renewal.** Renew, renegotiate, or
   cancel, with a reason, which makes next year's review fast.

## Run it

In Claude Code, keep the register as a tracked file, run the inventory
keeper over exported billing data, the usage analyst over exported seat
lists, and the renewal watcher on a schedule producing alerts. Purchase
and cancellation stay human. Port to CrewAI as scheduled maintenance
tasks with a human gate.

## Signals it works

- Every vendor has an owner, a cost, and a renewal date.
- Renewals surface before the notice period, not after.
- Unused seats are found and removed without anyone remembering to look.

## Boundaries

Agents track and recommend; humans negotiate, cancel, and pay. Never
give an agent access to billing credentials or the ability to change a
subscription. Contract terms including notice periods and auto-renewal
are legal commitments (see agent-legal-desk, agent-procurement-desk).
