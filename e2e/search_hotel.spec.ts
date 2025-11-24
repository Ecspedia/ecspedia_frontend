import { expect, test } from '@playwright/test';

test.describe('Search Hotels', () => {
  test('should search for hotels by selecting a location', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Where to?').first().click();
    //Top Locations are the first 5 locations in the list
    await page.getByText('New York').first().click();
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page).toHaveURL(/\/search-hotels/);
  });
});
