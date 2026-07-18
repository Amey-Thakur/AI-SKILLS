---
name: visual-regression-testing
description: Catch unintended UI changes by diffing rendered screenshots against approved baselines with tuned thresholds and flake control. Use when protecting a component or page from visual drift across code changes.
---

# Visual regression testing

Functional tests pass while a stylesheet change quietly shoves a button off
screen or turns label text the same color as its background. Pixels are the
only thing that catches pixels. Screenshot diffing works, but done naively it
buries you in false positives from fonts, animation, and antialiasing, so the
real craft here is controlling that flake rather than taking the picture.

## Method

1. **Freeze everything nondeterministic before capture.** Disable CSS
   animations and transitions, stop videos, pin the clock, and stub any live
   data. A blinking cursor or a relative timestamp will diff on every run and
   train people to ignore diffs.
2. **Pin the rendering environment.** Run captures in a fixed container with
   one browser version and a set viewport and device pixel ratio. Fonts and
   subpixel rendering differ across operating systems, so a baseline shot on
   a laptop will fail in CI. Playwright and Docker together make this
   repeatable.
3. **Snapshot components, not just whole pages.** Capture a button, a card, a
   modal in isolation with a tool like Storybook plus a runner. A component
   diff points straight at the culprit; a full-page diff lights up on any
   unrelated change above it.
4. **Set a per-pixel and total-difference threshold.** Allow a small
   antialiasing tolerance per pixel and a maximum changed-pixel fraction, for
   example fail above 0.1% of pixels. Zero tolerance flakes constantly; a
   loose threshold hides real one-pixel shifts. Tune it per component.
5. **Review diffs as approvals.** When a shot changes, open the side-by-side
   in Percy, Chromatic, or reg-suit and decide whether the change is intended
   before promoting it to the new baseline. Rubber-stamping the update is how
   a regression becomes the reference image.
6. **Mask known-dynamic regions.** Blackout or ignore areas that legitimately
   vary, such as an avatar, an ad slot, or a live counter, so the rest of the
   frame stays assertable instead of the whole shot being written off.
7. **Fail the build and publish the diff image.** Wire the check into CI so a
   drift blocks merge, and attach the highlighted diff to the run so the
   reviewer sees what moved without reproducing it locally.

## Checks

- Does re-running the suite with no code change produce zero diffs, every
  time?
- When a diff appears, can a reviewer see exactly which pixels moved and
  approve or reject in one click?
- Are baseline images committed and their changes reviewed like code, not
  silently overwritten?

## Boundaries

Screenshot diffing proves the UI looks unchanged, not that it works or is
accessible: pair it with functional tests and an accessibility review. The
approve-or-reject workflow is shared with approval-testing, which handles
text output the same way. Whether a rendered result looks right in the first
place remains a design judgment.
