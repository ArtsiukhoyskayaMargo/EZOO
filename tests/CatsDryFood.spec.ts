import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CatalogPage } from '../pages/CatalogPage';
import { SelectCatFoodPage } from '../pages/SelectCatFoodPage';
import { DeliveryModalPage } from '../pages/DeliveryModalPage';
import { CartPage } from '../pages/CartPage';

test('01 The filter was applied', async ({ page }) => {
  const homePage = new HomePage(page);
  const catalogPage = new CatalogPage(page);
  await homePage.goto();
  await homePage.gotoCategory();
  await catalogPage.gotoCatsDryFood();
  await catalogPage.royalCaninClickCheckbox();
  await expect(catalogPage.filteredResults).toBeVisible();
});

test('02 Verify the selected product is in the cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const catalogPage = new CatalogPage(page);  
  const selectCatFoodPage = new SelectCatFoodPage(page);
  const deliveryModalPage = new DeliveryModalPage(page);
  const cartPage = new CartPage(page);
  await homePage.goto();
  await homePage.acceptCookies(); 
  await homePage.gotoCategory();
  await catalogPage.gotoCatsDryFood();
  await catalogPage.royalCaninClickCheckbox();
  await expect(selectCatFoodPage.productPrice).toBeVisible();
  await expect(selectCatFoodPage.productTitle).toBeVisible();
  await expect(selectCatFoodPage.packaging).toBeVisible();
  await selectCatFoodPage.addToTrash.click();
  await deliveryModalPage.clickDeliveryButton();
  await selectCatFoodPage.addToTrash.click();
  await selectCatFoodPage.trushButton.click();
  await expect(cartPage.cartItemNamePrice).toBeVisible();
  await expect(cartPage.cartItemProductInfo).toBeVisible();
});
  

