---
name: entity-component-system
description: Model game objects as entities with data components processed by systems, and know when ECS complexity pays. Use when structuring game architecture or escaping deep inheritance hierarchies.
---

# Entity component system

ECS replaces "what an object *is*" (inheritance) with "what an object
*has*" (components) and "what processes it" (systems). You buy
composition flexibility and cache-friendly iteration; you pay in
indirection for gameplay logic that wants to reason about one thing.

## Method

1. **Adopt for the two real reasons.** (a) Composition pressure:
   the FlyingPoisonousArmoredEnemy inheritance diamond, where
   designers want to mix abilities freely. (b) Performance at
   scale: thousands of entities iterated per frame, where
   struct-of-arrays layout wins cache behavior (see
   systems-profiling's data-layout lesson). A dozen bespoke
   objects need neither; plain objects or simple composition
   serve better (see premature-abstraction).
2. **Keep components as pure data.** `Position{x,y}`,
   `Velocity{dx,dy}`, `Health{hp,max}`: no methods beyond
   accessors, no references to other entities' components (store
   entity IDs instead; see rust-ownership's handle pattern).
   Behavior lives in systems; a component with logic is a class
   wearing a costume.
3. **Write systems as queries over component sets.** Movement
   iterates `(Position, Velocity)`; damage iterates
   `(Health, IncomingDamage)`: each system declares what it
   reads and writes, runs over every matching entity, and stays
   ignorant of entity "types". Small, single-purpose systems
   compose the game; a MegaSystem touching everything recreates
   the God object horizontally.
4. **Order systems explicitly; defer structural changes.**
   A documented execution order (input, AI, physics, damage,
   cleanup, render-sync) inside the fixed update (see
   game-loop-architecture); entity creation/deletion and
   component add/remove during iteration go through a command
   buffer applied at a sync point, because mutating storage
   mid-query invalidates iteration everywhere.
5. **Use tags and events idiomatically.** Empty components as
   tags (`Dead`, `PlayerControlled`) make queries expressive;
   short-lived event components (or a queue consumed by one
   system) carry "this happened" between systems without
   callbacks. Singleton/resource storage holds world state
   (time, input snapshot) systems share.
6. **Reach for an existing ECS library.** Archetype or
   sparse-set storage, query caching, and change detection are
   solved problems (flecs/entt/bevy-class); hand-rolling them
   is a project in itself. Your architecture work is component
   vocabulary and system ordering, not storage engineering
   (see managed-vs-selfhosted instincts, in miniature).

## Boundaries

- UI, audio management, and meta-game code (menus, saves) gain
  nothing from ECS; use ordinary structures there and bridge at
  the edges (see game-save-systems).
- ECS complicates entity-centric logic ("what is *this* boss
  doing"): scripts and state machines can attach as components
  driving data, but debugging crosses more indirection: budget
  for tooling (entity inspectors).
- Engines with their own object models (Unity GameObjects,
  Unreal Actors) offer partial ECS layers; mixing paradigms in
  one project needs a clear rule for what lives where.
