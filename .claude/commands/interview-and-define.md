# /interview-and-define

Interview the user relentlessly about every aspect of their plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one by one.

Ask questions **one at a time**, waiting for a response before continuing. For each question, provide your recommended answer.

If a question can be answered by exploring the codebase, explore the codebase instead of asking.

---

## Step 1: Load context

Before starting, read:
- `CONTEXT.md` (if it exists) — domain glossary
- `sessions/DECISIONS.md` — existing decisions to avoid re-litigating
- `sessions/ARCHITECTURE-STATE.md` — current architecture shape
- Relevant specs in `specs/` based on the topic at hand

---

## Step 2: Grill the plan

For each question:

### Challenge against the glossary
When the user uses a term that conflicts with `CONTEXT.md`, call it out immediately.
"Your glossary defines 'X' as Y, but you seem to mean Z — which is it?"

### Sharpen fuzzy language
When the user uses vague or overloaded terms, propose a precise canonical term.
"You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Stress-test with concrete scenarios
When domain relationships are discussed, invent edge-case scenarios that force precision about concept boundaries.

### Cross-reference with code
When the user states how something works, check whether the code agrees. Surface contradictions:
"Your code does X, but you just said Y — which is right?"

---

## Step 3: Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` immediately. Do not batch these up.

If `CONTEXT.md` does not exist, create it at the repo root when the first term is resolved.

### CONTEXT.md format

```md
# {Context Name}

{One or two sentences describing what this context is and why it exists.}

## Language

**{Term}**:
{One or two sentence definition of what it IS, not what it does.}
_Avoid_: {synonym1}, {synonym2}
```

Rules:
- One or two sentences max per definition
- Define what it IS, not what it does
- List avoided synonyms explicitly
- Only include terms specific to this project's domain — not general programming concepts
- Group under subheadings when natural clusters emerge
- Keep it totally devoid of implementation details — it is a glossary, not a spec

---

## Step 4: Offer an architectural decision sparingly

Only offer to record an architectural decision when **all three** are true:
1. **Hard to reverse** — changing it later has meaningful cost
2. **Surprising without context** — a future reader would wonder "why did they do it this way?"
3. **Result of a real trade-off** — genuine alternatives existed and one was chosen for specific reasons

If any of the three is missing, skip it.

When an architectural decision qualifies, append it to the `## Architectural Decisions` section in `sessions/DECISIONS.md` using this format:

```
# [Short title]

[1-3 sentences: context, what was decided, and why.]

Status: accepted
Date: YYYY-MM-DD
Considered alternatives: [only if rejection is non-obvious]
Consequences: [only if non-obvious downstream effects]
```

---

## Step 5: Suggest next step

When the grill is complete, summarize:
- Terms resolved and added to `CONTEXT.md`
- Architectural decisions recorded
- Open questions that remain

Then ask: "Ready to formalize this as a CR with `/create-cr`?"
