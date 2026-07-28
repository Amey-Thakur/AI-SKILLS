---
name: open-source-licensing
description: Choose a licence, comply with the licences you depend on, and keep attribution correct as a project grows. Use when publishing a project, adding a dependency, or answering whether a licence permits your use.
---

# Open source licensing

A licence is the terms under which others may use your work, and the
terms under which you use theirs. Most projects get this wrong in one of
two ways: publishing with no licence at all, which grants nothing, or
pulling in a dependency whose terms conflict with how they ship.

## Method

1. **Publish with an explicit licence or nothing is granted.** Code
   without a licence is under exclusive copyright by default, so
   omitting one is the most restrictive choice rather than the most
   permissive.
2. **Pick by what you want downstream.** Permissive licences allow use
   in closed products; copyleft requires derivative works to carry the
   same terms; weak copyleft sits between and applies at the library
   boundary. Choose by the outcome you want, not by popularity.
3. **Check dependency compatibility before adding, not at release.**
   Some combinations cannot be distributed together, and discovering
   that after building on a library is the expensive path.
4. **Preserve attribution and notices.** Most licences require the
   original notice to travel with the code, which means a notices file
   in your distribution rather than a link (see
   dependency-management).
5. **Know how distribution changes obligations.** Some terms trigger on
   distributing binaries and some on providing a network service, so
   how you ship decides what you owe.
6. **Record contributor terms up front.** Whether contributions are
   under the project licence by default or need a signed agreement is
   far easier to settle before the first outside contribution.

## Boundaries

- Licence interpretation is a legal question and this is not legal
  advice; anything commercially significant needs counsel.
- Automated licence scanners identify declared licences and miss
  vendored code and mixed files.
- Changing a project's licence later requires permission from
  contributors who hold copyright, which is often impractical.
