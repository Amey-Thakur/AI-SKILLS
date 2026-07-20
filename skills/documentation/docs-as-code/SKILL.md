---
name: docs-as-code
description: Treat documentation like code: in the repo, in pull requests, CI-checked, with preview builds. Use when docs drift from reality or the docs workflow is separate from the code workflow.
---

# Docs as code

The reason docs go stale is that they live apart from the code they
describe, changed by different people through a different process.
Docs-as-code closes that gap: documentation lives in the repo, changes
in the same pull request as the code, and CI checks it: so drift
becomes a build failure instead of a discovery months later.

## Method

1. **Keep docs in the repo, beside the code.** Markdown (or
   the docs framework's format) versioned with the source:
   the docs for a feature live next to it and change in the
   same commit. This co-location is the whole idea: the
   documentation and the code share one history, one review,
   one source of truth (see monolith-first's co-location
   instinct, applied to docs).
2. **Change docs in the same PR as the code.** A change that
   alters behavior updates the docs in the same pull request,
   reviewed together (see pull-request-size, code-review):
   the reviewer checks that the docs match the change while
   both are fresh. Separate docs-later tickets are how docs
   fall permanently behind.
3. **Check docs in CI.** Link checking (dead links fail the
   build), spell/style linting (see style-guides), and
   crucially, testing that code examples actually run (see
   api-reference-docs, tutorial-writing): a broken example
   fails CI like a broken test. Automated checks are what
   make "docs match reality" enforceable rather than
   aspirational.
4. **Build previews on every change.** A rendered preview of
   the docs per pull request (the framework deployed to a
   preview URL) lets reviewers see the actual output, not
   the raw markup: catches formatting breaks and reads the
   way users will. Reviewing docs as source is like
   reviewing a rendered UI as HTML.
5. **Generate what should be generated, write what should
   be written.** API reference from the schema (see
   api-reference-docs), CLI help from the parser, config
   options from the code: generated so they never drift;
   conceptual guides, tutorials, and rationale hand-written
   because no generator produces insight. Know which is
   which and wire the generation into the build.
6. **Lower the contribution barrier.** If fixing a typo
   requires learning a bespoke CMS, typos stay; if it is a
   markdown edit in the repo with a preview, anyone fixes
   it (see community-building's contributor ladder). The
   docs-as-code payoff includes that the whole team, not a
   docs silo, keeps docs current.

## Boundaries

- Docs-as-code fits developer-facing and technical docs
  well; end-user documentation with heavy media,
  localization, and non-technical authors may need a CMS
  or hybrid: match the tooling to who writes and reads.
- The workflow's value depends on the CI checks being real
  (tested examples, link checks): docs-in-the-repo without
  the checks is just a different place for stale docs to
  live.
- Generated docs still need curation (see
  api-reference-docs); "generate everything" produces
  complete, correct, and unhelpful reference. The method
  is generate-plus-write, both in the repo.
