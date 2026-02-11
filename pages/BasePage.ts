import { type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly acceptAllCookies: Locator;
  readonly menuItem: Function;
  readonly openCategoryItem: Function;

  constructor(page: Page) {
    this.page = page;
    this.acceptAllCookies = page.locator('[class*="accept button"]');
    this.menuItem = (path: string) => page.locator(`a[href="${path}"]`).nth(1);
    this.openCategoryItem = (categoryId: string) => page.locator(`#${categoryId}`).nth(1);
  } 

  async goto() {
    await this.page.goto('/');
  }

  async acceptCookies() {
    await this.acceptAllCookies.click();
  }

  async clickCategory(categoryId : string) {
    await this.openCategoryItem(categoryId).click();
  }

  async gotoMenuItem(path: string) {
    await this.menuItem(path).click();
  }
}
