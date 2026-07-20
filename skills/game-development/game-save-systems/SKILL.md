---
name: game-save-systems
description: Build save systems with versioned formats, corruption resistance, and autosave that never loses real progress. Use when designing game persistence or debugging broken saves after updates.
---

# Game save systems

A save file is a contract with every past version of your game, held
by players who will yank power mid-write. Design for three certainties:
formats change, writes get interrupted, and lost progress is the
angriest bug report you will ever receive.

## Method

1. **Save explicit state, not object dumps.** A versioned schema
   of game-meaningful data (position, inventory IDs, quest
   flags, world diffs), serialized deliberately: never binary
   dumps of live engine objects, whose layout changes with every
   refactor. IDs reference content by stable keys (see
   game-asset-pipeline) so renamed assets do not orphan saves;
   procedural worlds save seed + diffs, not terrain (see
   procedural-generation).
2. **Version the format and migrate forward.** A schema version
   in the header; on load, run migrations stepwise
   (v3->v4->v5) with tests per step against archived fixture
   saves from real older builds (see database-migrations'
   discipline, golden-master testing). Unknown-newer versions
   fail with a clear message, not a crash; missing fields get
   defaults so additive change is cheap (see schema-evolution's
   additive-first rule).
3. **Write atomically, keep a rotation.** Serialize to a temp
   file, fsync, rename over the target (see
   script-idempotency's atomic-write rule); keep N previous
   saves plus the last-known-good so one corrupted write never
   destroys the profile. On load failure: try backups in order,
   report what happened, and *quarantine* (do not delete) the
   corrupt file for support diagnosis.
4. **Checksum and sanity-check on load.** Integrity hash in the
   header catches truncation and bit rot; semantic validation
   (position inside world bounds, counts within limits) catches
   logic corruption: clamp-and-continue for cosmetic damage,
   fall back to backup for structural damage (see
   data-quality-checks instincts, applied to one file).
   Treat save data as untrusted input: bounds-check everything
   (modded and hex-edited saves will visit you; see
   input-validation).
5. **Autosave at safe boundaries, asynchronously.** Trigger on
   room transitions, quest completions, and timers: at moments
   when state is coherent (never mid-combat, mid-cutscene, or
   mid-transaction); serialize a snapshot off-thread so the
   frame does not hitch (see game-performance), with a visible
   indicator and the "do not power off" convention honored.
   Separate slots for autosave vs manual saves so autosave
   never overwrites deliberate player choices.
6. **Plan cross-platform and cloud behavior.** Stable
   endianness/encoding in the format; cloud sync conflicts
   resolved by newest-with-prompt (show both timestamps and
   playtime, let the player choose: silent last-write-wins
   eats progress; see consistency-models' LWW warning);
   platform save-size and API constraints (consoles) checked
   before the format grows features.

## Boundaries

- Saves are not a security boundary in single-player; obfuscation
  wastes effort. In competitive or economy-connected games,
  authoritative state lives server-side (see
  multiplayer-netcode) and local files are cache.
- Settings/options are config, not saves: separate file, simpler
  lifecycle (see environment-config instincts).
- Mid-action save-anywhere (serializing full engine state) is a
  genuinely hard engine feature; scope honestly between
  checkpoint saves and full state capture before promising it.
