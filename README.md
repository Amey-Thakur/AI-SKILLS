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
| [accessibility](CATALOG.md#accessibility-8) | 8 | accessibility-review, accessible-forms, alt-text-writing |
| [apis](CATALOG.md#apis-9) | 9 | api-change-management, api-client-design, api-deprecation |
| [architecture](CATALOG.md#architecture-13) | 13 | api-gateway-pattern, architecture-decision-records, architecture-diagrams |
| [backend](CATALOG.md#backend-14) | 14 | api-error-responses, api-versioning, background-jobs |
| [big-tech-processes](CATALOG.md#big-tech-processes-28) | 28 | architecture-review-board, bar-raiser-interviewing, canary-analysis |
| [big-tech-roles](CATALOG.md#big-tech-roles-30) | 30 | accessibility-specialist-role, backend-engineer-role, cloud-architect-role |
| [business-growth](CATALOG.md#business-growth-8) | 8 | churn-analysis, community-building, developer-marketing |
| [career-communication](CATALOG.md#career-communication-10) | 10 | async-communication, conference-talks, engineering-resume |
| [cloud](CATALOG.md#cloud-12) | 12 | autoscaling-policies, cloud-cost-optimization, cloud-disaster-recovery |
| [code-quality](CATALOG.md#code-quality-37) | 37 | api-surface-minimalism, assertion-density, boolean-parameters |
| [css-styling](CATALOG.md#css-styling-10) | 10 | css-animations, css-architecture, css-cascade |
| [data-engineering](CATALOG.md#data-engineering-12) | 12 | batch-vs-streaming, change-data-capture, data-lineage |
| [data-science](CATALOG.md#data-science-18) | 18 | cohort-analysis, correlation-causation, data-cleaning |
| [databases](CATALOG.md#databases-12) | 12 | backup-restore, database-migrations, database-normalization |
| [debugging](CATALOG.md#debugging-32) | 32 | alerting-design, binary-search-debugging, browser-devtools |
| [devops](CATALOG.md#devops-14) | 14 | artifact-versioning, blue-green-deployments, capacity-planning |
| [distributed-systems](CATALOG.md#distributed-systems-12) | 12 | backpressure, clock-skew, consensus-basics |
| [documentation](CATALOG.md#documentation-10) | 10 | api-reference-docs, changelog-writing, code-documentation |
| [email](CATALOG.md#email-8) | 8 | clear-emails, difficult-emails, email-etiquette |
| [embedded-iot](CATALOG.md#embedded-iot-8) | 8 | embedded-debugging, embedded-memory-constraints, firmware-ota-updates |
| [frontend](CATALOG.md#frontend-10) | 10 | design-systems, error-boundaries-ui, form-handling |
| [game-development](CATALOG.md#game-development-8) | 8 | entity-component-system, game-asset-pipeline, game-input-handling |
| [git-collaboration](CATALOG.md#git-collaboration-10) | 10 | branch-strategy, code-owners, commit-messages |
| [gpu-ai-infrastructure](CATALOG.md#gpu-ai-infrastructure-20) | 20 | ai-datacenter-networking, checkpointing-large-training, cuda-kernel-basics |
| [javascript-typescript](CATALOG.md#javascript-typescript-14) | 14 | js-async-patterns, js-error-handling, js-event-loop |
| [jvm-dotnet](CATALOG.md#jvm-dotnet-10) | 10 | csharp-linq, dotnet-async, dotnet-dependency-injection |
| [llm-engineering](CATALOG.md#llm-engineering-22) | 22 | agent-memory, agentic-loops, coding-agent-workflow |
| [machine-learning](CATALOG.md#machine-learning-12) | 12 | cross-validation, drift-monitoring, experiment-tracking |
| [mobile](CATALOG.md#mobile-10) | 10 | app-store-readiness, deep-linking, mobile-input-ux |
| [multi-agent-teams](CATALOG.md#multi-agent-teams-25) | 25 | agent-arch-board, agent-code-review-loop, agent-competitive-analysis-team |
| [performance](CATALOG.md#performance-28) | 28 | algorithmic-optimization, async-io-patterns, batching-and-debouncing |
| [product-management](CATALOG.md#product-management-10) | 10 | ab-test-design, customer-interviews, feature-sunsetting |
| [python](CATALOG.md#python-14) | 14 | pytest-mastery, python-asyncio, python-cli-tools |
| [research](CATALOG.md#research-15) | 15 | autonomous-research, decision-journals, deep-research |
| [scripting-automation](CATALOG.md#scripting-automation-10) | 10 | automation-guardrails, bash-robustness, cli-ux-design |
| [security](CATALOG.md#security-43) | 43 | api-security, audit-logging, authn-design |
| [systems-languages](CATALOG.md#systems-languages-10) | 10 | c-memory-safety, cpp-raii, ffi-boundaries |
| [testing](CATALOG.md#testing-41) | 41 | api-testing, approval-testing, assertion-libraries |
| [ui-ux](CATALOG.md#ui-ux-10) | 10 | empty-and-error-states, information-architecture, interaction-design |
| [writing](CATALOG.md#writing-10) | 10 | audience-adaptation, clear-writing, concise-writing |
| [prompts](CATALOG.md#prompts-133) | 133 | ad-copy, add-code-comments, adjust-tone |
<!-- library:end -->

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

## License and author

Released under the [MIT License](LICENSE). Use these skills and prompts
commercially or privately; attribution is appreciated and never required.

Built by [Amey Thakur](https://github.com/Amey-Thakur), who also builds
[NotebookLab](https://github.com/Amey-Thakur/NotebookLab), the offline-first AI
knowledge workspace these methods grew out of.
