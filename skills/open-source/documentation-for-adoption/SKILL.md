---
name: documentation-for-adoption
description: Write the docs that decide whether someone adopts a project: a truthful readme, a working quickstart, and answers to the first questions. Use when a project is capable but nobody gets past the first ten minutes.
---

# Documentation for adoption

Adoption is decided in the first few minutes by three questions: what is
this, does it fit my problem, and can I see it work. Reference
documentation matters later; these three decide whether there is a
later.

## Method

1. **Open with what it is and who it is for, in two sentences.** A
   reader should self-select in or out immediately rather than reading a
   page to discover the project does not fit.
2. **Show the smallest real example above the fold.** Working code with
   its output, not a feature list. This is what a reader scans for and
   what a screenshot cannot replace.
3. **Make the quickstart actually complete.** Install, minimal config,
   first result, tested from a clean environment. A quickstart with an
   undocumented prerequisite is where most adoption dies (see
   contributor-onboarding).
4. **Say what it does not do.** Honest non-goals and known limitations
   build more trust than feature claims, and they prevent the adoptions
   that end in disappointment.
5. **Compare to the obvious alternative fairly.** Readers are already
   asking; answering plainly, including where the alternative is
   better, reads as confidence rather than weakness.
6. **Keep examples runnable and tested.** Documentation examples rot
   silently, and a broken first example costs more than no example (see
   documentation).

## Boundaries

- Adoption docs sell the fit; they do not replace reference material
  that users need after committing (see api-reference-docs).
- Good documentation cannot rescue a project that does not work, and it
  can accelerate the abandonment of one that nearly does.
- Translation of docs is a separate commitment with its own upkeep (see
  translation-workflow).
