export const BASE_URL = 'https://api.sandbox.datatrans.com';
export const WEBHOOK_URL = 'https://webhook.site/0321495b-38ac-4b50-bb77-9242434c61aa';
export const REDIRECT_URL = 'https://www.datatrans.ch/en/';

export const API_KEY = 'testing';

export const HEADERS_START_PAYMENT = {
  'X-API-KEY': API_KEY,
  'X-WEBHOOK-URL': WEBHOOK_URL,
};

export function getHeadersDebit(correlationId, merchantId) {
  return {
    'Content-Type': 'application/json',
    'X-MERCHANT-ID': merchantId,
    'X-REDIRECT-URL': REDIRECT_URL,
    'X-API-KEY': API_KEY,
    'X-CORRELATION-ID': correlationId,
  };
}

export function getHeadersConfirm(correlationId, merchantId) {
  return {
    'Content-Type': 'application/json',
    'X-MERCHANT-ID': merchantId,
    'X-REDIRECT-URL': REDIRECT_URL,
    'X-API-KEY': API_KEY,
    'X-CORRELATION-ID': correlationId,
  };
}
