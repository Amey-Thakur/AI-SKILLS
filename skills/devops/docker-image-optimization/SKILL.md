---
name: docker-image-optimization
description: Build small, fast, secure container images with layer caching, multi-stage builds, and a minimal base policy. Use when images are bloated, slow to build, or failing security scans.
---

# Docker image optimization

A container image has three costs: build time (developer iteration),
size (registry, pull, cold-start), and attack surface (every byte is
something to scan and exploit). Multi-stage builds and disciplined
layering cut all three at once.

## Method

1. **Separate build from runtime with multi-stage.** A build
   stage with the full toolchain compiles/bundles; the final
   stage copies only the artifact into a minimal runtime
   (see artifact-versioning): compilers, dev dependencies,
   and build caches never ship. This single change often
   halves image size and removes most of the CVEs a scanner
   finds.
2. **Order layers by change frequency for cache hits.**
   Dependencies (rarely change) before application code
   (changes every commit): `COPY package.json && install`
   then `COPY . .`, so a code edit does not reinstall every
   dependency. Cache misses on the slow layer are the main
   build-time waste (see deployment-pipelines' speed
   budget); a correctly-ordered Dockerfile rebuilds in
   seconds.
3. **Choose the smallest sufficient base, by policy.**
   Distroless or minimal (alpine, slim, scratch for static
   binaries) over full OS images: less to pull, less to
   patch, less to exploit. Pin base images by digest (not
   `latest`: reproducibility and supply-chain: see
   supply-chain-defense), and standardize the allowed bases
   org-wide so patching is one bump, not fifty
   (see container-security).
4. **Keep each layer clean.** Combine related RUN commands
   and clean up within the same layer (package caches,
   temp files: a separate `rm` layer does not shrink the
   image, it adds one); use `.dockerignore` so build
   context excludes node_modules, .git, and secrets (which
   must never enter an image: see secrets-management). Every
   megabyte multiplies across every pull on every node.
5. **Harden the runtime image.** Run as non-root (see
   kubernetes-workloads' pod security), read-only
   filesystem where possible, no shell/package manager in
   the final image if the app does not need them (smaller
   and drastically reduces post-exploit options), and only
   the ports the app uses. The minimal image is also the
   hardened image: the disciplines converge (see
   least-privilege).
6. **Gate size and scan in CI.** Scan every image for known
   vulnerabilities (see dependency-auditing,
   sast-integration) and track image size with a budget and
   per-PR diff (see bundle-size's twin for containers):
   a base bump that adds 200MB or a new critical CVE fails
   the gate, caught at the commit, not at deploy.

## Boundaries

- Extreme minimization (scratch, distroless) removes
  debugging tools; keep a debug variant or ephemeral
  debug-container workflow so production incidents are
  still investigable (see production-debugging).
- Build-cache optimization interacts with reproducibility
  and multi-arch builds; verify the cache does not mask
  stale dependencies (lockfiles pinned: see
  dependency-management).
- Image optimization reduces attack surface but is not
  container security entire: runtime policy, network
  policy, and secrets handling are separate layers (see
  container-security, cloud-networking).
