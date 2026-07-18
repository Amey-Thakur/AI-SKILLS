---
name: agent-startup-squad
description: Run a lean startup team of agents (builder, marketer, analyst) through one disciplined weekly loop of ship, promote, and measure. Use when you want a small agent team to move a single product metric week over week.
---

# Startup squad of agents

A startup that builds without measuring ships features into silence; one that
debates without shipping never learns. A three-agent squad on a one-week clock
forces the whole loop: build the smallest thing, put it in front of users, read
the number, decide. The discipline is the cadence, not the headcount: a week is
the unit, and every week ends with a keep, iterate, or kill call.

## Team

- **Builder** (`backend-engineer-role`, `frontend-engineer-role`): ships the
  weekly increment.
- **Marketer** (`developer-advocate-role`): packages and promotes it on one
  channel.
- **Analyst** (`data-scientist-role`): reads the metric against the bet.

Shape: a fixed weekly loop, build to ship to measure to decide.

## Method

1. **Name one weekly bet.** Pick a single metric to move (activation, week-one
   retention, signups) and the one thing you will ship to move it. Everything
   else waits for next week. Write it at the top of `week.md`.
2. **Builder ships the smallest test of the bet.** Not the full feature, the
   minimum that could move the number. The handoff is a running increment plus a
   changelog line.
3. **Marketer packages one message.** One channel, one audience, one call to
   action, drafted in `launch.md`. A human approves before anything public goes
   out.
4. **Instrument before you ship, not after.** The analyst confirms the metric is
   tracked and has a baseline; a number you start counting post-launch proves
   nothing.
5. **Analyst reads the result against the bet.** `readout.md` states the metric,
   the change, and whether the bet moved it, with the confounders named honestly.
6. **Make the Friday call.** Keep, iterate, or kill, recorded with a reason. The
   loop is a week, not "when it is done."
7. **Enforce the kill rule.** If the north-star metric has not moved across a set
   number of cycles (say four), stop the line of work rather than nursing it.

## Run it

In Claude Code, run one loop per orchestrator pass: spawn the builder subagent,
then the marketer (gated on human approval for anything public), then the analyst
reading real metrics, each writing its file into a dated week directory the next
reads. A `/loop` or scheduled run makes the cadence literal. Port it to CrewAI as
a sequential crew re-kicked weekly, to AutoGen as a round-robin GroupChat, or to
LangGraph as a cyclic graph with the decision node closing each week.

## Signals it works

- Every week ends with a written keep, iterate, or kill, not a rolling backlog.
- The metric was instrumented before ship, so the readout is real.
- Killed bets actually stop; the squad is not carrying four half-live experiments.

## Boundaries

This drives the operating loop, not the company: fundraising, hiring, legal, and
real customer relationships are human work. Agents can draft marketing but a
person owns the brand and approves public posts. The north-star metric and kill
threshold are yours to set from real business context, not the squad's to invent.
