---
name: procedural-generation
description: Generate game content with seeded determinism, layered noise, constraint solving, and validation that guarantees playability. Use when building procedural levels, worlds, or loot, or debugging generation that breaks.
---

# Procedural generation

Procgen trades authored content for authored *rules*. Two disciplines
make it shippable: determinism (same seed, same world, forever) and
validation (every output guaranteed playable, not just probable).

## Method

1. **Make seeds the whole story.** One master seed derives
   per-system seeds (terrain, loot, encounters) via a hash
   (`hash(master, "terrain", chunk_xy)`): systems stay
   independent, chunks generate in any order, and a seed
   reproduces the exact world for debugging, sharing, and
   testing. Never let generation touch unseeded randomness or
   iteration-order-dependent state (hash map ordering is the
   classic determinism leak; see game-loop-architecture's
   determinism needs, clock-skew's wall-clock ban).
2. **Layer noise with purpose per octave.** Continental shape
   from low-frequency noise, hills from mid, detail from high
   (fBm); domain warping for natural coastlines; different
   noise *uses* (elevation, moisture, temperature) combined
   through explicit rules into biomes. Tune each layer in
   isolation with a live-reload visualizer: iterating blind
   through full regeneration is where procgen time disappears
   (see game-asset-pipeline hot-reload ethic).
3. **Use constraint-based generation for structure.** Rooms,
   dungeons, cities: generate under hard constraints
   (connectivity, door alignment, spawn distances) via
   grammar/graph methods or WFC-class solvers, rather than
   noise-plus-hope. Structure first (the critical path as a
   graph), decoration second: guarantees live at the structural
   level.
4. **Validate every output against playability invariants.**
   Reachability from entrance to exit (flood fill/pathfind),
   required resources present, difficulty within band, no
   softlocks (key behind its own door). On failure: repair
   (add a corridor), reroll the sub-seed, or reject the chunk:
   but never ship unvalidated worlds because "the odds are
   low"; at a million players, the odds are certainties (see
   fuzz-testing's spirit pointed inward).
5. **Blend authored content where it matters most.** Hand-made
   set pieces, vaults, and landmarks placed by the generator
   under its constraints: procgen provides variety and
   connective tissue, authored pieces provide memorable
   moments and tutorial-grade control. Pure noise worlds read
   as oatmeal within hours; the mix is the craft.
6. **Budget generation like any frame work.** Chunked,
   time-sliced generation within a per-frame budget for
   streaming worlds (see game-performance step 5); heavy
   solvers moved to load screens or background threads with
   the determinism rules intact (thread-stable seeding, no
   shared mutable RNG: see go-concurrency instincts wherever
   your runtime is). Cache generated chunks; regeneration must
   equal the cache or your determinism already broke: assert
   it in tests.

## Boundaries

- Determinism across *versions* is a separate promise: engine
  or algorithm changes reshuffle worlds; if seeds are shared
  socially or saves depend on regeneration, version the
  generator and keep old paths (see game-save-systems
  versioning).
- Procgen amplifies balance problems: loot and difficulty
  tables need the same telemetry-driven tuning as authored
  content (see ab-test-design instincts applied to drop
  rates).
- Floating-point determinism across platforms is not free
  (fast-math, SIMD differences); integer/fixed-point
  generation or per-platform validation covers cross-play
  worlds (see multiplayer-netcode).
