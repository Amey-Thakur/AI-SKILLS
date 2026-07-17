# Contributing

AI Skills accepts skills and prompts that clear one bar: **someone who has
never met you can pick your entry up and get better work out of their agent
today.** Everything below serves that.

## Adding a skill

1. One folder under `skills/`, kebab-case, one `SKILL.md` inside.
2. Frontmatter: `name` (matching the folder) and a one-sentence
   `description` written for the moment an agent decides whether to load it —
   say when to use it, not what it contains.
3. The body is a working method, not an essay: the steps in order, what good
   output looks like, and the boundaries (where the skill does not apply,
   what it must never do).
4. 300–700 words. Shorter than that is usually a prompt, longer is usually
   two skills.

## Adding a prompt

1. One file under `prompts/`, kebab-case `.md`.
2. Frontmatter: `name`, one-sentence `description`, `variables` (every
   `{placeholder}` in the body, with a note on what belongs in it), and
   `settings` (temperature guidance and anything else that matters).
3. The body is the complete prompt, ready to paste, with `{variables}` for
   the parts the user supplies. Unknowns become variables — never invented
   specifics.

## The review checklist

A pull request merges when every box ticks:

- [ ] Complete: usable end to end as submitted; no "TODO", no "coming soon".
- [ ] Self-contained: no links required to make the entry work.
- [ ] Honest: claims match what the method actually does; limits are stated.
- [ ] Distinct: it does a job no existing entry already covers (improve the
      existing one instead).
- [ ] Portable: plain markdown + YAML frontmatter, no tool-specific syntax
      in the body.

## Style

Plain language over jargon. Second person ("you"), active voice, short
sentences. Write the way the best entry in the collection is written, and
when in doubt, read two of them first.
