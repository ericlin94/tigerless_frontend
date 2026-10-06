import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const base = process.env.STORYBOOK_URL ?? "http://127.0.0.1:6006";
const index = await (await fetch(`${base}/index.json`)).json();
const browser = await chromium.launch({
  channel:
    process.env.PLAYWRIGHT_CHANNEL ??
    (process.platform === "win32" ? "msedge" : undefined),
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const stories = Object.values(index.entries).filter(
  (entry) => entry.type === "story",
);
try {
  for (const story of stories) {
    await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForFunction(
      () =>
        document.body.classList.contains("sb-show-main") ||
        document.body.classList.contains("sb-show-errordisplay"),
    );
    assert.equal(
      await page.locator(".sb-errordisplay").isVisible(),
      false,
      story.id,
    );
    await page.waitForFunction(
      () => document.querySelector("#storybook-root")?.children.length > 0,
    );
    await page.waitForFunction(() =>
      [...document.querySelectorAll("#storybook-root img")].every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    );
    if (story.id === "library-faq--expanded")
      await page.screenshot({ path: "test-results/storybook-faq.png" });
    console.log(`Passed ${story.id}`);
  }
  assert.deepEqual(errors, [], "Storybook browser errors");
  await writeFile(
    "test-results/storybook-report.json",
    JSON.stringify({ stories: stories.length, browserErrors: errors }, null, 2),
  );
  console.log(`${stories.length} stories rendered successfully.`);
} finally {
  await browser.close();
}
