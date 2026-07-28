# Contributing

Every entry clears one bar: a stranger picks it up and gets better work from
their AI in one step. The rules below serve that.

## Add a skill

1. One folder under `skills/<category>/`, kebab-case, with one `SKILL.md`
   inside. Choose the category that fits; propose a new one only when none
   does. Run `node scripts/build-index.mjs` afterward. It regenerates the
   index, catalog, README table, and marketplace, and fails on any mistake.
2. Frontmatter carries `name` (matching the folder) and a `description` for
   the moment an AI decides whether to load the skill: what it does, then a
   closing `Use when ...` trigger. Say when to use it, not what it contains.
   Wrap the value in double quotes if it contains a colon followed by a
   space, or the frontmatter stops being valid YAML and the build rejects it.
3. The body is a method: the steps in order, what good output looks like, and
   where it does not apply. Not an essay about the topic.
4. Most entries land between 200 and 650 words, around 400 in the middle.
   Say the method completely and stop; padding to reach a number is worse
   than a short entry. Much shorter is usually a prompt, much longer is
   usually two skills.

## Add a prompt

1. One kebab-case `.md` file under `prompts/`.
2. Frontmatter carries `name`, a one-sentence `description`, `variables`
   (every `{placeholder}` in the body, each with a note on what fills it), and
   `settings` (temperature and anything else that changes the result).
3. The body is the complete prompt, ready to paste, with `{variables}` for the
   parts the user supplies. Unknowns become variables, never invented facts.
   Every declared variable must appear in the body and every `{brace}` in the
   body must be declared. For a slot the model fills in its own output, use
   `[square brackets]` so it cannot be mistaken for an input variable.
4. Close with a `Rules:` paragraph: the constraints the model must respect,
   and what it should refuse or flag rather than invent.

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

Plain words over jargon. Second person, active voice, short sentences. The
strongest entries in the library set the voice to match.
