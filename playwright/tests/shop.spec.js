const { test, expect } = require('@playwright/test');
const path = require('path');

const SHOP_URL = 'file://' + path.join(__dirname, '../../Main.html');

test.describe('Onlineshop - Page load', () => {
  test('Onlineshop loads and has a title', async ({ page }) => {
    await page.goto(SHOP_URL);
    await expect(page).toHaveTitle(/.+/);
  });

  test('page title contains "Vintage"', async ({ page }) => {
    await page.goto(SHOP_URL);
    const title = await page.title();
    expect(title).toContain('Vintage');
  });
});

test.describe('Onlineshop - Products visible', () => {
  test('product boxes are visible on page', async ({ page }) => {
    await page.goto(SHOP_URL);
    const boxes = page.locator('.box');
    const count = await boxes.count();
    expect(count).toBeGreaterThan(0);
  });

  test('at least 10 product boxes are displayed', async ({ page }) => {
    await page.goto(SHOP_URL);
    const boxes = page.locator('.box');
    const count = await boxes.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('product prices are visible', async ({ page }) => {
    await page.goto(SHOP_URL);
    const prices = page.locator('.price');
    const count = await prices.count();
    expect(count).toBeGreaterThan(0);
  });

  test('shop section heading is visible', async ({ page }) => {
    await page.goto(SHOP_URL);
    const heading = page.locator('#shop h2');
    await expect(heading).toBeVisible();
  });
});

test.describe('Onlineshop - Navigation', () => {
  test('navigation links are present', async ({ page }) => {
    await page.goto(SHOP_URL);
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('nav contains Shop link', async ({ page }) => {
    await page.goto(SHOP_URL);
    const shopLink = page.locator('nav a[href="#shop"]');
    await expect(shopLink).toBeVisible();
  });

  test('nav contains Impressum link', async ({ page }) => {
    await page.goto(SHOP_URL);
    const impressumLink = page.locator('nav a[href="Impressum.html"]');
    await expect(impressumLink).toBeVisible();
  });
});

test.describe('Onlineshop - Contact form', () => {
  test('contact form is present', async ({ page }) => {
    await page.goto(SHOP_URL);
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();
  });

  test('contact form has email and message inputs', async ({ page }) => {
    await page.goto(SHOP_URL);
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('contact form has a submit button', async ({ page }) => {
    await page.goto(SHOP_URL);
    const btn = page.locator('#contact-form button[type="submit"]');
    await expect(btn).toBeVisible();
  });
});

test.describe('Onlineshop - Box detail interaction', () => {
  test('clicking a product box calls showDetails and reveals section', async ({ page }) => {
    await page.goto(SHOP_URL);
    const firstBox = page.locator('.box').first();
    await firstBox.click();
    // #details section should no longer have the "hidden" class
    const detailsSection = page.locator('#details');
    const classList = await detailsSection.getAttribute('class');
    expect(classList).not.toContain('hidden');
  });

  test('detail text is populated after clicking a box', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.locator('.box').first().click();
    const text = await page.locator('#details-text').textContent();
    expect(text.trim().length).toBeGreaterThan(0);
  });
});

test.describe('Onlineshop - Footer', () => {
  test('footer is present', async ({ page }) => {
    await page.goto(SHOP_URL);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('footer contains copyright notice', async ({ page }) => {
    await page.goto(SHOP_URL);
    const footerText = await page.locator('footer').textContent();
    expect(footerText).toContain('2025');
  });
});
