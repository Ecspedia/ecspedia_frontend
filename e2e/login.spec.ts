import { test } from '@playwright/test';

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    // Wait for React hydration to complete
    await page.waitForLoadState('networkidle');

    await page.locator('input[type="email"]').fill('test@gmail.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForURL('/');
  });
});
