---
name: autocomplete-design
description: Suggest queries as the user types, fast enough to feel instant and relevant enough to be worth reading. Use when adding a search box that should guide rather than merely accept input.
---

# Autocomplete design

Autocomplete is judged in tens of milliseconds. It fails by being slow,
by suggesting things that lead nowhere, and by moving under the user's
finger at the moment they commit. Speed is a correctness property here,
not a performance nicety.

## Method

1. **Set a latency budget and design to it.** Above roughly a hundred
   milliseconds the suggestions feel laggy and people stop reading them,
   which usually means a dedicated index rather than the main one.
2. **Suggest what leads to results.** Sourcing suggestions from
   successful past queries beats prefix-matching the corpus, because it
   guarantees the destination is not empty (see search-analytics).
3. **Debounce input and cancel in-flight requests.** Otherwise every
   keystroke races and an earlier response can overwrite a later one.
4. **Never reorder under the cursor.** Suggestions that shift as a new
   response lands cause mis-clicks; hold position or replace the list
   wholesale between keystrokes.
5. **Highlight the matched portion.** It shows why each suggestion
   appeared and makes the list scannable without reading every item.
6. **Make it fully keyboard operable and announced.** Arrow navigation,
   escape to dismiss, enter to select, with the correct combobox roles
   (see keyboard-navigation, aria-usage).
7. **Handle the empty and error states quietly.** No suggestions should
   look like nothing happened, not like a failure.

## Boundaries

- Autocomplete guides queries; it does not replace the results page and
  should not become a second one.
- Personal query history in suggestions is personal data and must be
  scoped to the user (see data-minimization).
- Suggestion quality depends on traffic, so a new product needs a
  curated or corpus-derived list until logs accumulate.
