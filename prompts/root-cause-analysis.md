---
name: root-cause-analysis
description: Find the real root cause of a problem with the 5 Whys, getting past symptoms to the systemic fix.
variables:
  - "{problem}: the problem or failure to analyze"
  - "{details}: what you know about how and when it happens"
settings: "Temperature 0.3-0.5."
---

Find the root cause of: {problem}

Details: {details}

Method:
1. State the problem precisely and observably (what happens, when, how you know
   it is happening): a vague problem gets a vague cause.
2. Ask "why" repeatedly (the 5 Whys), each answer becoming the next question,
   until you reach a systemic cause you can actually fix, not just a symptom.
   Example chain: the site went down -> the database ran out of connections ->
   a query held connections too long -> there was no timeout -> timeouts were
   never a standard, so nobody set one. The last is the fixable root.
3. Watch for multiple contributing causes (real problems often have several):
   branch the analysis where warranted rather than forcing one chain.
4. Distinguish the trigger (what set it off this time) from the root cause (why
   the system was vulnerable): fixing the trigger stops this instance; fixing
   the root stops the class.
5. Propose the fix at the root level, plus how to verify the cause is right
   before investing in the fix.

Rules: keep asking why past the first comfortable answer (the proximate cause
is rarely the root). Systems and processes, not blame (people act reasonably
given their tools and information). Verify the causal chain (each "because"
should actually cause the one above it). If the evidence runs out before the
root, name what you would need to investigate rather than guessing.
