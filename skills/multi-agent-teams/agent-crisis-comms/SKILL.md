---
name: agent-crisis-comms
description: Prepare public communication during an incident with agents that assemble facts, draft holding statements, and check for claims that cannot be supported, while a human speaks. Use when something has gone wrong publicly and the response must be fast and accurate.
---

# Agent crisis communications

Under pressure, communication goes wrong in predictable ways: too slow,
too vague, or committing to a cause before it is known. Agents can
compress the assembly and drafting time dramatically while a human keeps
the judgement and the voice.

## Team

- **Fact assembler** (`agent-incident-response-team`): establishes what
  is known, unknown, and confirmed as of a timestamp.
- **Drafter** (`incident-status-update`): produces the holding
  statement and channel variants.
- **Claims checker**: removes anything not yet supported, especially
  cause and timeline.

Shape: a fast loop repeating as facts change, gated on a human every
cycle.

## Method

1. **Separate known, unknown, and unconfirmed explicitly.** Nearly every
   damaging crisis statement is an unconfirmed item stated as fact.
2. **Publish a holding statement early.** Acknowledging the issue,
   impact, and next update time beats silence, and silence is read as
   either incompetence or concealment.
3. **Never state cause before it is established.** Speculation that
   turns out wrong costs more trust than the original incident (see
   agent-postmortem-council).
4. **Commit only to the next update time.** Timelines for resolution
   given under pressure are usually wrong and become the story.
5. **Keep every channel consistent.** Status page, email, social, and
   support macros must say the same thing, since discrepancies read as
   evasion.
6. **Re-run the loop as facts change.** Each update is a fresh pass
   through assembly, drafting, and checking rather than an edit of the
   last one.
7. **Write the follow-up honestly once resolved.** What happened, what
   was affected, what changes, without minimising language.

## Run it

In Claude Code, run the assembler over incident data into a facts file
with confidence marked per item, then the drafter, then the claims
checker, producing a statement a human approves before any channel is
touched. Repeat per update. Port to LangGraph as a cycle with a human
approval interrupt on every iteration.

## Signals it works

- Statements distinguish confirmed facts from unknowns explicitly.
- Every update names when the next one comes, and it arrives.
- Cause appears only after it is established.

## Boundaries

Agents assemble and draft; a human speaks and owns every word published.
Never let an agent post directly. Incidents involving personal data,
safety, or regulated services carry notification obligations with legal
deadlines and need counsel immediately (see data-privacy). Apologies and
liability statements have legal consequences.
