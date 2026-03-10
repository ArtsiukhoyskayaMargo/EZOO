import { test as baseTest } from '@playwright/test';
import { PageManager } from '../pages/PageManager';
import { ApiClient } from '../API/apiClient';

type MyFixtures = {
  pageManager: PageManager;
};

type MyWorkerFixtures = {
  apiClient: ApiClient;
};

export const test = baseTest.extend<MyFixtures, MyWorkerFixtures>({
    pageManager: [
      async ({ page }, use) => {
      const pageManager = new PageManager(page);
      await use(pageManager);
    },
    { scope: 'test' }
 ], 
    apiClient: [ 
      async ({ }, use) => {
      const apiClient = new ApiClient(process.env.API_BASE_URL!);
      await apiClient.create();
      await use(apiClient);
      await apiClient.dispose();
    },
    { scope: 'worker', auto: true }
  ],
});