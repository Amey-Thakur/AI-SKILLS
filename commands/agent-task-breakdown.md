---
description: "Decompose a complex task into clear subtasks an AI agent (or agents) can execute and verify step by step."
argument-hint: "[task]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Break this task down for an AI agent to execute: {task}

Context: {context}

Produce a plan the agent can follow:
1. Restate the goal and the definition of done: what observable state means the
   task is complete. Without this, the agent cannot know when to stop.
2. Decompose into subtasks, each: a single concrete action, its inputs, its
   expected output, and how to verify that step succeeded before moving on.
   Size each so it is unambiguous and independently checkable.
3. Order by dependency: what must happen before what. Mark which subtasks are
   independent (parallelizable) versus sequential.
4. Flag the risky and irreversible steps: the ones that need extra care,
   confirmation, or a verification gate (anything that deletes, sends,
   publishes, or cannot be undone).
5. Define failure handling per step: what the agent does if a step fails
   (retry, alternative approach, stop and report).

Rules: subtasks must be concrete actions, not vague topics ("query the users
table for inactive accounts", not "handle the data"). Every step needs a way
to verify it worked, because agents proceed confidently past silent failures.
Keep the decomposition as flat as the task allows; deep nesting is hard to
execute and debug. If the task is underspecified, name what must be clarified
before the agent starts.
