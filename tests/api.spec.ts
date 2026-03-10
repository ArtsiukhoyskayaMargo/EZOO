import { test } from '../testFixtures/fixtures';
import { expect } from '@playwright/test';

test('Should perform a GET request and validate the response', async ({ apiClient }) => {
const responseData = await apiClient.get<{id: string; url: string; width: number; height: number }[]>('images/search');
expect(responseData).toBeTruthy();  
expect(responseData[0]).toMatchObject({
    id: expect.any(String),
    url: expect.any(String),
    width: expect.any(Number),
    height: expect.any(Number),
  });
});
