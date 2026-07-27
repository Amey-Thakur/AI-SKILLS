---
name: agent-customer-success-team
description: Run retention as a standing function with agents that watch usage signals, spot churn risk early, prepare account reviews, and hand humans a specific reason to reach out. Use when customers leave without warning and renewals are handled reactively.
---

# Agent customer success team

Churn is usually visible weeks before it happens and nobody is looking.
The signals are dull to monitor and easy to automate: usage falling,
key features abandoned, tickets rising, a champion gone quiet. Agents
watch continuously; humans do the part that saves the account.

## Team

- **Health monitor** (`churn-analysis`, `product-metrics`): tracks
  per-account signals against a defined health model.
- **Risk analyst**: explains why an account moved, distinguishing a
  seasonal dip from a real decline.
- **Review preparer**: assembles the account brief a human takes into
  the conversation.

Shape: continuous monitoring with escalation, feeding a per-account
review pack on a cadence.

## Method

1. **Define health from behaviour, not sentiment.** Depth of use,
   breadth across the team, frequency, and value realised, each with a
   threshold. A score nobody can decompose is a number, not a signal.
2. **Alert on trend, not on level.** A steady low user is not the risk;
   the account that halved its usage this month is. Direction and rate
   carry the information.
3. **Make the analyst explain before anyone acts.** A drop with a known
   cause needs different handling from an unexplained one, and skipping
   this step produces outreach that reads as clumsy surveillance.
4. **Prepare the human, do not replace them.** The review pack states
   what changed, when, likely causes, what the customer bought it for,
   and two or three concrete options to discuss.
5. **Watch the relationship, not only the product.** A departed
   champion, an unanswered ticket, or an unrenewed sponsor predicts
   churn as strongly as usage (see agent-support-desk).
6. **Close the loop on outcomes.** Record what was tried and whether the
   account recovered, because the health model only improves against
   real results.
7. **Separate save-worthy from not.** Some accounts were mis-sold or a
   poor fit, and pretending otherwise consumes effort better spent on
   accounts that can succeed.

## Run it

In Claude Code, run the monitor on a schedule over exported usage and
ticket data, escalating to the analyst only for accounts crossing a
threshold, then generating a review pack file per account. Every
customer-facing message stays with a human. Port to LangGraph with a
threshold node gating the expensive analysis, or CrewAI as a
scheduled crew per at-risk cohort.

## Signals it works

- Risk is flagged weeks before renewal, not during it.
- Each alert carries an explanation, so outreach is specific.
- Outcomes are recorded, and the health model changes because of them.

## Boundaries

Agents watch and prepare; they do not talk to customers, make
commitments, or issue credits and discounts. Usage monitoring must stay
within what your privacy policy and contracts permit, and per-user
behavioural tracking has limits (see data-minimization). A relationship
in trouble is repaired by a person who can actually change something.
