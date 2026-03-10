# Installation Guide

## Claude Code

### Option 1: Install as Plugin (recommended)

```bash
# From local directory
claude plugin install /path/to/agent-team-skills

# From GitHub
claude plugin install https://github.com/YOUR_USER/agent-team-skills
```

This makes the agents, commands, and skills available globally in Claude Code.

### Option 2: Copy to Project

Copy the relevant directories to your project's `.claude/` folder:

```bash
cp -r agent-team-skills/agents/ your-project/.claude/agents/
cp -r agent-team-skills/commands/ your-project/.claude/commands/
cp -r agent-team-skills/skills/ your-project/.claude/skills/
```

### Verify Installation

```bash
# In Claude Code, test the commands:
/plan
/implement
/verify
/cycle
```

---

## Cursor

Copy the `.cursor/rules/` directory to your project:

```bash
cp -r agent-team-skills/.cursor/ your-project/.cursor/
```

The `agent-team.mdc` rule has `alwaysApply: true`, so it will automatically guide the agent through the plan/implement/verify workflow on complex tasks.

### How to Use

In Cursor's agent chat, describe your task. The rules will guide the agent to:
1. Plan and create `PLAN.md` before coding
2. Implement following the plan
3. Verify the result

You can also explicitly ask: "Follow the plan-implement-verify cycle for this."

---

## VSCode with GitHub Copilot

### Requirements
- VSCode 1.99+ (for custom agents support)
- GitHub Copilot extension

### Setup

Copy the `.github/` directory to your project root:

```bash
cp -r agent-team-skills/.github/ your-project/.github/
```

### How to Use

1. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Click the mode picker at the top of the chat
3. Select **Planner**, **Implementer**, or **Verifier**
4. Describe your task

The `copilot-instructions.md` provides base context to all agents about the workflow.

---

## OpenCode

Copy the config files to your project root:

```bash
cp agent-team-skills/AGENTS.md your-project/
cp agent-team-skills/opencode.json your-project/
cp -r agent-team-skills/agents/ your-project/agents/
```

### How to Use

1. Start OpenCode: `opencode`
2. Select an agent from the agent picker:
   - **planner** — for planning sessions
   - **implementer** — for execution
   - **verifier** — for review
3. Describe your task

The `AGENTS.md` file provides universal context, while `opencode.json` configures each agent's tools and temperature.

---

## Universal Setup (All IDEs)

For maximum compatibility, copy everything:

```bash
# Clone the repo
git clone https://github.com/YOUR_USER/agent-team-skills.git

# Copy all IDE configs to your project
cp -r agent-team-skills/.cursor/ your-project/.cursor/
cp -r agent-team-skills/.github/ your-project/.github/
cp agent-team-skills/AGENTS.md your-project/
cp agent-team-skills/opencode.json your-project/
cp -r agent-team-skills/agents/ your-project/agents/
```

The files are designed to coexist — each IDE reads only its own config format.
