import { expect } from '@playwright/test';
import { normalizePrice } from '../utils/helpers';
import { test  } from '../testFixtures/fixtures';

test.beforeEach(async ({ pageManager }) => {
  await pageManager.homePage.goto();
  await pageManager.homePage.openCategoryMenu('cat');
  await pageManager.homePage.openMenuItem('/catalog/koshki/korm/sukhoy-korm/');
});

test('01 The filter was applied', async ({ pageManager }) => {
  await pageManager.catalogPage.filterBy('Royal Canin');
  await pageManager.catalogPage.isFilteredBy('Royal Canin');
});

test('02 Verify the selected product is in the cart', async ({ pageManager }) => {
  await pageManager.catalogPage.filterBy('Royal Canin');
  await pageManager.catalogPage.isFilteredBy('Royal Canin');
  
  const { title, price } = await pageManager.catalogPage.addFirstFilteredProductToCart(0);
  
  await pageManager.catalogPage.selectDeliveryOption('Доставка курьером');
  await pageManager.catalogPage.firstAddToCart.click();
  await pageManager.catalogPage.cartButton.click();

  await expect(pageManager.cartPage.cartItemContainerByName(title)).toBeVisible();
  const normalizedPrice = normalizePrice(await pageManager.cartPage.getItemPrice(title));

  await expect(normalizedPrice).toBe(price);
});

test('03 Verify multiple items in the cart', async ({ pageManager }) => {
  const { title, price } = await pageManager.catalogPage.addFirstFilteredProductToCart(0);
  await pageManager.catalogPage.selectDeliveryOption('Доставка курьером');
  await pageManager.catalogPage.firstAddToCart.click();
  await pageManager.catalogPage.addOneItemToCard(0).click();
  await pageManager.catalogPage.addOneItemToCard(0).click();
  await expect(pageManager.catalogPage.productCountInput(0)).toHaveValue('3');

  await pageManager.catalogPage.cartButton.click();
  await expect(pageManager.cartPage.cartItemContainerByName(title)).toBeVisible();

  const itemCount = await pageManager.cartPage.getCartItemCount(title);
  expect(itemCount).toBe('3');

  const cartPrice = normalizePrice(await pageManager.cartPage.getItemPrice(title));
  expect(Number(cartPrice)).toBe(Number(price) * 3);
});
  
