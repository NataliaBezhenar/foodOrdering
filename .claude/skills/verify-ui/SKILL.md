---
name: verify-ui
description: Launch the Vite dev server and drive the app in a real headless browser to visually verify a UI change. Use whenever a change touches rendering/behavior and should be confirmed beyond type-checking, e.g. after editing components under src/components.
---

# Verify UI changes in a real browser

Type-checking and unit tests do not prove the UI actually renders or
behaves correctly. For any change that touches component output or
interaction, drive it with a real headless Chromium session.

`playwright` is a devDependency (`import { chromium } from "playwright"`
works directly — no path juggling needed).

## Steps

1. Start the dev server in the background:
   ```bash
   npm run dev
   ```
   Note the port it lands on (Vite auto-increments if 5173 is busy —
   don't assume it's free).

2. Write a driver script **inside the project tree** (e.g.
   `.verify-tmp.mjs` at the repo root) and run it with `node`. It must
   live inside the project, not the scratchpad directory — Node
   resolves ESM `import`s relative to the script's own location, not
   `cwd`, so a script outside `node_modules`'s ancestry can't see
   `playwright`.

3. Inspect screenshots and console/page errors, then kill the dev
   server you started (don't touch ports/processes you didn't launch
   — this machine tends to have stale dev servers left running from
   other sessions; match on the PID/port you just started, not just
   "any vite process").

4. Clean up: delete the driver script and any screenshot directory
   you wrote (`.verify-tmp.mjs` isn't gitignored, so don't leave it
   behind — `git status` should be clean when you're done).

## Driver script template

```js
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
});

await page.goto("http://localhost:PORT");
await page.waitForSelector("text=Available Meals");
await page.screenshot({ path: "SCRATCHPAD_DIR/01-initial.png" });

// ...drive the specific interaction under test...

console.log("---ERRORS---", JSON.stringify(errors, null, 2));
await browser.close();
```

The script itself must be saved inside the project (e.g.
`.verify-tmp.mjs` at repo root) so its `import` resolves
`node_modules`; screenshots can still be written to the scratchpad
directory (`SCRATCHPAD_DIR` above) since `page.screenshot` is a
runtime file write, not a module resolution.

Always check the `errors` array is empty and look at the screenshots
— a blank frame or thrown page error is a failure even if the script
itself exits 0.
