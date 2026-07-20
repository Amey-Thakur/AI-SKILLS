---
name: powershell-essentials
description: Write PowerShell that leans on the object pipeline, handles errors deliberately, and runs cross-platform where needed. Use when automating Windows or writing pwsh scripts for mixed fleets.
---

# PowerShell essentials

PowerShell pipes objects, not text: the entire design follows from
that. Scripts that treat it as bash-with-verbs fight the tool; scripts
that filter and shape objects get parsing for free.

## Method

1. **Stay in objects until the last step.** `Get-Process |
   Where-Object CPU -gt 100 | Select-Object Name, Id`: no regex,
   no cut/awk. Convert to text (Format-*, Out-*) only at final
   display; Format cmdlets destroy the objects, so never put them
   mid-pipeline. For interop, `ConvertTo-Json`/`ConvertFrom-Json`
   round-trip structures (the text-processing "structured first"
   rule is the default here).
2. **Make errors terminating where correctness matters.**
   Non-terminating errors continue by default: set
   `$ErrorActionPreference = 'Stop'` at script top (and know
   native executables still need `$LASTEXITCODE` checks;
   PSNativeCommandErrorActionPreference in pwsh 7.4+ closes that
   gap). `try/catch` around the operations you can handle;
   `-ErrorAction SilentlyContinue` only with a comment defending
   the swallow (the bash-robustness `|| true` rule, translated).
3. **Write functions as advanced functions.**
   `[CmdletBinding()]`, typed `param()` blocks with validation
   attributes (`[ValidateNotNullOrEmpty()]`, `[ValidateSet(...)]`),
   `SupportsShouldProcess` for anything destructive so `-WhatIf`
   and `-Confirm` work fleet-wide (see automation-guardrails):
   this is the platform's built-in dry-run, use it. Verb-Noun
   names from `Get-Verb`; comment-based help for anything shared.
4. **Structure scripts like the CLI contract they are.** Param
   block at top (positional for the common case, named for the
   rest), objects to the output stream (so callers can pipe),
   diagnostics via `Write-Verbose`/`Write-Warning` (never
   `Write-Host` for data), exit codes for CI consumption (see
   python-cli-tools: same contract, different runtime).
   `Set-StrictMode -Version Latest` catches typo'd variables the
   way `set -u` does.
5. **Target the right edition per fleet.** pwsh (7+) is
   cross-platform and actively developed: default for new work,
   including Linux containers and CI. Windows PowerShell 5.1 is
   what stock Windows guarantees: constrain to compatible syntax
   (or ship pwsh) when targeting unmanaged Windows boxes; module
   availability differs, so CI-test on the editions you claim
   (the shell-portability matrix ethic).
6. **Lint and test like real code.** PSScriptAnalyzer in CI
   (see linting-setup), Pester for unit tests of functions
   (mock cmdlets, assert on objects: see test-doubles); modules
   (`.psm1` + manifest) over dot-sourced script piles once
   functions are shared (see python-project-structure instincts).

## Boundaries

- Remoting, DSC, and AD administration are their own disciplines
  with security surface (JEA, credential handling: see
  least-privilege, secrets-management); this skill covers the
  scripting core beneath them.
- Text-native interop (parsing legacy tool output) loses the
  object advantage; for heavy text pipelines on Linux, classic
  tools may serve better (see text-processing): choose per job.
- Performance-sensitive loops over huge collections can crawl in
  the pipeline; measure and drop to .NET methods
  (`[IO.File]::ReadLines`) where profiles demand (see
  benchmark-design), not preemptively.
