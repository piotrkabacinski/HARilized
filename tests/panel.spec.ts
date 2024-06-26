import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  createNetworkRequestEntry,
  createResponse,
} from "./utils/createNetworkRequestEntry";
import { sleep } from "./utils/sleep";
import { testScopeKey } from "./utils/testScopeKey";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.describe("Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/utils/chrome.mock.js` });
    await page.goto(`/panel.html`);
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate((testScopeKey) => {
      (window as any)[testScopeKey].resetOnRequestFinishedCallback();
      (window as any)[testScopeKey].resetStorage();
    }, testScopeKey);
  });

  test("Render response item in the table", async ({ page }) => {
    const entry = createNetworkRequestEntry();

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb("foo");
          },
        });
      },
      [entry, testScopeKey]
    );

    const entryItems = await page
      .locator("#table tbody tr")
      .first()
      .locator("td")
      .all();

    const tr = page.locator("#table tbody tr").first();

    expect(await tr.isVisible()).toBe(true);

    const expects = [
      undefined,
      entry.request?.method,
      entry.response?.status.toString(),
      "/",
    ];

    for (const index in entryItems) {
      if (index === "0") {
        expect(await entryItems[index].innerText()).not.toBe("Invalid Date");
        continue;
      }

      expect(await entryItems[index].innerText()).toBe(expects[index]);
    }
  });

  test("Render empty requests table", async ({ page }) => {
    const table = page.locator("table");

    expect(await table.isVisible()).toBe(true);

    const ths = await page.locator("#table thead tr").locator("th").all();

    const labels = ["Time", "Method", "Status", "Path"];

    expect(ths.length).toBe(labels.length);

    for (let index in ths) {
      expect(await ths[index].innerText()).toBe(labels[index]);
    }

    const tr = page.locator("#table tbody tr");

    expect(await tr.isVisible()).toBe(false);
  });

  test("Toggle response report with default template", async ({ page }) => {
    const entry = createNetworkRequestEntry();
    const content = `<p>${faker.hacker.noun()}</p>`;

    await page.evaluate(
      ([entry, testScopeKey, content]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb(content);
          },
        });
      },
      [entry, testScopeKey, content]
    );

    let reportTr = page.locator(`tr.hidden[id^="report-"]`).first();

    expect(await reportTr.isHidden()).toBe(true);

    const pathButton = page.locator(`td[id^="button-"] button`).first();

    await pathButton.click();

    reportTr = page.locator(`tr[id^="report-"]`).first();

    expect(await reportTr.isVisible()).toBe(true);

    const reportContent = await page
      .locator(`tr.report[id^="report-"] pre`)
      .innerText();

    expect(reportContent?.match(content)).not.toBe(null);
    expect(reportContent?.match(content)).not.toContain(
      "Unsupported response content MIME type"
    );
    expect(reportContent?.match(`${entry.response?.status}`)).not.toBe(null);
    expect(reportContent?.match(`${entry.request?.method}`)).not.toBe(null);
    expect(reportContent?.match(`${entry.request?.url}`)).not.toBe(null);
  });

  test("Toggle response report with custom template", async ({ page }) => {
    const entry = createNetworkRequestEntry();
    const content = `<p>${faker.hacker.noun()}</p>`;
    const customTemplate = "Custom {{response.content.text}}";

    await page.evaluate(
      ([entry, testScopeKey, content, customTemplate]: any[]) => {
        (window as any).chrome.storage.local.set({
          har_report_settings: {
            template: customTemplate,
          },
        });

        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb(content);
          },
        });
      },
      [entry, testScopeKey, content, customTemplate]
    );

    const pathButton = page.locator(`td[id^="button-"] button`).first();

    await pathButton.click();

    const reportContent = await page
      .locator(`tr.report[id^="report-"] pre`)
      .innerText();

    expect(reportContent).toBe(`Custom ${content}`);
  });

  test("Toggle response report with unsupported mime type content message when settings doesn't allow that", async ({
    page,
  }) => {
    const entry = createNetworkRequestEntry({
      response: createResponse({
        content: {
          mimeType: faker.string.alphanumeric(),
          size: 10,
        },
      }),
    });

    await page.evaluate(
      ([entry, testScopeKey, content, customTemplate]: any[]) => {
        (window as any).chrome.storage.local.set({
          har_report_settings: {
            template: customTemplate,
          },
        });

        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb(content);
          },
        });
      },
      [entry, testScopeKey]
    );

    const pathButton = page.locator(`td[id^="button-"] button`).first();

    await pathButton.click();

    const reportContent = await page
      .locator(`tr.report[id^="report-"] pre`)
      .innerText();

    expect(reportContent).toContain("Unsupported response content MIME type");
  });

  test("Toggle response report with unsupported mime type content message when settings allow that", async ({
    page,
  }) => {
    const entry = createNetworkRequestEntry({
      response: createResponse({
        content: {
          mimeType: faker.string.alphanumeric(),
          size: 10,
        },
      }),
    });

    await page.evaluate(
      ([entry, testScopeKey, content, customTemplate]: any[]) => {
        (window as any).chrome.storage.local.set({
          har_report_settings: {
            template: customTemplate,
            areAllMIMEtypesRendered: "on",
          },
        });

        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb(content);
          },
        });
      },
      [entry, testScopeKey]
    );

    const pathButton = page.locator(`td[id^="button-"] button`).first();

    await pathButton.click();

    const reportContent = await page
      .locator(`tr.report[id^="report-"] pre`)
      .innerText();

    expect(reportContent).not.toContain(
      "Unsupported response content MIME type"
    );
  });

  test("Clear out entries", async ({ page }) => {
    const entry = createNetworkRequestEntry();

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any).confirm = () => true;

        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb("");
          },
        });
      },
      [entry, testScopeKey]
    );

    const resetButton = page.locator("#reset");

    expect(await resetButton.isHidden()).toBe(false);

    await resetButton.click();

    const reportTr = page.locator(`tr[id^="report-"]`);

    expect(await reportTr.isHidden()).toBe(true);
    expect(await resetButton.isHidden()).toBe(true);
  });

  test("Pause and restore events listening", async ({ page }) => {
    const pauseButton = page.locator("#pause");

    const statusDot = page.locator("#status-dot div.status-dot--recording");

    expect(await pauseButton.innerText()).toBe("Pause");
    expect(await statusDot.isVisible()).toBe(true);

    await pauseButton.click();

    expect(await pauseButton.innerText()).toBe("Restore");
    expect(await statusDot.isVisible()).toBe(false);

    const entry = createNetworkRequestEntry();

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb("");
          },
        });
      },
      [entry, testScopeKey]
    );

    const tr = page.locator("table tbody tr").first();

    expect(await tr.isVisible()).toBe(false);

    // Restore:
    await pauseButton.click();

    expect(await pauseButton.innerText()).toBe("Pause");
    expect(await statusDot.isVisible()).toBe(true);

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb("");
          },
        });
      },
      [entry, testScopeKey]
    );

    await sleep(50);

    expect(await tr.isVisible()).toBe(true);
  });

  test("Render link to settings page", async ({ page }) => {
    const href = await page.locator("#settings-link a").getAttribute("href");

    expect(href).toBeDefined();
  });
});
