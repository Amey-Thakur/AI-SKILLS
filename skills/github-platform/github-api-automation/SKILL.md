---
name: github-api-automation
description: Script repository operations reliably, respecting rate limits, pagination, and permissions. Use when managing repositories at scale or building tooling around the platform.
---

# GitHub API automation

Scripting the platform is straightforward until volume, where rate
limits, pagination, and eventual consistency all appear at once. Writing
for those from the start avoids scripts that work in testing and fail on
the real organisation.

## Method

1. **Paginate everything.** The first page of results is not the result
   set, and code that assumes it silently processes a fraction of the
   data.
2. **Handle rate limits properly.** Read the remaining quota and reset
   headers and back off before exhaustion rather than reacting to
   errors (see rate-limiting).
3. **Prefer the graph API for related data.** Fetching linked entities
   in one query avoids the request explosion that per-item calls produce.
4. **Use the narrowest credential.** A token scoped to the repositories
   and permissions needed, since automation tokens leak like any other
   (see secrets-management).
5. **Make operations idempotent.** Scripts get rerun after partial
   failure, and creating duplicates is the usual result of not planning
   for it (see idempotency).
6. **Expect eventual consistency.** A resource created may not appear
   immediately in a listing, so polling with a timeout beats assuming
   read-after-write.
7. **Log what was changed.** Bulk operations across repositories need an
   audit trail and, ideally, a dry-run mode before they touch anything.

## Boundaries

API capability and limits change, so scripts need maintenance. Bulk
changes across many repositories are hard to reverse, making dry runs
essential. Automation acting as a user inherits that user's permissions
and appears as them in the audit log.
