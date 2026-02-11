import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';

test('01 The filter was applied', async ({ page }) => {
  const basePage = new BasePage(page);
  const catalogPage = new CatalogPage(page);
  await basePage.goto();
  await basePage.acceptCookies();
  await basePage.clickCategory('cat');
  await basePage.gotoMenuItem('/catalog/koshki/korm/sukhoy-korm/');
  await catalogPage.clickFilterByCheckbox('Royal Canin');
  await expect(catalogPage.productTitle('Royal Canin').first()).toBeVisible();
});

test('02 Verify the selected product is in the cart', async ({ page }) => {
  const basePage = new BasePage(page);
  const catalogPage = new CatalogPage(page);
  const cartPage = new CartPage(page);

  await basePage.goto();
  await basePage.acceptCookies();
  await basePage.clickCategory('cat');
  await basePage.gotoMenuItem('/catalog/koshki/korm/sukhoy-korm/');
  await catalogPage.clickFilterByCheckbox('Royal Canin');
  await page.waitForTimeout(3000);
  
 
  const { title, price } = await catalogPage.addFirstFilteredProductToCart('Royal Canin');
  
  await catalogPage.clickDeliveryOption('Доставка курьером');
  await catalogPage.addToCart.first().click();
  await catalogPage.cartButton.click();

  await expect(cartPage.cartItemProductInfo(title)).toBeVisible();
  await expect(cartPage.totalPrice).toContainText(price);
});
  
