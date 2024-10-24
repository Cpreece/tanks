import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})

test('start game', async({ page }) =>  {
	await page.goto('/tanks'); 
	await page.locator("button:text('start game')").click();
	await expect(page.locator("div.battlefield")).toBeTruthy();
})
