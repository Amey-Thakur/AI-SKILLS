# Security

This repository is plain markdown skills and prompts, plus a small Node build
script. It ships no runtime and executes nothing on your machine. Still, two
kinds of issue are worth reporting.

## What counts as a security issue

- **A skill or prompt that could cause harm if followed.** For example, a
  method that quietly weakens security, leaks secrets, or gives dangerous
  advice as if it were safe.
- **Content that tries to hijack the agent reading it.** Hidden or obfuscated
  instructions in a skill or prompt meant to make an AI agent exfiltrate data,
  run unintended commands, or ignore its own user.
- **A flaw in the build script** (`scripts/build-index.mjs`) or the website
  under `docs/`.

Ordinary bugs, typos, and content improvements are not security issues. Open a
regular issue or pull request for those.

## Reporting

Report privately, not in a public issue:

- Open a draft advisory under the repository's **Security** tab
  (**Report a vulnerability**), or
- Email **ameythakur20@gmail.com**.

Include what you found, where, and how to reproduce it. Expect an acknowledgment
within a few days. Fixes ship as soon as they are ready, and credit is given to
reporters who want it.
