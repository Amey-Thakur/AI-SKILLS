---
name: css-theming
description: Build a custom-property token system with primitive and semantic tiers that supports runtime theme switching. Use when setting up design tokens, adding themes, or refactoring hardcoded colors.
---

# CSS theming

A theme is a mapping from meaning to value. Components consume meaning
("surface", "accent"); themes redefine the values; nobody touches
component CSS to restyle the product.

## Method

1. **Two tiers of tokens.** Primitives name values
   (`--blue-600: #2563eb`); semantics name roles
   (`--color-accent: var(--blue-600)`). Components use only semantic
   tokens. The primitive tier changes when the palette changes; the
   semantic tier changes when design language changes; components change
   for neither.
2. **Scope themes to an attribute on :root.**
   `:root { ... }` holds the default;
   `:root[data-theme="dark"] { --color-surface: ... }` overrides only
   semantic values. Switching is one attribute flip, inheritable
   everywhere, no class sprawl.
3. **Name by role, not appearance.** `--color-danger`, not `--color-red`:
   the danger color may not be red in every theme. Scale names
   (`--space-1..8`, `--text-sm/base/lg`) beat value names (`--space-4px`)
   because the scale can be retuned.
4. **Keep the semantic set small and complete.** Surface, surface-raised,
   border, text (2-3 strengths), accent, danger/success/warning, focus
   ring. Every hardcoded hex in component CSS is a future theming bug;
   lint for raw color values outside the token files.
5. **Respect the user first paint.** Apply the stored theme before CSS
   loads (inline script setting `data-theme`), default from
   `prefers-color-scheme`, and set the `color-scheme` property so form
   controls and scrollbars match. A white flash before dark mode is a
   token system applied too late.
6. **Derive sparingly with color functions.** `color-mix(in oklch, ...)`
   and `oklch()` relative colors can generate hover states from base
   tokens, cutting token count; keep derivations in the token layer so
   components stay ignorant of the math.

## Boundaries

- Tokens do not enforce contrast; themes need their own accessibility
  pass (see color-contrast).
- Per-component theme overrides (a dark card on a light page) work by
  re-scoping the semantic tokens on that subtree, not by forking the
  component's CSS.
- Design-tool token sync (Figma variables to CSS) is a build pipeline
  concern; hand-editing generated token files breaks the loop.
