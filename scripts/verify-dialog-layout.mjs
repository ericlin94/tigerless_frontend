import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  channel:
    process.env.PLAYWRIGHT_CHANNEL ??
    (process.platform === "win32" ? "msedge" : undefined),
  headless: true,
  ignoreDefaultArgs: ["--hide-scrollbars"],
});
const page = await browser.newPage();
const appUrl = process.env.APP_URL ?? "http://127.0.0.1:3000";

async function measurePage() {
  return page.evaluate(() => {
    const header = document
      .querySelector(".site-header")
      .getBoundingClientRect();
    const hero = document.querySelector(".hero-band").getBoundingClientRect();
    return {
      headerX: header.x,
      headerWidth: header.width,
      heroX: hero.x,
      heroWidth: hero.width,
    };
  });
}

try {
  for (const width of [375, 1000, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(appUrl, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    for (const mode of ["consultation", "login", "information"]) {
      const before = await measurePage();
      if (mode === "consultation") {
        await page
          .getByRole("button", {
            name: "Start a free consultation",
            exact: true,
          })
          .first()
          .click();
      } else if (mode === "login") {
        if (width < 1000) {
          await page.getByRole("button", { name: "Open menu" }).click();
          await page
            .getByRole("dialog", { name: "Navigation menu" })
            .getByRole("button", { name: "Login", exact: true })
            .click();
        } else {
          await page
            .getByRole("button", { name: "Login", exact: true })
            .click();
        }
      } else {
        await page
          .locator("footer")
          .getByRole("button", { name: "Apsu on Instagram", exact: true })
          .click();
      }
      const dialog = page.locator(".consultation-dialog");
      await dialog.waitFor({ state: "visible" });
      assert.deepEqual(
        await measurePage(),
        before,
        `${mode} shifts the page at ${width}px`,
      );
      assert.equal(
        await page.evaluate(() => document.body.style.overflow),
        "hidden",
      );
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      assert.deepEqual(
        await measurePage(),
        before,
        `${mode} close shifts the page at ${width}px`,
      );
      assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    }
    if (width < 1000) {
      const before = await measurePage();
      await page.getByRole("button", { name: "Open menu" }).click();
      const menu = page.getByRole("dialog", { name: "Navigation menu" });
      await menu.waitFor({ state: "visible" });
      assert.deepEqual(
        await measurePage(),
        before,
        "Mobile menu shifts the page",
      );
      await page.keyboard.press("Escape");
      await menu.waitFor({ state: "hidden" });
      assert.deepEqual(
        await measurePage(),
        before,
        "Mobile menu close shifts the page",
      );
    }
    console.log(`Dialog scroll-lock layout passed at ${width}px`);
  }
} finally {
  await browser.close();
}
