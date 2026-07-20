---
name: shell-portability
description: Write shell that runs across POSIX sh, bash versions, and GNU/BSD userlands, or decide deliberately not to. Use when scripts must run on multiple platforms, containers, or CI images.
---

# Shell portability

Portability is a decision, not a default. Declare which environments
you support, write to that contract, and test on it; the alternative
is scripts that work on your laptop and fail in the alpine container
at 2am.

## Method

1. **Declare the dialect in the shebang and mean it.**
   `#!/bin/sh` promises POSIX: no arrays, no `[[`, no `local`
   (strictly), no `pipefail`, no process substitution. `#!/usr/bin/
   env bash` buys those features but must find bash: not guaranteed
   on alpine/BSD/embedded images. Choosing bash-everywhere and
   installing it in your images is a legitimate answer; pretending
   `sh` while writing bashisms is not: `checkbashisms` and
   shellcheck's sh mode catch the drift (see bash-robustness).
2. **Know the macOS reality.** macOS ships a 2007 bash 3.2
   (no associative arrays, no `mapfile`) and BSD userland; dev
   machines are the most common portability break. Either target
   bash 3.2 + BSD tools, or make the script's first act check for
   and prefer brew-installed GNU tools/newer bash: explicitly.
3. **Write to the POSIX core of the classic tools.** GNU and BSD
   diverge on flags: `sed -i` (needs `-i ''` on BSD), `date -d`
   vs `-v`, `grep -P` (GNU only), `xargs -d`, `readlink -f`
   (absent on older BSD/macOS). Portable moves: sed to a temp file
   and move (see script-idempotency), `awk` for date/field math,
   `grep -E` only, `find ... -exec` over xargs extensions. When a
   GNU-ism saves real complexity, require GNU explicitly
   (`command -v gsed`) rather than half-working.
4. **Probe features, not platforms.** `command -v tool`,
   `if some_feature_test; then` at startup, with clear failure
   messages naming what to install; branching on `uname` strings
   accumulates special cases that rot (feature detection is the
   same discipline as browser-matrix, aimed at userlands).
5. **Test on the actual matrix in CI.** A container job per
   supported environment (debian, alpine/busybox, macOS runner)
   running the script's test invocations (see test-environment-
   parity); portability claims without CI coverage are folklore.
   Pin the images so the matrix is versioned like any dependency.
6. **Escalate to a portable runtime when the matrix hurts.**
   Two or more of: associative data, JSON, retries with backoff,
   Windows support: switch to Python (stdlib-only for
   portability; see python-cli-tools) or ship a static binary
   (Go/Rust: see go-project-layout). The portability tax on shell
   grows superlinearly with script complexity; pay it in a
   language designed for it (see bash-robustness step 6).

## Boundaries

- Windows is not a shell-portability target; WSL/git-bash
  availability is deployment-specific. Cross-platform automation
  for Windows means PowerShell (see powershell-essentials) or a
  compiled tool, decided upfront.
- Containers you fully control collapse the problem: pin one
  image, write to it, and stop paying the tax; portability
  matters at the edges you do not control (dev machines, customer
  environments, heterogeneous CI).
- Locale and encoding vary too (`LC_ALL=C` for stable sort/regex
  behavior in pipelines); set it explicitly in scripts that parse
  or sort text (see text-processing).
