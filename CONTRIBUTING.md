# Contributing

Every entry clears one bar: a stranger picks it up and gets better work from
their AI in one step. The rules below serve that.

## Add a skill

1. One folder under `skills/<category>/`, kebab-case, with one `SKILL.md`
   inside. Choose the category that fits; propose a new one only when none
   does. Run `node scripts/build-index.mjs` afterward. It regenerates the
   index, catalog, README table, and marketplace, and fails on any mistake.
2. Frontmatter carries `name` (matching the folder) and a one-sentence
   `description` for the moment an AI decides whether to load the skill. Say
   when to use it, not what it contains.
3. The body is a method: the steps in order, what good output looks like, and
   where it does not apply. Not an essay about the topic.
4. Aim for 300 to 700 words. Shorter is usually a prompt; longer is usually
   two skills.

## Add a prompt

1. One kebab-case `.md` file under `prompts/`.
2. Frontmatter carries `name`, a one-sentence `description`, `variables`
   (every `{placeholder}` in the body, each with a note on what fills it), and
   `settings` (temperature and anything else that changes the result).
3. The body is the complete prompt, ready to paste, with `{variables}` for the
   parts the user supplies. Unknowns become variables, never invented facts.

## The bar for merging

A pull request merges when all five hold:

- **Complete.** Usable end to end as submitted.
- **Self-contained.** Nothing outside the entry is needed to use it.
- **Honest.** Claims match what it does, and limits are stated.
- **Distinct.** It covers a job no existing entry covers. If one is close,
  improve that one instead.
- **Portable.** Plain markdown and YAML frontmatter, no tool-specific syntax
  in the body.

## Style

Plain words over jargon. Second person, active voice, short sentences. No
em dashes. The strongest entries in the library set the voice to match.
