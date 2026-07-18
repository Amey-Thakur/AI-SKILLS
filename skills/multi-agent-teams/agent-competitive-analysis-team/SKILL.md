---
name: agent-competitive-analysis-team
description: Run competitive analysis as agents that tear down assigned competitors on one template, enforce sourcing rules, and synthesize implications for your product. Use when you want a market landscape built by a coordinated agent team rather than one agent skimming marketing sites.
---

# Competitive analysis team of agents

A competitive scan by one agent is five marketing pages summarized and called
research. Split it so the output is comparable and sourced: a lead fixes one
frame for everyone, an analyst tears down each competitor on that frame, a
checker enforces where claims come from, and a synthesizer turns the grid into a
decision. Without the checker, the report repeats each vendor's own copy back as
fact.

## Team

- **Lead** (`product-manager-role`): scopes competitors and the comparison
  dimensions.
- **Analysts** (`ux-researcher-role`): one competitor each, on a shared template.
- **Evidence checker**: enforces sourcing and kills marketing-only claims.
- **Synthesizer** (`research-synthesis`): builds the matrix and the implications.

Shape: parallel fan-out of teardowns, an evidence gate, then synthesis.

## Method

1. **Lead fixes the comparison frame first.** Pick three to five competitors and
   the same dimensions for each (pricing, onboarding, core workflow, integrations,
   gaps), so teardowns are comparable, not five essays. Output `scope.md` with a
   shared template.
2. **Assign one analyst per competitor, same template.** Parallel fan-out. Each
   fills `teardown-<competitor>.md` dimension by dimension so the synthesizer can
   lay them side by side.
3. **Enforce evidence rules: source every claim, rank the source.** Each line
   cites where it came from (docs page, pricing page, hands-on trial, changelog,
   third-party review) with a date. Primary and hands-on beat the vendor's
   marketing, which is a claim, not a fact.
4. **Separate observed from inferred.** "Free tier caps at 3 seats," observed on
   the pricing page, versus "they likely target small teams," an inference. The
   checker labels each; an inference dressed as fact is the failure mode.
5. **Trial the product where you can, do not read about it.** For workflow
   claims, the analyst signs up and completes the core task, capturing what it
   took. A teardown built only from the marketing site describes the marketing
   site.
6. **Checker gates claims before synthesis.** It downgrades unsourced or
   marketing-only claims and flags anything stale, for example pricing older than
   90 days. Only surviving claims reach the synthesizer.
7. **Synthesize into a decision, not a table dump.** `landscape.md` gives the
   matrix, then two or three implications for your product: where you win, where
   you are exposed, the gap to close. A matrix with no "so what" is trivia.

## Run it

In Claude Code, run the lead as one subagent, spawn analysts as parallel
subagents each with web access and one competitor over a shared directory, then
run the evidence checker as its own subagent over the teardowns before the
synthesizer reads only surviving claims. Port it to CrewAI as a scoping task
feeding parallel teardown tasks then a synthesis task, to AutoGen as a GroupChat
with a dedicated fact-checker, or to LangGraph as a fan-out then fan-in graph
with an evidence node between teardown and synthesis.

## Signals it works

- Every teardown covers the same dimensions, so the matrix lines up.
- Each load-bearing claim cites a dated source, and marketing copy is labeled.
- The synthesis ends in implications for your roadmap, not a feature grid.

## Boundaries

This organizes competitive research; it does not access non-public data
(roadmaps, contracts, internal pricing) and must not obtain it through deception
or by scraping behind a login you lack rights to. Agents misread stale pages and
vendor spin, so treat the output as a sourced draft for a human to sanity-check.
Positioning calls stay with product leadership; `vendor-evaluation` covers the
buy-side version.
