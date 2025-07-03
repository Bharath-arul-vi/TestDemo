import crypto from 'k6/crypto';

export function generateUuidV4() {
  const bytes = crypto.randomBytes(16);

  // Set version 4 and variant bits
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  // Convert to hex string manually
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');

  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  console.log(`Generated UUID: ${uuid}`);
  return uuid;
}
