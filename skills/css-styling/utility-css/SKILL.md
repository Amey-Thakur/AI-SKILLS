---
name: utility-css
description: Use Tailwind-style utilities with discipline, extracting components at the right threshold and keeping class lists readable. Use when working in a utility-first codebase or deciding whether and how to adopt one.
---

# Utility CSS

Utility-first trades selector naming for co-location: styles live in
markup, constrained to a design-token scale. The failure mode is not the
long class list; it is the same long list pasted eleven times.

## Method

1. **Adopt for the constraint, not the brevity.** The win is that
   `p-4 text-sm` comes from a fixed scale, so spacing and type stay
   consistent without review vigilance. Configure the theme first (tokens
   in, arbitrary values out); a codebase full of `w-[437px]` has utility
   syntax with none of the benefit.
2. **Extract on the third copy, into a component.** Duplication is fine
   twice. The third time, extract a framework component (React/Vue) that
   owns the class list, not a CSS `@apply` class; `@apply` rebuilds the
   semantic-CSS layer you just left, and drifts from the utility source
   of truth.
3. **Order classes canonically.** Layout, spacing, typography, color,
   states: `flex items-center gap-2 px-4 text-sm text-muted
   hover:bg-surface-2`. Use the official Prettier plugin so ordering is
   automated and diffs stay quiet.
4. **Push variants into data attributes at complexity.** When a component
   has states, `data-state="open"` with `data-[state=open]:rotate-180`
   reads better than ternary class soup in JS, and keeps the state
   machine visible in one attribute.
5. **Keep an escape hatch layer, small and listed.** Genuinely complex
   selectors (typography over rendered markdown, third-party widget
   overrides) go in a real stylesheet under `@layer components`. If that
   file grows past a screen or two, utilities are being avoided rather
   than escaped.
6. **Review rendered output, not class strings.** In PRs, the question is
   whether the element uses the scale and the semantic color tokens;
   inconsistency shows up as one-off arbitrary values and raw hex, which
   are lintable (`no-arbitrary-value` rules).

## Boundaries

- Do not mix naming conventions and utilities on the same element halfway;
  a codebase needs one primary styling idiom per layer.
- Utility classes in string-concatenation logic defeat the compiler's
  content scanning; class names must appear whole in source.
- For a design-system package consumed by many apps, tokens plus real CSS
  components travel better than exported utility markup.
