<div align="center">

<a href="https://amey-thakur.github.io/AI-SKILLS/"><img src="docs/favicon.svg" alt="AI-SKILLS logo" width="88"></a>

# AI Skills

**Plug-and-play skills and prompts for every AI coding agent.**

Claude Code · Claude Desktop · Cursor · OpenAI Codex · Gemini CLI ·
GitHub Copilot · Windsurf · Antigravity · Cline · Zed · Aider · any agent that reads a file

[Website](https://amey-thakur.github.io/AI-SKILLS/) ·
[Prompt Studio](https://amey-thakur.github.io/AI-SKILLS/prompt-studio.html) ·
[Install](INSTALL.md) · [Skills](skills/) · [Prompts](prompts/) ·
[Ecosystem](ECOSYSTEM.md) · [Contributing](CONTRIBUTING.md)

</div>

<br>

## What this is

One place that finds every skill. Two halves make that true:

- **The library**: original skills and prompts, written for this repository,
  every one complete and tested. Below.
- **[The ecosystem index](ECOSYSTEM.md)**: every major skill collection on
  GitHub, indexed with per-skill links for the official ones. 8,000+ skills
  reachable through [`ecosystem.json`](ecosystem.json), one fetch away.

The idea behind the library: a tested method beats improvisation. Hand an
agent the way a strong engineer reviews code, and its review improves in one
step. Hand a person a prompt built on what actually works, and the answer
improves on the first try.

- **[`skills/`](skills/)** are working methods an agent loads and follows:
  reviewing code, debugging, writing a postmortem, designing an API. One
  folder per skill, one `SKILL.md` inside, in the format Claude agents load
  natively and every other tool can read.
- **[`prompts/`](prompts/)** are complete prompts with named `{variables}`,
  the model settings to run them, and one honest line on what each does well.
  Build your own in the browser with the
  [Prompt Studio](https://amey-thakur.github.io/AI-SKILLS/prompt-studio.html).
  Where settings mention temperature: that is the model's freedom to
  improvise, 0 exact and repeatable, 1 creative. No temperature control in
  your tool? Skip it; the prompt works at the default.

Each entry is plain markdown with a short header. That is the design, not a
limitation: a method an agent can read is one you can read, edit, version, and
carry to your next tool. No runtime, no framework, no format that expires when
a product does.

<br>

## Quick start

**Claude Code** adds the whole library from one command, organized as one
installable plugin per category:

```
/plugin marketplace add Amey-Thakur/AI-SKILLS
```

**Any other tool** reads plain markdown. The one-liners:

| Tool | One line |
|---|---|
| Claude Desktop, claude.ai | Upload a skill folder in Settings, Capabilities, Skills |
| Codex, Gemini CLI, Cursor, Copilot, Windsurf, Antigravity, Zed, Aider | Reference a skill from your `AGENTS.md` |
| Cline | `curl -s <raw>/skills/code-quality/code-review/SKILL.md > .clinerules/code-review.md` |
| Any API | Fetch the raw file; the body is your system prompt |

Full per-tool instructions, including scoped Cursor `.mdc` rules and Copilot
instruction files, are in **[INSTALL.md](INSTALL.md)**.

**For agents:** the whole catalog is machine-readable at
[`index.json`](index.json) (each entry with a description and a raw URL),
mirrored in [`llms.txt`](llms.txt), with usage rules in [`AGENTS.md`](AGENTS.md).
Fetch the index, pick by description, pull only what the task needs.

<br>

## What's inside

One row per category; every entry, with its one-line description, is in
**[CATALOG.md](CATALOG.md)**.

<!-- library:start -->
| Category | Skills | For example |
|---|---|---|
| [accessibility](CATALOG.md#accessibility-1) | 1 | accessibility-review |
| [apis](CATALOG.md#apis-1) | 1 | api-design |
| [big-tech-processes](CATALOG.md#big-tech-processes-28) | 28 | architecture-review-board, bar-raiser-interviewing, canary-analysis |
| [big-tech-roles](CATALOG.md#big-tech-roles-30) | 30 | accessibility-specialist-role, backend-engineer-role, cloud-architect-role |
| [code-quality](CATALOG.md#code-quality-37) | 37 | api-surface-minimalism, assertion-density, boolean-parameters |
| [databases](CATALOG.md#databases-2) | 2 | schema-design, sql-optimization |
| [debugging](CATALOG.md#debugging-32) | 32 | alerting-design, binary-search-debugging, browser-devtools |
| [devops](CATALOG.md#devops-4) | 4 | ci-cd, containerization, dependency-management |
| [documentation](CATALOG.md#documentation-2) | 2 | code-documentation, technical-writing |
| [frontend](CATALOG.md#frontend-2) | 2 | design-systems, frontend-state |
| [git-collaboration](CATALOG.md#git-collaboration-2) | 2 | commit-messages, git-workflow |
| [gpu-ai-infrastructure](CATALOG.md#gpu-ai-infrastructure-17) | 17 | checkpointing-large-training, cuda-kernel-basics, fault-tolerant-training |
| [llm-engineering](CATALOG.md#llm-engineering-5) | 5 | agent-memory, mcp-server, prompt-engineering |
| [multi-agent-teams](CATALOG.md#multi-agent-teams-17) | 17 | agent-arch-board, agent-code-review-loop, agent-design-review-panel |
| [performance](CATALOG.md#performance-23) | 23 | algorithmic-optimization, async-io-patterns, batching-and-debouncing |
| [research-thinking](CATALOG.md#research-thinking-1) | 1 | research-synthesis |
| [security](CATALOG.md#security-43) | 43 | api-security, audit-logging, authn-design |
| [testing](CATALOG.md#testing-41) | 41 | api-testing, approval-testing, assertion-libraries |
| [prompts](CATALOG.md#prompts-22) | 22 | api-docs-from-code, brainstorm-divergent, bug-report-triage |
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

**How is this different from a curated list?** It is both halves. The library
is the things themselves: every entry here, complete, in one format. The
[ecosystem index](ECOSYSTEM.md) is the list: every major collection elsewhere,
linked and machine-readable. One fetch covers both.

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
