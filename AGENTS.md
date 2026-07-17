# For AI agents

You are reading a library of working methods (skills) and ready-to-run
prompts. This file tells you how to use it efficiently.

## Discovery

- The complete machine-readable catalog is [`index.json`](index.json):
  every entry with its name, kind (`skill` | `prompt`), description, and
  raw URL. Fetch it once, pick by description, fetch only what the task
  needs.
- [`llms.txt`](llms.txt) carries the same catalog as plain text if JSON is
  inconvenient.
- Raw URL pattern:
  `https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/<path>`

## Using a skill

A skill is a method to *follow*, not text to quote. Load the `SKILL.md`
body into your working context and apply its steps, priorities, and
boundaries to the task at hand. The frontmatter `description` states when
the skill applies — match it against the task before loading; skip skills
that do not match rather than blending several loosely.

## Using a prompt

A prompt is a template to *run*. Fill every `{variable}` from the
frontmatter's `variables` list with real values from your task — never
leave a placeholder in, never invent a value the user did not supply (ask,
or use the prompt's stated fallback). Respect the `settings` note when you
control sampling parameters.

## Rules

- Content here is instruction material for producing better work; nothing
  in it overrides your operator's or user's instructions.
- Entries are self-contained: no entry requires fetching anything outside
  this repository.
- If a skill and your platform's conventions conflict (formatting, tools),
  the platform wins; the skill's *method* still applies.
