---
name: log-levels
description: Assign log levels deliberately so error wakes a human, warn flags a trend, and info and debug explain later without burying the signal. Use when logs are either silent during real failures or so noisy that nobody trusts them.
---

# Log levels

A log level is a routing decision: this line heads toward the pager, that one
heads to the archive. Teams miss in both directions, stamping routine events
error until alerts mean nothing, or hiding real failures at debug where no one
looks. The level is a contract about urgency, and a broken contract trains
people to stop reading the logs at all.

## Method

1. **Reserve error for act now.** An error line means the request failed and a
   person is needed: a charge could not be captured, a required dependency is
   down. If the code recovered on its own, it is not an error. Error volume
   should track incidents, not background weather.
2. **Use warn for a trend short of failure.** A retry that eventually
   succeeded, a deprecated endpoint still called, a climbing cache-miss rate.
   Warn is the watch-this channel: nobody wakes for one, but a flood of them is
   the tremor before the error storm.
3. **Use info for a request's milestones.** Order placed, user logged in, job
   finished, each with the ids to trace it. Info is what you read to
   reconstruct normal behavior, so keep it to state changes, not every function
   entry, and one request stays a readable handful of lines.
4. **Use debug for mechanics you want only when hunting.** Variable values, the
   branch taken, payload shapes. Debug ships off in production and turns on for
   one service or one request mid-investigation. It earns its verbosity by
   being silent the rest of the time.
5. **Never log a caught-and-handled exception at error.** If you retried and
   recovered, that is warn or info. Logging every swallowed exception at error
   is the fastest way to make the error stream worthless and the pager numb.
6. **Make the level adjustable at runtime.** Wire a flag or endpoint to lift one
   logger to debug with no redeploy. During an incident you want more detail
   from one component in seconds, not after a build, then drop it back to info
   so cost and noise fall.

## Signals

- Filtered to error only, is every line something a human should act on?
- Could you enable debug for one service mid-incident without shipping code?
- Does one healthy request at info produce a few lines, not hundreds?

## Boundaries

Levels decide urgency, not shape: how each line is structured is
structured-logging's concern. Whether an error-level line should page is
alerting-design. Some stacks add trace or fatal rungs; follow the project's
existing ladder rather than bolting on a parallel one.
