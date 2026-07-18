# Install

Every skill is one `SKILL.md`; every prompt is one `.md`. Both are plain text,
so every tool below works by pointing it at that text. Pick your tool.

Throughout, the raw base for any file is:

```
https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/
```

## Claude Code

Skills load natively. Add the whole library as a plugin marketplace:

```
/plugin marketplace add Amey-Thakur/AI-SKILLS
```

Or copy one skill into your skills folder:

```bash
git clone https://github.com/Amey-Thakur/AI-SKILLS
cp -r AI-SKILLS/skills/code-quality/code-review ~/.claude/skills/     # global
cp -r AI-SKILLS/skills/code-quality/code-review .claude/skills/        # this project
```

Claude picks a skill up when the task matches its description, or you invoke it
by name.

## Claude Desktop and claude.ai

Settings, then Capabilities, then Skills. Upload a skill folder (the one
containing `SKILL.md`). It becomes available in every conversation.

## Google Antigravity

Antigravity loads the same `SKILL.md` folders natively. Copy a skill into
either scope:

```bash
git clone https://github.com/Amey-Thakur/AI-SKILLS
cp -r AI-SKILLS/skills/code-quality/code-review ~/.gemini/config/skills/   # every project
cp -r AI-SKILLS/skills/code-quality/code-review .agents/skills/            # this project
```

The agent equips a skill when the task matches its description. Antigravity
also reads `AGENTS.md` (below).

## AGENTS.md standard

Codex CLI, Gemini CLI, Cursor, GitHub Copilot, Windsurf, Antigravity, Zed, Aider, Warp,
Jules, and Junie all read an `AGENTS.md` at your repository root. Reference the
methods you want from there, so any of them can pull the full text on demand:

```markdown
# AGENTS.md

## Working methods
Follow the method in the linked file when the task matches:
- Reviewing code: https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-quality/code-review/SKILL.md
- Debugging: https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/debugging/debugging/SKILL.md
```

Or paste a skill's body straight into `AGENTS.md` when you want it always on.

## Cursor

Cursor reads `AGENTS.md` (above), or use a scoped rule. Save a skill as an
`.mdc` file under `.cursor/rules/` with frontmatter, so it loads only for the
files it applies to:

```bash
mkdir -p .cursor/rules
{ printf -- '---\ndescription: Review code with severity-ranked findings\nglobs: **/*\nalwaysApply: false\n---\n\n'; \
  curl -s https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-quality/code-review/SKILL.md; \
} > .cursor/rules/code-review.mdc
```

The `.mdc` extension and frontmatter are required; a plain `.md` in that folder
is ignored.

## GitHub Copilot

Copilot reads `AGENTS.md` (above), or `.github/copilot-instructions.md` for
always-on project instructions:

```bash
mkdir -p .github
curl -s https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-quality/code-review/SKILL.md \
  >> .github/copilot-instructions.md
```

## Cline

Cline reads every file in a `.clinerules/` directory:

```bash
mkdir -p .clinerules
curl -s https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-quality/code-review/SKILL.md \
  > .clinerules/code-review.md
```

## Roo Code

Roo reads every file in a `.roo/rules/` directory:

```bash
mkdir -p .roo/rules
curl -s https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-quality/code-review/SKILL.md \
  > .roo/rules/code-review.md
```

## Windsurf

Windsurf reads `AGENTS.md` (above), or a project rule under `.windsurf/rules`:

```bash
mkdir -p .windsurf/rules
curl -s https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/skills/code-quality/code-review/SKILL.md \
  > .windsurf/rules/code-review.md
```

## OpenAI API, Gemini API, or any model

A skill body is a system-prompt section; a prompt body is a user message.
Fetch and use it:

```python
import urllib.request

base = "https://raw.githubusercontent.com/Amey-Thakur/AI-SKILLS/main/"
skill = urllib.request.urlopen(base + "skills/code-quality/code-review/SKILL.md").read().decode()
# strip the frontmatter, then pass the body as your system prompt
system = skill.split("---", 2)[-1].strip()
```

## Any agent, no setup

The whole catalog is machine-readable at
[`index.json`](index.json): every entry with a description and a raw URL. An
agent fetches it, picks by description, and pulls only what the task needs.
[`llms.txt`](llms.txt) is the same list in plain text. See
[`AGENTS.md`](AGENTS.md) for the rules an agent should follow when using them.
