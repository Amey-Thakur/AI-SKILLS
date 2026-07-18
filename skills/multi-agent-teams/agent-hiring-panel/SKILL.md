---
name: agent-hiring-panel
description: Simulate an interview panel as agents that design questions, score independently on anchored rubrics, and reconcile in a debrief. Use when you want to pressure-test a hiring loop, calibrate rubrics, or dry-run questions, not to score a real candidate.
---

# Hiring panel of agents

A panel is only as honest as its independence. Run one agent as the whole
interview and you get one perspective scoring itself; run four agents who see
each other's scores first and you get agreement, not signal. A real loop assigns
one competency per interviewer, scores each in writing before anyone shares, and
reconciles on evidence. Skip the independence and the debrief becomes an echo of
whoever spoke first.

## Team

- **Loop designer** (`hiring-loop-design`): builds the competency matrix and
  assigns one owner per signal.
- **Interviewers** (`bar-raiser-interviewing`): each owns one competency, writes
  questions, scores independently.
- **Bar raiser** (`bar-raiser-interviewing`): holds the same bar across the panel.
- **Debrief chair** (`perf-calibration`, `engineering-manager-role`): reconciles
  scores.

Shape: sequential design, a parallel independent-scoring panel, then a
calibration debrief.

## Method

1. **Designer builds a competency matrix, one owner per signal.** Map the role to
   four to six competencies (coding, system design, project depth, collaboration)
   and assign each to exactly one interviewer, so no signal is tested twice and
   none is missed. Output `loop-plan.md`.
2. **Each interviewer writes questions to an anchored rubric.** Define what a 1,
   2, 3, and 4 answer looks like with a concrete example per level before the
   interview. A question that probes three competencies scores none well.
3. **Score independently and in writing before sharing.** Each submits
   `scorecard-<name>.md`: question, response summary, an evidence quote, a rating,
   and a hire or no-hire on its competency, locked before debrief. Shared scores
   in advance manufacture consensus.
4. **Separate evidence from impression.** Every rating cites what the candidate
   said or built, not "seemed strong." A score with no evidence line is dropped
   in debrief.
5. **Bar raiser holds the line across candidates.** One agent, not the hiring
   manager, checks each scorecard against the same bar so an urgent req does not
   lower it. It can veto, not boost.
6. **Debrief reconciles on evidence, not a vote count.** The chair walks each
   competency, surfaces the split, and resolves it by re-reading evidence. A 3-1
   split is a conversation about the one, not a majority overrule.
7. **Decide against written criteria and record dissent.** `debrief.md` states
   the outcome, the deciding evidence, and any unresolved concern, so the loop
   stays consistent next time.

## Run it

In Claude Code, run the designer as one subagent, then spawn interviewers as
parallel subagents that cannot read each other's output directory until each has
written its locked scorecard; the chair subagent reads all scorecards plus the
bar raiser's notes to produce `debrief.md`. Port it to CrewAI as a design task
feeding parallel interview tasks then a debrief task, to AutoGen as a GroupChat
where the chair opens turns only after scorecards are filed, or to LangGraph as a
fan-out with a barrier that blocks the debrief node until every scorecard commits.

## Signals it works

- Interviewers submit scores before seeing each other's, and the splits survive.
- Every rating in a scorecard cites specific candidate evidence.
- The debrief changes minds by re-reading evidence, not by majority.

## Boundaries

This rehearses and calibrates a hiring loop; agents do not decide on real
candidates, which is human judgment carrying legal and fairness duties agents
cannot hold. Use it to pressure-test rubrics, dry-run questions, or train
interviewers, not to auto-score a person. Competency definitions, the bar, and
anti-bias practice are your organization's policy.
