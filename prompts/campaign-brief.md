---
name: campaign-brief
description: Write a campaign brief with one audience, one message, one action, and a defined success measure.
variables:
  - "{goal}: what the campaign must achieve, with a number if possible"
  - "{audience}: who it targets and what they currently believe"
settings: "Temperature 0.4."
---

Write a campaign brief for:

{goal}

Audience: {audience}

Use agent-marketing-studio and positioning-and-messaging.

Cover:
- The single audience and where they already are.
- The one thing they should take away.
- The action wanted, and what happens after they take it.
- Channels, and why those.
- What must not be said, including unsupported claims.
- Success measure, defined before launch.
- Budget and timeline if known.

Rules: one message per campaign. Every claim needs a source or it is cut.
Define success as an outcome rather than as impressions. State what would
mean the campaign failed. A human approves anything published.
