# Agent Team Workflow

This project uses a structured multi-agent workflow: **plan → implement → verify → iterate**.

## How It Works

For non-trivial tasks (3+ files, ambiguous requirements, architectural changes):

1. **Plan**: Explore the codebase, ask clarifying questions, create a structured `PLAN.md` with tasks, technical decisions, files to modify, and verification steps. Debate with the user until approved.

2. **Implement**: Read the approved `PLAN.md`, explore all relevant files first, implement each task matching existing style, self-check with available linters/tests, report changes.

3. **Verify**: Review implementation against `PLAN.md`, check completeness/correctness/quality, run automated checks (tests, build, lint), produce PASS or FAIL verdict.

4. **Iterate**: If verification fails, fix only the identified issues, re-verify. Max 3 iterations before escalating to user.

## PLAN.md Format

```markdown
# Plan: [Task Name]

## Goal
One-sentence summary.

## Tasks
- [ ] Task 1 (files: `path/to/file`)
- [ ] Task 2 (files: `path/to/other`)

## Technical Decisions
- Decision: reasoning

## Files to Modify
- `path/to/file` — what changes

## Verification
- [ ] How to test
```

## Principles
- Read files before proposing changes
- Match existing patterns and conventions
- Only change what the plan specifies
- Be specific — file paths and line numbers
- Keep it simple
