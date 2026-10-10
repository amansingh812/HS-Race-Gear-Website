import { chromium } from "playwright";

const out = process.argv[2];
const browser = await chromium.launch();

async function shoot(name, ctxOpts) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  await page.goto("http://localhost:3001/", { waitUntil: "networkidle" });
  await page.waitForFunction(() => document.querySelector(".hero-racing .swiper")?.swiper, null, { timeout: 60000 });
  const swiper = await page.evaluateHandle(() => document.querySelector(".hero-racing .swiper").swiper);
  for (let i = 0; i < 3; i++) {
    await page.evaluate(([s, idx]) => { s.autoplay.stop(); s.slideToLoop(idx, 0); }, [swiper, i]);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${out}/${name}-slide${i + 1}.png` });
  }
  await ctx.close();
}

await shoot("desktop", { viewport: { width: 1440, height: 700 } });
await shoot("tablet", { viewport: { width: 820, height: 700 } });
await browser.close();
