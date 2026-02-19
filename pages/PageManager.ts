import { Page } from '@playwright/test';
import { HomePage } from './HomePage';
import { CatalogPage } from './CatalogPage';
import { CartPage } from './CartPage';

export class PageManager {
  page: Page;
  homePage;
  catalogPage;
  cartPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(this.page);
    this.catalogPage = new CatalogPage(this.page);
    this.cartPage = new CartPage(this.page);
  }
}
