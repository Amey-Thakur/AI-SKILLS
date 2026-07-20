---
name: python-dataclasses
description: Choose between dataclass, NamedTuple, and pydantic, and configure frozen, slots, and validation correctly. Use when modeling structured data in Python or reviewing class boilerplate.
---

# Python dataclasses

Pick the lightest structure that enforces what you need: dataclass for
behavior-bearing records, NamedTuple for immutable tuples with names,
pydantic only where data crosses a trust boundary.

## Method

1. **Default to `@dataclass(slots=True)`.** Slots cut per-instance memory
   roughly in half and catch attribute typos at assignment. Omit slots only
   when you need dynamic attributes, multiple inheritance with other
   slotted classes, or `functools.cached_property`.
2. **Freeze value objects.** `frozen=True` gives hashability (with `eq=True`)
   and safe use as dict keys and set members. Model identities (things with
   a lifecycle) as mutable; model values (money, coordinates, config) as
   frozen.
3. **Use NamedTuple when tuple-ness is the point.** Unpacking, positional
   returns from internal helpers, zero-cost immutability. Its weakness is
   accidental comparison and unpacking compatibility with any same-length
   tuple; do not use it for domain models.
4. **Reserve pydantic for untrusted input.** Parsing JSON from an API, env
   config, user forms: validation and coercion earn their runtime cost at
   the boundary. Inside your own code, plain dataclasses keep imports light
   and construction honest.
5. **Validate in `__post_init__`, not in callers.** Raise `ValueError` there
   for invariants ("port must be 1-65535"). For frozen classes set derived
   fields with `object.__setattr__(self, "field", value)`.
6. **Beware mutable defaults.** `field(default_factory=list)`, never
   `= []`. The class-level default is shared across instances; the factory
   is per instance.
7. **Control the generated API.** `kw_only=True` keeps wide constructors
   readable and lets you reorder fields without breaking callers;
   `repr=False` on secrets keeps them out of logs.

## Boundaries

- Dataclasses do not validate types at runtime; annotations are
  documentation plus static-checker input. Do not assume a `int` field
  rejects a string.
- Inheritance across dataclasses with defaults is field-order sensitive;
  prefer composition when the hierarchy needs more than one level.
