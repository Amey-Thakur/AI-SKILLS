---
name: container-security
description: Harden container images and runtime specs with minimal bases, non-root users, read-only filesystems, and dropped capabilities. Use when writing image or Kubernetes security settings or reviewing a container for privilege risk.
---

# Container security

A container shares the host kernel, so a breakout turns a compromised app into a
compromised node. What an attacker reaches for after landing is privilege and a
place to write, so the job is to take both away before they ever get there.

## Method

1. **Build from a minimal base.** Prefer distroless, alpine, or scratch over a
   full OS image: fewer packages mean fewer CVEs and no shell to pivot from. Scan
   the final image with Trivy or Grype and fail the build on fixable High or
   Critical findings.
2. **Run as a non-root user.** Add a `USER` directive with a fixed non-zero uid
   and set `runAsNonRoot: true` with an explicit `runAsUser` in the Kubernetes
   securityContext. A process running as uid 0 in the container is uid 0 against
   any kernel bug.
3. **Mount the root filesystem read-only.** Set `readOnlyRootFilesystem: true`
   and grant writable tmpfs or volumes only for the paths that truly need writes
   (`/tmp`, a cache dir). An attacker who cannot write cannot drop a binary to
   run.
4. **Drop all Linux capabilities and add none back by default.** Use
   `capabilities: drop: [ALL]` in the securityContext. Most services need zero;
   add one back only with a written reason, such as `NET_BIND_SERVICE` for a port
   below 1024.
5. **Forbid privilege escalation and privileged mode.** Set
   `allowPrivilegeEscalation: false` and `privileged: false`, and refuse
   `hostPID`, `hostNetwork`, and `hostPath` unless a specific need is reviewed. A
   privileged container is effectively root on the host.
6. **Set CPU and memory limits per container.** A compromised or runaway workload
   with no limit can starve every neighbor on the node. Unbounded resources are a
   denial-of-service condition waiting for a trigger.
7. **Keep secrets out of the image.** Mount them as files from the orchestrator's
   secret store, never bake them into layers or plain environment variables.
   Anything `COPY`ed in ships to everyone who can pull the image.

## Checks

- Does `docker history` or a layer scan turn up a shell, package manager, or
  secret in the final image?
- Does the container run as non-root with a read-only root filesystem in
  production?
- Are all capabilities dropped, with each one added back individually justified?

## Boundaries

This hardens the container and its runtime spec. Dockerfile build hygiene and
layer caching belong to containerization; cluster-wide enforcement (admission
controllers, Pod Security Standards, network policy) is a platform concern this
skill feeds rather than owns.
