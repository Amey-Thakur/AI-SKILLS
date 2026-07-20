---
name: tutorial-writing
description: Write tutorials that take a learner from zero to a working result through tested steps with checkpoints and recovery. Use when creating learning-oriented documentation or onboarding guides.
---

# Tutorial writing

A tutorial is learning-oriented: its job is to give a beginner a
successful first experience, building confidence through a working
result. It is not reference (complete) or how-to (goal-oriented for
someone who already knows the domain); confusing the genres produces
tutorials that overwhelm and reference that cannot teach.

## Method

1. **Define the concrete end state.** "By the end you will
   have a working X that does Y": one specific, achievable,
   satisfying result. A tutorial without a clear destination
   wanders; the learner needs to know where they are going
   and to feel they arrived (see mvp-scoping's aha-moment,
   applied to learning).
2. **Make every step do-able and verified.** Exact commands
   and code (copy-pasteable, tested in CI: see docs-as-code),
   and after each meaningful step, what the learner should
   see ("you should now see X"): so they confirm they are
   on track before continuing (the runbook-writing
   verification rule, for learners). A step that silently
   fails leaves the beginner stuck with no idea where.
3. **Minimize prerequisites and cognitive load.** Assume as
   little as possible, install what is needed inline, and
   introduce one new concept at a time (see cognitive-load):
   a tutorial that requires the reader to already understand
   half the system is not a tutorial. Defer the "why" and
   the alternatives; the learner wants to *succeed* first,
   understand later.
4. **Guarantee it works, keep it narrow.** The tutorial's
   golden path must work every time (this is why examples
   are tested: a failing tutorial destroys the beginner's
   confidence, not just their afternoon); resist the urge to
   show every option or handle every case: those belong in
   reference and how-to guides (see docs-information-
   architecture). One path, working, start to finish.
5. **Provide recovery for the likely failures.** Where
   learners commonly get stuck (a permission error, a
   missing dependency), a short "if you see X, do Y":
   anticipate the three most common failure points and
   catch them, because a stuck beginner with no recovery
   path abandons the tool, not just the tutorial.
6. **End with orientation, not a cliff.** Recap what they
   built, and point to next steps (the how-to guides and
   reference for going further: see readme-writing's
   linking): the tutorial's success is a launchpad. Leaving
   the learner at a working result with no direction wastes
   the momentum you just built.

## Boundaries

- A tutorial is not comprehensive; it deliberately omits
  options, edge cases, and alternatives to keep the
  learner succeeding (see reference and how-to for those:
  docs-information-architecture's Diataxis split). Padding
  it toward completeness ruins it.
- Tutorials are expensive to keep working (every dependency
  and API change can break the golden path); test them in
  CI and budget maintenance, or they rot into confidently
  wrong instructions (see docs-maintenance).
- One tutorial cannot serve every skill level; a beginner
  tutorial and an advanced walkthrough are different
  documents for different readers.
