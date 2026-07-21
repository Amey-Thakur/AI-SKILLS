---
name: interaction-design
description: Design how users act and the interface responds: affordances, feedback, states, and forgiving flows. Use when designing controls, flows, and interactive behavior, or fixing an interface that confuses or frustrates.
---

# Interaction design

Interaction design is the conversation between the user and the interface:
what they can do, how they know they can do it, and how the system
responds. Every control is a small promise; the craft is keeping those
promises obvious and the responses immediate.

## Method

1. **Make affordances obvious.** Things that can be acted on should look
   like it: buttons look pressable, links look clickable, draggable things
   invite dragging. Users should not have to hunt or guess what is
   interactive. Flat designs that hide affordances (is that text a button?)
   fail here; signal interactivity clearly (see visual-hierarchy).
2. **Give immediate, proportional feedback.** Every action gets a response
   the user can perceive, fast: a button depresses, a toggle animates, a
   save confirms, a long operation shows progress (see loading-states,
   usability-heuristics). The response confirms the system heard them.
   Silence makes users click again and doubt.
3. **Design all the states, not just the happy one.** Every interactive
   element has states: default, hover, focus, active, disabled, loading,
   error, empty, success. Designing only the default leaves the others to
   chance and produces the janky, dead-feeling interactions (see
   empty-and-error-states, ui-state-machines).
4. **Be forgiving.** Support undo, confirm destructive actions, preserve
   user input on error (never clear a form the user just filled), and make
   reversal easy. Users explore and err; an interface that punishes
   mistakes teaches fear (see usability-heuristics' control-and-freedom).
5. **Reduce the effort of the common path.** Good defaults, smart
   autofill, remembering choices, and minimizing steps and clicks for what
   users do most (see user-flows, mobile-input-ux). Every field and click
   removed from the frequent task is a real gain; friction compounds.
6. **Use motion to explain, not decorate.** Transitions that show where a
   thing came from or went, that connect a cause to its effect, aid
   understanding; animation for its own sake distracts and slows. Respect
   reduced-motion preferences (see css-animations).

## Boundaries

- Interaction design decides behavior; visual design decides appearance
  and IA decides structure (see visual-hierarchy, information-architecture).
  They are separable and all required.
- Platform conventions constrain interaction (how gestures, back, and
  focus work on web vs iOS vs Android); follow them rather than inventing,
  so users transfer their habits (see mobile-navigation).
- Novel interactions carry a learning cost; innovate only where the payoff
  beats the unfamiliarity, and test it (see usability-testing). Most of the
  time, the expected interaction is the right one.
