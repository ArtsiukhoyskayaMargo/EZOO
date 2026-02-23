import { expect, chromium } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, 'user.json');

export default async function login() {
      const browser = await chromium.launch();
      const context = await browser.newContext();     
      const page = await context.newPage();

      page.setDefaultNavigationTimeout(30000);
      page.setDefaultTimeout(30000);
      try {
          await page.goto(process.env.BASE_URL!);
          await page.locator('[class*="accept button"]').click();
          await expect(page.locator('[class="privacy-notice"]')).toBeHidden();
          await page.context().storageState({ path: authFile });
      }
      catch (error) {
          const screenshotsPath = `test-results/auth-failure-${Date.now()}.png`;
          await page.screenshot({ path: screenshotsPath, fullPage: true });
          throw error;
      } finally {
          await browser.close();
      }
}
