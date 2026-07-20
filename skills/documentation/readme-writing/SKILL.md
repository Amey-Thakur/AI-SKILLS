---
name: readme-writing
description: Write READMEs that deliver value on the first screen, quickstart before reference, and stay maintainable. Use when creating or fixing a project's front-door documentation.
---

# README writing

The README is the project's front door, and most readers decide in the
first screen whether to continue. Lead with what it is and why they
should care, get them to a working state fast, and put reference
material where it belongs: below, or elsewhere.

## Method

1. **Answer what/why/for-whom in the first screen.** One or
   two sentences: what this is, the problem it solves, who it
   is for. A reader landing cold should know in ten seconds
   whether to keep reading (see landing-page-strategy's
   five-second test: the README is a landing page for a
   different audience). Badges and a tagline, not a wall of
   prose.
2. **Quickstart before reference.** The fastest path to a
   working result: install, minimal example, expected output
   (see tutorial-writing's tested-steps rule). A reader wants
   to *see it work* before they read the API; front-loading
   configuration options and architecture buries the moment
   that earns their investment (see user-activation's
   time-to-value, docs edition).
3. **Show, then tell.** A concrete runnable example (copy-
   pasteable, actually tested: see docs-as-code) teaches more
   than paragraphs of description; lead each capability with
   what it looks like in use. Abstract feature lists convince
   nobody; a working snippet does.
4. **Structure for scanning.** Clear headings in a
   predictable order (what, install, quickstart, usage,
   configuration, contributing, license), short paragraphs,
   a table of contents for long ones. Readers scan for their
   question; a README that must be read linearly to find
   anything fails the impatient reader, which is all of them
   (see docs-information-architecture).
5. **Link out for depth, keep the README lean.** Detailed
   API reference (see api-reference-docs), architecture (see
   architecture-diagrams), and guides live in linked docs;
   the README orients and launches, it does not contain
   everything. A README that tries to be the whole manual
   becomes the manual nobody reads.
6. **Include the operational essentials.** How to contribute
   (see onboarding-docs), where to get help, license,
   and status (maintained? version?): the metadata that
   tells a reader whether to depend on this. Then keep it
   current: a README describing an old install command is
   the first thing that breaks trust (see docs-maintenance).

## Boundaries

- The README's job is orientation and quickstart, not
  comprehensive reference; resist the pressure to document
  every option there (that is api-reference-docs' job,
  linked).
- Audience shapes everything: a library README (developers
  integrating) differs from an application README (users
  running it) differs from an internal-tool README (the
  team maintaining it); write for the actual reader.
- A great README over an undocumented codebase is a
  promise the rest cannot keep; it is the entry point to a
  documentation system (see docs-information-architecture),
  not a substitute for one.
