---
name: npm-publishing
description: Publish an npm package that installs and imports cleanly: correct exports map, dual formats, types, and semver. Use when releasing a library to npm or fixing a package consumers cannot import.
---

# npm publishing

A published package is an API, and most "it will not import" bug reports
trace to a handful of package.json fields set wrong. Getting the exports
map, types, and formats right is what separates a package that just works
from a support burden.

## Method

1. **Get the entry points right in the `exports` map.** The `exports`
   field controls what consumers can import and in which format. Provide
   conditional entries for `import` (ESM) and `require` (CJS), each
   pointing to the right build, plus a `types` entry. A wrong or missing
   `exports` map is the top reason a package cannot be imported (see
   js-modules). Keep `main`/`module` for older tooling but let `exports`
   be authoritative.
2. **Ship types, and point to them correctly.** Bundle the `.d.ts` files
   and reference them via `types` (and per-condition `types` in the
   exports map so ESM and CJS consumers each get correct types). A typed
   library with mispointed declarations types as `any` for everyone (see
   ts-api-types).
3. **Decide the format(s) deliberately.** ESM-only is cleanest and the
   direction of travel, but excludes CJS-only consumers; dual ESM+CJS
   (built with tsup/unbuild) maximizes compatibility at the cost of build
   complexity. Choose based on your audience, and test both import paths
   actually work.
4. **Control what ships.** Set `files` (or `.npmignore`) to include only
   the build output and essentials: no source, tests, or configs bloating
   the install. Run `npm pack` and inspect the tarball before publishing;
   shipping `node_modules` or secrets is a real and recurring mistake (see
   secrets-scanning).
5. **Version with semver honestly.** Patch for fixes, minor for additive
   features, major for breaking changes (including type-level breaks and
   dropped Node/format support): consumers rely on this contract (see
   api-change-management, release-tagging). Automate changelog and version
   bumps (changesets) so releases are consistent.
6. **Harden the release.** Publish from CI with provenance and 2FA, pin
   the Node/npm versions, run the full test and build gate before publish,
   and consider `publint`/`arethetypeswrong` to catch exports/types
   mistakes before consumers do. A `prepublishOnly` script that builds and
   tests prevents publishing a broken artifact.

## Boundaries

- This covers packaging and distribution; the library's API design and
  surface minimalism are separate (see api-surface-minimalism,
  api-sdk-design).
- Monorepo publishing (many packages, internal versioning) adds
  orchestration on top (see monorepo-workspaces); the per-package rules
  here still apply to each.
- Deprecating or unpublishing has consequences for the ecosystem; prefer
  a deprecation notice and a major-version migration path over breaking
  installed consumers (see api-deprecation).
