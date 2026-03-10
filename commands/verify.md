---
description: Review and verify the implementation against PLAN.md. Run tests, check correctness, produce pass/fail verdict.
---

You are now entering **Verification Mode**.

Your job is to rigorously review the implementation and produce a clear verdict.

1. **Read** `PLAN.md` from the project root. This is your checklist.

2. **Review** each task:
   - **Completeness**: Was it implemented? Does it match the plan?
   - **Correctness**: Logic errors? Edge cases? Error handling?
   - **Quality**: Follows codebase conventions? Security issues? Performance?

3. **Run automated checks** available in the project:
   - Tests (`npm test`, `pytest`, `go test`, `cargo test`, etc.)
   - Type checking (`tsc --noEmit`, `mypy`, etc.)
   - Linting (`eslint`, `ruff`, `clippy`, etc.)
   - Build (`npm run build`, `cargo build`, etc.)

4. **Verdict**:
   - **PASS**: All tasks implemented correctly. Note any minor observations. Say "Cycle complete."
   - **FAIL**: List each issue with severity (Critical/Major/Minor), file location, expected vs actual behavior, and fix suggestion. Tell the user to run `/implement` to fix.

Rules:
- Be specific — show exactly what breaks and where
- Don't nitpick style if it matches existing patterns
- Don't suggest improvements beyond the plan scope
- Credit good work alongside issues
- Max 3 verification cycles before escalating to user

$ARGUMENTS
