---
name: empty-and-error-states
description: Design the empty, loading, error, and edge states that most designs skip but users constantly hit. Use when designing any screen that can be empty, loading, or fail, which is nearly all of them.
---

# Empty and error states

Designs get made for the state where everything is full and working. But
users constantly meet the other states: the empty list, the spinner, the
failed request, the no-results search. These are not edge cases; they are
the first thing a new user sees and the moment a frustrated user needs
help most. Designing them is not optional polish.

## Method

1. **Design the empty state as an opportunity, not a blank.** The first
   time a user opens a feature, it is empty. Instead of a void, use it to
   explain what goes here, why it is useful, and how to add the first item
   (a clear call to action; see onboarding-ux, ux-writing). A blank screen
   with no guidance is where new users bounce.
2. **Distinguish the kinds of empty.** No-data-yet (new user: guide them
   to start), no-results (a search or filter returned nothing: help them
   broaden or clear it), and cleared-out (they completed everything: a
   satisfying done-state). Each needs different copy and actions; treating
   all emptiness the same misses the user's actual situation.
3. **Make loading states honest and calm.** Show that work is happening
   (skeletons that hint at the coming layout beat spinners; see
   loading-states), keep it from jumping as content arrives (reserve
   space; avoid layout shift), and for long waits, show progress or set
   expectations. Never leave the user unsure whether anything is happening.
4. **Write errors that help, not scold.** State plainly what went wrong
   and, crucially, what to do next, in the user's language: "We couldn't
   save your changes. Check your connection and try again." Not a stack
   trace, not a blaming "invalid input", not a bare code (see ux-writing,
   error-messages). Offer the recovery action (retry, go back, contact).
5. **Preserve the user's work on failure.** An error must never discard
   what the user did (a filled form, a draft). Keep their input, show the
   error in context next to what needs fixing, and let them correct and
   continue (see interaction-design, form-handling). Losing a user's work
   to an error is the fastest way to lose the user.
6. **Design the extremes of real content.** The very long name that wraps,
   the huge number, the missing avatar, the one-item and the
   ten-thousand-item list. Designs built only around tidy sample data
   break on reality (see wireframing-prototyping's real-content rule).

## Boundaries

- These states are design work, not developer afterthoughts; if they are
  not in the mockups, they get improvised badly at build time. Specify
  them alongside the default state (see design-systems).
- The best empty and error states reduce how often users hit them: good
  onboarding fills the empty, error prevention avoids the failure (see
  onboarding-ux, usability-heuristics). Design the states, but also
  design them out.
- Copy carries much of the weight here; the words are the design (see
  ux-writing).
