import { test } from '@playwright/test';
import fs from 'fs';

test.afterEach(async ({}, testInfo) => {
  const traceFile = testInfo.attachments.find(
    (attachment) =>
      attachment.name === 'trace' &&
      attachment.path &&
      fs.existsSync(attachment.path)
  );

  if (traceFile?.path) {
    await testInfo.attach('trace', {
      path: traceFile.path,
      contentType: 'application/zip',
    });
  }
});