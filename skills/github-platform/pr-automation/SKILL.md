---
name: pr-automation
description: Automate the mechanical parts of pull requests, such as labelling, assignment, checks, and merging, so review effort goes to the code. Use when review process consumes attention on bookkeeping.
---

# Pull request automation

Every minute spent on labelling, chasing, and merging is a minute not
spent reviewing. These tasks are rule-based and worth automating, while
the judgement they surround is not.

## Method

1. **Label by changed paths automatically.** It routes attention and
   reveals scope without anyone maintaining it manually.
2. **Request review from owners automatically.** Ownership-based routing
   puts changes in front of the right people without an author guessing
   (see code-owners).
3. **Enforce size and description in a check.** A large or undescribed
   pull request gets flagged mechanically rather than in a review
   comment (see pull-request-size).
4. **Automate merge once conditions are met.** Auto-merge after
   approvals and checks removes the wait between the last approval and
   someone noticing.
5. **Update branches automatically where safe.** Keeping pull requests
   current avoids the merge-time surprise, at the cost of extra runs.
6. **Comment with useful artefacts.** Preview links, coverage
   differences, and build outputs posted to the pull request save the
   reviewer from hunting.
7. **Keep automation quiet.** Bots that comment on every event train
   people to ignore the thread, including the comments that matter (see
   notification-fatigue).

## Boundaries

Automation handles mechanics; it cannot judge whether a change is
correct or well designed. Auto-merge is only as safe as the required
checks. Bot noise can degrade review quality, so each automation should
justify its interruption.
