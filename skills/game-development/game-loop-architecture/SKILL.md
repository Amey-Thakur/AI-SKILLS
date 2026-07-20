---
name: game-loop-architecture
description: Structure game loops with fixed-timestep simulation, interpolated rendering, and spiral-of-death protection. Use when building a game loop or fixing physics that behaves differently across frame rates.
---

# Game loop architecture

The core decision: simulation runs on a fixed timestep for
determinism and stability; rendering runs as fast as it can and
interpolates. Mixing them ties gameplay correctness to frame rate,
which is how physics breaks on faster machines.

## Method

1. **Fix the simulation timestep.** Update at a constant dt
   (60Hz or 50Hz commonly): physics integrators stay stable,
   gameplay is reproducible, and networking/replays become
   possible (see multiplayer-netcode's determinism needs).
   Variable-dt simulation makes tunneling, jitter, and
   speed-depends-on-hardware bugs a permanent background noise.
2. **Run the accumulator loop.** Each frame: add real elapsed
   time to an accumulator, run as many fixed updates as it
   covers, render once with the leftover fraction. The canonical
   shape: `while (acc >= dt) { update(dt); acc -= dt; }
   render(acc/dt)`.
3. **Interpolate rendering between states.** Render entities at
   `prev + (curr - prev) * alpha` using the leftover fraction:
   motion looks smooth at any refresh rate while simulation
   stays discrete. Store previous transform per entity; snap
   (no interpolation) on teleports or spawns to avoid ghosting
   sweeps across the screen.
4. **Clamp the accumulator against the spiral of death.** A slow
   frame queues more updates, which makes the next frame slower:
   cap the accumulated time (e.g. max 5 updates per frame) and
   drop the excess, accepting slow-motion under overload over a
   frozen process. Log when the cap hits; it is your overload
   telemetry (see game-performance budgets).
5. **Order the frame deterministically.** Input sampling,
   then fixed updates (gameplay, physics), then late/camera
   update, then render, then present: one documented order.
   Input handled inside the fixed step (or queued into it) keeps
   behavior framerate-independent (see game-input-handling for
   buffering across the boundary).
6. **Keep time sources honest.** One monotonic clock for the
   loop (never wall clock; see clock-skew's lesson locally);
   pause/timescale implemented by scaling the accumulator feed,
   not by skipping updates; and separate "game time" from "real
   time" in APIs so UI animations can run while gameplay is
   paused.

## Boundaries

- Turn-based and event-driven games can use simpler
  update-on-demand loops; the accumulator machinery earns its
  keep where continuous simulation exists.
- Engines (Unity/Unreal/Godot) already implement this: there
  your job is putting logic in the right callback
  (fixed vs frame update) and respecting their interpolation
  settings, not rebuilding the loop.
- Frame pacing against the display (vsync, variable refresh)
  is a presentation concern layered on top; the fixed-step core
  stays the same underneath.
