---
name: pre-mortem
description: Run a pre-mortem: imagine the project already failed, work backward to the causes, and prevent them now.
variables:
  - "{project}: the project, launch, or decision you are about to commit to"
  - "{context}: the plan, the timeline, the team, and the stakes"
settings: "Temperature 0.6-0.8 for generating failure modes."
---

Run a pre-mortem for: {project}

Context: {context}

The exercise: imagine it is some months from now and this project has FAILED,
clearly and badly. Do not ask "what might go wrong" (that gets cautious, safe
answers): assume failure as a fact and explain it.

1. Tell the failure story: it is done, it failed. What happened? Write the most
   likely failure narrative concretely.
2. List the causes: what led to that failure. Push for the uncomfortable ones,
   not just the obvious risks: the assumption that was wrong, the dependency
   that slipped, the thing everyone worried about but nobody said, the way
   people actually behave versus the plan.
3. Rank the causes by likelihood and impact: which failures are both probable
   and damaging.
4. For the top causes, give a concrete preventive action to take NOW, while
   there is still time, and an early warning sign that would show it starting.

Rules: the pre-mortem's power is that imagining a certain failure surfaces
risks that "what could go wrong" politely hides (people voice concerns more
freely about a fait accompli). Be specific and honest, including risks that
implicate the plan or the people. Prioritize: not every risk is worth
mitigating. End with the 2-3 highest-value preventive actions.
