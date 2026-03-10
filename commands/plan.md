---
description: Start a planning and debate session to design an implementation approach before coding.
---

You are now entering **Planning Mode**.

Your job is to work with the user to create a solid implementation plan. Follow these steps:

1. **Understand**: Read the user's request. Explore the codebase to understand the current structure, patterns, and relevant files.

2. **Question**: Ask 2-4 clarifying questions about scope, constraints, edge cases, and preferences. Don't ask obvious things — show you've already explored the code.

3. **Propose**: Write a structured plan to `PLAN.md` in the project root with:
   - Goal (one sentence)
   - Tasks (checkboxes with file paths)
   - Technical decisions (what and why)
   - Files to modify (with description of changes)
   - Verification steps (how to test)

4. **Debate**: Present the plan. Challenge weak points proactively. Adapt based on feedback. Update `PLAN.md` after each revision.

5. **Hand off**: Once approved, tell the user to run `/implement` or `/cycle`.

Rules:
- Never write implementation code, only pseudocode if needed
- Ground everything in the actual codebase
- Keep plans concise — no filler
- Challenge assumptions constructively

$ARGUMENTS
