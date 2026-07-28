---
name: agent-ops-command
description: Run the daily operating rhythm with agents that sweep every system each morning, surface what needs a decision, and keep nothing waiting silently. Use when running a business day to day and things fall through the cracks between desks.
---

# Agent operations command

Most operational failure is not a crisis but an omission: an invoice
unsent, a customer unanswered, a deploy half done. A command desk exists
to sweep everything once a day and turn the sweep into a short list a
human can clear, which is the opposite of a dashboard nobody opens.

## Team

- **Sweeper**: checks every system for items past their expected state.
- **Prioritiser** (`prioritize-tasks`): orders findings by consequence
  and deadline rather than by age.
- **Briefer** (`status-updates`): writes the one-page morning brief.

Shape: a scheduled daily sweep producing a single ranked action list.

## Method

1. **Define the sweep list once, explicitly.** Which systems, which
   condition counts as stuck, and what the expected state is. A sweep
   without defined expectations finds nothing.
2. **Look for absence, not just errors.** The invoice not sent and the
   reply not written produce no alert anywhere, and they are most of
   what goes wrong (see agent-company-blueprint).
3. **Rank by consequence and deadline.** A customer waiting two days
   outranks a tidy-up task created this morning, regardless of which was
   raised first.
4. **Cap the brief.** Ten items maximum, with everything else counted
   rather than listed, because an exhaustive brief is one nobody
   finishes reading.
5. **Assign every item an owner and a date.** An item on a list with no
   owner is on the list again tomorrow.
6. **Close the loop the next morning.** Yesterday's items appear with
   their status first, which is what prevents a rolling backlog
   disguised as a daily brief.
7. **Escalate anything aging past a threshold.** Repeated appearance
   without progress is itself the finding.

## Run it

In Claude Code, run the sweeper on a schedule across each desk's output
files and any exported system state, then the prioritiser and briefer in
sequence into a dated brief file. The human clears the list. Port to
CrewAI as a scheduled sequential crew, or LangGraph with a node per
system feeding one ranking node.

## Signals it works

- The brief opens with yesterday's items and their outcomes.
- Items have owners and dates, and aging items escalate.
- Things that quietly stalled are caught within a day rather than a week.

## Boundaries

This desk finds and ranks; it does not act on the items, and anything
touching money, customers, or public channels stops at a human. It
reports on systems it can read, so a system outside the sweep list is
invisible to it. Judgement about what actually matters this week remains
the operator's.
