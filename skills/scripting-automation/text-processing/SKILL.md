---
name: text-processing
description: Choose grep, sed, awk, or jq by job, prefer structured formats, and know when a one-liner should become a script. Use when slicing logs, transforming files, or wrangling command output.
---

# Text processing

The classic tools each do one job at expert level: grep selects lines,
sed edits streams, awk computes over fields, jq queries JSON. Fluency
means picking the right one in five seconds and refusing to parse what
was never meant to be parsed.

## Method

1. **Reach for structured output first.** Modern tools speak JSON
   (`--json`, `-o json`, `--porcelain`): pipe that into `jq`
   instead of regexing human-formatted text that changes between
   versions (the powershell-essentials object principle, POSIX
   edition). Parsing `ls`, human `df`, or colorized output is a
   bug with a delay timer (see bash-robustness boundaries).
2. **Map job to tool.** Find lines: `grep -E` (add `-r` for
   trees, ripgrep for speed and sane defaults). Edit a stream:
   `sed` for substitutions and line surgery
   (`s///`, `/from/,/to/d`). Fields and arithmetic: `awk`
   (`-F,` splits, `$3 > 100 { sum += $2 } END { print sum }`):
   the point where cut+grep+sort pipelines collapse into one
   readable program. JSON: `jq` for select/reshape
   (`.items[] | select(.state=="failed") | .name`); yq for YAML.
   Sort/unique/count: `sort | uniq -c | sort -rn`, the
   frequency-table idiom that answers half of all log questions
   (see log-analysis).
3. **Compose short pipelines, name long ones.** Three or four
   stages pipe fine; beyond that, or with branching logic, write
   an awk script or move to Python with named functions (see
   bash-robustness step 6): pipelines are write-once
   read-never past a width. Intermediate results worth
   inspecting go through tee or temp files (atomically; see
   script-idempotency) so debugging does not mean rerunning
   everything.
4. **Handle real-world text hazards explicitly.** Filenames with
   spaces/newlines: `-print0`/`-0`/`--null` chains end to end.
   Huge files: stream (awk/sed/grep are O(1) memory) rather than
   slurp; `LC_ALL=C` for byte-wise speed and stable sorting
   (see shell-portability locale note). CRLF from Windows files
   breaks matches invisibly: `dos2unix` or `tr -d '\r'` at
   ingestion. Delimiters inside quoted CSV fields defeat awk's
   `-F,`: real CSV gets a real parser (csvkit, python csv),
   full stop.
5. **Test extractions against edge inputs.** Empty input, one
   line, the weird line (unicode, embedded quotes, missing
   field): pipe crafted samples through before trusting a
   one-liner on production data; for anything recurring, save
   the sample and expected output as a regression check (see
   golden-master in miniature). Regex greed and anchoring
   (`.*` spanning too far, missing `^`) are the classic silent
   wrongness: prefer explicit field logic in awk over heroic
   regex in sed.
6. **Promote recurring one-liners into tools.** The pipeline you
   have pasted three times into chat becomes a script with a
   name, `--help`, and stdin/file input (see cli-ux-design,
   python-cli-tools); one-liners in runbooks become tested
   scripts referenced by the runbook (see runbook-writing).
   History is not a package manager.

## Boundaries

- HTML and XML are not line-oriented; grep/sed on them works
  until the formatting changes: use pup/xmllint/a real parser
  (the same rule that bans regexing JSON when jq exists).
- Binary-adjacent formats (logs with control bytes, mixed
  encodings) need inspection (`file`, `xxd | head`) before text
  tools; garbage-in pipelines produce confident garbage out.
- At gigabytes-to-terabytes scale or with joins across files,
  the answer is a database or DuckDB-class local engine, not a
  taller pipeline (see exploratory-data-analysis instincts).
