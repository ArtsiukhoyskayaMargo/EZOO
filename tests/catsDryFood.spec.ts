import { expect } from '@playwright/test';
import { normalizePrice } from '../utils/helpers';
import { test  } from '../testFixtures/fixtures';
import { brands, deliveryMethods, pathes } from '../appConstants/appConstants';

test.beforeEach(async ({ pageManager }) => {
  await pageManager.homePage.goto();
  await pageManager.homePage.openCategoryMenu('cat');
  await pageManager.homePage.openMenuItem(pathes.catDryFood);
});

test('01 The filter was applied', async ({ pageManager }) => {
  await pageManager.catalogPage.filterBy(brands.royalCanin.filterName);
  await pageManager.catalogPage.isFilteredBy(brands.royalCanin.uiName);
});

test('02 Verify the selected product is in the cart', async ({ pageManager }) => {
  await pageManager.catalogPage.filterBy(brands.royalCanin.filterName);
  await pageManager.catalogPage.isFilteredBy(brands.royalCanin.uiName);
  
  const { title, price } = await pageManager.catalogPage.addFirstProductToCart(0);
  
  await pageManager.catalogPage.selectDeliveryOption(deliveryMethods.courier);
  await pageManager.catalogPage.addToCartItem(0).click();
  await pageManager.catalogPage.cartButton.click();

  await expect(pageManager.cartPage.cartItemContainerByName(title)).toBeVisible();
  const normalizedPrice = normalizePrice(await pageManager.cartPage.getItemPrice(title));

  expect(normalizedPrice).toBe(price);
});

test('03 Verify multiple items in the cart', async ({ pageManager }) => {
  const { title, price } = await pageManager.catalogPage.addFirstProductToCart(0);
  await pageManager.catalogPage.selectDeliveryOption(deliveryMethods.courier);
  await pageManager.catalogPage.addToCartItem(0).click();
  await pageManager.catalogPage.addOneItemToCart(0).click();
  await pageManager.catalogPage.addOneItemToCart(0).click();
  await expect(pageManager.catalogPage.productCountInput(0)).toHaveValue('3');

  await pageManager.catalogPage.cartButton.click();
  await expect(pageManager.cartPage.cartItemContainerByName(title)).toBeVisible();

  const itemCount = await pageManager.cartPage.getCartItemCount(title);
  expect(itemCount).toBe('3');

  const cartPrice = normalizePrice(await pageManager.cartPage.getItemPrice(title));
  expect(Number(cartPrice)).toBe(Number(price) * 3);
});
  

[brands.royalCanin, brands.proPlan].forEach(({ filterName, uiName }) => {
  test(`04 The filter was applied for brand ${uiName}`, async ({ pageManager }) => {
    await pageManager.catalogPage.filterBy(filterName);
    await pageManager.catalogPage.isFilteredBy(uiName);
  });
});

test('05 The filter was applied - intentional fail', async ({ pageManager }) => {
  await pageManager.catalogPage.filterBy(brands.royalCanin.filterName);
  await pageManager.catalogPage.isFilteredBy(brands.royalCanin.uiName);
  // специально падаем
  await expect(pageManager.catalogPage.cartButton).toHaveText('это точно не текст корзины');
  await expect(pageManager.catalogPage.cartButton).toHaveText('это точно не текст корзины');
  await expect(pageManager.catalogPage.cartButton).toHaveText('это точно не текст корзины');
  await expect(pageManager.catalogPage.cartButton).toHaveText('это точно не текст корзины');
  await expect(pageManager.catalogPage.cartButton).toHaveText('это точно не текст корзины');
});

