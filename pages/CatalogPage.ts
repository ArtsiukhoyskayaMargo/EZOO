import { type Locator, type Page } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;
  readonly catsDryFood: Locator;
  readonly royalCaninBrand: Locator;
  readonly filteredResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catsDryFood = page.locator('a[href="/catalog/koshki/korm/sukhoy-korm/"]').nth(1);
    this.royalCaninBrand = page.locator('[title="Royal Canin"]');
    this.filteredResults = page.locator('[class="product__info"]:has-text("Royal Canin")').first();
  }

  async gotoCatsDryFood() {
    await this.catsDryFood.click();
  }

  async royalCaninClickCheckbox() {
    await this.royalCaninBrand.click();
  }
}
