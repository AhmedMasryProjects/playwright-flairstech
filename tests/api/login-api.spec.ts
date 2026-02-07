import { test, expect } from '@playwright/test';

test.describe('Verify Login API', () => {
  const baseURL = 'https://automationexercise.com/api';

  test('should verify login successfully with valid credentials', async ({ request }) => {
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    if (!email || !password) {
      throw new Error('Missing TEST_USER_EMAIL or TEST_USER_PASSWORD env vars');
    }

    const response = await request.post(`${baseURL}/verifyLogin`, {
      form: { email, password }, // API expects form fields
    });

    // Assert status code
    expect(response.status()).toBe(200);

    // Assert response body contains success message
    const body = await response.json();
    expect(body).toHaveProperty('message', 'User exists!');
  });

  test('should fail verify login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${baseURL}/verifyLogin`, {
      form: { email: 'invalid@example.com', password: 'wrongpassword' },
    });

    // API still returns 200 but with error message
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('message', 'User not found!');
  });
});
