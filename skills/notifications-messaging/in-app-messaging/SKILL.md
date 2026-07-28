---
name: in-app-messaging
description: Deliver messages inside the product where they are contextual and non-interruptive, using the right surface for each urgency. Use when a message relates to what the user is doing right now.
---

# In-app messaging

The least intrusive channel is the one the user is already in. In-app
messages reach people in context, cost nothing in attention outside the
product, and are wasted when treated as a place to put everything that
did not merit an email.

## Method

1. **Match the surface to the urgency.** A banner for a persistent
   state, a toast for a completed action, an inbox for things to read
   later, a modal only for something that genuinely blocks.
2. **Reserve modals for blocking decisions.** A modal for information is
   an interruption with an extra click, and it trains people to dismiss
   without reading.
3. **Anchor contextual messages to the thing they concern.** A tip about
   a feature belongs beside the feature, not on the dashboard.
4. **Make everything dismissible and remember it.** A message that
   returns after dismissal is the fastest way to make the surface
   invisible.
5. **Keep an inbox for what can wait.** A persistent list means fewer
   interruptive surfaces are needed, since anything non-urgent can go
   there (see digest-design).
6. **Limit concurrent messages to one.** Stacked banners and competing
   tooltips make the product feel broken.
7. **Respect the same frequency budget as other channels.** In-app is
   cheaper but not free, and it counts toward fatigue (see
   notification-fatigue).

## Boundaries

In-app reaches only active users, so anything needing to reach absent
users requires another channel. Message surfaces compete with product
UI for space and attention. Accessibility requirements apply: toasts and
modals need correct focus handling and announcements (see aria-usage).
