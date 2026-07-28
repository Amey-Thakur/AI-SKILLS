---
name: policy-as-code
description: Express organisational rules as automated checks in the pipeline rather than as documents people are meant to follow. Use when standards exist on paper and are inconsistently applied.
---

# Policy as code

A policy nobody can check is a suggestion. Encoding rules as automated
checks makes compliance the default and makes exceptions visible rather
than invisible.

## Method

1. **Encode rules that are objectively checkable.** Encryption enabled,
   tags present, no public buckets. Judgement-based standards belong in
   review rather than automation.
2. **Evaluate at the earliest useful point.** In the editor, then in the
   pipeline, then at deployment, because feedback is cheaper the earlier
   it arrives (see github-actions-workflows).
3. **Explain the violation and the fix.** A policy failure naming the
   rule and the remedy gets fixed; an opaque denial gets escalated (see
   error-messages).
4. **Start in warning mode.** Measure how often a rule would fire before
   enforcing it, since a rule blocking half of all deployments was
   wrong.
5. **Provide a documented exception path.** Time-limited, owned, and
   reviewed, because rules without exceptions are bypassed entirely (see
   agent-compliance-desk).
6. **Version policies and test them.** Policy is code with the same
   need for review and regression testing.
7. **Report on drift, not just on blocks.** Existing resources violating
   a new policy need a remediation plan rather than silent tolerance.

## Boundaries

Automated policy covers what is machine-checkable, which is a subset of
what matters. Over-strict policy pushes work outside the governed path.
Policy enforces rules and does not establish whether they are the right
rules (see agent-compliance-desk).
