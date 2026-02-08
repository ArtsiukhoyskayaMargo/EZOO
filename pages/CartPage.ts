import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItemNamePrice: Locator;
  readonly cartItemProductInfo: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.cartItemNamePrice = page.locator('[class*="product-basket__price-total"]:has-text("127.47 BYN")');
    this.cartItemProductInfo = page.locator('"Royal Canin Ageing Sterilised 11+ Корм сухой для стерилизованных кошек старше 11 лет 4кг"');
  }
}