---
name: compare-options
description: Compare options against criteria that matter and end with a defensible recommendation.
variables:
  - "{options}: the options being weighed"
  - "{context}: the situation, constraints, and what success means"
settings: "Temperature 0.2-0.4."
---

Compare these options for the situation described, and recommend one.

Options: {options}

Context and constraints: {context}

Method:
1. Derive 3-6 criteria from the context: the ones that would actually
   change the decision (cost, risk, time-to-value, reversibility,
   maintenance burden). State them and why each matters here.
2. Assess every option against every criterion with specifics, not
   adjectives: what it costs, what breaks, what it forecloses. Where you
   lack the information, write "unknown - would need {what}" instead of
   guessing.
3. Note any option that is dominated (worse on everything) and set it
   aside explicitly.
4. **Recommendation**: one option, the two or three reasons that decide it,
   the strongest argument against it answered honestly, and the condition
   under which the runner-up becomes the better choice.

Rules: no ties, no "it depends" endings without saying on WHAT it depends
and which answer follows from each case.
