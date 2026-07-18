---
name: design-doc-google-style
description: Write a Google-style design doc that argues a decision through context, goals, and rejected alternatives before code is written. Use when a change is large enough that picking the wrong approach is expensive to undo.
---

# Google-style design doc

At Google the design doc is where an engineer reasons in prose before touching
code, and where reviewers kill a flawed approach while changing it is still
cheap. A doc that lists only the chosen design, skipping the argument for it, is
a status update in a decision's clothing: no reader can tell whether the author
weighed anything else or simply picked the first idea that compiled.

## Method

1. **Open with context, hold back the solution.** The first section states the
   problem, who has it, and what exists today. An engineer three teams away
   should grasp why the work matters before meeting a single class name. If you
   cannot describe the problem without naming your fix, you have not understood
   it yet.
2. **Split goals from non-goals in plain lists.** Write what the design must
   achieve, then the tempting adjacent problems you are deliberately leaving
   alone. Non-goals are the section reviewers cite most: they stop scope creep
   and keep each meeting from relitigating the boundary.
3. **Argue the alternatives considered, do not list them.** Give each serious
   option a subsection: how it works and the specific reason you rejected it.
   Two options waved off in one line each signal an author who decided first and
   documented after. Include "do nothing" whenever it is plausible.
4. **Make the chosen design concrete enough to attack.** Data model, API shapes,
   the failure and rollback path, and the migration from today's state. Vague
   designs pass review and fail in code because reviewers had nothing sharp to
   push against.
5. **Budget the cross-cutting costs up front.** Add a short pass on security,
   privacy, latency, and on-call load. Reviewers from those areas read straight
   to their paragraph, and a missing one bounces the doc back before the design
   is even discussed.
6. **Circulate for comment, then hold the review.** Share the doc days ahead, let
   reviewers leave inline comments, and resolve each in the doc before or during
   a scheduled review with the tech lead and affected teams. Approval is an owner
   marking it LGTM, not silence on a thread.

## Litmus tests

- Could a reviewer who dislikes your choice find the paragraph that answers their
  objection, or would they have to raise it live?
- Does every rejected alternative carry a reason specific to it, not boilerplate
  that would fit any option?
- Are the non-goals load-bearing, so that deleting one would widen scope?

## Boundaries

A one-day bug fix needs no doc: the ritual pays off only when a wrong approach
costs more than writing the argument does. Follow the team's template and
approval convention where one exists, and defer to the rfc-process skill when the
decision needs a wider, time-boxed audience than a single review can gather.
