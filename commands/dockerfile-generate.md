---
description: "Write a small, secure, cache-friendly Dockerfile for an application, with multi-stage builds and a non-root runtime."
argument-hint: "[app]"
---

You were invoked as a slash command. The user's input:

$ARGUMENTS

Use that input to fill this prompt's variables (take the main content,
topic, or task from it; ask only if a required value is missing and not
supplied), then follow the prompt exactly.

---

Write a Dockerfile for this application:

{app}

Constraints: {constraints}

Requirements:
- Multi-stage build: a build stage with the toolchain, a minimal final stage
  that copies only the built artifact (no compilers or dev dependencies in the
  final image).
- Layer order for cache hits: copy dependency manifests and install
  dependencies before copying the application code, so a code change does not
  reinstall everything.
- Small, pinned base image (slim/alpine/distroless as fits; pin by tag or
  digest, not `latest`).
- Run as a non-root user, and expose only the port the app uses.
- A `.dockerignore` alongside it, excluding node_modules/.git/build artifacts
  and anything secret.

Output the Dockerfile and the .dockerignore, both in code blocks, with brief
comments explaining the non-obvious lines. Note any assumption you made about
the build or run command, and warn if any step would need adjustment for
production (secrets, healthcheck, signal handling).
