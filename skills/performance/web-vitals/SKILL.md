---
name: web-vitals
description: Improve LCP, CLS, and INP by measuring field data, tracing each metric to its specific cause, and applying the fixes known to move that number. Use when Core Web Vitals are failing or a page feels slow to load, settle, or respond.
---

# Web Vitals

Core Web Vitals score three things a user feels: how fast the main content loads
(LCP), how much the layout jumps (CLS), and how quickly the page responds to
input (INP). They go red for different reasons, so a generic speedup rarely moves
them. Measure real users, find the specific cause of each, then apply a fix that
targets it.

## Method

1. **Measure field data, not just the lab.** A Lighthouse run is reproducible but
   synthetic. Pull real-user numbers from the CrUX report or the `web-vitals`
   library and optimize the p75 that users actually experience.
2. **Fix LCP by speeding the largest element.** Largest Contentful Paint is
   usually a hero image or a heading. Preload it, serve a modern image format,
   remove render-blocking CSS and JavaScript, and cut server response time. Aim
   for under 2.5 seconds at p75.
3. **Fix CLS by reserving space.** Cumulative Layout Shift comes from images with
   no dimensions, injected banners and ads, and late-swapping fonts. Set explicit
   width and height or `aspect-ratio`, reserve slots for dynamic content, and
   never insert content above what is already visible. Aim for under 0.1.
4. **Fix INP by shrinking main-thread work.** Interaction to Next Paint suffers
   when a long task blocks the event handler. Break up long JavaScript tasks,
   defer non-critical work, cut hydration cost, and debounce heavy handlers. Aim
   for under 200 milliseconds.
5. **Attribute each regression before fixing it.** Use the Performance panel and
   the `web-vitals` attribution build to name the exact element, script, or shift
   behind the number. Do not apply a fix and hope it lands.
6. **Verify on a throttled mid-tier device.** Test under 4x CPU throttling and
   Slow 4G, not on your laptop. A metric that is green on desktop is often red on
   the median phone.

## Checks

- Are you reading p75 field data, or only a lab score on fast hardware?
- Is each of LCP, CLS, and INP traced to a specific element or script?
- Do the three metrics sit under 2.5s, 0.1, and 200ms at p75?
- Did the fix move the field metric on a throttled device, not just Lighthouse?

## Boundaries

Shrinking the JavaScript that inflates INP and LCP is bundle-size; right-sizing
the images that dominate LCP is image-optimization; loading fonts without
shifting layout is font-loading. This skill ties fixes to the metric: the
mechanics live in those skills.
