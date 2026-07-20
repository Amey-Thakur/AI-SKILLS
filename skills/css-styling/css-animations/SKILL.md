---
name: css-animations
description: Animate with compositor-friendly properties, honest durations, and reduced-motion fallbacks. Use when adding UI motion or fixing janky, battery-hungry animations.
---

# CSS animations

Motion should explain state change, then get out of the way. Everything
here follows from one budget: 16ms per frame, spent off the main thread
whenever possible.

## Method

1. **Animate transform and opacity; treat everything else as suspect.**
   Those two run on the compositor without layout or paint. Animating
   width, height, top/left, or box-shadow re-lays-out every frame; fake
   size with `transform: scale`, movement with `translate`, shadows by
   cross-fading a pre-rendered layer.
2. **Keep durations honest.** 100-200ms for hover and small state flips,
   200-300ms for panel and route transitions, 400ms+ only for hero
   moments. Ease-out for entrances (fast start, settle), ease-in for
   exits, never linear except for continuous spinners and progress.
3. **Transition state, keyframe choreography.** `transition` on the
   property for A-to-B state changes driven by class or attribute flips;
   `@keyframes` for multi-step or looping motion. Toggle animations by
   changing `animation-play-state` or a class, not by rebuilding the
   element.
4. **Use FLIP for layout moves.** To animate an element between two
   layout positions: record First rect, apply the end state, compute the
   delta, apply it inverted as a transform, then transition the transform
   to none. Layout happens once; motion stays on the compositor. The View
   Transitions API (`document.startViewTransition`) does this for whole
   DOM updates, including cross-page in supporting browsers.
5. **Respect reduced motion structurally.** Wrap motion in
   `@media (prefers-reduced-motion: no-preference)` so stillness is the
   default. Under reduced motion keep opacity fades; remove movement,
   parallax, and autoplaying loops. This is a vestibular-safety feature,
   not a polish preference.
6. **Verify on the profiler, not the eyeball.** Devtools performance
   panel: look for purple (layout) inside the animation frames, and check
   the same interaction on a throttled CPU. `will-change` is a targeted
   hint applied just before animating and removed after; declared
   permanently it wastes memory.

## Boundaries

- Scroll-driven effects belong to `animation-timeline: scroll()` or the
  scroll-linked APIs, not scroll event handlers mutating styles.
- SVG path morphing and physics-feel springs exceed CSS; that is Web
  Animations API or a motion library territory.
- If motion carries information (what moved where), reduced-motion users
  still need that information by another channel.
