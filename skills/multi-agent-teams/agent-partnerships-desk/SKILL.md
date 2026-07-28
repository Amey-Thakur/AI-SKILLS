---
name: agent-partnerships-desk
description: Research, qualify, and prepare partnership approaches with agents, leaving the relationship and the commitment to a human. Use when business development is ad hoc and partner conversations start without preparation.
---

# Agent partnerships desk

Partnerships fail from poor selection and poor preparation far more than
from poor negotiation. Agents are well suited to the selection and
preparation, which are research problems, and completely unsuited to the
relationship, which is the actual work.

## Team

- **Scout**: builds a candidate list against a written partner profile.
- **Fit analyst** (`agent-competitive-analysis-team`): assesses
  strategic fit, overlap, and conflict.
- **Brief writer**: prepares the approach pack for the human who will
  make contact.

Shape: profile first, parallel candidate research, one brief per
qualified partner.

## Method

1. **Write the partner profile before scouting.** What you need from a
   partner, what you offer, and what disqualifies. Without it the scout
   returns a list of companies you have heard of.
2. **Assess mutual value honestly.** What they gain must be stated as
   clearly as what you gain, because a one-sided partnership is declined
   or quietly abandoned.
3. **Check for conflict early.** Existing partnerships, competitive
   overlap, and channel conflict kill deals late if found late.
4. **Prepare the specific ask.** Integration, referral, co-marketing, or
   reseller, with the smallest viable first step rather than a broad
   proposal to partner.
5. **Assemble the brief for a human conversation.** Who they are, why
   now, the ask, the likely objections, and the answers. The human
   reads this and talks to a person.
6. **Track the pipeline like sales.** Stages with dated next steps and
   honest loss reasons (see agent-sales-pipeline).
7. **Revisit declined candidates on a schedule.** Timing is the most
   common reason for no, and it changes.

## Run it

In Claude Code, write the partner profile file, run the scout to produce
a candidate list, then a fit analyst subagent per shortlisted candidate
writing into its own file, then a brief per qualified partner. All
outreach is human. Port to CrewAI as parallel research tasks feeding a
brief task.

## Signals it works

- Candidates trace to a written profile rather than to familiarity.
- Each brief states what the partner gains, specifically.
- Declined candidates carry a reason and a revisit date.

## Boundaries

Agents research and prepare; humans build the relationship, negotiate,
and sign. Never let an agent contact a partner, share confidential
information, or imply a commitment. Partnership agreements need legal
review (see agent-legal-desk), and exclusivity or channel terms have
consequences well beyond the deal.
