import { expect, test } from "@playwright/test";

test("home page shows a healthy API and database", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("API: ok · Database: ok");
});

test("/api/* is forwarded to the NestJS API", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBe(true);
  expect(await res.json()).toMatchObject({ status: "ok", database: "ok" });
});
