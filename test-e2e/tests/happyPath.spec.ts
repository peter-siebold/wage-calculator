import { test, expect } from "@playwright/test";

const PAGE_URL = "http://localhost:5173/";

test("has title", async ({ page }) => {
  await page.goto(PAGE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Wage Calculator/);
});

test("can switch languages", async ({ page }) => {
  await page.goto(PAGE_URL);
  const headerLogo = await page.getByTestId("header-logo");
  await expect(headerLogo).toHaveText("Lohnsimulator");

  await page.getByRole("button", { name: "FR" }).click();
  await expect(headerLogo).toHaveText("Simulateur de salaire");

  await page.getByRole("button", { name: "DE" }).click();
  await expect(headerLogo).toHaveText("Lohnsimulator");
});

test("Enter data - happy path", async ({ page }) => {
  await page.goto(PAGE_URL);

  // await page.getByLabel("Startdatum").click();
  await page.getByTestId("start-date").click();
  await page.getByRole("gridcell", { name: "12" }).click();
  await page.getByRole("button", { name: "OK" }).click();
  await page.getByLabel("Ort *").click();
  await page.getByLabel("Ort *").fill("Bern");
  await page.getByRole("button", { name: "Weiter" }).click();

  await page.getByTestId("birth-date").click();
  //  get fthe first element with the role of gridcell and the name of 1
  // await page.getByRole("gridcell", { name: /1/ }).click();
  await page.getByText("1").first().click();

  await page.getByRole("button", { name: "OK" }).click();

  await page.getByRole("button", { name: "Weiter" }).click();

  await page
    .getByRole("button", { name: "Software Developer Software" })
    .click();

  expect(await page.getByTestId("hourly-list")).toBeVisible();

  await page.getByRole("button", { name: "Monat" }).click();

  expect(await page.getByTestId("monthly-list")).toBeVisible();
});
