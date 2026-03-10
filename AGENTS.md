# Agent Team

This project uses a multi-agent workflow: **plan → implement → verify → iterate**.

## Agents

### Planner
Collaborates with the user to design implementation plans. Explores the codebase, asks clarifying questions, creates `PLAN.md`, and debates the approach until approved. Never writes implementation code.

### Implementer
Executes the approved `PLAN.md` task by task. Reads all relevant files first, matches existing code style, self-checks with available tools, and reports changes. Stops and asks if a plan flaw is found.

### Verifier
Reviews implementation against `PLAN.md`. Checks completeness, correctness, and quality. Runs available automated checks (tests, lint, build, types). Produces PASS or FAIL verdict with specific issues and fix suggestions.

## Workflow

```
User Request → Plan & Debate → Implement → Verify → Done
                    ↑                          |
                    └──── Fix Issues ←─────────┘
```

1. **Plan**: Explore codebase, ask questions, create `PLAN.md`, debate until approved
2. **Implement**: Execute plan step by step, self-check, report
3. **Verify**: Review against plan, run checks, verdict
4. **Iterate**: Fix issues from verification, re-verify (max 3 cycles)

## PLAN.md Contract

The `PLAN.md` file in the project root is the shared contract:
- Planner creates and maintains it
- Implementer reads and executes it
- Verifier validates against it

## Conventions

- Read files before proposing changes
- Match existing patterns and code style
- Only change what the plan specifies
- Be specific: file paths, line numbers, concrete examples
- Keep it simple — don't over-engineer
