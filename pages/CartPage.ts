import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly page: Page;
  readonly cartItemProductInfo: Function;
  //readonly cartItemNamePrice: Function;
  readonly totalPrice: Locator;
  
  constructor(page: Page) {
    super(page);
    this.page = page;

    this.cartItemProductInfo = (name: string) => this.page.locator('[class="product-basket__info"]').locator(`:has-text("${name}")`).first();
    //this.cartItemNamePrice = (price: string) => this.page.locator('[class*="product-basket__price-total"]').locator(`:has-text("${price}")`);
    this.totalPrice = this.page.locator('[class*="product-basket__price-total"]');
  }
}