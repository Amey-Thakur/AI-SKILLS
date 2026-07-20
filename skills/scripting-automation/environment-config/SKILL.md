---
name: environment-config
description: Manage script and tool configuration through env vars, dotenv files, and layered precedence without leaking secrets. Use when wiring configuration for CLIs, scripts, and local development.
---

# Environment config

Configuration answers "what varies between runs and machines".
The design goals: one documented precedence order, defaults that work
out of the box, and secrets that never touch the repo or the process
list.

## Method

1. **Fix the precedence order and document it.** Flags > environment
   variables > project config file > user config file > built-in
   defaults: most specific wins, every layer optional (see
   cli-ux-design). Print the effective config on request
   (`tool config show` with sources annotated); debugging "why is
   it using that value" consumes more time than any other config
   problem.
2. **Namespace and document the env vars.** `TOOL_*` prefix so
   variables are greppable and collision-free; document each
   (name, effect, default) in help and README (see
   readme-writing); read them in one config module, not scattered
   `os.environ` calls through the codebase (see
   config-management's app-side twin, spring-boot-discipline and
   dotnet-dependency-injection for typed binding in services).
3. **Use dotenv files for local dev only.** `.env` holds local
   overrides, loaded by the tool or direnv; `.env` goes in
   .gitignore *before* the first commit, and a committed
   `.env.example` documents the shape with placeholder values
   (see onboarding-docs). Production gets real environment
   injection (orchestrator secrets, CI variables), never shipped
   dotenv files (see secrets-management).
4. **Validate at startup, fail with names.** Check required
   variables and value shapes before doing work; the error names
   the variable and the fix ("TOOL_API_URL unset: export it or
   run 'tool init'"): see request-validation's parse-don't-check
   ethic applied to the environment. Type-convert once (ports to
   ints, flags to bools with a defined truthy set) so downstream
   code never re-parses strings.
5. **Keep secrets out of argv and out of files where possible.**
   Flags leak via process lists and shell history: secrets arrive
   by env var (from a manager at spawn), by file path with 0600
   perms, or by prompting a TTY: never `--password hunter2`
   (see cli-ux-design step 6, secrets-scanning for the repo
   side). Scripts avoid `set -x` around secret handling, and log
   redacted config only (see pii-handling instincts for logs).
6. **Respect platform conventions for user config.** XDG paths
   (`~/.config/tool/`) on Linux, platform equivalents elsewhere
   (platformdirs-class helpers; see python-cli-tools boundary
   note): not dotfile sprawl in $HOME. Machine-level vs
   user-level vs project-level config each has a location and a
   reason; write config only where the user asked
   (`tool config set` edits the user layer explicitly).

## Boundaries

- Application/deployment config for services (flag systems,
  config servers, per-environment promotion) is
  config-management's territory; this skill covers tools and
  scripts.
- Environment variables are inherited by child processes
  wholesale: spawning untrusted or logging-happy subprocesses
  with secrets in the environment is a leak path (scrub or
  allowlist the child env).
- Config schemas evolve: renamed variables get a deprecation
  window reading old + warning, like any interface change (see
  api-change-management in miniature).
