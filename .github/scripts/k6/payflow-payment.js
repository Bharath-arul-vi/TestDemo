import { uuidv4 } from './utils.js';
import { startPayment } from './startPayment.js';
import { debitPayment } from './debitPayment.js';
import { confirmPayment } from './confirmPayment.js';
import { approvePaymentInBrowser } from './browserSteps.js';
import { buildDebitPayload,buildConfirmPayload } from './payloadBuilder.js';

export const options = {
  scenarios: {
    browser_test: {
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 5,
      exec: 'runBrowserScenario',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<20000'],
  },
};

export async function runBrowserScenario() {
  const correlationId = uuidv4();

  // 1. Start payment
  const paymentId = startPayment(correlationId);
  console.log(`Started payment with paymentId: ${paymentId}`);
 
  const debitPayload = buildDebitPayload();
  
  // 2. Debit payment
  const merchantId = '1110017078';
  const redirectUrl = debitPayment(paymentId, correlationId, debitPayload, merchantId);
  console.log('Redirect URL received:', redirectUrl);

  // 3. Approve payment in browser
  await approvePaymentInBrowser(redirectUrl);
  
  // 4. Confirm Payment
  const confirmPayload = buildConfirmPayload();
   
  confirmPayment(paymentId, correlationId, confirmPayload, merchantId);
}
