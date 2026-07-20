---
name: python-project-structure
description: Organize Python packages so imports stay clean, cycles cannot form, and the layout scales with the codebase. Use when starting a Python project or untangling circular imports and grab-bag modules.
---

# Python project structure

Structure is import discipline. A layout is good when any module's
dependencies point in one direction and you can predict what importing it
executes.

## Method

1. **Use src layout.** `src/pkg/` with tests outside the package. It
   guarantees tests run against the installed package, not the checkout,
   which catches packaging mistakes (missing modules, data files) before
   users do.
2. **Split by domain, not by kind.** `billing/`, `ingest/`, `reports/`,
   each owning its models, logic, and helpers, beats top-level `models.py`
   plus `utils.py` grab-bags. A module named `utils` is a queue of
   unclassified code; file its contents where they belong.
3. **Keep `__init__.py` near-empty.** Re-export the public API
   (`from .client import Client`) and define `__all__`; no computation, no
   I/O, no config reads. Import time is the first thing every user and
   test pays.
4. **Point dependencies one way.** Choose the direction (e.g. outer layers
   import inner: `cli -> service -> core`) and enforce it; core never
   imports cli. Cycles always mean a shared concept lacks its own module;
   extract it downward rather than hiding the cycle with a function-local
   import.
5. **Mark privacy with underscores.** `_internal.py` and `_helpers` are
   contract markers: anything unprefixed and re-exported is public and
   semver-bound. Tools and reviewers can then flag reaches into private
   modules.
6. **Keep entry points thin.** Console scripts and `__main__.py` parse
   arguments and call into the package; they contain no logic worth
   testing directly. Everything reachable from an entry point must also be
   reachable from an import.
7. **Let import cost stay visible.** Heavy optional dependencies import
   lazily inside the function that needs them, with the import documented;
   everything else imports at top of file where linters and readers can
   see it.

## Boundaries

- A single-file script does not need this; promote it to a package when it
  grows tests or a second module, not before.
- Namespace packages (no `__init__.py`) are for multi-repo distribution
  plugins; do not use them by accident.
- Restructuring a public library renames import paths; that is a breaking
  change with a deprecation cycle, not a refactor.
