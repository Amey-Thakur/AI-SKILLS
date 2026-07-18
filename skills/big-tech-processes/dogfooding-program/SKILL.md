---
name: dogfooding-program
description: Run an internal dogfooding program with staged cohorts, one feedback intake, and numeric exit criteria to general availability. Use when a pre-release product needs real internal use to surface bugs and adoption risk before it ships to customers.
---

# Dogfooding program

Dogfooding means your own company uses the unfinished product to do real work,
so the bugs that only appear in real use surface on employees instead of
customers. It fails in two directions: as theater, where people install the
build and never touch it, and as a popularity contest, where ten enthusiasts'
praise hides a hundred quiet abandonments. A program with cohorts, routed
feedback, and hard exit gates keeps it honest.

## Method

1. **Define what counts as using it.** A passive install is not dogfooding.
   Require the cohort to do actual work on the new thing, and demote or remove the
   old tool so falling back takes effort. If people can quietly keep using the
   incumbent, you learn nothing.
2. **Ramp cohorts in rings.** Start with the team (dozens), widen to the org
   (hundreds), then the whole company (thousands). Each ring is a gate: do not
   widen until the current ring's crash rate and top bugs sit under threshold.
   Microsoft calls these rings; Google runs fishfood before dogfood.
3. **Route all feedback into one intake.** Bugs go to the tracker with build
   number and repro steps, feature requests to a backlog, sentiment to a survey.
   A screenshot dropped in a chat thread is feedback that dies where it lands.
4. **Instrument adoption instead of trusting the mood.** Track daily actives
   inside the cohort, task completion, and the fallback rate to the old tool.
   Loud fans in a channel are not data; silent churn is the signal that matters,
   and only telemetry shows it.
5. **Triage on a cadence and close the loop.** Hold a weekly bug review, keep a
   visible burn-down, and reply to reporters. Dogfooders who never hear back stop
   reporting, and then the program looks healthy precisely because it went quiet.
6. **Set numeric exit criteria before you start.** Name the crash-free rate, zero
   open P0 and P1 bugs, a retention floor, a CSAT or NPS bar, and no open
   data-loss defect. Exit to GA is a checklist met, not a launch date arrived.
7. **Keep exit reversible and write the known-issues list.** If the bar is not
   met, hold. A tool your own company will not use is the clearest possible no-go,
   and shipping past that signal to hit a date is how the program becomes theater.

## Checks

- Can a cohort member get their real work done on the build, or do they quietly
  reach for the old tool?
- Do you know the fallback rate and daily actives from telemetry, not from vibes?
- Are the exit criteria numbers you can check, or adjectives you can argue about?

## Boundaries

Dogfooding surfaces real-use bugs and adoption risk; it is not a valid usability
study, since employees are a small, expert, biased sample and not your customers.
Pair it with an external beta for representativeness, and route the GA go decision
itself to the launch-review skill rather than treating a clean dogfood as a
launch.
