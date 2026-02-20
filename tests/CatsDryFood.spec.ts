import { expect } from '@playwright/test';
import { normalizePrice } from '../utils/helpers';
import { test  } from '../testFixtures/fixtures';

test.beforeEach(async ({ pageManager }) => {
  await pageManager.homePage.goto();
  await pageManager.homePage.acceptCookies();
  await pageManager.homePage.openCategoryMenu('cat');
  await pageManager.homePage.openMenuItem('/catalog/koshki/korm/sukhoy-korm/');
  await pageManager.catalogPage.filterBy('Royal Canin');
});

test('01 The filter was applied', async ({ pageManager }) => {
  await pageManager.catalogPage.isFilteredBy('Royal Canin');
});

test('02 Verify the selected product is in the cart', async ({ pageManager }) => {
  await pageManager.catalogPage.isFilteredBy('Royal Canin');
  
  const { title, price } = await pageManager.catalogPage.addFirstFilteredProductToCart();
  
  await pageManager.catalogPage.selectDeliveryOption('Доставка курьером');
  await pageManager.catalogPage.firstAddToCart.click();
  await pageManager.catalogPage.cartButton.click();

  await expect(pageManager.cartPage.cartItemContainerByName(title)).toBeVisible();
  const normalizedPrice = normalizePrice(await pageManager.cartPage.getItemPrice(title));

  await expect(normalizedPrice).toBe(price);
});
  
