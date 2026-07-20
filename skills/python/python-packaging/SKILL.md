---
name: python-packaging
description: Package a Python project with a single pyproject.toml, a src layout, and a clean build/publish path to PyPI including entry points. Use when turning a script or library into an installable, distributable package.
---

# Python packaging

A package is a build contract, not a folder of files. Declare metadata and
dependencies once in `pyproject.toml`, isolate importable code under `src/`,
and let a standard builder produce the artifacts you upload.

## Method

1. **Make pyproject.toml the single source of truth.** Put `[project]`
   metadata (name, version, `requires-python`, `dependencies`,
   `optional-dependencies`) and a `[build-system]` table naming your backend
   (hatchling, setuptools, flit, or pdm). Delete `setup.py` and `setup.cfg`
   unless a backend needs them; do not split config across files.
2. **Adopt the src layout.** Place the importable package at
   `src/mypkg/__init__.py`. This forces tests to run against the installed
   package, not the working tree, so a missing `package_data` or bad import
   fails locally instead of after publish. Configure the backend to find
   `src`.
3. **Manage version deliberately.** Either set `version` statically and bump
   it per release, or use `dynamic = ["version"]` with a scheme that reads a
   git tag (hatch-vcs, setuptools-scm). Follow semantic versioning and never
   reuse a version number; PyPI rejects re-uploads of an existing version.
4. **Declare entry points for executables and plugins.** A console command
   is `[project.scripts]` mapping `mytool = "mypkg.cli:main"`; that installs
   a wrapper on PATH without a manual shebang. Plugin discovery uses
   `[project.entry-points."group.name"]`. Package a CLI this way rather than
   shipping a loose script; see python-cli-tools.
5. **Build isolated artifacts.** Run `python -m build` to produce both an
   sdist (`.tar.gz`) and a wheel (`.whl`) in a clean environment. Check them
   with `twine check dist/*` and inspect the wheel contents to confirm no
   stray files or missing data.
6. **Publish through an isolated token, TestPyPI first.** Upload to TestPyPI
   with `twine upload -r testpypi dist/*`, install from there into a fresh
   venv, then upload to PyPI. Prefer a scoped API token or Trusted Publishing
   (OIDC from CI) over a password. Tag the release commit.

## Boundaries

- This is library and tool packaging. Application deployment (Docker images,
  lockfile-pinned installs, reproducibility) belongs to python-environments.
- Compiled extensions need platform wheels and often cibuildwheel; a single
  pure-Python wheel will not cover them.
- Do not publish secrets: audit the sdist, since it includes files a wheel
  omits and can leak `.env` or credentials if `MANIFEST`/excludes are wrong.
