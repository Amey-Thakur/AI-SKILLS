---
description: "Write a test plan for a feature or release: what to test, the scenarios and edge cases, and the risk-based priorities."
argument-hint: "[feature]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a test plan for: {feature}

Context: {context}

Produce:
- Scope: what is being tested and what is explicitly out of scope.
- Test scenarios grouped by area, each covering: the happy path, the important
  edge cases (empty, maximum, boundary values, invalid input), the error and
  failure paths, and the negative cases (what should be rejected). List the
  specific cases, not just categories.
- Risk-based priority: rank areas by the cost of a failure there (data loss,
  security, money, core flows) times its likelihood, and test the high-risk
  areas hardest. You cannot test everything; test what matters most first.
- Cross-cutting checks where relevant: permissions and authorization,
  concurrency, performance under load, accessibility, and behavior across the
  target environments/browsers/devices.
- What is automated versus manual, and the entry/exit criteria (what must pass
  to ship).

Rules: think adversarially: how would this break, what would a hostile or
careless user do, what happens at the boundaries and when things fail. Prioritize
by risk, not by what is easy to test. Be specific (a real scenario with inputs
and expected result, not "test the login"). Distinguish must-pass from
nice-to-have. Flag the areas where a failure would be worst so they get the most
attention. Note anything that needs test data or a specific environment.
