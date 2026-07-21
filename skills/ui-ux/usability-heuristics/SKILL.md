---
name: usability-heuristics
description: Evaluate and design interfaces against established usability heuristics to catch the common, predictable UX failures. Use when reviewing a UI for problems or designing one to avoid them.
---

# Usability heuristics

Most usability problems are the same handful of failures repeated. The
heuristics (Nielsen's ten, and a few kin) are a checklist of what humans
need from an interface; running a design against them catches predictable
problems cheaply, before a single user is tested.

## Method

1. **Show system status.** The interface tells the user what is happening:
   loading states, progress, confirmation that an action worked, where
   they are. Silence after a click leaves the user guessing whether it
   registered (see empty-and-error-states, loading-states). Feedback within
   the moment the user expects it.
2. **Match the real world.** Use the user's language and mental model, not
   the system's internals. Labels, icons, and flows should map to how the
   user thinks about the task, not how the database is structured (see
   ux-writing, information-architecture).
3. **Give control and freedom.** Undo, cancel, back, and clearly-marked
   exits. Users make mistakes and change their minds; an interface that
   traps them (no way out of a flow, irreversible actions with no
   confirmation) breeds anxiety and error. Support reversal (see
   interaction-design).
4. **Be consistent and follow standards.** The same action looks and
   behaves the same everywhere; platform conventions (where the back button
   is, what a link looks like) are honored, not reinvented. Consistency
   lets users transfer what they learned (see design-systems).
5. **Prevent errors, and recover gracefully.** Design so mistakes are hard
   to make (constraints, good defaults, confirmation for the destructive)
   and, when they happen, help the user fix them with clear,
   plain-language messages that say what to do (see empty-and-error-states,
   error-messages). Prevention beats a good error message.
6. **Reduce memory load and respect the expert.** Show options rather than
   making users recall them; keep the interface minimal (every extra
   element competes for attention; see visual-hierarchy). At the same time,
   offer accelerators (shortcuts, defaults) so frequent users move fast.
   Recognition over recall, flexibility over rigidity.

## Method note

Run a heuristic evaluation by walking the key flows and scoring each
against these; a couple of evaluators find most issues. It complements,
not replaces, watching real users (see usability-testing).

## Boundaries

- Heuristics catch known problem classes; they miss domain-specific and
  discoverable-only-by-observation issues, which is why usability testing
  with real users is still needed (see usability-testing).
- Heuristics can conflict (minimalism vs discoverability, flexibility vs
  simplicity); resolving the tension is a design judgment for the specific
  users, not a rule to apply mechanically.
- Accessibility is a related but distinct requirement with its own
  standards; a heuristically-clean UI can still be unusable with a screen
  reader (see accessibility-review, aria-usage).
