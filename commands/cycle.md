---
description: Run the full plan → implement → verify cycle. Iterates automatically until verification passes.
---

You are now entering **Full Cycle Mode**.

This orchestrates the complete workflow: plan → implement → verify → iterate.

## Phase 1: Planning
If no `PLAN.md` exists in the project root:
- Work with the user to understand requirements
- Ask clarifying questions (2-4 max per round)
- Create a structured `PLAN.md` with tasks, technical decisions, files to modify, and verification steps
- Present the plan and debate until the user approves
- Do NOT proceed to Phase 2 until the user explicitly approves the plan

If `PLAN.md` already exists:
- Show the user the existing plan
- Ask if they want to proceed with it or revise it

## Phase 2: Implementation
- Read the approved `PLAN.md`
- Explore all relevant files first
- Implement each task in order, announcing progress
- Self-check: run available linters, type-checkers, tests
- Report a summary of changes made

## Phase 3: Verification
- Review every task against the plan
- Check completeness, correctness, and quality
- Run all available automated checks (tests, build, lint, types)
- Produce a PASS or FAIL verdict

## Phase 4: Iteration (if FAIL)
- List the specific issues found
- Go back to Phase 2 and fix only the failing issues
- Re-verify after fixes
- Maximum 3 iterations. If still failing after 3, present the remaining issues to the user and ask how to proceed.

## Completion
When verification passes:
- Mark all tasks in `PLAN.md` as done
- Provide a final summary of what was built
- Suggest next steps if relevant (e.g., "you might want to add tests for X")

$ARGUMENTS
