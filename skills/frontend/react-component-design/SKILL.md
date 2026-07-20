---
name: react-component-design
description: Design React component props and boundaries so components compose cleanly and stay reusable. Use when creating a component, reviewing a bloated props list, or deciding controlled versus uncontrolled.
---

# React component design

A component is an API before it is markup. The props are the contract, and
most component pain traces to a contract that configures behavior with flags
instead of composing it with children.

## Method

1. **Name the single responsibility first.** A component does one thing:
   render a thing, own an interaction, or lay out other components. If you
   cannot state its job in one clause without "and", split it. Mixed
   responsibilities are the source of the twelve-prop component.
2. **Prefer composition over configuration.** When a `variant`, `mode`, or
   `showX` prop starts branching the render tree, expose slots via `children`
   or named render props instead. A `<Card>` that takes `<Card.Header>` and
   `<Card.Body>` scales; a `<Card>` with `hasHeader`, `headerText`,
   `headerIcon`, `footerButtons` does not.
3. **Decide controlled versus uncontrolled explicitly.** Controlled means the
   parent owns the value via `value` + `onChange`; uncontrolled means the
   component owns it with an optional `defaultValue`. Pick one per piece of
   state and document it. Support both only through the standard pattern:
   `value ?? internalValue`. Silently switching between them mid-life is the
   React "controlled to uncontrolled" warning and a class of lost-edit bugs.
4. **Keep the prop surface minimal and orthogonal.** Every prop should be
   independent; if two props are only valid in combination, model that as one
   prop with a union type. Derive what you can from `children` or context
   rather than asking for it. Fewer props means fewer illegal states.
5. **Pass through the DOM props you did not consume.** Spread `...rest` onto
   the root element and forward `ref` with `forwardRef` so callers can attach
   `aria-*`, `className`, `onClick`, and test ids without you enumerating
   them. A component that swallows unknown props forces a fork.
6. **Default toward the common case.** Set defaults so the zero-config usage
   is the right usage for most callers, and make the escape hatch explicit.
   Required props should be genuinely required, not defaulted to a guess.

## Boundaries

- This is component API shape, not visual design; token and layout decisions
  belong to the design system.
- Global and server state placement is out of scope; see frontend-state.
- Framework primitives differ in Vue and Svelte, but composition-over-flags
  and explicit controlled state transfer directly.
