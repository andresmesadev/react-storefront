import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9336;
const userData = join(tmpdir(), `react-storefront-2b-${Date.now()}`);
const outDir = "C:/Users/andre/Desktop/Proyectos/react-storefront/docs/screenshots/phase-2b";
const productUrl = "http://localhost:5173/item/1z2QAm0L5YXdEHOz20Ga";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(url, options) {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return await res.json();
    } catch {}
    await wait(250);
  }
  throw new Error(`CDP endpoint not ready: ${url}`);
}

async function connectToPage() {
  const page = await getJson(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
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

async function waitForSelector(page, selector, attempts = 80) {
  for (let i = 0; i < attempts; i++) {
    const result = await page.send("Runtime.evaluate", {
      expression: `document.querySelector(${JSON.stringify(selector)}) !== null`,
      returnByValue: true,
    });
    if (result.result.value) return;
    await wait(250);
  }
  throw new Error(`Selector not found: ${selector}`);
}

async function capture(name, width, height, mobile, setup) {
  const page = await connectToPage();
  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });

  if (setup) await setup(page);

  await page.send("Runtime.evaluate", {
    expression: "document.fonts && document.fonts.ready",
    awaitPromise: true,
  });
  await wait(900);

  const screenshot = await page.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
  });

  await writeFile(`${outDir}/${name}`, Buffer.from(screenshot.data, "base64"));
  page.close();
}

async function setupCart(page) {
  await page.send("Page.navigate", { url: productUrl });
  await waitForSelector(page, "[class*='addButton']");
  await page.send("Runtime.evaluate", { expression: "document.querySelector('[class*=addButton]').click()" });
  await wait(500);
  await page.send("Runtime.evaluate", { expression: "document.querySelector('a.cart-link').click()" });
  await waitForSelector(page, ".cartItemCard");
}

async function setupCheckout(page) {
  await page.send("Page.navigate", { url: "http://localhost:5173/formulario" });
  await waitForSelector(page, ".container-form");
}

await mkdir(outDir, { recursive: true });

const browser = spawn(
  edge,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${userData}`],
  { stdio: "ignore" },
);

try {
  await capture("cart-desktop.png", 1440, 1100, false, setupCart);
  await capture("cart-mobile.png", 390, 1400, true, setupCart);
  await capture("checkout-desktop.png", 1440, 1000, false, setupCheckout);
  await capture("checkout-mobile.png", 390, 1200, true, setupCheckout);
} finally {
  browser.kill();
  await wait(1000);
  await rm(userData, { recursive: true, force: true }).catch(() => {});
}
