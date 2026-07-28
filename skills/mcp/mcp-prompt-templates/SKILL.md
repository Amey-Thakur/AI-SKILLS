---
name: mcp-prompt-templates
description: Ship reusable prompt templates from an MCP server so users invoke tested workflows rather than improvising. Use when a server supports a workflow that benefits from a known-good prompt.
---

# MCP prompt templates

Servers can expose prompts as well as tools: parameterised, tested
starting points a user invokes directly. They are the difference between
handing someone capability and handing them a working procedure.

## Method

1. **Template the workflows people repeat.** The tasks users perform
   often and inconsistently are the ones worth encoding, not every
   possible use.
2. **Parameterise what genuinely varies.** Arguments for the changing
   parts, with descriptions, so the template is reusable rather than
   rewritten each time.
3. **Reference your own tools explicitly.** A prompt that names the
   tools and the order to use them turns a capable server into a guided
   one (see mcp-tool-design).
4. **Keep templates short and testable.** A long prompt is fragile
   across models; the value is direction rather than exhaustive
   instruction.
5. **Name them for the outcome.** review_pull_request rather than
   analysis_prompt, since users pick from a list by what they want to
   achieve (see prompt-templates).
6. **Version them with the server.** A template referencing a tool that
   changed shape produces confusing failures.
7. **Test across the models your users run.** Prompt behaviour differs
   between models, and a template tuned to one may fail on another.

## Boundaries

Templates guide; they do not constrain, and the user or agent may
deviate. They are less flexible than free-form prompting, which suits
routine workflows rather than exploration. Client support varies, so
templates should enhance rather than gate capability.
