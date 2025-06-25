import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL,HEADERS_START_PAYMENT } from './config.js';

/**
 * Starts a payment
 * @param {string} correlationId
 * @returns {string} paymentId
 */
export function startPayment(correlationId) {
  const params = {
    headers: Object.assign({}, HEADERS_START_PAYMENT, {
      'X-CORRELATION-ID': correlationId,
    }),
  };

  const res = http.post(`${BASE_URL}/payflow/api/v1/payments`, null, params);

  check(res, {
    'startPayment status 200': (r) => r.status === 200,
    'startPayment paymentId exists': (r) => !!r.json('paymentId'),
  });

  if (res.status !== 200 || !res.json('paymentId')) {
    throw new Error('startPayment failed');
  }

  return res.json('paymentId');
}
