import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly catCategory: Locator;
  readonly catsDryFood: Locator;
  readonly royalCaninBrand: Locator;
  readonly filteredResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catCategory = page.locator('#cat').nth(1);
    this.catsDryFood = page.locator('a[href="/catalog/koshki/korm/sukhoy-korm/"]').nth(1);
    this.royalCaninBrand = page.locator('[title="Royal Canin"]');
    this.filteredResults = page.locator('[class="product__info"]:has-text("Royal Canin")').first();
  }

  async goto() {
    await this.page.goto('/');
  }
  
  async gotoCategory() {
    await this.catCategory.click();
  }

  async gotoCatsDryFood() {
    await this.catsDryFood.click();
  }

  async royalCaninClickCheckbox() {
    await this.royalCaninBrand.click();
  }
}
