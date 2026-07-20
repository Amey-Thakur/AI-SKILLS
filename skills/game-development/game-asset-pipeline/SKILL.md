---
name: game-asset-pipeline
description: Automate asset import, atlasing, compression, and hot reload so content flows from tools to game without hand steps. Use when building content pipelines or fixing bloated builds and stale assets.
---

# Game asset pipeline

The pipeline is the factory between art tools and the shipped build.
Its quality decides iteration speed (how fast an artist sees their
change in game) and build health (size, load times, stale-asset bugs).

## Method

1. **Import deterministically from source, never edit outputs.**
   Source assets (PSD, FBX, WAV) live in version control (LFS
   for binaries; see git-workflow adjacency); import settings
   are per-asset-type presets in code/config, not hand-tweaked
   per file; runtime formats are *generated*, reproducibly, and
   never edited by hand (the infrastructure-as-code invariant,
   applied to content). Anyone rebuilding from source gets
   byte-identical outputs or the cache is unsound.
2. **Address assets by stable keys.** Content referenced by
   GUID/logical path that survives renames and moves (saves and
   levels depend on it: see game-save-systems); a
   rename-breaks-fifty-references pipeline teaches everyone
   never to reorganize, and the project fossilizes.
3. **Automate the per-platform transforms.** Texture compression
   per target (BC/ASTC/ETC by platform and asset class:
   normal maps vs albedo vs UI), mipmaps, audio codecs per
   length/use (short SFX uncompressed-ish, music streamed),
   mesh LOD generation (see game-performance's LOD scaling),
   atlas packing for sprites/UI (draw-call batching depends on
   it). All headless-runnable in CI, cached by content hash so
   only changed assets rebuild (see incremental-processing's
   idea, for content).
4. **Make hot reload the iteration loop.** Changed textures,
   materials, tuning data, and (where the engine allows)
   scripts reload into the *running* game: seconds-long
   iteration is the single biggest multiplier on content
   quality (see css-debugging's live-loop analog). Tuning
   values (damage tables, drop rates) live in data files with
   hot reload from day one, not in code constants.
5. **Budget and gate content in CI.** Per-category budgets
   (texture memory per scene, audio bank sizes, triangle
   counts per LOD tier, total build size: mobile stores and
   console certs enforce hard caps; see mobile-release-strategy)
   checked at import and in CI with named offenders; a
   size-report diff per PR keeps the build from gaining 300MB
   in surprise increments (see bundle-size, performance-budgets
   for the web siblings).
6. **Validate references and preload behavior.** CI catches
   missing/orphaned references (a level naming a deleted mesh),
   unused-asset reports for cleanup passes (see
   dead-code-removal for content), and load-time smoke tests
   per scene so a mis-tagged synchronous mega-texture shows up
   as a failed gate, not a hitch at cert (see
   game-performance's spike budget).

## Boundaries

- Engine asset systems (Unity Addressables, Unreal's derived
  data cache) implement much of this; the skill there is
  configuring presets, budgets, and CI hooks coherently rather
  than building importers.
- Art *quality* review is human (see design-critique); the
  pipeline enforces format and budget, not taste.
- Live-ops content delivery (remote bundles, patching, CDN
  strategy) layers deployment concerns on top (see
  cdn-strategy, mobile-release-strategy); get the local
  pipeline sound first.
