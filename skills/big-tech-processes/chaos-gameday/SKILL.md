---
name: chaos-gameday
description: Run a game day that injects a real failure into a system on purpose, under safety rails, to test whether monitoring, runbooks, and responders actually work. Use when you want to verify resilience before an incident does it for you, or to rehearse a team on a failure they have never handled.
---

# Chaos game day

A runbook that has never been followed under pressure is a guess, and an alert
that has never fired in anger is a hope. A game day converts both into evidence
by breaking something deliberately while you are watching and ready to stop.
Done without rails it causes the outage it meant to prevent; done as a demo
where everyone knows the answer it teaches nothing. The craft is the middle.

## Method

1. **Start from a hypothesis tied to a real risk.** Write it as a prediction:
   "if the primary database fails over, reads recover within 30 seconds and no
   alert pages a human unnecessarily." A game day without a falsifiable claim is
   just breaking things. Pick failures you actually fear: dependency timeouts,
   zone loss, a poisoned cache, disk full.
2. **Define steady state and the abort condition first.** Name the metric that
   says the system is healthy (checkout success rate, p99 latency) and the
   threshold that ends the exercise immediately. Decide the blast radius up
   front: one shard, one zone, one percent of traffic. No injection starts
   until the kill switch is built and tested.
3. **Assign roles and keep responders blind.** A facilitator drives the
   scenario and holds the abort switch, a scribe timestamps everything, and the
   on-call responders work the problem without knowing the injection details.
   If the people responding already know the answer, you are measuring their
   memory, not the system.
4. **Announce the window, do not ambush.** Tell the broader org the game day is
   running and when, so a real incident in parallel is not mistaken for the
   drill. Ambush drills damage trust and are rarely worth the realism. Run in
   production when you can afford it and staging when you cannot, and say which.
5. **Inject gradually and watch the instruments, not just the system.** Use a
   fault tool (Gremlin, AWS Fault Injection Simulator, toxiproxy, a scripted
   dependency kill) and escalate in steps. The primary question is not only
   "did it survive" but "did monitoring detect it, did the right alert fire, did
   the runbook match reality." Measure time to detect and time to recover.
6. **Abort the instant a rail trips, and treat that as data.** If steady state
   breaches the threshold, stop and restore. An exercise that hits its abort
   condition found a real weakness faster than a real incident would have: that
   is a success, not a failure of the game day.
7. **Capture learnings while the room is still warm.** Within a day, write what
   broke, what the instruments missed, and which runbook step was wrong. File
   action items with owners, then schedule the re-run that proves the fix. An
   unrepeated game day is a story; a repeated one is a control.

## Litmus tests

- Could the facilitator stop the exercise in seconds, and was that switch tested
  before any fault was injected?
- Did the responders discover the failure through your monitoring, or because
  someone told them it was happening?
- Did you measure time to detect and time to recover, not just "it stayed up"?
- Is there a scheduled re-run to confirm each fix, or did the findings just get
  filed?

## Boundaries

A game day tests a system you can safely perturb and restore. Do not inject
faults into a system with no rollback, no isolation, or unquantified blast
radius: harden it first. This rehearses resilience; it does not replace the
production-readiness review that decides a service is fit to operate, nor the
incident process that handles a real outage. Follow your org's change-management
rules for any production injection.
