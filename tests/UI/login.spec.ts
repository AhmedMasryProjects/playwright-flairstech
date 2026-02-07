import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('User Login Flow', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to site
    await page.goto('/');

    // Go to login page
    await loginPage.clickSignupLogin();

    // Read credentials from environment variables
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    if (!email || !password) {
      throw new Error(
        'Missing credentials. Please set TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables.'
      );
    }

    // Perform login
    await loginPage.login(email, password);

    // Assertion: username should appear
    const loggedInUser = page.locator('li:has-text("Logged in as")');
    await expect(loggedInUser).toContainText(process.env.TEST_USER_NAME || '');
  });
});
