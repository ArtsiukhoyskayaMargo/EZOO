import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { normalizePrice } from '../utils/helpers';


export class CatalogPage extends BasePage {
  readonly page: Page;
  readonly deliveryOption: Function;
  readonly productCard: Locator;
  readonly productPrice: Locator;
  readonly productTitle: Function;
  readonly filterByCheckbox: Function;
  readonly addToCart: Locator;
  readonly cartButton: Locator;

  
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.deliveryOption = (option: string) => page.locator(`[class="choose-user-delivery-type "]`).filter({ hasText: option });
    this.productCard = page.locator('[class*="product viewed"]');
    this.productPrice = this.page.locator('[class*="price-block"]');
    this.productTitle = (title: string) => this.productCard.filter({ hasText: title });
    this.filterByCheckbox = (name: string) => page.locator(`[class="form-group"]:has-text("${name}")`).nth(0);

    this.addToCart = this.productCard.locator('[class*="product__basket-action"]:has-text("В корзину")');
    this.cartButton = page.locator('[class="name"]:has-text("Корзина")');
  }

  async clickDeliveryOption(option: string) {
    await this.deliveryOption(option).click();
  }

  async clickFilterByCheckbox(name: string) {
    await this.filterByCheckbox(name).click();
  }

  async addFirstFilteredProductToCart(filterName: string): Promise<{ title: string, price: string }> {
    const firstCard = this.productCard.first();
    const title = await firstCard.locator('[class="h4"]').innerText();
    const rawPrice = await firstCard.locator('[class*="price-block"]').innerText();
    const price = normalizePrice(rawPrice);
 
    await firstCard.locator('[class*="product__basket-action"]:has-text("В корзину")').click();
    return { title, price };
  }
}