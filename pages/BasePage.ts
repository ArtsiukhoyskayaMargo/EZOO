import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly acceptAllCookies: Locator;
  readonly menuItem: Function;
  readonly categoryItem: Function;

  constructor(page: Page) {
    this.page = page;
    this.acceptAllCookies = page.locator('[class*="accept button"]');
    this.categoryItem = (categoryId: string) => page.locator(`#${categoryId}`).nth(1);
    this.menuItem = (path: string) => page.locator(`a[href="${path}"]`).nth(1);
  } 

  async goto() {
    await this.page.goto('/');
  }

  async acceptCookies() {
    await this.acceptAllCookies.click();
  }

  async openCategoryMenu(categoryId : string) {
    await this.categoryItem(categoryId).click();
  }

  async openMenuItem(path: string) {
    await this.menuItem(path).click();
  }
}
