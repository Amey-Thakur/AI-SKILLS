---
name: game-performance
description: Hold frame budgets through per-frame profiling, object pooling, draw-call batching, and allocation discipline. Use when a game stutters, drops frames, or needs optimization triage.
---

# Game performance

A game's budget is one frame: 16.6ms at 60fps, all-in. Performance
work means profiling *the frame* (not averages), and the enemies are
spikes: one 100ms frame reads worse than a steady 40fps.

## Method

1. **Profile the frame, chase the spikes.** Frame-time graphs
   (not fps averages: fps hides variance), the engine's frame
   profiler for CPU (which systems, which entities) and GPU
   (which passes) per frame; capture the *bad* frames
   specifically (spike-triggered captures). Diagnose before
   optimizing: the bottleneck is CPU main thread, render thread,
   or GPU, and each has different cures (see systems-profiling
   for the native toolbox underneath).
2. **Eliminate steady-state allocation.** Per-frame allocations
   trigger GC pauses (managed engines) or allocator churn
   (native): pool bullets/particles/effects (pre-allocate, reuse,
   never destroy mid-play), reuse buffers and collections, avoid
   closure/boxing garbage in hot callbacks (LINQ and lambdas in
   Update are the Unity classics; see csharp-linq's allocation
   note). Target: zero allocations per frame during gameplay,
   verified in the profiler's GC/alloc view.
3. **Cut draw calls with batching and instancing.** Thousands of
   individual draws choke the CPU-to-GPU pipe: static batching
   for level geometry, GPU instancing for repeated meshes,
   texture atlases so sprites/materials share draws (see
   game-asset-pipeline), and UI canvases split so one moving
   element does not rebuild the whole canvas. Measure draw
   calls/setpass in the frame debugger before and after.
4. **Scale work by distance and visibility.** LODs for meshes,
   culling (frustum plus occlusion where it pays), reduced tick
   rates for far-away AI/physics (see
   entity-component-system's system granularity making this
   easy), and particle/shadow budgets per quality tier. The
   principle: spend the frame on what the player can see.
5. **Spread and defer the spiky work.** Level loads and heavy
   spawns behind async loading screens; procedural generation
   time-sliced across frames (a budget per frame, resumable
   work: see procedural-generation); pathfinding and AI queries
   through request queues with per-frame caps (see
   backpressure's bounding instinct, in-frame). Hitches at
   spawn/checkpoint moments are almost always synchronous work
   that wanted deferral.
6. **Gate with performance tests on target hardware.** The
   min-spec device runs a scripted worst-case scene in CI or
   nightly (see performance-testing, mobile-performance for
   thermal reality): frame-time p95 and memory ceilings as pass
   bars, so regressions surface at the commit, not at
   certification (consoles) or in reviews (mobile).

## Boundaries

- Do not micro-optimize before the frame profiler assigns
  blame; a game is a dozen subsystems and intuition picks the
  wrong one routinely (see perf-calibration).
- Visual quality trades are design decisions: dynamic
  resolution, effect density, shadow distance belong in a
  quality-settings conversation with art direction, not silent
  engineering cuts.
- Load-time and memory-footprint optimization are their own
  tracks (streaming, compression: see game-asset-pipeline);
  frame budget work assumes assets already fit.
