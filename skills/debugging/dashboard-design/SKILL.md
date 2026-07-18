---
name: dashboard-design
description: Build dashboards where each panel answers exactly one question, laid out by the RED method for services and the USE method for resources. Use when a board has grown into a wall of graphs nobody can read while an incident burns.
---

# Dashboard design

A dashboard is not an attic for every graph you ever built. It is an instrument
for answering one operational question fast while something is on fire. A panel
with no question behind it is decoration, and during an outage decoration is
scrolling you cannot afford. Design each board as a short list of questions.

## Method

1. **Title every panel with its question.** Not "Latency" but "Is /checkout
   meeting its 2s p99?". The title states what the reader should learn, and a
   panel that answers no clear question gets cut. The board then reads as a list
   of questions, not a pile of metrics.
2. **Cover services with RED: rate, errors, duration.** For each request-
   serving component, show request rate, error rate, and a duration
   distribution. Those three answer "is it up, is it failing, is it slow" for
   anything that handles requests, which is most of what pages you.
3. **Cover resources with USE: utilization, saturation, errors.** For CPU,
   memory, disk, and pools, show how full it is, how much work waits in queue,
   and its error count. USE finds the bottleneck while RED shows the symptom; a
   saturated pool over an idle CPU is the classic catch.
4. **Stack panels symptom over cause.** Put user-facing RED panels at the top
   and resource USE panels beneath. The eye scans down from "what hurts" to
   "why", following the shape of an investigation instead of scattering it
   across the screen.
5. **Draw the SLO line on the panel.** Render the threshold as a marker so "is
   this bad" is a glance, not arithmetic. A latency graph with a 2s reference
   line answers itself; a bare axis makes every viewer recompute the same
   judgment.
6. **Fix the range and template the variables.** Default to a window that spans
   a deploy (1h) and add a `service` or `region` dropdown rather than cloning
   the board per target. One parameterized dashboard beats twenty copies that
   drift apart.

## Litmus tests

- Can a fresh on-call state each panel's question from its title alone?
- Does the board carry rate, errors, and duration for every serving service?
- In the last incident, did it shorten the path to cause or just add scrolling?

## Boundaries

Dashboards summarize; they do not explain a single request. Once a panel shows
something wrong, the next step is a trace or a log query, not another graph.
What crosses into a page is alerting-design, and the series these panels plot
come from metrics-instrumentation.
