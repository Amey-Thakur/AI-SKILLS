---
name: incident-severity-levels
description: Classify incidents consistently so the response, communication, and escalation match the impact. Use when incident response is either overwhelming or too slow.
---

# Incident severity levels

Without agreed levels, response is set by whoever noticed: some
incidents get a war room they did not need while worse ones are handled
quietly. Levels make the response proportionate and automatic.

## Method

1. **Define levels by user impact.** How many users, how badly, and
   whether there is a workaround, rather than by which component broke.
2. **Keep the levels few.** Three or four with clear boundaries, since
   more produces debate about classification during the incident.
3. **Attach the response to the level.** Who is paged, how fast, who
   communicates, and how often, so classification is the only decision
   needed (see incident-response).
4. **Allow upgrading and require downgrading to be explicit.** Incidents
   evolve, and a stated change keeps everyone aligned.
5. **Classify quickly and imperfectly.** A rough level immediately beats
   a precise one after twenty minutes of discussion.
6. **Define data and security incidents separately.** They have legal
   notification obligations that operational severity does not capture
   (see data-privacy).
7. **Review classifications afterwards.** Consistently misclassified
   incidents mean the definitions need work (see incident-postmortem).

## Boundaries

Severity drives response and does not determine priority of the
follow-up fix. Classification during a confusing incident is imperfect
by nature. Customer-facing communication has commitments beyond
internal levels (see agent-crisis-comms).
