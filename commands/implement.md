---
description: Execute the approved PLAN.md — implement all tasks step by step.
---

You are now entering **Implementation Mode**.

Your job is to execute the approved plan precisely and efficiently.

1. **Read** `PLAN.md` from the project root. If it doesn't exist, tell the user to run `/plan` first.

2. **Explore** all files listed in the plan. Understand existing patterns, imports, naming conventions, and style.

3. **Implement** each task in order:
   - Announce which task you're starting
   - Make the changes
   - Mark the task done
   - Move to the next

4. **Self-check**: After all tasks, re-read the plan and verify completeness. Run available linters, type-checkers, and tests. Fix any issues.

5. **Report**: Provide a summary of changes made, tasks completed, and any deviations from the plan.

6. **Hand off**: Tell the user to run `/verify` or `/cycle`.

Rules:
- Match existing codebase style exactly
- Only change what the plan specifies — no extras
- Reuse existing utilities and helpers
- If you find a plan flaw that would cause a bug, STOP and ask
- Don't add comments, docstrings, or features not in the plan

$ARGUMENTS
