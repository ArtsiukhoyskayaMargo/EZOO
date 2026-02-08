import { type Locator, type Page } from '@playwright/test';

export class DeliveryModalPage {
  readonly page: Page;
  readonly modal: Locator;
  readonly deliveryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('[class*="suggest-popup user_delivery"]');
    this.deliveryButton = page.locator('[class="choose-user-delivery-type "]').nth(0);
  }

  async clickDeliveryButton() {
    await this.deliveryButton.click();
  }
}
