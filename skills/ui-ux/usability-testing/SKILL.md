---
name: usability-testing
description: Watch real users attempt real tasks to find where a design fails, with few participants and honest tasks. Use when validating a design or diagnosing why users struggle, before or after building.
---

# Usability testing

You cannot see your own design's flaws; you know what everything means and
where everything is. Usability testing replaces that blindness with
evidence: watch real users try to do real tasks, and the problems reveal
themselves. A handful of sessions finds most of what is wrong.

## Method

1. **Test with few users, often.** Around five participants surface the
   large majority of usability problems; you do not need statistical
   samples to find that people cannot find the button. Prefer frequent
   small rounds (test, fix, test again) over one big study (see
   wireframing-prototyping: test early on cheap artifacts).
2. **Give tasks, not a tour.** Ask participants to accomplish a realistic
   goal ("sign up and invite a teammate"), then watch. Do not demo or
   explain; the test is whether they can do it without you. A leading task
   ("click the blue Invite button") tests nothing.
3. **Watch what they do, discount what they say.** Behavior is truth;
   opinions are noise. Where they hesitate, misclick, backtrack, or give
   up is the finding, regardless of whether they later say they "liked
   it". People are polite and are poor predictors of their own behavior
   (see customer-interviews' same lesson).
4. **Ask them to think aloud, and stay quiet otherwise.** Have them
   narrate what they are trying, expecting, and confused by, so you hear
   the mental model. Then resist the urge to help or explain when they
   struggle: the struggle is the data. Silence is hard and essential.
5. **Test at the right fidelity and stage.** A paper or clickable
   prototype tests structure and flow before building (cheapest fixes; see
   wireframing-prototyping); the real product tests the true experience.
   Test before you build to avoid building the wrong thing, and after to
   catch what only reality reveals.
6. **Turn observations into prioritized fixes.** Collect where users
   struggled, cluster the recurring issues, and rank by severity (how
   badly it blocks the task, how many hit it). Fix the blockers first, and
   retest to confirm the fix worked and did not create a new problem (see
   the loop in ml-error-analysis, applied to UX).

## Boundaries

- Usability testing finds problems in a design that exists (or is
  prototyped); it does not tell you what to build, which is discovery's
  job (see product-discovery, customer-interviews). The two are different
  research.
- Small-n qualitative testing reveals problems, not their frequency in the
  population; pair it with analytics (funnels, drop-off) for the magnitudes
  (see user-activation).
- A clean usability test does not guarantee accessibility; test with
  assistive technology and diverse users too (see accessibility-review,
  screen-reader-testing).
