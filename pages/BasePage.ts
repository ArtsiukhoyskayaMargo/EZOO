import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly acceptAllCookies: Locator;
  readonly menuItem: Function;
  readonly categoryItem: Function;
  readonly cookieBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptAllCookies = page.locator('[class*="accept button"]');
    this.categoryItem = (categoryId: string) => page.locator(`#${categoryId}`).nth(1);
    this.menuItem = (path: string) => page.locator(`a[href="${path}"]`).nth(1);
    this.cookieBanner = page.locator('[class="privacy-notice"]');
  } 

  async goto() {
    await this.page.goto('/');
  }

  async acceptCookies() {
    await this.acceptAllCookies.click();
    await expect(this.cookieBanner).toBeHidden();
  }

  async openCategoryMenu(categoryId : string) {
    await this.categoryItem(categoryId).click();
  }

  async openMenuItem(path: string) {
    await this.menuItem(path).click();
  }
}
