---
name: css-architecture
description: Organize stylesheets with scoping, co-location, and layer order so CSS stays deletable as the codebase grows. Use when structuring styles for a growing app or auditing a stylesheet nobody dares touch.
---

# CSS architecture

The health metric for CSS is deletability: when a component dies, its
styles must die with it, provably. Every practice here serves that.

## Method

1. **Co-locate styles with components.** One style unit per component,
   living next to it (CSS Modules, scoped SFC styles, utility classes in
   markup, or a `.css` imported by the component). Global stylesheets
   accumulate; co-located ones get deleted with their component.
2. **Pick one scoping mechanism and hold it.** CSS Modules or scoped
   styles for build-time isolation; utility classes for token-constrained
   markup styling; Shadow DOM only for embeddable widgets. Mixing idioms
   per-feature multiplies the knowledge needed to touch anything.
3. **Define the global layer order once.**
   `@layer reset, tokens, base, components, utilities;` in the entry
   stylesheet. Globals are exactly: reset, token definitions, element
   defaults (`base`), and shared utilities. Anything else claiming global
   status needs an argument.
4. **Style through stable interfaces.** Components expose modifiers
   (`data-variant`, props) and semantic tokens; parents size and position
   children (`grid-area`, width on the slot), never reach inside them
   (`.parent .child-internal` is the coupling that makes CSS undeletable).
5. **Keep specificity flat inside a scope.** One class or attribute
   selector deep (see css-cascade); state via `data-*` or aria attributes
   (`[aria-expanded="true"]`), which doubles as an accessibility
   contract.
6. **Delete with tooling, not archaeology.** Scoped styles make unused
   CSS visible (unimported file, unreferenced local class); CI can run
   coverage or lint for orphaned modules. A quarterly "grep the class
   name, delete the rule" pass keeps the base honest even without
   tooling.

## Boundaries

- Naming conventions (BEM) solved scoping before build tools did; adopt
  them only where no build-time scoping exists (CMS themes, legacy
  server-rendered apps).
- Print styles, email HTML, and rendered user content are separate
  stylesheets with their own rules; do not fold them into the app system.
- Architecture cannot fix an undesigned system; without tokens and
  components, organizing files is rearranging the pile.
