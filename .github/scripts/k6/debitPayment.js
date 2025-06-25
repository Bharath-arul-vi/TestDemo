import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, getHeadersDebit } from './config.js';

/**
 * Debit payment authorization
 * @param {string} paymentId
 * @param {string} correlationId
 * @param {object} debitPayload - JSON stringified payload
 * @param {string} merchantId
 * @returns {string} redirectUrl
 */
export function debitPayment(paymentId, correlationId, debitPayload, merchantId) {
  const url = `${BASE_URL}/payflow/api/v1/payments/${paymentId}/debit/authorization`;
  console.log(`Debit payment url: ${url}`);
  const params = {
    headers: getHeadersDebit(correlationId, merchantId),
  };

  const res = http.post(url, debitPayload, params);

  check(res, {
    'debitPayment status 200': (r) => r.status === 200,
    'debitPayment redirectUrl exists': (r) => !!r.json('authorization').paymentRedirectUrl,
  });

  if (res.status !== 200) {
    throw new Error(`debitPayment failed with status ${res.status}`);
  }

  const redirectUrl = res.json('authorization').paymentRedirectUrl;

  if (!redirectUrl) {
    throw new Error('Redirect URL missing in debitPayment response');
  }

  return redirectUrl;
}
