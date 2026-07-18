---
name: technical-writing
description: Write documentation, READMEs, and guides that respect the reader's time and answer their actual question. Use when drafting or editing any technical document.
---

# Technical writing

Documentation has one job: the reader arrives with a question and leaves with
an answer, in as little of their time as possible.

## Method

1. **Name the reader and their question before writing.** "A developer who
   just cloned the repo and wants it running" reads a different document than
   "an operator debugging a production incident". One document per reader
   when they diverge; a document for everyone answers no one.
2. **Lead with the answer.** The first paragraph carries the single most
   important thing: what this is, what just happened, what to do. Context
   and reasoning follow for readers who want them. Never build suspense.
3. **Structure for the scanning reader.** People read headings, code blocks,
   and lists first, prose only when trapped. Make the skeleton carry the
   story: headings that are claims ("Tokens are counted per provider"), not
   labels ("Overview").
4. **Show, then explain.** A working example beats three paragraphs of
   abstraction. Every command must be copy-pasteable and correct; every
   example output must be real, not imagined. Test what you paste.
5. **Write plainly.** Short sentences. Active voice. "Use" not "utilize",
   "so" not "in order to". Jargon only when the reader owns it already, and
   defined once when unavoidable. Adjectives like "simple", "just", and
   "easy" are broken promises: the reader for whom it is not easy is the
   one reading.
6. **State the edges honestly.** What it does not do, where it breaks, what
   is a known limitation. A document that oversells produces support burden
   and distrust in equal measure.
7. **Cut, then cut again.** After drafting, delete every sentence whose
   removal loses nothing. Most first drafts survive a 30% cut with meaning
   intact and clarity improved.

## Litmus tests

- Can the target reader succeed using only this document, offline?
- Does every code block run as pasted?
- Does the first screen answer the most common question?
- Would you tolerate reading this twice? The maintainer will read it fifty
  times.

## Boundaries

Match the project's existing voice and formatting conventions. Never invent
facts to fill a section: a short honest document outranks a long padded
one, and "this is not documented yet" outranks a guess.
