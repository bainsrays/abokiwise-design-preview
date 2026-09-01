import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PW = 'C:/Users/vm_user/AppData/Roaming/npm/node_modules/openclaw/node_modules/playwright-core';
const { chromium } = require(PW);

const FILE = 'file:///C:/Users/vm_user/.openclaw/workspace/scratch/abokiwise-publish/index.html';
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(FILE);
await page.waitForTimeout(1500);
await page.locator('#pricing').scrollIntoViewIfNeeded();
await page.evaluate(() => document.querySelector('.cmp-wrap').setAttribute('open', ''));
await page.waitForTimeout(1000);
await page.locator('#pricing').screenshot({ path: 'verify-pricing.png' });

// mobile
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 2 });
await m.goto(FILE);
await m.waitForTimeout(1500);
await m.locator('#pricing').scrollIntoViewIfNeeded();
await m.waitForTimeout(900);
await m.locator('#pricing').screenshot({ path: 'verify-pricing-mobile.png' });
await browser.close();
console.log('saved verify-pricing.png + verify-pricing-mobile.png');
