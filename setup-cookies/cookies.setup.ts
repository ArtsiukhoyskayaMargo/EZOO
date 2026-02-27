import path from 'path';
import { test } from '../testFixtures/fixtures';

const cookiesFile = path.join(__dirname, 'user.json');

test('01 setup cookies and save storage state', async ({ pageManager }) => {
          await pageManager.homePage.goto();
          await pageManager.homePage.acceptCookies();
          await pageManager.page.context().storageState({ path: cookiesFile });
});
