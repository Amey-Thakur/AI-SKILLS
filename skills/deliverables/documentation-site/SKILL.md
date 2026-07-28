---
name: documentation-site
description: Structure a documentation site so readers find answers by task, with working examples and a maintenance path. Use when documenting a product or library for external users.
---

# Documentation site

Documentation is judged by whether someone finds their answer, not by
completeness. Sites organised around the product's structure rather than
the reader's task force people to know the architecture before they can
ask a question.

## Method

1. **Organise by what the reader is trying to do.** Task-based
   navigation beats a mirror of the module structure for everything
   except reference.
2. **Separate the four kinds.** Tutorials teach, how-to guides solve a
   problem, reference describes, and explanation gives context. Merging
   them serves none of them (see documentation).
3. **Make the quickstart genuinely work.** Tested from a clean
   environment, since a failing first example loses the reader
   permanently (see documentation-for-adoption).
4. **Test the examples automatically.** Code samples rot silently, and
   extracting and running them in CI is the only reliable defence.
5. **Make search work well.** It is how most people navigate
   documentation regardless of your structure (see
   full-text-search-design).
6. **Version alongside the product.** Readers on an older release need
   its documentation, and one version for all releases misleads.
7. **Give every page an owner and a review date.** Unowned documentation
   decays, and decay is worse than absence because it misleads.

## Boundaries

Documentation cannot rescue a confusing product, and heavy documentation
of a confusing interface is a signal to fix the interface. Translation
multiplies maintenance (see translation-workflow). Reference material is
best generated from source rather than written by hand (see
api-reference-docs).
