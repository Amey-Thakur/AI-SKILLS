---
name: docs-information-architecture
description: Organize documentation with the Diataxis four-quadrant model, navigable structure, and searchability. Use when structuring a docs site or when readers cannot find what they need.
---

# Docs information architecture

Documentation fails not because pieces are missing but because they
are mixed: a tutorial padded with reference, a how-to guide that stops
to explain theory. The Diataxis framework separates docs by what the
reader is doing, and that separation is what makes each piece work and
the whole findable.

## Method

1. **Split by the reader's mode with Diataxis.** Four
   distinct needs: tutorials (learning, hand-held to a
   result: see tutorial-writing), how-to guides (a specific
   goal, for someone who knows the domain), reference
   (looking something up: see api-reference-docs), and
   explanation (understanding why). Each has different
   rules, and mixing them is why so much documentation
   frustrates: a reader in "look it up" mode does not want a
   tutorial's hand-holding, and vice versa.
2. **Serve the two axes: learning vs working, practical vs
   theoretical.** Tutorials and how-tos are practical
   (doing); reference and explanation are theoretical
   (knowing). Tutorials and explanation serve study;
   how-tos and reference serve work. Placing each piece
   correctly on these axes tells you how to write it and
   where it goes.
3. **Make navigation match the reader's mental model.** Top-
   level structure by the reader's task or the product's
   domains, not by your org chart or file layout; a reader
   should predict where a topic lives. Progressive
   disclosure (overview to detail), consistent depth, and a
   clear "you are here" (the same clarity architecture-
   diagrams needs, for docs).
4. **Invest in search.** Most readers search, not browse:
   good search (indexed, with useful titles and metadata,
   fast) is often the primary navigation (see technical-seo
   for the public-docs SEO twin). Titles written as the
   questions readers ask ("How do I reset a password")
   outperform noun-phrase titles ("Password management") in
   both search and scanning.
5. **Cross-link between quadrants deliberately.** A tutorial
   links to the reference for depth and the explanation for
   why; reference links to the how-to that uses it: so a
   reader who realizes they are in the wrong mode can move
   to the right one (see readme-writing's lean-and-link).
   The quadrants are separate documents, connected, not
   isolated silos.
6. **Maintain the structure as content grows.** New docs
   land in the right quadrant, not wherever is convenient;
   periodic review catches the tutorial that grew reference
   sections and the reference that sprouted a tutorial (see
   docs-maintenance). Structure erodes without tending, and
   eroded structure is why big docs sites become
   unnavigable.

## Boundaries

- Diataxis is a lens, not a mandate; small projects need a
  README and maybe a few guides, not a four-quadrant site
  (see readme-writing). Apply the *separation of modes*
  even in a small doc, scale the *structure* to size.
- Information architecture organizes content; it does not
  create it or keep it correct (see docs-as-code,
  docs-maintenance). A perfectly organized set of stale
  docs is well-arranged misinformation.
- Discoverability includes getting readers *to* the docs
  (in-product links, error messages pointing to relevant
  pages: see error-messages, cli-ux-design); the best-
  organized docs help nobody who never finds them.
