---
name: steps
description: Get clear step-by-step instructions for how to do something, in order, that anyone can follow. A quick /steps command.
variables:
  - "{task}: what you want to know how to do"
  - "{context}: your situation, tools, and level, so the steps fit"
settings: "Temperature 0.3-0.5 for accuracy."
---

Give me step-by-step instructions to: {task}

My context: {context}

Rules:
- Numbered steps in the exact order to do them. Each step is one concrete
  action, specific enough to follow without guessing.
- Where a step depends on a condition, state it ("if X, do this; otherwise
  skip to step 5").
- Note how to know each important step worked before moving on, and flag any
  step that is destructive or hard to undo.
- List prerequisites first (what you need before starting).
- Keep it accurate and practical for my stated context and level; do not
  assume tools or knowledge I did not mention.

Keep it as short as the task allows, no filler. If a step commonly goes wrong,
add a one-line "if this fails" note. If the task is genuinely complex or risky,
say so and point to what needs care. For a reusable process document see
checklist-sop.
