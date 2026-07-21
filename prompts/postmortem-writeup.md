---
name: postmortem-writeup
description: Write a blameless incident postmortem that finds the systemic cause and produces real preventive actions.
variables:
  - "{incident}: what happened, the impact, and the timeline as you know it"
  - "{details}: contributing factors, what was tried, how it was resolved"
settings: "Temperature 0.3-0.5."
---

Write a blameless postmortem for:

{incident}

Details: {details}

Structure:
- Summary: what happened, the impact (users, duration, severity), in a few
  lines a busy reader can grasp.
- Timeline: the sequence from first signal to resolution, with times. Include
  detection (how we found out) and the key decisions.
- Root cause: the systemic cause, not the person. Use "5 whys" to get past the
  proximate trigger to why the system allowed it (why did the bad deploy ship,
  why did the check not catch it, why did the alert not fire).
- What went well and what went poorly: honestly, including detection time and
  response.
- Action items: specific, owned, and dated changes that prevent recurrence or
  reduce impact. Each must be concrete ("add a canary check for X"), not
  aspirational ("be more careful"). Prioritize by impact.

Rules: blameless: focus on systems and processes, never blame individuals
(people act reasonably given the information and tools they had). The value is
the action items that make the class of failure less likely, so make them real
and assignable. Distinguish root cause from trigger. If the timeline or cause
has gaps, mark what needs to be confirmed rather than guessing.
