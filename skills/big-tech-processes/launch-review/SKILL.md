---
name: launch-review
description: Run a launch review that gates a release behind a readiness checklist, named sign-offs, and a clear no-go authority. Use when a user-facing launch is about to ship and a bad release would be costly to walk back.
---

# Launch review

A launch review is the last gate between a build and its users: a structured
check that the thing is truly ready and that named people have said so on the
record. It rots into theater when it becomes a rubber stamp, a meeting where
everyone assumes someone else looked and no one holds the authority to stop the
train. The whole point is to keep "no" a real and cheap option right up to
launch.

## Method

1. **Drive the review from a written readiness checklist.** Functionality
   verified, error budget healthy, monitoring and alerts wired, rollback tested,
   legal and privacy cleared, support and docs ready, comms drafted. A checklist
   turns "are we ready" from a vibe into items that are each done or not.
2. **Give every checklist item a named owner who signs.** Not "engineering
   approves" but a specific person per area: the on-call lead for operability,
   privacy counsel for data, the support lead for readiness. A sign-off without a
   name is a gap nobody owns.
3. **Require the rollback and kill switch to be exercised, not just present.** The
   most common launch-day failure is a revert path that was written and never
   run. Demand evidence it worked in a realistic environment, with the
   time-to-revert measured and recorded.
4. **Name one launch owner who holds no-go authority.** A single person can halt
   the launch, and the room knows who it is before the meeting starts. Diffuse
   authority is how a known-broken launch ships, because stopping it felt like
   someone else's call.
5. **Set explicit go, no-go, and conditional-go outcomes.** Conditional-go names
   the exact blockers and who confirms they cleared before traffic ramps. "We'll
   fix it right after launch" is a no-go wearing a go's badge.
6. **Plan the ramp and the watch, not only the flip.** Staged rollout by
   percentage or region, the metrics that define healthy, the threshold that
   triggers rollback, and who is watching during the window. A launch is not done
   when it starts; it is done when it is stable.

## Checks

- Does every checklist item carry a named owner who actually signed, not a team
  label?
- Has the rollback been executed and timed, or only documented?
- Is there one person who can say no, and does the room know who it is?

## Boundaries

Match the ceremony to the blast radius: a flagged internal rollout does not need
the review a public payments launch demands. This skill covers the go decision;
the deeper operational readiness of the service underneath belongs to the
production-readiness-review skill, and post-launch failures route to a postmortem.
