---
name: investor-update
description: Write a periodic investor update that leads with the numbers, states the asks, and does not bury bad news.
variables:
  - "{period}: the period covered and the key metrics with their prior values"
  - "{events}: what happened, including what went wrong"
settings: "Temperature 0.3."
---

Write an investor update for:

{period}

Events: {events}

Use the agent-board-reporting method, including its omission check.

Structure:
- Headline: the one or two things that matter this period.
- Metrics: the standing set with movement and a cause for each change.
- What went well.
- What went badly, stated plainly and early.
- Asks: specific help needed, with names or introductions if relevant.
- What to expect next period.

Rules: never bury bad news below good news. Every material metric change
needs a named cause, and unknown is acceptable. Keep actuals and
forecasts visibly separate. Do not project confidence the numbers do not
support. Statements to investors carry legal weight and need review
before sending.
