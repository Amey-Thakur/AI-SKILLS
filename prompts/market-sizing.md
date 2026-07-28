---
name: market-sizing
description: Estimate a market from the bottom up, with assumptions visible enough to argue with.
variables:
  - "{market}: the product or service, the buyer, and the geography"
  - "{known}: any figures you already have, such as pricing or population data"
settings: "Temperature 0.3."
---

Size this market:

{market}

Known figures: {known}

Use the market-sizing skill.

Build from the bottom up:
- Number of potential buyers, derived and sourced.
- What proportion realistically buy, with the reasoning.
- Price and purchase frequency.
- The three sizes: total, serviceable, and realistically obtainable.
- A top-down cross-check, and an explanation if the two disagree.
- The assumption the answer is most sensitive to.

Rules: every number needs a stated basis, including guesses marked as
guesses. Give an order of magnitude rather than false precision. Sanity
check against known incumbents and say if the estimate implies they
should be much larger than they are. Do not use a large industry figure
multiplied by an invented percentage.
