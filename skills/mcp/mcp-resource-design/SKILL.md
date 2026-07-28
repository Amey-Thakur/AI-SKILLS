---
name: mcp-resource-design
description: Expose data through MCP resources with stable URIs, useful listings, and sizes that fit a context window. Use when an agent needs to read data rather than perform an action.
---

# MCP resource design

Resources are for reading and tools are for doing. Modelling readable
data as a tool call wastes the distinction and usually returns too much,
while good resource design lets a client fetch precisely what it needs
and cache it.

## Method

1. **Use resources for state, tools for actions.** If the operation has
   no side effect and returns data, it is a resource. This distinction
   is what lets clients handle each appropriately.
2. **Design URIs to be stable and meaningful.** A resource URI is
   referenced and cached, so it should identify the thing rather than
   encode a query that changes.
3. **Make listings cheap and complete.** Clients discover through
   listing, so it must be fast and paginated rather than returning
   everything.
4. **Size responses for a context window.** A resource that returns a
   large document unpaged is unusable in practice, so offer ranges or
   sections (see mcp-context-budgeting).
5. **Declare the MIME type honestly.** Clients render and chunk based on
   it, and mislabelled content is handled wrongly downstream.
6. **Support subscription only where change matters.** Live updates are
   valuable for changing state and unnecessary overhead for static
   content.
7. **Apply access control per resource.** Listing must not reveal
   resources the caller may not read, since the listing itself leaks
   structure (see mcp-security-boundaries).

## Boundaries

Resources are read-only by contract; anything with an effect belongs in
a tool. Not every client supports resources fully, so critical
capability may need a tool equivalent. Large binary content is usually
better referenced by URL than embedded.
