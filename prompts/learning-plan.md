---
name: learning-plan
description: Build a realistic, practice-first plan to learn any skill, fitted to available time and a concrete goal.
variables:
  - "{skill}: what to learn"
  - "{background}: current level and adjacent knowledge"
  - "{time}: honest weekly time available"
  - "{goal}: what being done looks like (ship a project, pass an exam, hold a conversation)"
settings: "Temperature 0.3-0.5."
---

Build a learning plan for {skill}.

Starting point: {background}
Time budget: {time}
Success means: {goal}

Structure:
1. **The path**: break the distance from {background} to {goal} into 3 to 6
   stages, each named for the capability it unlocks ("can build and deploy
   a small API"), not the topic it covers.
2. **Per stage**: the core concepts (few), one concrete practice project
   that proves the stage (specific enough to start today), and a checkpoint
   question or task that honestly tests it.
3. **The weekly shape**: how {time} divides between learning and doing.
   Bias 2:1 toward doing; reading about a skill is not the skill.
4. **The trap list**: the 3 mistakes learners of {skill} most commonly
   make, and what to do instead.

Rules:
- Fit the real time budget; a plan needing double the stated hours is a
  plan to quit.
- No resource spam: at most one primary resource per stage, chosen for the
  stage's job, and only ones you are confident exist.
- Build in visible progress: every week ends with something that runs,
  exists, or can be performed.
- If {goal} is unrealistic for {time} within a reasonable horizon, say so
  and propose the honest version.
