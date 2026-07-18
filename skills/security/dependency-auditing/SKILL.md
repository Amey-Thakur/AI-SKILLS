---
name: dependency-auditing
description: Audit third-party packages by pinning resolved versions, scanning against advisory databases, and catching malicious lookalikes before install. Use when adding a dependency, wiring a vulnerability gate into CI, or reviewing what a project actually pulls in.
---

# Dependency auditing

Most of the code you ship you did not write: it arrives through the
dependency tree, and a single vulnerable or hijacked package runs with your
application's full privileges. Auditing means knowing exactly which versions
resolve, checking them against known advisories, and catching the malicious
lookalike before it ever installs.

## Method

1. **Commit a lockfile and install from it.** Check in
   `package-lock.json`, `poetry.lock`, `Cargo.lock`, or `go.sum`, and use
   `npm ci`, `poetry install --sync`, or the frozen equivalent in CI so
   builds resolve the exact versions you audited, not whatever floated in
   overnight.
2. **Run the advisory scanner in CI and fail on high.** Wire
   `npm audit --audit-level=high`, `pip-audit`, `cargo audit`, or
   `osv-scanner -r .` into the pipeline and break the build on high or
   critical findings. These match resolved versions against the GitHub
   Advisory and OSV databases.
3. **Check new packages for typosquats before adding.** Confirm the exact
   name, download count, and repository URL against the one you intend.
   `reqwests` for `reqwest`, scoped-name confusion, and a two-day-old
   package with 40 downloads are how malware enters; socket.dev or a manual
   registry check flags them.
4. **Review dependency-bump PRs, do not auto-merge them.** Let Dependabot or
   Renovate open updates, then read the changelog and diff for a jump in a
   package that ships install scripts. An npm package can run arbitrary code
   from a `postinstall` hook.
5. **Prune what you do not use.** Remove unused dependencies with `depcheck`
   or `cargo-udeps`. Every package you drop is one you no longer audit, and
   fewer transitive edges means a smaller attack surface.
6. **Mirror upstream for release builds.** Resolve production builds against
   a private proxy such as Artifactory or Verdaccio so a deleted or hijacked
   upstream version cannot silently change what you ship.

## Signals

- Does CI fail when a newly disclosed high-severity advisory hits the
  current lockfile?
- Is every direct dependency one a human deliberately added, with the rest
  pinned transitively?
- Would a package published yesterday under a near-miss name draw a second
  look before merge?
- Can you rebuild last month's release with identical dependency versions?

## Boundaries

This audits packages you consume, not code you author or the pipeline that
assembles them (see supply-chain-defense). Advisory databases lag
disclosure, so a clean scan means no known issue, not no issue. Defer
license and policy gating to your organization's governance tooling.
