const { test, expect } = require('@playwright/test');

const postalCode = '95112';
const buildingMaterial = 'straw';
const waterProximity = 'true';
const quoteApi = 'https://sure-qa-challenge.vercel.app/api/quote';

test.describe('Generating insurance quotes', () => {
  test('postal code is set', async ({ page }) => {
    await page.goto('https://sure-qa-challenge.vercel.app/');

    await page.locator('[name="postalCode"]').fill(postalCode);

    await page.locator('[type="submit"]').click();

    const sessionValue = await page.evaluate(() => {
      return sessionStorage.getItem('application:postalCode');
    });

    expect(sessionValue == postalCode);
  });

  test('building material is set', async ({ page }) => {
    await page.goto('https://sure-qa-challenge.vercel.app/building-material');

    await page.locator('[value="straw"]').check();

    await page.locator('[type="submit"]').click();

    const sessionValue = await page.evaluate(() => {
      return sessionStorage.getItem('application:buildingMaterial');
    });

    expect(sessionValue == buildingMaterial);
  });

  test('water proximity is set', async ({ page }) => {
    await page.goto('https://sure-qa-challenge.vercel.app/water-proximity');

    await page.locator('[value="true"]').check();

    await page.locator('[type="submit"]').click();

    const sessionValue = await page.evaluate(() => {
      return sessionStorage.getItem('application:waterProximity');
    });

    expect(sessionValue == waterProximity);
  });
 
  test('quote api success', async ({request}) => {
    const response = await request.post(quoteApi, {
      data: {
        postalCode: postalCode,
        buildingMaterial: buildingMaterial,
        waterProximity: waterProximity
      }
    });
   
    expect(response.status()).toBe(200);
  });
});