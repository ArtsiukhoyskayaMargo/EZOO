import { test as baseTest } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

export const test = baseTest.extend<MyFixtures>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page);
    await use(pageManager);
  },
});