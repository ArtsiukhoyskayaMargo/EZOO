import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { normalizePrice } from '../utils/helpers';
import { expect } from '@playwright/test';

export class CatalogPage extends BasePage {
  readonly page: Page;
  readonly deliveryOption: Function;
  readonly productTitle: Function;
  readonly productTitles: Function;
  readonly productPrice: Function;
  readonly filterCheckboxByName: Function;
  readonly addToCartItem: Function;
  readonly productCountInput : Function;
  readonly addOneItemToCart: Function;
  readonly cartButton: Locator;
  readonly productCard: Function;

  
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.deliveryOption = (option: string) => page.locator(`[class="choose-user-delivery-type "]:has-text("${option}")`);
    this.productCard = (index: number) => page.locator('[class*="product viewed"]').nth(index);
    this.productTitle =  (index: number) => this.productCard(index).locator('[class*="product__info"] p[class=h4]');
    this.productTitles = () => page.locator('[class*="product viewed"]').locator('[class*="product__info"] p.h4');
    this.productPrice = (index: number) => this.productCard(index).locator('[class*="price-block"]');
    this.filterCheckboxByName = (name: string) => page.locator(`.form-group :text-is("${name}")`);
    this.addOneItemToCart = (index: number) => this.productCard(index).locator('[class*="basket-action-counter--plus"]');
    this.productCountInput = (index: number) => this.productCard(index).locator('[class="offer-count-input-catalog"]');
    

    this.addToCartItem = (index: number) => this.productCard(index).locator('[class*="product__basket-action"]:has-text("В корзину")');
    this.cartButton =  page.locator('[class="name"]:has-text("Корзина")');
  }

  async selectDeliveryOption(option: string) {
    await this.deliveryOption(option).click();
  }

  async filterBy(name: string) {
    await this.filterCheckboxByName(name).click();
  }

  async isFilteredBy(name: string) {
    await expect(this.productCard(0)).toContainText(name);

    const titles = await this.productTitles().all();
    for (const title of titles) {
      expect(await title.innerText()).toContain(name);
    }
}

  
  async addFirstProductToCart(index: number): Promise<{ title: string, price: string }> {
    const title = await this.productTitle(index).innerText();

    const rawPrice = await this.productPrice(index).innerText();
    const price = normalizePrice(rawPrice);
 
    await this.addToCartItem(index).click();
    return { title, price };
  }
}