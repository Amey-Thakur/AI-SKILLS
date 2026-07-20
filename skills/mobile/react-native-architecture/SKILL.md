---
name: react-native-architecture
description: Structure React Native apps around clear native-module boundaries and decide honestly when RN fits. Use when starting or auditing a React Native codebase, or weighing RN against fully native development.
---

# React Native architecture

React Native earns its keep when one product team ships two platforms with
mostly shared UI logic. The architecture question is always the same: what
lives in JavaScript, what lives native, and how thin is the bridge between
them.

## Method

1. **Decide fit before structure.** RN fits content- and form-driven apps
   with shared business logic. It fights you on heavy real-time graphics,
   background-centric apps (tracking, audio), and deep OS integration on
   day one. If the roadmap is 30%+ platform-specific capability, budget
   for native engineers regardless.
2. **Keep the JS/native boundary explicit and small.** Wrap every native
   capability in one typed TypeScript module (`src/native/`), with its
   TurboModule or Nitro module behind it. UI code imports the wrapper,
   never the module directly; when implementations change, one file
   changes.
3. **Choose libraries by maintenance reality.** Navigation: react
   navigation (JS-driven) unless you need native stack behavior everywhere.
   Lists: FlashList over FlatList for anything long. Animations:
   reanimated, which runs on the UI thread. Every native dependency you
   add is a build-breakage subscription; prefer JS-only where performance
   allows.
4. **Isolate platform divergence.** `Component.ios.tsx` /
   `Component.android.tsx` for small forks; a `platform/` capability layer
   when behavior differs structurally (permissions, files, notifications).
   Scattered `Platform.OS === "ios"` conditionals are the smell to refactor.
5. **Respect the threading model.** JS runs on one thread: no JSON parsing
   of megabyte payloads or sync storage reads during interaction. Push
   heavy work behind `InteractionManager`, into reanimated worklets, or
   into a native module that does the work off-thread.
6. **Wire the escape hatches early.** Crash reporting that symbolicates
   both JS and native stacks, and an over-the-air update service for
   JS-only fixes, with the store-policy limits understood. Retrofitting
   either after the first incident is twice the work.

## Boundaries

- RN does not remove the need to understand iOS and Android; it changes
  how often you touch them.
- Brownfield embedding (RN screens inside an existing native app) is a
  different architecture with its own lifecycle bridging; do not apply
  this layout blindly there.
- Expo's managed workflow accelerates the first year; audit its native
  module coverage against your roadmap before committing.
