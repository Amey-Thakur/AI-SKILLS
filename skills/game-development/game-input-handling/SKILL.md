---
name: game-input-handling
description: Build input systems with action mapping, buffering, dead zones, and rebinding that feel responsive and fair. Use when wiring game controls or fixing input that feels laggy or eats presses.
---

# Game input handling

Input is the player's entire voice; latency and eaten presses read as
unfairness. The architecture rule: gameplay listens to *actions*
("jump"), never to keys ("space"), and timing forgiveness is designed,
not accidental.

## Method

1. **Map devices to actions in one layer.** An input map turns
   keys/buttons/axes into named actions with contexts
   (gameplay, menu, vehicle): gameplay code reads
   `actions.jump.pressed`, never key codes. Contexts stack and
   consume: menu-open swallows gameplay input by design rather
   than by flag-checking in every handler (see
   design-systems thinking applied to controls).
2. **Sample into the fixed step correctly.** Edge events
   (pressed/released this tick) and level states (held) are
   different queries: latch edges from the OS event stream into
   the next fixed update so a sub-frame tap is never lost
   between updates (see game-loop-architecture's frame order).
   Poll analog state per update; never process gameplay input in
   render-rate callbacks or fast machines get faster dodges.
3. **Buffer inputs across the forgiveness window.** A jump
   pressed 100ms before landing should fire on landing: queue
   actions with timestamps and let consumers accept within a
   tunable window (coyote time is the same idea inverted:
   accepting jump shortly *after* leaving a ledge). These
   windows are the difference between "tight" and "unfair" in
   feel; expose them as design-tunable data, not constants.
4. **Condition analog input honestly.** Radial dead zones with
   rescaling (so movement starts at the zone edge, not with a
   snap), response curves per use (linear for movement, expo
   for camera fine-aim), and separate sensitivity per axis and
   per input kind. Raw stick drift shipping as character drift
   is the most common port complaint (see mobile-input-ux for
   the touch sibling of these concerns).
5. **Make rebinding a first-class system.** Every action
   rebindable, conflicts surfaced at bind time, per-context
   bindings, saved with the profile (see game-save-systems),
   glyphs shown from the *active* device with hot-swap
   detection. Accessibility depends on this (hold-to-toggle
   options, one-handed layouts); bolting it on later touches
   every UI prompt in the game.
6. **Measure and minimize the latency chain.** Input-to-photon
   latency = OS event, sample point, simulation tick, render,
   present: keep one frame of buffering at most in the input
   path, test with a 240fps phone camera or latency tools, and
   never add smoothing to digital actions (smoothing is for
   camera axes only). For networked play, local prediction
   hides transport latency (see multiplayer-netcode).

## Boundaries

- Engine input systems (Unity Input System, Unreal Enhanced
  Input) already implement mapping/contexts/buffering hooks;
  the skill there is configuring them coherently, not
  rebuilding.
- Text entry, IME, and chat are OS-integration problems with
  their own correctness rules; never route them through the
  action system.
- Replays and networking require input to be serializable as
  the *only* driver of simulation (see
  game-loop-architecture determinism); side-channel state reads
  break both.
