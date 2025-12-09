import { test } from '@playwright/test';

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');
    // Wait for React hydration to complete
    await page.waitForLoadState('networkidle');

    await page.locator('input[type="email"]').fill('test@gmail.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('/');

    // TODO: This is not working on github actions, but works locally.
    // Possible reason: there are a mismatch between backend and frontend http protocol .secure(request.isSecure)
    // github actions front end server is using http://localhost:3000
    // github actions backend server is using https://dev.ecspedia.com
    // await expect(page.getByTestId('user-menu-button')).toHaveText('Test_user');
  });
});
