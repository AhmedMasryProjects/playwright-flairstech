import { test, expect } from '@playwright/test';

test.describe('Verify Login API', () => {

  const baseURL = process.env.BASE_URL!;


  test('should verify login successfully with valid credentials', async ({ request }) => {
    const email = process.env.TEST_USER_EMAIL!;
    const password = process.env.TEST_USER_PASSWORD!;

    if (!email || !password) {
      throw new Error('Missing TEST_USER_EMAIL or TEST_USER_PASSWORD env vars');
    }

    const response = await request.post(`${baseURL}/verifyLogin`, {
      form: { email, password }, 
    });

    
    expect(response.status()).toBe(200);

    
    const body = await response.json();
    expect(body).toHaveProperty('message', 'User exists!');
  });


  test('should fail verify login with invalid credentials', async ({ request }) => {
    const response = await request.post(`${baseURL}/verifyLogin`, {
      form: { email: 'invalid@example.com', password: 'wrongpassword' },
    });

    
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('message', 'User not found!');
  });
});
