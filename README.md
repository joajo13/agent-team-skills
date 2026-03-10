# Agent Team Skills

A multi-agent team that orchestrates **plan → implement → verify** cycles for structured software development. Works across Claude Code, Cursor, VSCode with Copilot, and OpenCode.

## How It Works

```
User Request → Plan & Debate → Implement → Verify → Done
                    ↑                          |
                    └──── Fix Issues ←─────────┘
```

**Three agents, one workflow:**

| Agent | Role |
|-------|------|
| **Planner** | Explores codebase, debates requirements with you, creates structured `PLAN.md` |
| **Implementer** | Executes the approved plan task by task, self-checks |
| **Verifier** | Reviews against plan, runs tests/lint/build, passes or sends back |

## Quick Start

### Claude Code

```bash
# Install as plugin
claude plugin install /path/to/agent-team-skills

# Or clone and install
git clone https://github.com/YOUR_USER/agent-team-skills.git
claude plugin install ./agent-team-skills
```

Then use the commands:
```
/plan         → Start planning session
/implement    → Execute the plan
/verify       → Review implementation
/cycle        → Full automated loop
```

### Cursor

Copy the `.cursor/` directory to your project root. The rules will auto-apply and guide the agent through the plan/implement/verify workflow.

```bash
cp -r agent-team-skills/.cursor/ your-project/.cursor/
```

### VSCode with GitHub Copilot

Copy the `.github/` directory to your project root:

```bash
cp -r agent-team-skills/.github/ your-project/.github/
```

Custom agents (Planner, Implementer, Verifier) will appear in the Copilot chat mode picker.

### OpenCode

Copy `AGENTS.md` and `opencode.json` to your project root:

```bash
cp agent-team-skills/AGENTS.md your-project/
cp agent-team-skills/opencode.json your-project/
```

Agents will appear in the OpenCode agent selector.

## Usage

### Full Cycle (recommended)

Use `/cycle` (Claude Code) or ask "run the full plan-implement-verify cycle" in any IDE:

1. **Planning**: The planner asks clarifying questions, explores your code, and creates `PLAN.md`
2. **You approve** the plan (or debate/refine it)
3. **Implementation**: Each task is executed in order
4. **Verification**: Automated review with tests/lint/build
5. **Iteration**: If issues are found, fixes are applied and re-verified (max 3 cycles)

### Individual Commands

- `/plan` — When you want to discuss and plan without implementing yet
- `/implement` — When you already have an approved `PLAN.md`
- `/verify` — When you want to review what was built

## PLAN.md Format

The `PLAN.md` file is the shared contract between all agents:

```markdown
# Plan: [Task Name]

## Goal
One-sentence summary of what and why.

## Tasks
- [ ] Task 1 (files: `src/auth.ts`)
- [ ] Task 2 (files: `src/api/routes.ts`)

## Technical Decisions
- Chose JWT over sessions because...

## Files to Modify
- `src/auth.ts` — add token validation
- `src/api/routes.ts` — new endpoint

## Verification
- [ ] Unit tests pass
- [ ] Login flow works end-to-end
```

## Project Structure

```
agent-team-skills/
├── .claude-plugin/plugin.json    ← Claude Code plugin manifest
├── agents/
│   ├── planner.md                ← Plan & debate agent
│   ├── implementer.md            ← Implementation agent
│   └── verifier.md               ← QA/verification agent
├── commands/
│   ├── plan.md                   ← /plan command
│   ├── implement.md              ← /implement command
│   ├── verify.md                 ← /verify command
│   └── cycle.md                  ← /cycle full loop
├── skills/
│   └── agent-orchestrator/
│       └── SKILL.md              ← Workflow context skill
├── .cursor/rules/
│   └── agent-team.mdc            ← Cursor rules
├── .github/
│   ├── copilot-instructions.md   ← VSCode Copilot instructions
│   └── agents/                   ← Copilot custom agents
├── AGENTS.md                     ← OpenCode agent guide
├── opencode.json                 ← OpenCode config
├── README.md
└── INSTALL.md
```

## License

MIT
