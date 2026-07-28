---
name: website-building
description: Build and ship a small site that loads fast, reads well, and can be updated, choosing the simplest stack that fits. Use when creating a marketing site, portfolio, documentation site, or landing page.
---

# Website building

Most sites are over-engineered. A brochure site does not need a
framework, a build pipeline, or a database, and choosing those anyway
buys complexity that must be maintained by whoever inherits it.

## Method

1. **Choose the simplest thing that fits.** Static HTML for a few pages,
   a static site generator for many, and a framework only when genuine
   interactivity requires it.
2. **Write the content before the design.** Layout decisions made
   against real copy work; those made against placeholder text collapse
   when the real words arrive (see text-expansion-layout).
3. **Structure semantically.** Headings in order, landmarks, real
   buttons and links, which gives accessibility and search for free (see
   aria-usage, technical-seo).
4. **Make it fast by default.** Optimised images, minimal script, and
   system or self-hosted fonts. Speed is mostly what you avoid adding
   (see web-vitals, image-optimization).
5. **Design mobile first.** Most traffic is mobile, and a design that
   works small scales up more easily than the reverse (see
   responsive-design).
6. **Host statically where possible.** Static hosting with a CDN is
   cheap, fast, and has almost no operational surface (see
   cdn-strategy).
7. **Make updates possible without you.** Whoever edits content next
   should not need a build environment, which is what decides the stack
   more than any technical criterion.

## Boundaries

This covers small to medium sites; applications with accounts and data
are a different problem (see frontend). Design taste is not a
substitute for a designer on brand-critical work. Accessibility and
privacy obligations apply to sites as much as to products (see
cookie-compliance).
