import { test, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { normalizePrice } from '../utils/helpers';

let homePage: HomePage;
let catalogPage: CatalogPage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  catalogPage = new CatalogPage(page);
  cartPage = new CartPage(page);
  
  await homePage.goto();
  await homePage.acceptCookies();
  await homePage.openCategoryMenu('cat');
  await homePage.openMenuItem('/catalog/koshki/korm/sukhoy-korm/');
  await catalogPage.filterBy('Royal Canin');
});


test('01 The filter was applied', async ({ page }) => {
  await catalogPage.isFilteredBy('Royal Canin');
});

test('02 Verify the selected product is in the cart', async ({ page }) => {
  await catalogPage.isFilteredBy('Royal Canin');
  
  const { title, price } = await catalogPage.addFirstFilteredProductToCart();
  
  await catalogPage.selectDeliveryOption('Доставка курьером');
  await catalogPage.firstAddToCart.click();
  await catalogPage.cartButton.click();

  await expect(cartPage.cartItemContainerByName(title)).toBeVisible();
  const normalizedPrice = normalizePrice(await cartPage.getItemPrice(title));

  await expect(normalizedPrice).toBe(price);
});
  
