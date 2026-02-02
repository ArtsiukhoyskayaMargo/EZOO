import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('The filter was applied', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.gotoCategory();
  await homePage.gotoCatsDryFood();
  await homePage.royalCaninClickCheckbox();
  await expect(homePage.filteredResults).toBeVisible();
});