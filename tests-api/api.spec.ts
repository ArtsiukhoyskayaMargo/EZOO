import { test } from '../testFixtures/fixtures';
import { expect } from '@playwright/test';

test('01 Should perform a GET request and validate the response', async ({ apiClient }) => {
const responseData = await apiClient.get<{id: string; url: string; width: number; height: number }[]>('images/search');
expect(responseData).toBeTruthy();
expect(Array.isArray(responseData)).toBe(true);  
expect(responseData).toHaveLength(1);
expect(responseData[0]).toMatchObject({
    id: expect.any(String),
    url: expect.any(String),
    width: expect.any(Number),
    height: expect.any(Number),
});
});

test('02 Should perform a GET request and validate the response', async ({ apiClient }) => {
const responseData = await apiClient.get<{id: string; url: string; width: number; height: number }[]>('images/search?limit=10');

expect(responseData).toBeTruthy();
expect(Array.isArray(responseData)).toBe(true);  
expect(responseData).toHaveLength(10);

expect(responseData).toMatchObject(
    Array(10).fill({
      id: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    })
  );
});
