---
name: agent-marketing-studio
description: Produce campaigns with agents that research the audience, draft variants against a brief, check claims and brand voice, and leave publishing to a human. Use when marketing output is inconsistent or bottlenecked on one person writing everything.
---

# Agent marketing studio

Marketing at small scale fails on consistency and cadence rather than
creativity. A studio of agents holds the brief, produces variants,
and enforces the same voice and claim standards every time, which is
precisely the discipline that slips when one busy person writes
everything between other work.

## Team

- **Strategist** (`developer-marketing`, `landing-page-strategy`):
  turns a goal into a brief with audience, message, and channel.
- **Copywriters**: two or three drafting distinct angles against that
  brief rather than one safe version.
- **Brand and claims checker**: enforces voice and challenges every
  factual or comparative claim.

Shape: a brief fanning out to parallel drafts, converging through a
single check, ending at human approval.

## Method

1. **Start from a brief, not a request.** Audience, the one thing they
   should take away, the action wanted, the channel, and what must not
   be said. Copy produced without a brief is copy that will be rewritten.
2. **Draft in parallel from different angles.** Problem-first,
   outcome-first, and comparison-first produce genuinely different
   options, while one agent iterating produces the same idea reworded.
3. **Check every claim against a source.** Performance numbers,
   comparisons, and customer outcomes need evidence attached or they
   get cut. Unsupported claims are a legal and trust problem, not a
   style one.
4. **Enforce voice mechanically.** Keep a written voice definition with
   banned phrasing and let the checker apply it, since consistency is
   what an agent can hold better than a person under deadline.
5. **Keep the channel's constraints in the brief.** Length, format, and
   norms differ enough that a rewrite for channel is a new draft, not a
   trim.
6. **Human approves before anything is public.** Publishing is
   irreversible in practice, and one bad post costs more than the
   studio saves.
7. **Feed results back into the brief.** What performed and what did not
   updates the next brief, or the studio produces volume without
   learning.

## Run it

In Claude Code, run the strategist first to write `brief.md`, spawn
copywriters in parallel each writing their own file, then the checker
producing a marked-up recommendation. Nothing publishes without a human
step. Port to CrewAI as parallel tasks converging on a review task, or
to AutoGen as a GroupChat where the checker holds veto.

## Signals it works

- Every asset traces to a brief with a stated audience and takeaway.
- Claims carry sources, and unsupported ones are removed before review.
- Drafts differ in angle rather than in wording.

## Boundaries

Agents draft and check; a human owns the brand and presses publish.
Never let agents post autonomously, imitate a real person's voice
without consent, or generate testimonials and reviews. Advertising
claims are regulated in most markets, and substantiation is a legal
obligation rather than an editorial preference.
