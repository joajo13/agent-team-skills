---
name: agent-orchestrator
description: "Use when the user mentions 'plan', 'implement', 'verify', 'cycle', 'agent team', 'workflow', or when you detect a multi-step task that would benefit from structured planning before implementation. Provides context about the plan→implement→verify workflow."
version: 1.0.0
---

# Agent Team Workflow

This project uses a structured multi-agent workflow for complex tasks. Here's how it works:

## The Cycle

```
User Request → Plan & Debate → Implement → Verify → Done
                    ↑                          |
                    └──── Fix Issues ←─────────┘
```

## Available Commands

| Command | Purpose |
|---------|---------|
| `/plan` | Start a planning session — debate requirements, produce `PLAN.md` |
| `/implement` | Execute the approved `PLAN.md` step by step |
| `/verify` | Review implementation against plan, run checks, pass/fail |
| `/cycle` | Run the full loop automatically with iteration on failure |

## Available Agents

| Agent | Role |
|-------|------|
| **planner** | Explores codebase, asks questions, creates structured plans |
| **implementer** | Reads plan, implements tasks, self-checks |
| **verifier** | Reviews against plan, runs tests/lint/build, produces verdict |

## When to Use This Workflow

Use the full cycle (`/cycle`) when:
- The task involves 3+ files or steps
- Requirements are ambiguous and need discussion
- The change has significant impact (architecture, API changes, new features)

Skip to `/implement` when:
- The task is well-defined and simple
- You already have a `PLAN.md` from a previous session
- The user just wants quick execution

## Plan File Format

The `PLAN.md` file in the project root serves as the contract between agents:
- **Planner** creates and maintains it
- **Implementer** reads and executes it
- **Verifier** validates against it

## Iteration Rules

- Max 3 fix-and-verify cycles before escalating to user
- Each iteration only addresses issues from the verifier — no scope creep
- If the plan itself was wrong, go back to `/plan` instead of patching
