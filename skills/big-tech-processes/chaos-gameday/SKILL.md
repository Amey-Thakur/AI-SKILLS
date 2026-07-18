---
name: chaos-gameday
description: Run a game day that injects a real failure on purpose under safety rails, then captures what monitoring, runbooks, and responders actually did. Use when you want to prove resilience before an incident tests it for you, or to rehearse a team on a failure it has never handled.
---

# Chaos game day

A runbook nobody has followed under pressure is a guess, and an alert that has
never fired in anger is a hope. A game day turns both into evidence by breaking
something deliberately while you watch, ready to stop. Run it without rails and
you cause the outage you meant to prevent; run it as a demo where everyone knows
the answer and it teaches nothing. The craft lives between those two.

## Method

1. **Open with a falsifiable hypothesis tied to a real fear.** Write a
   prediction: "if the primary database fails over, reads recover inside 30
   seconds and no page reaches a human." Pick failures you genuinely worry about,
   dependency timeouts, zone loss, a poisoned cache, a full disk, not the ones you
   already know you survive.
2. **Define steady state and the abort condition before anything breaks.** Name
   the health metric (checkout success rate, p99 latency) and the exact threshold
   that ends the exercise on the spot. Fix the blast radius up front: one shard,
   one zone, one percent of traffic. No fault is injected until the kill switch is
   built and tested.
3. **Assign roles and keep the responders blind.** A facilitator drives the
   scenario and holds the abort switch, a scribe timestamps every event, and the
   on-call responders work the problem without the injection details. If the
   people responding already know the answer, you are measuring their memory, not
   the system.
4. **Announce the window; do not ambush.** Tell the wider org the game day is
   running and when, so a real incident in parallel is not mistaken for the drill
   or the reverse. Surprise drills burn trust and rarely buy the realism they
   cost. Run in production when you can afford it and staging when you cannot, and
   say which you chose.
5. **Inject in stages and watch the instruments, not just the system.** Use a
   fault tool: Gremlin, AWS Fault Injection Simulator, toxiproxy, or a scripted
   dependency kill, and escalate step by step. The question is not only "did it
   survive" but "did monitoring detect it, did the right alert fire, did the
   runbook match reality." Record time to detect and time to recover.
6. **Abort the instant a rail trips, and count that as a find.** If steady state
   breaches the threshold, stop and restore. An exercise that hits its abort
   condition uncovered a real weakness faster and cheaper than a live incident
   would have. That is the game day succeeding, not failing.
7. **Capture the learning while the room is still warm.** Within a day, write
   what broke, what the instruments missed, and which runbook step was wrong. File
   action items with owners, then schedule the re-run that proves each fix. A game
   day you never repeat is a story; one you repeat is a control.

## Litmus tests

- Could the facilitator halt the exercise in seconds, and was that switch tested
  before any fault went in?
- Did responders find the failure through your monitoring, or because someone
  told them it was happening?
- Did you measure time to detect and time to recover, not just "it stayed up"?
- Is a re-run scheduled to confirm each fix, or did the findings simply get filed?

## Boundaries

A game day tests a system you can safely perturb and restore. Do not inject
faults into something with no rollback, no isolation, or an unquantified blast
radius: harden it first. This rehearses resilience; it does not replace the
production-readiness review that decides a service is fit to operate, nor the
incident process that handles a genuine outage. Follow your change-management
rules for any production injection.
