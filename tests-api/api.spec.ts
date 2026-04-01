import { test } from '../testFixtures/fixtures';
import { expect } from '@playwright/test';

test('01 Should perform a GET request and validate the response', async ({ apiClient }) => {
  const responseData = await apiClient.get<{ id: string; url: string; width: number; height: number }[]>('images/search');

  expect(responseData).toBeTruthy();
  expect(responseData).toHaveLength(1);
  expect(responseData[0]).toMatchObject({
    id: expect.any(String),
    url: expect.any(String),
    width: expect.any(Number),
    height: expect.any(Number),
  });
});

test('02 Should validate all 10 cat images in response', async ({ apiClient }) => {
  const responseData = await apiClient.get<{ id: string; url: string; width: number; height: number }[]>('images/search', { limit: 10 });

  expect(responseData).toBeTruthy();
  expect(responseData).toHaveLength(10);

  for (const cat of responseData) {
    expect(cat).toMatchObject({
      id: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
  }
});

['abys', 'beng'].forEach((breedId) => {
  test(`03 GET images/search for breed ${breedId} returns valid cat image`, async ({ apiClient }) => {
    const responseData = await apiClient.get<{ id: string; url: string; width: number; height: number }[]>('images/search', { breed_ids: breedId });

    expect(responseData).toBeTruthy();
    expect(responseData).toHaveLength(1);
    expect(responseData[0]).toMatchObject({
      id: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
  });
});