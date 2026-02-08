import { type Locator, type Page } from '@playwright/test';

export class SelectCatFoodPage {
  readonly page: Page;
  readonly productCard: Locator;
  readonly productPrice: Locator;
  readonly productTitle: Locator;
  readonly packaging: Locator;
  readonly addToTrash: Locator;
  readonly trushButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.productCard = page.locator('[class="product viewed-727136"]');
    this.productPrice = this.productCard.locator('[class="price-block"]:has-text("127.47 р./шт")');
    this.productTitle = this.productCard.locator('"Royal Canin Ageing Sterilised 11+ Корм сухой для стерилизованных кошек старше 11 лет 4кг"');
    this.packaging = this.productCard.locator('[class="fasovka"]:has-text("Фасовка: 4 кг")');
    this.addToTrash = this.productCard.locator('[data-product-id="727136"]').nth(4);
    this.trushButton = page.locator('[class="name"]:has-text("Корзина")');
  }
}