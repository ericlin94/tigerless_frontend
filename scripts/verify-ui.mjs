import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const browser = await chromium.launch({
  channel:
    process.env.PLAYWRIGHT_CHANNEL ??
    (process.platform === "win32" ? "msedge" : undefined),
  headless: true,
});
const appUrl = process.env.APP_URL ?? "http://127.0.0.1:3000";
const page = await browser.newPage();
page.setDefaultNavigationTimeout(60000);
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("test-results", { recursive: true });
const report = [];
try {
  for (const width of [
    320, 375, 480, 767, 768, 769, 999, 1000, 1001, 1024, 1249, 1250, 1251, 1280,
    1440, 1920,
  ]) {
    console.log(`Checking ${width}px`);
    await page.setViewportSize({ width, height: 1000 });
    if (width === 320)
      await page.goto(appUrl, { waitUntil: "domcontentloaded" });
    try {
      await page.waitForFunction(() =>
        [...document.images].every(
          (img) => img.complete && img.naturalWidth > 0,
        ),
      );
    } catch (error) {
      console.log(
        await page.evaluate(() =>
          [...document.images]
            .filter((img) => !img.complete || !img.naturalWidth)
            .map((img) => ({ src: img.currentSrc, complete: img.complete })),
        ),
      );
      throw error;
    }
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
      brokenImages: [...document.images]
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src),
      height: document.documentElement.scrollHeight,
      clippedControls: [
        ...document.querySelectorAll("button,.action,input,select"),
      ]
        .filter(
          (el) =>
            el.getClientRects().length && el.scrollWidth > el.clientWidth + 2,
        )
        .map((el) => el.textContent.trim()),
    }));
    assert.ok(
      metrics.scrollWidth <= width,
      `Horizontal overflow at ${width}: ${metrics.scrollWidth}`,
    );
    assert.deepEqual(metrics.brokenImages, [], `Broken images at ${width}`);
    assert.deepEqual(
      metrics.clippedControls,
      [],
      `Clipped controls at ${width}`,
    );
    report.push({ width, ...metrics });
    if (width === 375 || width === 1440) {
      await page.screenshot({
        path: `test-results/home-${width}.png`,
        fullPage: true,
      });
      await page
        .locator(".hero-band")
        .screenshot({ path: `test-results/hero-${width}.png` });
      await page
        .locator(".bmi-section")
        .screenshot({ path: `test-results/bmi-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 375, height: 824 });
  await page.goto(appUrl, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Navigation menu" }).waitFor();
  await page.screenshot({ path: "test-results/mobile-menu.png" });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Sleep", exact: true })
    .click();
  assert.equal(
    await page.locator(".mobile-menu").evaluate((el) => el.open),
    false,
  );
  const faq = page.getByRole("button", {
    name: "Which languages do you support?",
  });
  await faq.click();
  assert.equal(await faq.getAttribute("aria-expanded"), "true");
  await faq.click();
  assert.equal(await faq.getAttribute("aria-expanded"), "false");
  await page
    .getByRole("button", { name: "Calculate BMI", exact: true })
    .click();
  await page.locator("#bmi-error").waitFor();
  await page.getByLabel("Height in feet", { exact: true }).fill("5");
  await page.getByLabel("Additional height in inches").fill("9");
  await page.getByLabel("Weight", { exact: true }).fill("154");
  const male = page.getByRole("radio", { name: "Male", exact: true });
  const female = page.getByRole("radio", { name: "Female", exact: true });
  assert.equal(await female.isChecked(), true);
  await male.check();
  assert.equal(await female.isChecked(), false);
  await page
    .getByRole("button", { name: "Calculate BMI", exact: true })
    .click();
  assert.equal(
    await page.locator(".bmi-mobile-result .bmi-ring strong").textContent(),
    "22.7",
  );
  await female.check();
  assert.equal(await male.isChecked(), false);
  assert.equal(
    await page.locator(".bmi-mobile-result .bmi-ring strong").textContent(),
    "22.7",
  );
  await male.check();
  await page.getByRole("button", { name: "cm / kg", exact: true }).click();
  assert.equal(await male.isChecked(), true);
  await page.getByLabel("Height in centimeters").fill("175");
  await page.getByLabel("Weight", { exact: true }).fill("70");
  await page
    .getByRole("button", { name: "Calculate BMI", exact: true })
    .click();
  assert.equal(
    await page.locator(".bmi-mobile-result .bmi-ring strong").textContent(),
    "22.9",
  );
  await page.getByRole("button", { name: "Next service" }).click();
  await page.waitForTimeout(500);
  assert.ok(
    (await page.locator(".feature-track").evaluate((el) => el.scrollLeft)) > 0,
  );
  await page
    .getByRole("button", { name: "Start a free consultation", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "Continue to consultation" }).click();
  await page.locator("#email-error").waitFor();
  await page
    .getByRole("textbox", { name: "Email", exact: true })
    .fill("patient@example.com");
  await page.getByRole("button", { name: "Continue to consultation" }).click();
  await page.getByRole("heading", { name: "Your details are ready" }).waitFor();
  await page.getByRole("button", { name: "Done", exact: true }).click();
  assert.equal(
    await page.locator(".consultation-dialog").evaluate((el) => el.open),
    false,
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 375, height: 824 },
    { width: 320, height: 480 },
  ]) {
    await page.setViewportSize(viewport);
    for (const mode of ["consultation", "login", "information"]) {
      if (mode === "consultation") {
        await page
          .getByRole("button", {
            name: "Start a free consultation",
            exact: true,
          })
          .first()
          .click();
      } else if (mode === "login") {
        if (viewport.width < 768) {
          await page.getByRole("button", { name: "Open menu" }).click();
          const menu = page.getByRole("dialog", { name: "Navigation menu" });
          const bounds = await menu.boundingBox();
          assert.ok(Math.abs(bounds.x) < 1 && Math.abs(bounds.y) < 1);
          assert.equal(bounds.width, viewport.width);
          assert.equal(bounds.height, viewport.height);
          await menu
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
      const bounds = await dialog.boundingBox();
      const context = `${mode} at ${viewport.width}x${viewport.height}`;
      assert.ok(
        Math.abs(bounds.x + bounds.width / 2 - viewport.width / 2) < 1,
        `Not horizontally centered: ${context}`,
      );
      assert.ok(
        Math.abs(bounds.y + bounds.height / 2 - viewport.height / 2) < 1,
        `Not vertically centered: ${context}`,
      );
      assert.ok(
        bounds.x >= 15 && bounds.y >= 15,
        `Missing viewport gutter: ${context}`,
      );
      assert.ok(
        bounds.x + bounds.width <= viewport.width - 15 &&
          bounds.y + bounds.height <= viewport.height - 15,
        `Dialog exceeds viewport: ${context}`,
      );
      await page.screenshot({
        path: `test-results/dialog-${mode}-${viewport.width}.png`,
      });
      await dialog.getByRole("button", { name: "Close dialog" }).click();
      assert.equal(await dialog.evaluate((el) => el.open), false);
    }
  }
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(appUrl, { waitUntil: "domcontentloaded" });
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const accessibility = await page.evaluate(async () =>
      (
        await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        })
      ).violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    );
    await writeFile(
      `test-results/accessibility-${width}.json`,
      JSON.stringify(accessibility, null, 2),
    );
    assert.deepEqual(accessibility, [], `Accessibility violations at ${width}`);
    const track = page.locator(".feature-track");
    await track.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });
    await page.waitForTimeout(150);
    assert.equal(
      await page.getByRole("button", { name: "Next service" }).isDisabled(),
      true,
    );
    await page.getByRole("button", { name: "Previous service" }).click();
    await page.waitForTimeout(150);
    assert.equal(
      await page.getByRole("button", { name: "Next service" }).isDisabled(),
      false,
    );
  }
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  assert.deepEqual(errors, [], "Browser errors");
  await writeFile(
    "test-results/ui-report.json",
    JSON.stringify(
      { responsive: report, interactions: "passed", browserErrors: errors },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      { responsive: report, interactions: "passed", browserErrors: errors },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
