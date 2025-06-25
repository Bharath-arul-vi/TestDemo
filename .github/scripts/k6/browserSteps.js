import { browser } from 'k6/browser';
import { check } from 'k6';

/**
 * Simulate user interaction on payment provider page
 * @param {string} redirectUrl
 */
export async function approvePaymentInBrowser(redirectUrl) {
  const page = await browser.newPage();

  try {
    await page.goto(redirectUrl);

    const title = await page.title();
    console.log(`Page title: "${title}"`);

    check(title, {
      'on Cembra Pay page': (t) => t.toLowerCase().includes('cembrapay'),
    });

    await page.waitForSelector('#AgreeTermsAndConditions', { timeout: 5000 });
    await page.click('#AgreeTermsAndConditions');
    console.log('Checked AgreeTermsAndConditions');

    await page.waitForSelector('#ConfirmPayment', { timeout: 5000 });
    await page.click('#ConfirmPayment');
    console.log('Clicked ConfirmPayment');

    await page.waitForNavigation({ waitUntil: 'load' });

    const currentUrl = page.url();
    console.log(`Redirected to: ${currentUrl}`);

    check(currentUrl, {
      'Redirected back to success page': (url) => url.includes('datatrans.ch/en'),
    });

  } catch (err) {
    console.error('Browser interaction failed:', err.message || err);
    throw err;
  } finally {
    try {
      await page.close();
    } catch (e) {
      console.warn('Error closing page:', e.message || e);
    }
  }
}
