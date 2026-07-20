---
name: go-project-layout
description: Organize Go packages by domain with internal boundaries, consumer-side interfaces, and structure that grows on demand. Use when starting a Go project or refactoring one into clearer packages.
---

# Go project layout

Go rewards starting small and letting structure emerge from real
dependencies. Packages are the unit of design: name them by what they
provide, point their dependencies one way, and keep interfaces where
they are consumed.

## Method

1. **Start flat; split on pressure.** A new service begins as one
   main package or `main.go` plus one library package; introduce
   packages when a file group has a coherent name and other code
   wants only part of it. Pre-built empty scaffolds (`pkg/`, `utils/`,
   `models/`, `services/`) invent boundaries before knowing them; the
   `utils` grab-bag in particular is a queue of unfiled code (same
   smell as python-project-structure).
2. **Name packages by what they provide.** `storage`, `billing`,
   `token`: short, lower-case, no stutter (`billing.Invoice`, not
   `billing.BillingInvoice`). A package name is part of every call
   site; if you cannot name it without "util", "common", or "helpers",
   the contents belong elsewhere.
3. **Use internal/ as the API boundary.** Anything under `internal/`
   is uncompilable by outside modules: put everything there by
   default, exporting only the packages you intend others to import.
   For applications, `cmd/<binary>/main.go` as thin entrypoints
   (parse flags, wire dependencies, call into internal; the
   python-cli-tools separation) and all logic importable and
   testable.
4. **Define interfaces where they are used, sized to need.** The
   consumer declares the 1-3 method interface it requires
   (`type Store interface { Get(...) }`) and the concrete type
   satisfies it implicitly; producers exporting fat interfaces
   recreate Java's ceremony without its tooling. Accept interfaces,
   return concrete types.
5. **Keep the dependency arrows one-way.** Domain packages do not
   import transport or storage details; `cmd` wires concretes into
   constructors (`NewServer(store, clock)`): plain constructor
   injection, no framework (see layered-architecture,
   dependency-inversion instincts). Import cycles are always a
   misplaced concept; extract the shared type downward into its own
   package.
6. **Let the module be the unit of versioning.** One module per
   repo until you need independent versioning; `go.mod` at the
   root, packages underneath. Multi-module repos and `pkg/` layers
   are big-org tools with real costs; adopt them for a demonstrated
   reason (see monorepo-vs-polyrepo), not because a template did.

## Boundaries

- Libraries invert some defaults: the root package is the product,
  examples and internal test helpers hide in `internal/`, and API
  surface discipline follows api-surface-minimalism.
- Generated code (protobufs, mocks) lives in clearly-marked packages
  out of the human-edit path; do not hand-edit or review-nitpick it.
- Layout conventions from other ecosystems (src/, deep nesting,
  package-per-class) fight Go tooling and readability; when in
  doubt, mirror the standard library's shape.
