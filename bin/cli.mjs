#!/usr/bin/env node

import * as p from '@clack/prompts';
import pc from 'picocolors';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'node:fs';
import { resolve, join, dirname, basename } from 'node:path';
import { homedir, platform } from 'node:os';
import { fileURLToPath } from 'node:url';

// ─── Constants ───────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = resolve(__dirname, '..');
const HOME = homedir();
const IS_WIN = platform() === 'win32';
const CWD = process.cwd();

// ─── IDE Definitions ─────────────────────────────────────────────────────────

const IDES = [
  {
    id: 'claude',
    name: 'Claude Code',
    detectCmds: ['claude --version'],
    detectDirs: [join(HOME, '.claude')],
    supportsGlobal: true,
    projectFiles: {
      'agents/planner.md': '.claude/agents/planner.md',
      'agents/implementer.md': '.claude/agents/implementer.md',
      'agents/verifier.md': '.claude/agents/verifier.md',
      'commands/plan.md': '.claude/commands/plan.md',
      'commands/implement.md': '.claude/commands/implement.md',
      'commands/verify.md': '.claude/commands/verify.md',
      'commands/cycle.md': '.claude/commands/cycle.md',
      'skills/agent-orchestrator/SKILL.md': '.claude/skills/agent-orchestrator/SKILL.md',
    },
    globalInstall: async () => {
      try {
        execSync('claude plugin add github:joajo13/agent-team-skills', {
          stdio: 'pipe',
          timeout: 30000,
        });
        return { ok: true, method: 'claude plugin add' };
      } catch {
        // Fallback: copy full plugin structure
        const dest = join(HOME, '.claude', 'plugins', 'agent-team-skills');
        const files = {
          '.claude-plugin/plugin.json': '.claude-plugin/plugin.json',
          'agents/planner.md': 'agents/planner.md',
          'agents/implementer.md': 'agents/implementer.md',
          'agents/verifier.md': 'agents/verifier.md',
          'commands/plan.md': 'commands/plan.md',
          'commands/implement.md': 'commands/implement.md',
          'commands/verify.md': 'commands/verify.md',
          'commands/cycle.md': 'commands/cycle.md',
          'skills/agent-orchestrator/SKILL.md': 'skills/agent-orchestrator/SKILL.md',
        };
        return copyFilesMap(PKG_ROOT, dest, files);
      }
    },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    detectCmds: ['cursor --version'],
    detectDirs: [join(HOME, '.cursor')],
    supportsGlobal: false,
    projectFiles: {
      '.cursor/rules/agent-team.mdc': '.cursor/rules/agent-team.mdc',
    },
  },
  {
    id: 'vscode',
    name: 'VSCode + Copilot',
    detectCmds: ['code --version'],
    detectDirs: IS_WIN
      ? [join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code')]
      : ['/Applications/Visual Studio Code.app', '/usr/share/code'],
    supportsGlobal: false,
    projectFiles: {
      '.github/copilot-instructions.md': '.github/copilot-instructions.md',
      '.github/agents/planner.md': '.github/agents/planner.md',
      '.github/agents/implementer.md': '.github/agents/implementer.md',
      '.github/agents/verifier.md': '.github/agents/verifier.md',
    },
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    detectCmds: ['opencode --version'],
    detectDirs: [join(HOME, '.config', 'opencode')],
    supportsGlobal: true,
    projectFiles: {
      'AGENTS.md': 'AGENTS.md',
      'opencode.json': 'opencode.json',
      'agents/planner.md': 'agents/planner.md',
      'agents/implementer.md': 'agents/implementer.md',
      'agents/verifier.md': 'agents/verifier.md',
    },
    globalInstall: async () => {
      const dest = join(HOME, '.config', 'opencode');
      const files = {
        'agents/planner.md': 'agents/planner.md',
        'agents/implementer.md': 'agents/implementer.md',
        'agents/verifier.md': 'agents/verifier.md',
      };
      return copyFilesMap(PKG_ROOT, dest, files);
    },
  },
];

// ─── Utilities ───────────────────────────────────────────────────────────────

function cmdExists(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe', timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

function detectIDE(ide) {
  const byCmd = ide.detectCmds.some(cmdExists);
  const byDir = ide.detectDirs.some(existsSync);
  return { ...ide, detected: byCmd || byDir };
}

function copyFilesMap(srcBase, destBase, fileMap, overwriteAll = false) {
  const copied = [];
  const skipped = [];
  const errors = [];

  for (const [src, dest] of Object.entries(fileMap)) {
    const srcPath = join(srcBase, src);
    const destPath = join(destBase, dest);

    try {
      if (!existsSync(srcPath)) {
        errors.push({ file: src, error: 'Source not found' });
        continue;
      }

      const destDir = dirname(destPath);
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }

      if (existsSync(destPath) && !overwriteAll) {
        skipped.push(dest);
        continue;
      }

      copyFileSync(srcPath, destPath);
      copied.push(dest);
    } catch (err) {
      errors.push({ file: dest, error: err.message });
    }
  }

  return { ok: errors.length === 0, copied, skipped, errors };
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const flags = {
    help: args.includes('--help') || args.includes('-h'),
    all: args.includes('--all'),
    global: args.includes('--global'),
    claude: args.includes('--claude'),
    cursor: args.includes('--cursor'),
    vscode: args.includes('--vscode'),
    opencode: args.includes('--opencode'),
    dir: null,
  };

  const dirIdx = args.indexOf('--dir');
  if (dirIdx !== -1 && args[dirIdx + 1]) {
    flags.dir = resolve(args[dirIdx + 1]);
  }

  flags.nonInteractive = flags.all || flags.claude || flags.cursor || flags.vscode || flags.opencode;
  return flags;
}

function printHelp() {
  console.log(`
${pc.bold('agent-team-skills')} — Multi-agent team installer

${pc.dim('Usage:')}
  npx agent-team-skills              ${pc.dim('Interactive TUI')}
  npx agent-team-skills --all        ${pc.dim('Install for all detected IDEs')}
  npx agent-team-skills --claude     ${pc.dim('Install for Claude Code only')}
  npx agent-team-skills --cursor     ${pc.dim('Install for Cursor only')}
  npx agent-team-skills --vscode     ${pc.dim('Install for VSCode + Copilot only')}
  npx agent-team-skills --opencode   ${pc.dim('Install for OpenCode only')}

${pc.dim('Options:')}
  --global          ${pc.dim('Install globally (where supported)')}
  --dir <path>      ${pc.dim('Install into a specific project directory')}
  --all             ${pc.dim('Install for all detected IDEs')}
  -h, --help        ${pc.dim('Show this help message')}

${pc.dim('Examples:')}
  npx agent-team-skills --claude --cursor --dir ./my-project
  npx agent-team-skills --all --global
`);
}

// ─── Installation Logic ──────────────────────────────────────────────────────

async function installProject(ide, targetDir, overwriteAll) {
  return copyFilesMap(PKG_ROOT, targetDir, ide.projectFiles, overwriteAll);
}

async function installGlobal(ide) {
  if (ide.globalInstall) {
    return ide.globalInstall();
  }
  return { ok: false, copied: [], skipped: [], errors: [{ file: '-', error: 'Global install not supported' }] };
}

// ─── Main: Interactive TUI ───────────────────────────────────────────────────

async function runInteractive() {
  p.intro(`${pc.bgCyan(pc.black(' agent-team-skills '))}  ${pc.dim('plan → implement → verify → iterate')}`);

  // Detect IDEs
  const s = p.spinner();
  s.start('Detecting installed IDEs...');

  const detected = IDES.map(detectIDE);
  await new Promise((r) => setTimeout(r, 600)); // Brief pause for UX

  const detectedCount = detected.filter((d) => d.detected).length;
  s.stop(
    `Found ${pc.bold(detectedCount)} IDE${detectedCount !== 1 ? 's' : ''}:  ${detected
      .map((d) => (d.detected ? pc.green(`✓ ${d.name}`) : pc.dim(`✗ ${d.name}`)))
      .join('  ')}`
  );

  // Select IDEs
  const selectedIdes = await p.multiselect({
    message: 'Select IDEs to install for:',
    options: detected.map((d) => ({
      value: d.id,
      label: d.name,
      hint: d.detected ? 'detected' : 'not detected',
    })),
    initialValues: detected.filter((d) => d.detected).map((d) => d.id),
    required: true,
  });

  if (p.isCancel(selectedIdes)) {
    p.cancel('Installation cancelled.');
    process.exit(0);
  }

  // Determine which selected IDEs support global
  const selectedFull = detected.filter((d) => selectedIdes.includes(d.id));
  const hasGlobalSupport = selectedFull.some((d) => d.supportsGlobal);

  // Installation mode
  const modeOptions = [
    { value: 'project', label: `Current project`, hint: basename(CWD) },
  ];

  if (hasGlobalSupport) {
    modeOptions.push({ value: 'global', label: 'Global (user-wide)', hint: 'where supported' });
  }

  modeOptions.push({ value: 'custom', label: 'Custom path...' });

  const mode = await p.select({
    message: 'Installation mode:',
    options: modeOptions,
  });

  if (p.isCancel(mode)) {
    p.cancel('Installation cancelled.');
    process.exit(0);
  }

  let targetDir = CWD;

  if (mode === 'custom') {
    const customPath = await p.text({
      message: 'Enter the project path:',
      placeholder: './my-project',
      validate: (val) => {
        if (!val) return 'Path is required';
        const resolved = resolve(val);
        if (!existsSync(resolved)) return `Directory not found: ${resolved}`;
      },
    });

    if (p.isCancel(customPath)) {
      p.cancel('Installation cancelled.');
      process.exit(0);
    }

    targetDir = resolve(customPath);
  }

  // Check for existing files and ask about overwrite
  let overwriteAll = false;
  if (mode !== 'global') {
    const existingFiles = [];
    for (const ide of selectedFull) {
      for (const destRel of Object.values(ide.projectFiles)) {
        const destPath = join(targetDir, destRel);
        if (existsSync(destPath)) {
          existingFiles.push(destRel);
        }
      }
    }

    if (existingFiles.length > 0) {
      const overwrite = await p.confirm({
        message: `${existingFiles.length} file${existingFiles.length > 1 ? 's' : ''} already exist${existingFiles.length === 1 ? 's' : ''}. Overwrite?`,
        initialValue: false,
      });

      if (p.isCancel(overwrite)) {
        p.cancel('Installation cancelled.');
        process.exit(0);
      }

      overwriteAll = overwrite;
    }
  }

  // Install
  const s2 = p.spinner();
  const results = [];

  for (const ide of selectedFull) {
    s2.start(`Installing for ${pc.bold(ide.name)}...`);

    let result;
    if (mode === 'global' && ide.supportsGlobal) {
      result = await installGlobal(ide);
    } else {
      result = await installProject(ide, targetDir, overwriteAll);
    }

    results.push({ ide, result });

    const copiedCount = result.copied?.length || 0;
    const skippedCount = result.skipped?.length || 0;
    const errorCount = result.errors?.length || 0;

    let status = '';
    if (copiedCount > 0) status += pc.green(`${copiedCount} copied`);
    if (skippedCount > 0) status += (status ? ', ' : '') + pc.yellow(`${skippedCount} skipped`);
    if (errorCount > 0) status += (status ? ', ' : '') + pc.red(`${errorCount} errors`);
    if (result.method) status = pc.green(result.method);

    s2.stop(`${pc.bold(ide.name)}  ${pc.dim('—')}  ${status}`);
  }

  // Summary
  const totalCopied = results.reduce((sum, r) => sum + (r.result.copied?.length || 0), 0);
  const totalErrors = results.reduce((sum, r) => sum + (r.result.errors?.length || 0), 0);

  if (totalErrors > 0) {
    p.log.warn('Some files had errors:');
    for (const { ide, result } of results) {
      for (const err of result.errors || []) {
        p.log.error(`  ${ide.name}: ${err.file} — ${err.error}`);
      }
    }
  }

  const nextSteps = [
    `Run ${pc.cyan('/plan')} to start a planning session`,
    `Run ${pc.cyan('/cycle')} for the full plan → implement → verify loop`,
    `Run ${pc.cyan('/implement')} or ${pc.cyan('/verify')} individually`,
  ];

  p.note(nextSteps.join('\n'), 'Next steps');

  p.outro(
    totalErrors === 0
      ? `${pc.green('✓')} Installed ${pc.bold(totalCopied)} files for ${pc.bold(selectedFull.length)} IDE${selectedFull.length > 1 ? 's' : ''}`
      : `${pc.yellow('⚠')} Completed with ${totalErrors} error${totalErrors > 1 ? 's' : ''}`
  );
}

// ─── Main: Non-Interactive ───────────────────────────────────────────────────

async function runNonInteractive(flags) {
  const detected = IDES.map(detectIDE);
  const targetDir = flags.dir || CWD;

  let selectedIds;
  if (flags.all) {
    selectedIds = detected.filter((d) => d.detected).map((d) => d.id);
  } else {
    selectedIds = [];
    if (flags.claude) selectedIds.push('claude');
    if (flags.cursor) selectedIds.push('cursor');
    if (flags.vscode) selectedIds.push('vscode');
    if (flags.opencode) selectedIds.push('opencode');
  }

  if (selectedIds.length === 0) {
    console.log(pc.yellow('No IDEs selected or detected. Use --help for usage.'));
    process.exit(1);
  }

  const selectedFull = detected.filter((d) => selectedIds.includes(d.id));

  console.log(`\n${pc.bold('agent-team-skills')} — installing for: ${selectedFull.map((d) => d.name).join(', ')}\n`);

  let hasErrors = false;

  for (const ide of selectedFull) {
    let result;
    if (flags.global && ide.supportsGlobal) {
      result = await installGlobal(ide);
    } else {
      result = await installProject(ide, targetDir, true);
    }

    const copiedCount = result.copied?.length || 0;
    const errorCount = result.errors?.length || 0;

    if (errorCount > 0) {
      hasErrors = true;
      console.log(`  ${pc.red('✗')} ${ide.name} — ${errorCount} errors`);
      for (const err of result.errors) {
        console.log(`    ${pc.dim(err.file)}: ${err.error}`);
      }
    } else {
      console.log(`  ${pc.green('✓')} ${ide.name} — ${copiedCount} files installed`);
    }
  }

  console.log(hasErrors ? `\n${pc.yellow('Completed with errors.')}\n` : `\n${pc.green('Done!')} Run /plan, /implement, /verify, or /cycle to start.\n`);
  process.exit(hasErrors ? 1 : 0);
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

const flags = parseArgs(process.argv);

if (flags.help) {
  printHelp();
  process.exit(0);
}

if (flags.nonInteractive) {
  runNonInteractive(flags);
} else {
  runInteractive().catch((err) => {
    p.cancel(`Error: ${err.message}`);
    process.exit(1);
  });
}
