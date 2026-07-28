---
name: agent-executive-briefing
description: Produce a short honest briefing across every desk on a fixed cadence, surfacing decisions needed rather than activity performed. Use when leading a business through agent desks and needing one readable view.
---

# Agent executive briefing

The failure of any multi-desk arrangement is that each desk reports and
nobody synthesises, leaving the operator with six documents and no
picture. A briefing desk exists to produce the one page that names what
changed, what is at risk, and what needs deciding.

## Team

- **Collector**: gathers each desk's current state file.
- **Synthesiser** (`exec-one-pager`): writes the briefing across desks
  rather than desk by desk.
- **Omission checker**: hunts for the bad news the synthesis softened.

Shape: scheduled collection, synthesis, then an adversarial pass.

## Method

1. **Fix the cadence and the shape.** Same sections, same order, same
   day, so a reader can find the part they care about without reading
   the whole thing.
2. **Lead with decisions needed, not activity done.** The operator's
   scarce resource is decisions, and activity summaries bury them.
3. **Synthesise across desks, do not concatenate them.** Sales
   optimism beside a finance runway warning is one story, and reporting
   them separately hides it (see agent-company-blueprint).
4. **State movement with a cause.** Every material change gets a named
   reason, and unknown is an acceptable and useful answer.
5. **Run the omission check as a separate pass.** Its only job is
   finding what a well-informed sceptic would want that the draft does
   not say (see agent-board-reporting).
6. **Keep it to one page with links.** Depth lives in the desk files;
   the briefing is the index and the judgement.
7. **Track decisions to their outcome.** Last period's decisions appear
   with what happened, which is what makes the briefing a loop rather
   than a broadcast.

## Run it

In Claude Code, run the collector over each desk's output directory,
then the synthesiser, then the omission checker as a distinct subagent
whose findings append to the briefing before the human reads it. A
scheduled run makes the cadence real. Port to LangGraph with a fan-in
node and a verification node.

## Signals it works

- The briefing opens with decisions, and previous decisions carry
  outcomes.
- The omission check regularly restores something the draft softened.
- Cross-desk contradictions surface rather than sitting in two files.

## Boundaries

This synthesises what desks report; it cannot see what they do not
capture, and a desk reporting badly produces a confident wrong briefing.
Agents summarise and do not decide. Anything shared beyond the operator,
particularly with investors or staff, is a human communication with its
own obligations.
