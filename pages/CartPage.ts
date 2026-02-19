import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly page: Page;
  readonly cartItemContainerByName: Function;
  
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartItemContainerByName = (name: string) => this.page.locator(`[class="product-basket"]:has-text("${name}")`);
  }

  async getItemPrice (itemName: string): Promise<string> {
    return this.cartItemContainerByName(itemName).locator('[class*="product-basket__price-total"]').innerText()
  }
}