import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly page: Page;
  readonly cartItemContainer: Locator;
  readonly cartItemProduct: Function;
  readonly cartItemPrice: Locator;
  
  constructor(page: Page) {
    super(page);
    this.page = page;

    this.cartItemContainer = this.page.locator('[class="product-basket"]');
    this.cartItemProduct = (name: string) => this.cartItemContainer.locator(`[class="product-basket__info"]:has-text("${name}")`);
    this.cartItemPrice = this.cartItemContainer.locator('[class*="product-basket__price-total"]');
  }
}