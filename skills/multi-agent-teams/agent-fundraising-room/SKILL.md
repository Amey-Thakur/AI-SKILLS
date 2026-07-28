---
name: agent-fundraising-room
description: Prepare a raise with agents that assemble the narrative, stress-test it as an investor would, and organise diligence material, while the founder owns every conversation. Use when preparing to raise and the story keeps changing between meetings.
---

# Agent fundraising room

A raise is won on a consistent story backed by clean numbers, and lost
on inconsistency between the deck, the model, and what the founder says.
Agents are good at consistency checking and diligence organisation, and
have no place in the conversation itself.

## Team

- **Narrator** (`exec-one-pager`, `prfaq`): drafts the story and the
  deck outline from real material.
- **Investor skeptic** (`devils-advocate`): asks the hardest questions
  an investor would, from the investor's incentives.
- **Diligence organiser**: assembles and indexes the material a data
  room needs.

Shape: draft, adversarial review, then diligence assembly, all human
approved.

## Method

1. **Start from the numbers, not the narrative.** The story must follow
   what the metrics actually show, since a deck that outruns the data
   fails at diligence rather than at the pitch (see agent-finance-desk).
2. **Make one claim the centre.** Why this, why now, why you. A deck
   with five equally weighted claims makes none of them.
3. **Run the skeptic hard and early.** Market size, competition,
   retention, unit economics, and key-person risk, asked as an investor
   would rather than as a supportive colleague.
4. **Fix the story or fix the business.** A question the skeptic
   exposes as unanswerable is a real gap, not a messaging problem.
5. **Assemble diligence before you need it.** Cap table, contracts,
   financials, metric definitions, and policies indexed in advance,
   because a slow data room stalls momentum (see agent-legal-desk).
6. **Keep every number consistent across artefacts.** Deck, model, and
   data room must agree exactly, and the desk's main mechanical value is
   checking that they do.
7. **Rehearse with the skeptic's list.** The founder answers the hard
   questions aloud before hearing them from an investor.

## Run it

In Claude Code, run the narrator over the metrics and existing material
into a deck outline, then the skeptic as a separate subagent producing a
question list with the weakest answers flagged, then the organiser
building a diligence index. Every investor-facing artefact is human
approved. Port to AutoGen as a GroupChat where the skeptic holds a
standing challenge role.

## Signals it works

- The deck, the model, and the data room state the same numbers.
- The skeptic's hardest questions have answers before any meeting.
- Diligence material exists before it is requested.

## Boundaries

Agents prepare; the founder raises. Statements to investors carry legal
weight, and forward-looking claims, valuations, and financial statements
need qualified review. Nothing here is financial or legal advice, and no
agent should contact investors or handle confidential diligence material
outside your approved systems.
