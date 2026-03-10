# Installation Guide

## Automatic Install (recommended)

Run one command from your project directory:

```bash
npx github:joajo13/agent-team-skills
```

The TUI installer will:
1. Detect which IDEs you have installed
2. Let you select which ones to set up
3. Copy the correct files automatically

### CLI flags for automation

```bash
npx github:joajo13/agent-team-skills --all                  # All detected IDEs, project mode
npx github:joajo13/agent-team-skills --claude --cursor      # Specific IDEs only
npx github:joajo13/agent-team-skills --global               # Global installation (Claude Code, OpenCode)
npx github:joajo13/agent-team-skills --dir ./my-project     # Install into a specific directory
npx github:joajo13/agent-team-skills --help                 # Show all options
```

---

## Manual Install

### Claude Code

**Option 1: As a plugin (global)**

```bash
claude plugin add github:joajo13/agent-team-skills
```

**Option 2: Copy to project**

```bash
cp -r agents/ your-project/.claude/agents/
cp -r commands/ your-project/.claude/commands/
cp -r skills/ your-project/.claude/skills/
```

**Verify**: Run `/plan`, `/implement`, `/verify`, or `/cycle` in Claude Code.

---

### Cursor

Copy the rules to your project:

```bash
cp -r .cursor/ your-project/.cursor/
```

The `agent-team.mdc` rule has `alwaysApply: true`, so it will automatically guide the agent through the plan/implement/verify workflow on complex tasks.

**How to use**: In Cursor's agent chat, describe your task. You can also explicitly ask: "Follow the plan-implement-verify cycle for this."

---

### VSCode with GitHub Copilot

**Requirements**: VSCode 1.99+ and GitHub Copilot extension.

Copy to your project:

```bash
cp -r .github/ your-project/.github/
```

**How to use**:
1. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
2. Click the mode picker at the top
3. Select **Planner**, **Implementer**, or **Verifier**

---

### OpenCode

Copy to your project:

```bash
cp AGENTS.md your-project/
cp opencode.json your-project/
cp -r agents/ your-project/agents/
```

**How to use**:
1. Start OpenCode: `opencode`
2. Select an agent from the picker (planner / implementer / verifier)

---

## All IDEs at once (manual)

```bash
git clone https://github.com/joajo13/agent-team-skills.git
cd agent-team-skills

# Claude Code
cp -r agents/ ../your-project/.claude/agents/
cp -r commands/ ../your-project/.claude/commands/
cp -r skills/ ../your-project/.claude/skills/

# Cursor
cp -r .cursor/ ../your-project/.cursor/

# VSCode Copilot
cp -r .github/ ../your-project/.github/

# OpenCode
cp AGENTS.md ../your-project/
cp opencode.json ../your-project/
cp -r agents/ ../your-project/agents/
```

All files coexist — each IDE reads only its own config format.
