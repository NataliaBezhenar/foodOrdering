import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8"));
const filePath = (input.tool_input?.file_path ?? "").replace(/\\/g, "/");

const isProjectTsFile =
  /\.tsx?$/.test(filePath) &&
  (filePath.includes("/src/") || filePath.startsWith("src/"));
if (!isProjectTsFile) {
  process.exit(0);
}

try {
  execSync("npx tsc -b", { cwd: input.cwd, encoding: "utf8", stdio: "pipe" });
  process.exit(0);
} catch (err) {
  const output = (err.stdout || "") + (err.stderr || "");
  process.stderr.write(
    `tsc -b reported errors after editing ${filePath}:\n${output}`
  );
  process.exit(2);
}
