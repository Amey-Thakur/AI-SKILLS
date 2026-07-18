---
name: path-traversal-defense
description: Stop user-supplied path components from escaping the directory you meant to confine them to. Use when a filename, path segment, or archive entry from outside the program is joined into a filesystem path for reading, writing, or serving.
---

# Path traversal defense

Any time a caller controls part of a path, they are one `../` away from a
file you never meant to expose. The failure is subtle because `open(base +
name)` looks confined until `name` is `../../etc/shadow`, and string checks
for `..` miss URL-encoding, absolute paths, symlinks, and Windows
separators. The reliable defense is to resolve the path to its real
location and prove it still sits inside the jail.

## Method

1. **Resolve to a canonical absolute path first.** Call `os.path.realpath`,
   Java `toRealPath`, or Node `fs.realpath` on the joined path. This
   collapses `..`, follows symlinks, and normalizes separators, giving you
   the actual target instead of the string the attacker wrote.
2. **Assert the resolved path is inside the base directory.** Compare with a
   prefix check on the canonical base, using a trailing separator so
   `/data/users` does not match `/data/users-evil`. In Python:
   `os.path.commonpath([base, resolved]) == base`. Reject anything that
   fails, do not try to repair it.
3. **Canonicalize the base directory once too.** Resolve the jail root
   itself at startup so the comparison is real-path against real-path. A
   base that still contains a symlink defeats the check you just wrote.
4. **Prefer an indirect handle over a raw name.** Where you can, map a
   client id to a server-held path through a lookup table or a UUID, so the
   user never supplies path text at all. No traversal is possible against a
   value that is never concatenated into a path.
5. **Decode before you validate, once.** Percent-decode and Unicode-
   normalize the input, then check, so `%2e%2e%2f` and overlong encodings do
   not slip past a filter that ran on the raw string. Decode exactly once to
   avoid double-decoding surprises.
6. **Validate archive entries on extraction.** Zip Slip is traversal by
   another name: check every entry's resolved destination against the target
   directory before writing, because an archive can carry `../` in member
   names.

## Checks

- Does a request for `..%2f..%2fetc%2fpasswd` resolve, fail the jail check,
  and return 403 rather than the file?
- Is the containment test a canonical prefix comparison, not a substring
  search for the literal `..`?
- Would a symlink planted inside the jail that points outside it be caught
  by the real-path resolution?
- Does archive extraction refuse a member whose resolved path leaves the
  destination directory?

## Boundaries

This confines filesystem paths. The same shape of bug in URLs handed to an
outbound fetcher is SSRF, and in database identifiers is injection: those
have their own skills. Some frameworks and static-file servers already
canonicalize and jail; when one does, rely on it and confirm with a
traversal probe rather than adding a second inconsistent check.
