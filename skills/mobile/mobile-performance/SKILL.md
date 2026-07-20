---
name: mobile-performance
description: Make a mobile app fast where users feel it by protecting startup time, keeping lists at frame rate, handling images at display size, and keeping work off the main thread. Use when the app is slow to open, scrolling janks, or the UI freezes during work.
---

# Mobile performance

Users judge a mobile app on three moments: how fast it opens, whether
scrolling stays smooth, and whether taps respond instantly. All three come
down to one rule: the main thread must be free to render every frame. At
60Hz you have 16ms per frame, at 120Hz you have 8ms; miss the budget and
the user sees jank.

## Method

1. **Protect cold start; measure the real metric.** Track time to first
   frame and time to interactive, not a log line. On Android read
   `Time to initial display` from `adb shell am start -W` and Macrobenchmark;
   on iOS read the `Time Profiler` and `os_signpost`. Defer non-critical
   init off the startup path, move work out of `Application.onCreate` and
   `application(_:didFinishLaunching:)`, and lazy-load feature modules.
   Budget cold start under about 2 seconds on a mid-tier device, not a
   flagship.
2. **Recycle list rows and virtualize long content.** Use RecyclerView,
   `UICollectionView` with cell reuse, `LazyColumn`, or FlatList with a
   stable `keyExtractor`. Never render a 10,000-row list into one scroll
   view. Fix a stable item type and size so the framework can recycle, and
   avoid nested scroll views that defeat recycling.
3. **Keep row binding cheap and free of allocation.** No JSON parsing, date
   formatting, regex, or layout inflation inside `onBindViewHolder` or a
   cell's render. Precompute display strings, cache formatters, and flatten
   view hierarchies. A single dropped frame during a fling is usually one
   expensive bind.
4. **Load images at display resolution and off-thread.** Decode to the view
   size, never the source 4000px, using Glide, Coil, SDWebImage, or
   Nuke with memory and disk caches. Downsample on a background thread,
   supply an explicit target size, and cancel loads for recycled rows so a
   fast scroll does not decode hundreds of full images.
5. **Move real work off the main thread, touch UI only on it.** Run I/O,
   parsing, DB queries, and crypto on background dispatchers, coroutines,
   or `Task.detached`, and hop back for UI updates. Any synchronous disk or
   network call on the main thread is a freeze; enable strict-mode and
   main-thread-checker to catch them in development.
6. **Profile before and after on a low-end device.** Confirm wins with
   Systrace/Perfetto, the Flutter/RN performance overlays, or Instruments,
   watching frame timing rather than a stopwatch. Optimize the p90 device
   your users actually hold, not the developer's newest phone.

## Signals

- Does a scrollable screen hold 60fps during a hard fling on a mid-tier
  device, with no dropped-frame spikes in Perfetto?
- Does an image list decode at target size, verified by memory not
  ballooning as the user scrolls?
- Does strict-mode or the main-thread checker stay silent during normal
  use?

## Boundaries

This is on-device rendering and startup latency. Network payload size and
caching strategy sit with the API and caching-strategy work; app binary
size and download size are a separate concern. Battery and memory-leak
hunting overlap but are their own investigations.
