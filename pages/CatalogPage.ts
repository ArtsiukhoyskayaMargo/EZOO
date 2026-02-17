import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { normalizePrice } from '../utils/helpers';
import { expect } from '@playwright/test';

export class CatalogPage extends BasePage {
  readonly page: Page;
  readonly deliveryOption: Function;
  readonly firstProductCard: Locator;
  readonly productTitle: Locator;
  readonly productTitles: Locator;
  readonly productPrice: Locator;
  readonly filterCheckboxByName: Function;
  readonly addToCart: Locator;
  readonly cartButton: Locator;

  
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.deliveryOption = (option: string) => page.locator(`[class="choose-user-delivery-type "]:has-text("${option}")`);
    this.firstProductCard = page.locator('[class*="product viewed"]').nth(0);
    this.productTitle =  this.firstProductCard.locator('[class*="product__info"] p[class=h4]');
    this.productTitles = this.page.locator('[class*="product viewed"]').locator('[class*="product__info"] p.h4');
    this.productPrice = this.firstProductCard.locator('[class*="price-block"]');
    this.filterCheckboxByName = (name: string) => page.locator(`.form-group :text-is("${name}")`);

    this.addToCart = this.firstProductCard.locator('[class*="product__basket-action"]:has-text("В корзину")');
    this.cartButton = page.locator('[class="name"]:has-text("Корзина")');
  }

  async selectDeliveryOption(option: string) {
    await this.deliveryOption(option).click();
  }

  async filterBy(name: string) {
    await this.filterCheckboxByName(name).click();
  }

  async isFilteredBy(name: string) {
    const titles = await this.productTitles.allTextContents();
    for (const title of titles) {
    expect(title).toContain(name);
  }
}

  async addFirstFilteredProductToCart(): Promise<{ title: string, price: string }> {
    const title = await this.productTitle.innerText();

    const rawPrice = await this.productPrice.innerText();
    const price = normalizePrice(rawPrice);
 
    await this.addToCart.click();
    return { title, price };
  }
}