import { test } from "@playwright/test";

test.describe('group1  - suite1', () => {
  test('test1', async ({ page }) => {
    console.log('group1 - suite1 - test1');
  });
    test('test2', async ({ page }) => {
    console.log('group1 - suite1 - test2');
  });
    test('test3', async ({ page }) => {
    console.log('group1 - suite1 - test3');
  });
    test('test4', async ({ page }) => {
    console.log('group1 - suite1 - test4');
  });
    test('test5', async ({ page }) => {
    console.log('group1 - suite1 - test5');
  });
});
  