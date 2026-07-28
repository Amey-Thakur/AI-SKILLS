---
name: quiet-hours-and-timing
description: Send at times that respect the recipient's local hours and working pattern, deferring anything non-urgent. Use when notifications reach people at night or on weekends.
---

# Quiet hours and timing

A notification at three in the morning is not a notification, it is an
intrusion, and it is remembered as one. Timing is the cheapest respect a
product can show, and it requires knowing the user's local time rather
than the server's.

## Method

1. **Store the user's time zone and keep it current.** Inferring from a
   billing address or an old signup is how people get woken up on
   holiday.
2. **Define quiet hours with a sensible default.** Overnight local time,
   with the user able to adjust, because defaults are what most people
   live with.
3. **Queue rather than drop.** A message suppressed at night is
   delivered in the morning, not discarded, unless it has expired by
   then.
4. **Define the urgent exception narrowly.** Security alerts and
   genuine emergencies bypass quiet hours; nothing else does, and the
   list must be short enough to defend.
5. **Respect the working week where relevant.** Work tools notifying at
   weekends erode boundaries, and a default of weekday delivery for
   non-urgent items is usually right.
6. **Avoid the batch-send spike.** Everyone receiving at nine sharp
   creates both a load spike and an obviously automated feel; spread
   within a window.
7. **Make timing visible in preferences.** Users who want overnight
   delivery should be able to choose it explicitly.

## Boundaries

Timing rules depend on accurate time zone data, which is often wrong for
travellers. Quiet hours delay information, which is unacceptable for
genuinely urgent alerts (see alerting-design). Cultural norms about
working hours differ and a single default cannot suit everyone.
