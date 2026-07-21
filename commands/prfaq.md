---
description: "Write an Amazon-style PR/FAQ (press release plus FAQ) to pressure-test a product idea by working backwards from the customer."
argument-hint: "[idea]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a PR/FAQ (working-backwards document) for:

{idea}

Customer and problem: {customer}

Part 1: the press release (as if launching to customers, one page):
- Headline: the product and its core benefit, in the customer's terms.
- Subheadline: who it is for and the value, one line.
- The problem, stated from the customer's point of view.
- The solution and how it works, plainly.
- A quote from the company, a quote from a customer, and how to get started.
Write it as if the product already shipped and is great: this forces clarity
on what "great" even means.

Part 2: the FAQ:
- Customer FAQ: the questions a real customer would ask (does it do X, what
  does it cost, how is it different, what are the limits).
- Internal/stakeholder FAQ: the hard questions (why will this work, what is
  the biggest risk, what does it cost to build, why us, what could kill it,
  what are we NOT doing).

Rules: work backwards from the customer, not forwards from the tech. Be honest
in the internal FAQ: the value of a PR/FAQ is exposing weak assumptions before
building. If the press release is hard to write clearly, that is a signal the
idea is unclear: say so. Mark any claim needing a real number as a placeholder.
