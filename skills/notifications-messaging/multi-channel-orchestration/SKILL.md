---
name: multi-channel-orchestration
description: Coordinate across push, email, in-app, and SMS so a user gets one message rather than the same thing four times. Use when several channels exist and users receive duplicates.
---

# Multi-channel orchestration

Once a product has several channels, each owned by a different feature,
the same event reaches the user repeatedly. Orchestration is the layer
that decides one channel per message and escalates only when the first
goes unread.

## Method

1. **Route through one service, always.** Features publish events;
   the orchestrator decides channel and timing. Features choosing their
   own channel is how duplication starts.
2. **Pick one channel per message by urgency and preference.** The
   cheapest channel that will actually reach them, not every channel
   that could.
3. **Escalate on non-engagement, not on a schedule.** If an in-app
   message is unread after a period and the matter is time-sensitive,
   escalate; otherwise let it rest.
4. **Cancel across channels when the matter resolves.** An email about
   something the user already handled in-app is the most irritating
   possible message.
5. **Apply one global frequency budget.** Per-channel caps still sum to
   too much, so the ceiling is per user across everything (see
   notification-strategy).
6. **Keep preferences central.** One place the user controls all
   channels, since per-channel settings scattered through the product
   guarantee inconsistency (see unsubscribe-and-preferences).
7. **Track delivery and engagement per channel per type.** It is the
   only way to learn which channel actually works for which message.

## Boundaries

Orchestration adds a central dependency that becomes critical, so its
failure modes need designing. Cross-channel cancellation is best effort,
since a delivered push cannot be recalled. SMS carries per-message cost
and stricter consent rules than other channels.
