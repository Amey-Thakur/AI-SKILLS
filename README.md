<div align="center">

# AI Skills

**Plug-and-play skills and prompts for every AI coding agent.**

Claude Code · Claude Desktop · Cursor · Antigravity · OpenAI Codex ·
Gemini CLI · any agent that reads markdown

[Website](https://amey-thakur.github.io/AI-SKILLS/) ·
[Prompt Studio](https://amey-thakur.github.io/AI-SKILLS/prompt-studio.html) ·
[Skills](skills/) · [Prompts](prompts/) · [Contributing](CONTRIBUTING.md)

</div>

<br>

## What this is

Two collections, one idea: **methodology beats vibes**. An agent handed a
tested working method produces better work than one improvising, and a person
handed a well-built prompt gets better answers than one typing the first
thing that comes to mind.

- **[`skills/`](skills/)**: working methods an AI agent loads and follows:
  how to review code, debug systematically, write a postmortem, design an
  API. One folder per skill, one `SKILL.md` inside, in the same format
  Claude-family agents load natively.
- **[`prompts/`](prompts/)**: complete, ready-to-run prompts with named
  `{variables}`, the right model settings, and an honest line about what
  each is good at. Build your own in the browser with the
  [Prompt Studio](https://amey-thakur.github.io/AI-SKILLS/prompt-studio.html).

Everything is plain markdown with a small YAML header. Nothing executes;
there is nothing to install, trust, or sandbox. Read it, use it, edit it.

<br>

## Quick start

**Claude Code**: one command, everything available:

```
/plugin marketplace add Amey-Thakur/AI-SKILLS
```

Or copy just what you want:

```bash
git clone https://github.com/Amey-Thakur/AI-SKILLS
cp -r AI-SKILLS/skills/code-review ~/.claude/skills/
```

**claude.ai / Claude Desktop**: upload any skill folder in
Settings → Capabilities → Skills.

**Cursor / Windsurf / rule-based editors**: append a skill's body to your
rules file:

```bash
curl -s https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-review/SKILL.md >> .cursorrules
```

**OpenAI, Gemini CLI, or any API**: a skill's body is a system-prompt
section; a prompt's body is a user message. Fetch raw and go:

```
https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/prompts/summarize-document.md
```

**AI agents reading this**: machine-readable catalog at
[`index.json`](index.json), discovery notes in [`llms.txt`](llms.txt) and
[`AGENTS.md`](AGENTS.md). Fetch what the task needs; everything is
raw-URL addressable.

<br>

## What's inside

<!-- library:start -->
| Skills: how to work (24) | Prompts: ready to run (22) |
|---|---|
| [accessibility-review](skills/accessibility-review/SKILL.md) | [api-docs-from-code](prompts/api-docs-from-code.md) |
| [api-design](skills/api-design/SKILL.md) | [brainstorm-divergent](prompts/brainstorm-divergent.md) |
| [ci-cd](skills/ci-cd/SKILL.md) | [bug-report-triage](prompts/bug-report-triage.md) |
| [code-documentation](skills/code-documentation/SKILL.md) | [changelog-from-diff](prompts/changelog-from-diff.md) |
| [code-review](skills/code-review/SKILL.md) | [compare-options](prompts/compare-options.md) |
| [commit-messages](skills/commit-messages/SKILL.md) | [data-to-insights](prompts/data-to-insights.md) |
| [containerization](skills/containerization/SKILL.md) | [email-professional](prompts/email-professional.md) |
| [debugging](skills/debugging/SKILL.md) | [explain-code](prompts/explain-code.md) |
| [dependency-management](skills/dependency-management/SKILL.md) | [explain-like-im-five](prompts/explain-like-im-five.md) |
| [error-handling](skills/error-handling/SKILL.md) | [extract-action-items](prompts/extract-action-items.md) |
| [frontend-state](skills/frontend-state/SKILL.md) | [incident-status-update](prompts/incident-status-update.md) |
| [git-workflow](skills/git-workflow/SKILL.md) | [interview-questions](prompts/interview-questions.md) |
| [incident-postmortem](skills/incident-postmortem/SKILL.md) | [learning-plan](prompts/learning-plan.md) |
| [observability](skills/observability/SKILL.md) | [meeting-minutes](prompts/meeting-minutes.md) |
| [performance-optimization](skills/performance-optimization/SKILL.md) | [rewrite-for-clarity](prompts/rewrite-for-clarity.md) |
| [prompt-engineering](skills/prompt-engineering/SKILL.md) | [risk-analysis](prompts/risk-analysis.md) |
| [refactoring](skills/refactoring/SKILL.md) | [socratic-tutor](prompts/socratic-tutor.md) |
| [research-synthesis](skills/research-synthesis/SKILL.md) | [sql-from-question](prompts/sql-from-question.md) |
| [schema-design](skills/schema-design/SKILL.md) | [standup-summary](prompts/standup-summary.md) |
| [security-review](skills/security-review/SKILL.md) | [summarize-document](prompts/summarize-document.md) |
| [sql-optimization](skills/sql-optimization/SKILL.md) | [user-story-breakdown](prompts/user-story-breakdown.md) |
| [staying-on-task](skills/staying-on-task/SKILL.md) | [write-tests](prompts/write-tests.md) |
| [technical-writing](skills/technical-writing/SKILL.md) |  |
| [testing-strategy](skills/testing-strategy/SKILL.md) |  |
<!-- library:end -->

Every entry is complete and self-contained. No stubs, no "coming soon",
no entry that exists to pad the count.

<br>

## Principles

1. **Portable.** Plain markdown + minimal YAML. If a tool dies, the content
   survives.
2. **Honest.** Each entry says what it is for and where it does not apply.
   Nothing here claims to replace judgment.
3. **Complete.** An entry ships when it is usable end to end, not before.
4. **Small.** One method per skill, one job per prompt. Composition beats
   bloat.

<br>

## FAQ

**Why not just prompt harder?** A skill is the difference between telling an
agent "review this well" and handing it the review method a strong engineer
actually uses: priorities, verification steps, and the reporting format.
The output difference is immediate.

**Do these work with my tool?** If it can read a markdown file, yes. The
per-tool notes above are conveniences, not requirements.

**How is this different from a curated list?** Lists link to things. This
repository *is* the things.

**Can I use these commercially?** Yes: MIT. Attribution appreciated, never
required.

<br>

## Contributing

New skills and prompts are welcome when they clear the bar in
[CONTRIBUTING.md](CONTRIBUTING.md): complete, self-contained, honest,
distinct, portable.

## License

[MIT](LICENSE)

<br>

<div align="center">

Made by [Amey Thakur](https://github.com/Amey-Thakur) , 
also the maker of [NotebookLab](https://github.com/Amey-Thakur/NotebookLab),
the offline-first AI knowledge workspace these skills grew out of.

</div>
