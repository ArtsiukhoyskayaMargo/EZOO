import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';

test('01 The filter was applied', async ({ page }) => {
  const basePage = new BasePage(page);
  const catalogPage = new CatalogPage(page);
  await basePage.goto();
  await basePage.acceptCookies();
  await basePage.openCategoryMenu('cat');
  await basePage.openMenuItem('/catalog/koshki/korm/sukhoy-korm/');
  await catalogPage.filterBy('Royal Canin');
  await catalogPage.isFilteredBy('Royal Canin');
});

test('02 Verify the selected product is in the cart', async ({ page }) => {
  const basePage = new BasePage(page);
  const catalogPage = new CatalogPage(page);
  const cartPage = new CartPage(page);

  await basePage.goto();
  await basePage.acceptCookies();
  await basePage.openCategoryMenu('cat');
  await basePage.openMenuItem('/catalog/koshki/korm/sukhoy-korm/');
  await catalogPage.filterBy('Royal Canin');
  await catalogPage.isFilteredBy('Royal Canin');
  
 
  const { title, price } = await catalogPage.addFirstFilteredProductToCart();
  
  await catalogPage.selectDeliveryOption('Доставка курьером');
  await catalogPage.addToCart.click();
  await catalogPage.cartButton.click();

  await expect(cartPage.cartItemProduct(title)).toBeVisible();
  await expect(cartPage.cartItemPrice).toContainText(price);
});
  
