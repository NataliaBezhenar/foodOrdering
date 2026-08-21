import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const command = input.tool_input?.command ?? "";

if (!/\bgit\s+commit\b/.test(command)) {
  process.exit(0);
}

const SENSITIVE_PATTERNS = [
  /(^|\/)\.env(\..*)?$/i,
  /\.pem$/i,
  /\.key$/i,
  /id_rsa/i,
  /credentials\.json$/i,
  /secrets?\.(json|ya?ml)$/i,
];

let staged;
try {
  staged = execSync("git diff --cached --name-only", {
    cwd: input.cwd,
    encoding: "utf8",
  })
    .split("\n")
    .filter(Boolean);
} catch {
  // Not in a git repo or no staged changes — let git itself report the error.
  process.exit(0);
}

const flagged = staged.filter((f) =>
  SENSITIVE_PATTERNS.some((re) => re.test(f))
);

if (flagged.length > 0) {
  process.stderr.write(
    `Refusing to let this commit proceed automatically: staged file(s) look like secrets:\n` +
      flagged.map((f) => `  - ${f}`).join("\n") +
      `\nIf this is intentional, ask the user to confirm and commit manually.`
  );
  process.exit(2);
}

process.exit(0);
