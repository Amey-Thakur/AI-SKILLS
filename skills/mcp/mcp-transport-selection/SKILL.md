---
name: mcp-transport-selection
description: Choose between local stdio and remote HTTP transports for an MCP server based on trust, deployment, and who runs it. Use when deciding how a server will be hosted and reached.
---

# MCP transport selection

Transport is a deployment and trust decision more than a technical one.
A local server over stdio runs as the user with their credentials; a
remote server over HTTP is a shared service needing authentication,
authorisation, and multi-tenancy.

## Method

1. **Use stdio for local, single-user capability.** Filesystem access,
   local tooling, and anything using the user's own machine credentials
   belongs local, where the trust boundary is simple.
2. **Use HTTP for shared or hosted capability.** Anything centrally
   operated, serving multiple users, or holding its own credentials
   needs the remote model with real authentication (see
   mcp-authentication).
3. **Recognise what stdio implies.** The server inherits the user's
   permissions and environment, so a compromised local server is a
   compromised user session.
4. **Handle multi-tenancy explicitly when remote.** One process serving
   many users must isolate their data and credentials rigorously, which
   stdio never has to consider.
5. **Design for the client's lifecycle.** Local servers start and stop
   with the client; remote servers persist and need connection
   resumption and versioning.
6. **Keep the tool surface identical across transports.** If a server
   supports both, the capability should not differ, or users learn two
   behaviours.
7. **Log and monitor remote servers as production services.** A hosted
   MCP server is infrastructure with availability and security
   obligations, unlike a local process.

## Boundaries

Transport choice does not change tool semantics, only trust and
operations. Client support for transports varies, so the audience
constrains the choice. Remote servers add latency to every call, which
matters for tools invoked in a loop.
