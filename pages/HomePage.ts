import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly acceptAllCookies: Locator;
  readonly catCategory: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.acceptAllCookies = page.locator('[class*="accept button"]');
    this.catCategory = page.locator('#cat').nth(1);
  }

  async goto() {
    await this.page.goto('/');
  }
  async acceptCookies() {
    await this.acceptAllCookies.click();
  }
  async gotoCategory() {
    await this.catCategory.click();
  }
}
