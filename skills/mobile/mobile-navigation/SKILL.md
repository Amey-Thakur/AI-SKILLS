---
name: mobile-navigation
description: Structure mobile navigation with a clear stack, tab, and modal hierarchy and a back stack that survives deep links and process death. Use when designing app navigation, adding a deep-link target, or fixing lost-state and wrong-back-button bugs.
---

# Mobile navigation

Navigation is the app's state machine for where the user is and how they
got there. The bugs that matter are structural: a back button that exits
the app mid-flow, a deep link that lands on a screen with no parent, state
wiped when the OS kills the process. Design the hierarchy first, then the
routes.

## Method

1. **Pick one root pattern and nest deliberately.** Tabs at the root for
   parallel sections, each tab owning its own stack so switching tabs
   preserves each stack's position. Modals present over the whole tree for
   focused, dismissable tasks. Do not nest tabs inside a pushed screen, and
   do not push full-screen content as a modal that the back gesture cannot
   reach; both break the mental model of depth.
2. **Make every screen reachable by a route, not only by a push.** Define
   named routes with typed parameters so any screen can be constructed from
   a URL or a saved state, not only by walking there from the home screen.
   A screen you can only reach by tapping through three others cannot be
   deep-linked or restored.
3. **Synthesize a back stack for deep links.** When a link opens a leaf
   screen, build the parent chain beneath it (`TaskStackBuilder` on Android,
   an explicit stack push on iOS/React Navigation) so Back and Up go to the
   logical parent, not out of the app. A deep link that leaves Back exiting
   the app on the first press is the most common navigation defect.
4. **Persist and restore navigation state across process death.** Android
   kills backgrounded processes freely; iOS less so but still under memory
   pressure. Serialize the route stack and each screen's key state
   (`SavedStateHandle`, React Navigation state persistence, iOS state
   restoration), and rebuild on relaunch so the user returns where they
   left, not at the root.
5. **Keep navigation state and business state separate.** The navigator
   owns which screens are open; a screen owns its own data. Passing a large
   object as a route parameter breaks restoration, since the serialized
   route must stay small. Pass an id, refetch or read from the store on
   arrival.
6. **Guard transitions, do not race them.** Debounce rapid taps that would
   push a screen twice, block navigation while a required load or auth
   check is pending, and confirm before discarding unsaved input on Back.

## Checklist

- On every deep-link target, does Back reach a sensible parent, not the
  home screen or app exit?
- Kill the app from the OS settings mid-flow: does relaunch restore the
  stack and in-progress screen?
- Switch tabs and return: is each tab's scroll and stack position intact?

## Boundaries

This covers in-app navigation structure and restoration. The URL formats
and platform association files that route external links are deep-linking;
notification tap-through routing is push-notifications. Framework specifics
(Navigation Component, React Navigation, SwiftUI NavigationStack) override
this vocabulary; the hierarchy and back-stack rules transfer.
