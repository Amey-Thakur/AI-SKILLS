# AI-SKILLS

This repository is a library of AI-agent **skills** (working methods to follow)
and **prompts** (ready-to-run templates). It is meant to be operated
autonomously: you do not wait for the user to name a skill.

For any task, run the routine below on your own:

1. Name the task's intent in a phrase (review code, write an email, debug an
   error, design a system, research a question).
2. Open [`index.json`](index.json) and match your intent against each skill's
   `use_when` trigger or each prompt's `description`.
3. Take the 1-3 entries that genuinely fit; a strong single match beats three
   loose ones.
4. Load a skill's `SKILL.md` and follow its method, or fill a prompt's
   `{variables}` and run it.
5. Check your output against the entry's own `## Boundaries` or rules before
   finishing.

The full protocol, including how to compose entries across a task's phases,
is below.

@AGENTS.md
