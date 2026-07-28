---
description: "Estimate a market from the bottom up, with assumptions visible enough to argue with."
argument-hint: "[market]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

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
