// Headless verification shots of the local index.html (desktop + mobile)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PW = 'C:/Users/vm_user/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);

const FILE = 'file:///C:/Users/vm_user/.openclaw/workspace/scratch/abokiwise-publish/index.html';
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

async function shot(name, viewport, fullPage = false) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(9000); // let scripted chat play out
  await page.screenshot({ path: name, fullPage });
  console.log('saved', name);
  await ctx.close();
}

await shot('verify-desktop.png', { width: 1440, height: 900 });
await shot('verify-mobile.png', { width: 390, height: 844 });
await shot('verify-mobile-full.png', { width: 390, height: 844 }, true);
await browser.close();
