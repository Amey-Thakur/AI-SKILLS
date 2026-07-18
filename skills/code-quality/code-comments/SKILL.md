---
name: code-comments
description: Write comments that record why the code is shaped as it is, and delete the ones that only restate it. Use when adding, reviewing, or pruning comments in a codebase.
---

# Code comments

Code says what happens; a good comment says why it had to happen that way. The
dangerous comment is the one that repeats the code beside it: it rots the moment
that line changes, and now it lies to everyone who trusts it.

## Method

1. **Comment the why, never the what.** `// increment i` is noise;
   `// skip the header row: the export tool emits a BOM line` carries a reason
   no reader could recover from the code. If a comment paraphrases the
   statement, delete the comment, not the reader's attention.
2. **Pin every constraint to its source.** When a value comes from outside the
   code, cite it: `// Stripe caps metadata at 500 chars` or
   `// must match the ORDER_STATUS enum in the orders service`. Such comments
   defend a line against a well-meaning simplification that would break a
   contract.
3. **Write doc comments for the caller, not the maintainer.** On a public
   function, state what it returns, what it throws, and the units and ranges of
   arguments: `timeout in milliseconds; 0 disables`. Skip restating the body.
   The reader is deciding whether to call, not studying how it works.
4. **Flag the surprising and the deliberately wrong-looking.** A sleep, an odd
   retry count, an intentionally un-cached call, an ordering dependency: mark
   why it must stay, or someone will helpfully break it.
   `// do not reorder: auth must run before rate-limiting`.
5. **Delete stale comments on sight.** A comment that disagrees with the code is
   worse than none. When you change a line, read the comment above it; if the
   edit falsified it, fix or remove it in the same commit. Treat a lying comment
   as a bug.
6. **Prefer a name or a test where either would serve.** If a comment explains
   what a block does, extract the block into a well-named function. If it
   explains which inputs are valid, an assertion or a type states it and cannot
   drift out of sync.

## Checks

- Does each comment survive the question "would the code alone leave me guessing
  here?" If not, cut it.
- Pick any comment and confirm the line it describes still does that. One liar
  found means the review is not done.
- Do the public doc comments state units, ranges, and failure modes a caller
  cannot see from the signature?

## Boundaries

Generated code, license headers, and doc-tool markup (JSDoc, docstrings feeding
an API site) follow their own required forms, and this skill does not override
them. It governs the prose comments you write by choice, not the structured
annotations a framework or documentation generator demands.
