---
name: agent-docs-guild
description: Run a team of documentation agents that finds the gaps, drafts the pages, gets them reviewed against the code, and sweeps for staleness on a schedule. Use when a codebase has outrun its docs and you need both new coverage and a way to stop pages from rotting.
---

# Agent docs guild

Docs rot quietly. A feature ships, the page describing the old behavior stays up,
and no one owns the drift. A guild hands each part of the job to its own agent:
one finds what is missing or wrong, one writes, an engineer checks it against the
code, and one sweeps for staleness on a cadence. Coverage and freshness are
separate jobs, so they get separate agents.

## Method

1. **Gap analyst diffs docs against reality.** Compare the documented surface,
   public API, CLI flags, config keys, and user flows, against the code and the
   changelog. Output `gaps.md`, one row per undocumented or contradicted topic,
   ranked by how many users hit it. A missing endpoint outranks a typo.
2. **Drafter writes one page per gap.** Load `technical-writer-role`. Produce a
   `page.md` per topic: what it does, a minimal working example, parameters, and
   failure modes. Pull real signatures and defaults from source instead of
   inventing them.
3. **Technical reviewer verifies against code.** Load `backend-engineer-role` or
   the module owner. The reviewer runs every example and confirms each claim maps
   to current behavior, returning findings anchored to `file:line`. A page that
   reads well but describes stale behavior fails.
4. **Loop draft and review until examples run.** The drafter fixes each finding
   or defends it. Cap at two rounds; a claim neither side can settle escalates to
   the module owner rather than shipping unverified.
5. **Freshness sweeper runs on a schedule.** On a cron cadence, scan merged pages
   for version drift, dead links, and examples that no longer compile against
   `main`. Output `staleness-report.md`: page, symptom, suspected cause. It
   reopens work, it does not fix it.
6. **Route stale pages back as fresh gaps.** Each staleness finding becomes a row
   the gap analyst re-ranks, closing the loop so a shipped page that goes stale
   re-enters the pipeline instead of quietly lying to readers.

## Run it

In Claude Code, run gap, draft, and review as subagents in sequence, one page per
draft subagent to keep contexts small, and fan the drafters out in parallel when
the gaps are independent. Keep `gaps.md` and the pages as files on a docs branch,
and schedule the sweeper as a recurring job that reopens `gaps.md`. Terminate a
cycle when `gaps.md` holds no open rows and every merged page passed review; the
freshness loop never terminates, it recurs. To port, use a CrewAI sequential Crew
with a scheduled kickoff, an AutoGen GroupChat with a reviewer critic, or a
LangGraph graph with a periodic trigger feeding the gap node.

## Signals it works

- Every merged page had its examples executed by the reviewer, not just read.
- Gaps rank by user impact, so the most-hit missing page gets written first.
- A feature that shipped last week already has a gap row or a live page.

## Boundaries

This guild produces reference and task docs, not marketing copy or API design
decisions. It defers tone and information architecture to the project's docs
convention, and it will not publish a page the technical reviewer never cleared.
Whether a topic deserves a page at all stays with the docs owner.
