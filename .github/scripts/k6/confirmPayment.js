import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL,getHeadersConfirm } from './config.js';

/**
 * Confirm payment
 * @param {string} paymentId
 * @param {string} correlationId
 * @param {object} confirmPayload - JSON stringified payload
 * @param {string} merchantId
 * @returns {boolean} success
 */
export function confirmPayment(paymentId, correlationId, confirmPayload, merchantId) {
  const url = `${BASE_URL}/payflow/api/v1/payments/${paymentId}/debit/confirmations/1`;
  console.log(`confirmPayment url: ${url}`);
  const params = {
    headers: getHeadersConfirm(correlationId, merchantId),
  };

  const res = http.post(url, confirmPayload, params);

  check(res, {
    'confirmPayment status 200': (r) => r.status === 200,
    'confirmPayment successful': (r) => r.json('status') === 'SUCCESSFUL',
  });

  if (res.status !== 200 || res.json('status') !== 'SUCCESSFUL') {
    throw new Error('confirmPayment failed');
  }

  return true;
}
