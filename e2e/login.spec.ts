import { expect, test } from '@playwright/test';

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder('youremail@example.com').fill('test@gmail.com');
    await page.getByPlaceholder('••••••••').fill('password123');
    await page.getByRole('button', { name: 'Continue' }).click();

    // After successful login, should redirect to home
    await expect(page).toHaveURL('/');
  });
});
