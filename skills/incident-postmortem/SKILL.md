---
name: incident-postmortem
description: Write a blameless postmortem that finds systemic causes and produces actions that actually prevent recurrence. Use after an outage, data incident, or serious bug reaches users.
---

# Incident postmortem

The purpose is a system that cannot fail this way again: not a culprit.
The moment a postmortem blames a person, everyone stops telling the truth
in the next one.

## Structure

1. **Summary**: three sentences: what broke, who felt it and for how long,
   and the one-line cause. Written last, placed first.
2. **Impact**: numbers, not adjectives: users affected, requests failed,
   data lost or at risk, duration, money if known. "Significant impact" is
   a tell that nobody measured.
3. **Timeline**: timestamped facts from first trigger to full resolution:
   what happened, what people saw, what they did. Include the wrong turns;
   the 40 minutes spent on the wrong hypothesis is signal about your
   observability, not a person's failure.
4. **Root cause analysis**: walk the why-chain past the trigger to the
   conditions: the deploy was the spark; the missing rate limit, the silent
   fallback, and the alert that pages nobody are the fuel. Most incidents
   need three to five "why"s before reaching a cause you can fix in a
   system. Name mechanisms ("retries amplified load 40×"), never persons
   ("X pushed bad config" → "config validation accepted a value that
   cannot work in production").
5. **What went well / what was lucky**: the alert that fired correctly;
   the fact it happened Tuesday 10:00 and not Saturday 03:00. Luck listed
   honestly today is a to-do item, not a defense, tomorrow.
6. **Action items**: each with an owner, a date, and a mechanism:
   prevention (make the failure impossible), detection (find it in one
   minute, not forty), mitigation (halve the blast radius). "Be more
   careful" is not an action item; "reject configs that fail validation at
   deploy time" is. Three completed actions beat twelve open ones.

## Rules

- Facts and interpretation stay visibly separate; the timeline is facts
  only.
- Write for the engineer who joins next year: no unexpanded acronyms, no
  tribal context assumed.
- If the same class of incident has happened before, say so and link it , 
  a repeat is a statement about the previous action items.

## Litmus test

If every person involved left the company tomorrow, does the document still
prevent the next occurrence?
