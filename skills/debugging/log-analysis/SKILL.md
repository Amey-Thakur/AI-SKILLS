---
name: log-analysis
description: Mine logs for the cause of a failure by pivoting on correlation ids, clamping the time window, and querying structured fields instead of scrolling. Use when production broke and the logs are the only record of what the system actually did.
---

# Log analysis

Logs capture everything the system did and almost none of it bears on the bug
in front of you. Scrolling for red text surfaces the loudest line, which is
usually a downstream victim rather than the trigger. A method narrows by
identity and time until only the failing request is left on the screen.

## Method

1. **Pivot on an identifier before a keyword.** Lift the request id, trace id,
   or order id from the user report or the error tracker, then query for it
   alone: `jq 'select(.request_id=="req_8f3a")'` or Loki `{app="api"} | json |
   request_id="req_8f3a"`. One id collapses the haystack into a single thread.
2. **Clamp the window to the incident.** Pass `--since` and `--until` a couple
   of minutes on each side of the first symptom, or drag the Grafana time
   picker onto the deploy. A day-wide window drowns the signal in unrelated
   traffic.
3. **Read forward from the first divergence.** Sort ascending and find where
   the error rate leaves baseline. The 500s at the top of the tail are the
   cascade; the connection reset thirty seconds earlier is the cause.
4. **Match fields, not substrings.** On JSON logs, filter `level>="error" and
   status>=500 and route="/checkout"`. Grepping `fail` misses `failure` and
   `err` and matches those letters inside unrelated words.
5. **Merge services on the shared id.** Carry the same correlation id from the
   gateway through the API to the worker and interleave every line by
   timestamp. The gap between "received" and "handler start" is where the
   latency actually sat.
6. **Aggregate before you conclude.** Run `| stats count by error_code, host`.
   Every error landing on one host is a sick node, not a sick code path.
   Cardinality tells you scope that no single line can.

## Checks

- Can you name the earliest line where behavior left normal, with its exact
  timestamp?
- Did the cause come from a filter on id and field, or from reading by eye?
- Does your merged timeline touch every service the request passed through?

## Boundaries

Log analysis reconstructs what was written down and is blind to what was never
logged. When the failing hop lives between services rather than inside one,
move to distributed-tracing. Long-run trends belong on a dashboard, not in a
line-by-line hunt.
