import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PW = 'C:/Users/vm_user/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);

const FILE = 'file:///C:/Users/vm_user/.openclaw/workspace/scratch/abokiwise-publish/index.html';
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto(FILE);
await page.waitForTimeout(1200);
const x1 = await page.evaluate(() => document.getElementById('marqueeTrack').getBoundingClientRect().x);
const ph1 = await page.evaluate(() => document.getElementById('compPh').textContent);
await page.waitForTimeout(4000);
const x2 = await page.evaluate(() => document.getElementById('marqueeTrack').getBoundingClientRect().x);
const ph2 = await page.evaluate(() => document.getElementById('compPh').textContent);
console.log('reduced-motion emulated:');
console.log('marquee x t0=', x1.toFixed(1), ' t+4s=', x2.toFixed(1), x1 !== x2 ? '=> MOVING' : '=> STUCK');
console.log('composer t0=', JSON.stringify(ph1), ' t+4s=', JSON.stringify(ph2), ph1 !== ph2 ? '=> ROTATING' : '=> STUCK');
await browser.close();
