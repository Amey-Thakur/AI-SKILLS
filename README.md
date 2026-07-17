<div align="center">

# AI Skills

**Plug-and-play skills and prompts for every AI coding agent.**

Claude Code · Claude Desktop · Cursor · OpenAI Codex · Gemini CLI ·
GitHub Copilot · Windsurf · Cline · Zed · Aider · any agent that reads a file

[Website](https://amey-thakur.github.io/AI-SKILLS/) ·
[Prompt Studio](https://amey-thakur.github.io/AI-SKILLS/prompt-studio.html) ·
[Install](INSTALL.md) · [Skills](skills/) · [Prompts](prompts/) ·
[Contributing](CONTRIBUTING.md)

</div>

<br>

## What this is

Two collections, one idea: a tested method beats improvisation. Hand an agent
the way a strong engineer reviews code, and its review improves in one step.
Hand a person a prompt built on what actually works, and the answer improves
on the first try.

- **[`skills/`](skills/)** are working methods an agent loads and follows:
  reviewing code, debugging, writing a postmortem, designing an API. One
  folder per skill, one `SKILL.md` inside, in the format Claude agents load
  natively and every other tool can read.
- **[`prompts/`](prompts/)** are complete prompts with named `{variables}`,
  the model settings to run them, and one honest line on what each does well.
  Build your own in the browser with the
  [Prompt Studio](https://amey-thakur.github.io/AI-SKILLS/prompt-studio.html).

Each entry is plain markdown with a short header. That is the design, not a
limitation: a method an agent can read is one you can read, edit, version, and
carry to your next tool. No runtime, no framework, no format that expires when
a product does.

<br>

## Quick start

**Claude Code** loads the whole library from one command:

```
/plugin marketplace add Amey-Thakur/AI-SKILLS
```

**Any other tool** reads plain markdown. The one-liners:

| Tool | One line |
|---|---|
| Claude Desktop, claude.ai | Upload a skill folder in Settings, Capabilities, Skills |
| Codex, Gemini CLI, Cursor, Copilot, Windsurf, Zed, Aider | Reference a skill from your `AGENTS.md` |
| Cline | `curl -s <raw>/skills/code-review/SKILL.md > .clinerules/code-review.md` |
| Any API | Fetch the raw file; the body is your system prompt |

Full per-tool instructions, including scoped Cursor `.mdc` rules and Copilot
instruction files, are in **[INSTALL.md](INSTALL.md)**.

**For agents:** the whole catalog is machine-readable at
[`index.json`](index.json) (each entry with a description and a raw URL),
mirrored in [`llms.txt`](llms.txt), with usage rules in [`AGENTS.md`](AGENTS.md).
Fetch the index, pick by description, pull only what the task needs.

<br>

## What's inside

<!-- library:start -->
| Skills: how to work (28) | Prompts: ready to run (22) |
|---|---|
| [accessibility-review](skills/accessibility-review/SKILL.md) | [api-docs-from-code](prompts/api-docs-from-code.md) |
| [agent-memory](skills/agent-memory/SKILL.md) | [brainstorm-divergent](prompts/brainstorm-divergent.md) |
| [api-design](skills/api-design/SKILL.md) | [bug-report-triage](prompts/bug-report-triage.md) |
| [ci-cd](skills/ci-cd/SKILL.md) | [changelog-from-diff](prompts/changelog-from-diff.md) |
| [code-documentation](skills/code-documentation/SKILL.md) | [compare-options](prompts/compare-options.md) |
| [code-review](skills/code-review/SKILL.md) | [data-to-insights](prompts/data-to-insights.md) |
| [commit-messages](skills/commit-messages/SKILL.md) | [email-professional](prompts/email-professional.md) |
| [containerization](skills/containerization/SKILL.md) | [explain-code](prompts/explain-code.md) |
| [debugging](skills/debugging/SKILL.md) | [explain-like-im-five](prompts/explain-like-im-five.md) |
| [dependency-management](skills/dependency-management/SKILL.md) | [extract-action-items](prompts/extract-action-items.md) |
| [design-systems](skills/design-systems/SKILL.md) | [incident-status-update](prompts/incident-status-update.md) |
| [error-handling](skills/error-handling/SKILL.md) | [interview-questions](prompts/interview-questions.md) |
| [frontend-state](skills/frontend-state/SKILL.md) | [learning-plan](prompts/learning-plan.md) |
| [git-workflow](skills/git-workflow/SKILL.md) | [meeting-minutes](prompts/meeting-minutes.md) |
| [incident-postmortem](skills/incident-postmortem/SKILL.md) | [rewrite-for-clarity](prompts/rewrite-for-clarity.md) |
| [mcp-server](skills/mcp-server/SKILL.md) | [risk-analysis](prompts/risk-analysis.md) |
| [observability](skills/observability/SKILL.md) | [socratic-tutor](prompts/socratic-tutor.md) |
| [performance-optimization](skills/performance-optimization/SKILL.md) | [sql-from-question](prompts/sql-from-question.md) |
| [prompt-engineering](skills/prompt-engineering/SKILL.md) | [standup-summary](prompts/standup-summary.md) |
| [rag-pipeline](skills/rag-pipeline/SKILL.md) | [summarize-document](prompts/summarize-document.md) |
| [refactoring](skills/refactoring/SKILL.md) | [user-story-breakdown](prompts/user-story-breakdown.md) |
| [research-synthesis](skills/research-synthesis/SKILL.md) | [write-tests](prompts/write-tests.md) |
| [schema-design](skills/schema-design/SKILL.md) |  |
| [security-review](skills/security-review/SKILL.md) |  |
| [sql-optimization](skills/sql-optimization/SKILL.md) |  |
| [staying-on-task](skills/staying-on-task/SKILL.md) |  |
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

**Why not just prompt harder?** "Review this well" leaves the agent to guess
what good means. A skill hands it the priorities, the verification steps, and
the reporting format a strong engineer would use. The output changes on the
next run.

**Does this work with my tool?** If the tool reads a markdown file, yes. The
per-tool steps in [INSTALL.md](INSTALL.md) are conveniences, not requirements.

**How is this different from a curated list?** A list links to things. This
repository is the things: every entry is here, complete, in one format.

**Can I use these commercially?** Yes, under MIT. Attribution is appreciated
and never required.

<br>

## Contributing

New skills and prompts are welcome when they clear the bar in
[CONTRIBUTING.md](CONTRIBUTING.md): complete, self-contained, honest,
distinct, portable.

## License

[MIT](LICENSE)

<br>

<div align="center">

Made by [Amey Thakur](https://github.com/Amey-Thakur), who also builds
[NotebookLab](https://github.com/Amey-Thakur/NotebookLab), the offline-first AI
knowledge workspace these methods grew out of.

</div>
