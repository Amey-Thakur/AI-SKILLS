---
name: agent-content-newsroom
description: Run a publishing cadence with agents that plan a calendar, research and draft against a brief, fact-check claims, and queue posts for human approval. Use when content output is sporadic and quality varies with whoever wrote it.
---

# Agent content newsroom

Content programmes die from irregularity rather than bad writing. A
newsroom fixes the cadence and the standard: a calendar decided ahead,
a brief per piece, a research pass before drafting, and a fact check
that can block publication. The result is boring in the right way.

## Team

- **Editor**: owns the calendar, writes the brief for each piece, and
  holds the final quality bar.
- **Researcher**: gathers sources and verifies the premise before a
  word is drafted.
- **Writer** (`technical-writing`): drafts to the brief.
- **Fact checker**: verifies every claim, statistic, and citation.

Shape: a per-piece pipeline on a fixed calendar, ending at human
approval.

## Method

1. **Plan the calendar a cycle ahead.** Topic, audience, angle, and
   publish date decided in advance, because a queue decided weekly is a
   queue that skips weeks.
2. **Write a brief per piece.** The question it answers, who for, what
   they should be able to do afterwards, and what is out of scope. The
   brief is what makes drafts comparable and revisable.
3. **Research before drafting.** Sources gathered and the premise
   checked first, since a well-written piece built on a wrong premise
   wastes the whole pipeline (see fact-checking).
4. **Draft to the brief, not to a word count.** Length follows the
   question. Padding to a target is how content programmes lose the
   audience they were built for.
5. **Let the fact checker block.** Any claim without a source is cut or
   sourced, with no exception for a claim everyone believes.
6. **Human approves publication.** The editor agent can reject; only a
   person can publish (see agent-marketing-studio).
7. **Review performance against the brief.** Whether the piece answered
   the question for the intended audience, not just traffic, feeds the
   next calendar.

## Run it

In Claude Code, keep the calendar as a tracked file, then per piece run
researcher, writer, and fact checker as sequential subagents each
writing into a dated piece directory, with the checker's findings
resolved before a human reviews and publishes. Port to CrewAI as a
sequential crew per piece, or LangGraph with the fact check as a gating
node that returns drafts for rework.

## Signals it works

- The calendar is set ahead and pieces ship on their dates.
- Every claim in a published piece has a source recorded.
- Drafts trace to a brief, so revision is about the brief, not taste.

## Boundaries

Agents research, draft, and check; a human owns the byline and the
decision to publish. Do not publish under a real person's name without
consent, present agent-written text as first-hand experience, or
fabricate quotes, case studies, or statistics. Anything making claims
about people, health, finance, or legal matters needs qualified review
before it goes out.
