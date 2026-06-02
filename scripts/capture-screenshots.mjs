import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9333;
const userData = join(tmpdir(), `react-storefront-edge-${Date.now()}`);
const outDir = "C:/Users/andre/Desktop/Proyectos/react-storefront/docs/screenshots";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, options) {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Edge may need a moment to expose the debugging endpoint.
    }

    await wait(250);
  }

  throw new Error(`CDP endpoint not ready: ${url}`);
}

async function connectToPage() {
  const page = await getJson(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  });
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);

    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  });

  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const message = { id: ++id, method, params };
      pending.set(message.id, { resolve, reject });
      ws.send(JSON.stringify(message));
    });

  return { send, close: () => ws.close() };
}

async function capture(name, width, height, mobile) {
  const page = await connectToPage();

  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await page.send("Page.navigate", { url: "http://localhost:5173/home" });

  for (let i = 0; i < 80; i++) {
    const result = await page.send("Runtime.evaluate", {
      expression: "document.querySelectorAll('[class*=cardLink]').length",
      returnByValue: true,
    });

    if (result.result.value > 0) {
      break;
    }

    if (i === 79) {
      throw new Error("Products did not render before screenshot");
    }

    await wait(250);
  }

  await page.send("Runtime.evaluate", {
    expression: "document.fonts && document.fonts.ready",
    awaitPromise: true,
  });
  await wait(800);

  const screenshot = await page.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
  });

  await writeFile(`${outDir}/${name}`, Buffer.from(screenshot.data, "base64"));
  page.close();
}

await rm(userData, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const browser = spawn(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userData}`,
  ],
  { stdio: "ignore" },
);

try {
  await capture("catalog-desktop.png", 1440, 1200, false);
  await capture("catalog-mobile.png", 390, 1200, true);
} finally {
  browser.kill();
  await wait(1000);
  await rm(userData, { recursive: true, force: true }).catch(() => {});
}
