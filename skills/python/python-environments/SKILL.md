---
name: python-environments
description: Pick an environment manager, pin dependencies with a lockfile, and produce reproducible installs that never touch system Python. Use when setting up a project's dependencies, fixing "works on my machine", or hardening CI installs.
---

# Python environments

An environment is a reproducibility boundary. The goal is that any machine,
including CI and a teammate's laptop, resolves to the exact same package
versions, isolated from the interpreter the OS ships.

## Method

1. **Never install into system Python.** The OS depends on its interpreter;
   `pip install` into it breaks tools and needs sudo. Create a per-project
   environment and treat the system Python as read-only. On managed hosts
   this is enforced by PEP 668 (`externally-managed-environment`); do not
   override it with `--break-system-packages`.
2. **Choose the manager by constraint.** `venv` plus pip is built in and
   enough for simple projects. `uv` is the default for speed and a single
   tool that handles interpreters, venvs, resolution, and locking. Reserve
   `conda`/`mamba` for non-Python native dependencies (CUDA, MKL, GDAL,
   compilers) that PyPI wheels do not cover.
3. **Separate declared from resolved.** Declare direct dependencies with
   loose bounds in `pyproject.toml`. Resolve them once into a lockfile that
   pins every transitive package and its hash (`uv lock`, `poetry.lock`,
   or `pip-compile` producing `requirements.txt`). Commit the lockfile;
   humans edit declarations, tools own the lock.
4. **Install from the lock, exactly.** Development and CI run a synced,
   hash-verified install (`uv sync --frozen`, `pip install --require-hashes
   -r requirements.txt`) so a new release upstream cannot silently enter.
   Fail the build if the lock is out of date rather than re-resolving.
5. **Pin the interpreter too.** Record the Python version in
   `requires-python` and a `.python-version`; a lockfile resolved on 3.12
   can produce different packages on 3.11. Let the manager fetch the pinned
   interpreter rather than relying on whatever is on PATH.
6. **Keep environments disposable.** The environment is a build artifact,
   not a place to store state; never commit the venv directory. Rebuilding
   from the lockfile must be a routine, sub-minute operation, which is what
   makes a corrupted environment cheap to fix.

## Boundaries

- Lockfiles pin PyPI packages, not system libraries. Reproducibility for
  native dependencies needs conda, a container image, or Nix.
- Platform-specific wheels mean a lock resolved on Linux may not install on
  macOS or Windows; generate or verify per-platform when you support many.
- This covers dependency reproducibility, not building your own distributable
  package; that is python-packaging.
