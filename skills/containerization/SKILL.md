---
name: containerization
description: Write container images and compose setups that are small, reproducible, and safe to run. Use when writing Dockerfiles, docker-compose files, or debugging container behavior.
---

# Containerization

An image is a frozen promise: same bits, same behavior, anywhere. Keep it
small, deterministic, and unprivileged, and the promise holds.

## Method

1. **Base images: specific and slim.** Pin to a concrete version tag
   (node:22-slim, not node:latest); latest converts every rebuild into a
   surprise. Slim or distroless variants shrink both download and attack
   surface; alpine only when its libc quirks are understood.
2. **Order layers by change frequency.** Dependency manifests copy and
   install first, source copies last, so a code change rebuilds one layer
   instead of reinstalling the world. One RUN per logical step, cleanup in
   the same layer it dirtied, or the deleted files still ship in the layer
   below.
3. **Multi-stage: build heavy, ship light.** Compile and bundle in a
   builder stage; the final stage copies only artifacts and runtime deps.
   Compilers, dev dependencies, and test fixtures in a production image
   are pure liability.
4. **Run as a non-root user,** declare the port, and define a healthcheck
   that exercises the real serving path. Handle SIGTERM for graceful
   shutdown; a process that ignores it gets killed mid-write at every
   deploy.
5. **State stays out of containers.** Data in volumes or external
   services; the container itself must be disposable at any moment.
   Configuration and secrets arrive by environment or mounted secret
   files at runtime, never baked into the image; anything COPYed in is
   published to everyone who can pull.
6. **Compose for local truthfulness:** service per process, healthcheck-
   based depends_on so ordering is real, named volumes for anything that
   must survive, and a .dockerignore that keeps .git, node_modules, and
   local env files out of the build context (both for speed and secrecy).

## Debugging order

Container will not start: read its logs, then run the same image with a
shell and try the entrypoint by hand. Works locally, fails in the cluster:
compare env, mounts, resources, and user. Image too big: inspect layer
sizes and find the layer that smuggled the build tools or cache in.

## Litmus tests

- Two builds from the same commit: functionally identical images?
- Does anything secret appear in image history or layers?
- Can the container be killed and replaced at any second without data
  loss?
