import { test } from '../testFixtures/fixtures';
import { expect } from '@playwright/test';
import { apiPaths, breedIds } from '../appConstants/appConstants';
import '../utils/allure-trace-attach';

test('01 Should perform a GET request and validate the response', async ({ apiClient }) => {
  const responseData = await apiClient.get<{ id: string; url: string; width: number; height: number }[]>(apiPaths.imagesSearch);

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
  const responseData = await apiClient.get<{ id: string; url: string; width: number; height: number }[]>(apiPaths.imagesSearch, { limit: 10 });

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

[breedIds.abyssinian, breedIds.bengal].forEach((breedId) => {
  test(`03 GET images/search for breed ${breedId} returns valid cat image`, async ({ apiClient }) => {
    const responseData = await apiClient.get<{ id: string; url: string; width: number; height: number }[]>(apiPaths.imagesSearch, { breed_ids: breedId });

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