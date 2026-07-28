---
name: recursive-queries
description: Walk hierarchies and graphs with recursive CTEs, with a termination condition and cycle protection so the query ends. Use when querying trees such as org charts, categories, threads, or dependency graphs.
---

# Recursive queries

A recursive CTE repeats a step until it produces nothing new, which is
how you follow a parent chain or expand a dependency graph in one query.
The two failure modes are a recursion that never terminates and one that
revisits the same node forever.

## Method

1. **Write the anchor and the step separately.** The anchor selects the
   starting rows and the recursive part joins the CTE back to the table.
   Getting the anchor wrong produces an empty or enormous result
   immediately.
2. **Track depth and cap it.** Carrying a level column lets you both
   report depth and stop at a maximum, which protects against
   unexpectedly deep or malformed data.
3. **Detect cycles explicitly.** Accumulate the visited path and exclude
   nodes already in it. Real hierarchies contain accidental cycles more
   often than schemas admit.
4. **Return the path when it is the point.** Building a breadcrumb of
   ancestors as you descend is usually the reason for the query and
   costs almost nothing to carry.
5. **Choose direction by the question.** Descendants start from a node
   and follow children; ancestors start from a node and follow parents.
   The shape is the same and the join direction reverses.
6. **Consider a materialised path or closure table for hot reads.**
   Recursion is elegant and not always fast, and denormalising the
   hierarchy is a legitimate trade when reads dominate (see
   database-normalization).

## Boundaries

- Recursive CTEs suit modest hierarchies; large graph traversal belongs
  in a graph database or an application algorithm.
- Performance degrades quickly with breadth, since each level joins
  against everything found so far.
- Syntax and the RECURSIVE keyword requirement differ between engines.
