---
name: data-visualization
description: Choose and design charts that reveal the truth in data clearly and honestly, matching the chart to the question. Use when visualizing data for exploration or communication, or fixing a misleading or cluttered chart.
---

# Data visualization

A chart is an argument made with pixels; it can reveal a pattern instantly
or mislead just as fast. Good visualization matches the chart type to the
question, maximizes the signal, and never distorts. The craft is clarity
and honesty, not decoration.

## Method

1. **Pick the chart from the question, not the aesthetics.** Comparison
   across categories: bar chart. Trend over time: line. Relationship
   between two variables: scatter. Distribution: histogram or box plot.
   Part-to-whole: stacked bar (rarely a pie, and never for many slices).
   The wrong chart type buries the answer; match it to what you are asking.
2. **Maximize the data-ink, cut the clutter.** Remove what does not carry
   information: heavy gridlines, 3D effects, redundant legends, decorative
   backgrounds, needless color. Every non-data element competes with the
   data for attention (see visual-hierarchy). The clearest chart is the one
   with nothing left to remove.
3. **Never distort.** Bar charts start the y-axis at zero (a truncated axis
   exaggerates differences); use consistent scales; do not cherry-pick the
   time window; area and size encode value honestly (double the value =
   double the area, not the radius). A misleading chart is worse than none;
   it launders a false claim as objective.
4. **Guide the eye to the point.** Use color and emphasis to highlight what
   matters (the one line the reader should notice, the outlier), and mute
   the rest. A chart where everything is equally bright makes the reader do
   the finding. Label directly where you can, rather than forcing a
   legend-lookup.
5. **Design for the reader and the medium.** Exploration charts (for
   yourself) can be quick and dense; communication charts (for others) need
   a clear title stating the takeaway, readable labels, and enough context
   to stand alone. Match complexity to the audience (see
   audience-adaptation, data-storytelling).
6. **Make it accessible and honest about uncertainty.** Do not rely on
   color alone (colorblind-safe palettes, plus shape or labels; see
   color-contrast); show uncertainty where it matters (error bars,
   confidence bands) rather than presenting an estimate as a precise fact
   (see statistical-inference).

## Boundaries

- A chart supports a point; it does not establish causation or correctness.
  A clean chart of a confounded relationship is still misleading about the
  cause (see correlation-causation).
- Chart-type conventions are strong for a reason; novel or clever chart
  types carry a comprehension cost, so use the familiar one unless the data
  genuinely needs otherwise.
- This covers the principles; the design-system-level palette, tokens, and
  consistency of a chart set are their own layer (see design-systems,
  dataviz for a full method).
