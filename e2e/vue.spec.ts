import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/tanks');
})

test('start game', async({ page }) =>  {
	await page.goto('/tanks');
  await expect(page.locator('button.start-game')).toHaveCount(1);
	await page.locator("button:text('start game')").click();
	await expect(page.locator("div#player")).toHaveCount(1);
})

