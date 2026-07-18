---
name: agent-docs-guild
description: Run a team of documentation agents that finds gaps, drafts pages, gets them technically reviewed, and sweeps for staleness on a schedule. Use when a codebase has outgrown its docs and you need both fresh coverage and a way to keep pages from rotting.
---

# Agent docs guild

Docs rot silently: a feature ships, the page that described the old behavior
stays up, and nobody owns the drift. A guild assigns each part of the job to an
agent: one finds what is missing or wrong, one writes, one engineer checks it
against the code, and one sweeps for staleness on a schedule. Coverage and
freshness are different jobs, so they need different agents.

## Method

1. **Gap analyst diffs docs against reality.** Compare the documented surface
   (public API, CLI flags, config keys, user flows) against the code and the
   changelog. Output `gaps.md`: one row per undocumented or contradicted topic,
   ranked by how many users hit it. An endpoint with no page ranks above a typo.
2. **Drafter writes one page per gap.** Load `technical-writer-role`. Produce a
   `page.md` per topic: what it does, a minimal working example, parameters, and
   failure modes. Pull real signatures and defaults from the source rather than
   inventing them.
3. **Technical reviewer checks accuracy against code.** Load
   `backend-engineer-role` or the module owner. The reviewer runs every example
   and confirms each claim maps to current behavior, returning findings tied to
   `file:line`. A page that reads well but describes stale behavior fails.
4. **Loop draft and review until examples run.** The drafter fixes each finding
   or defends it. Cap at two rounds; a claim the drafter and reviewer cannot
   settle escalates to the module owner instead of shipping unverified.
5. **Freshness sweeper runs on a schedule.** On a cron cadence, scan merged
   pages for version drift, dead links, and examples that no longer compile
   against `main`. Output `staleness-report.md`: page, symptom, suspected cause.
   This reopens work; it does not fix it.
6. **Route stale pages back as new gaps.** Each staleness finding becomes a row
   the gap analyst re-ranks, closing the loop so a shipped page that goes stale
   re-enters the pipeline instead of quietly lying to readers.

## Run it

In Claude Code, run gap then draft then review as subagents in sequence, one
page per draft subagent so contexts stay small, and fan out drafters in parallel
when the gaps are independent. Keep `gaps.md` and the pages as files on a docs
branch. Schedule the sweeper as a recurring job that reopens `gaps.md`.
Terminate a cycle when `gaps.md` has no open rows and every merged page passed
review; the freshness loop never terminates, it recurs. To port, use a CrewAI
sequential Crew with a scheduled kickoff, an AutoGen GroupChat with a reviewer
critic, or a LangGraph graph with a periodic trigger feeding the gap node.

## Signals it works

- Every merged page had its examples executed by the reviewer, not just read.
- Gaps are ranked by user impact, so the most-hit missing page gets written first.
- A feature that shipped last week already has a gap row or a page.

## Boundaries

This guild produces reference and task docs, not marketing copy or API design
decisions. It defers tone and information architecture to the project's docs
convention, and it will not publish a page the technical reviewer never cleared.
Judging whether a topic deserves a page at all stays with the docs owner.
