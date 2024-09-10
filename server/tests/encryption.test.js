require('dotenv').config({ path: './.env' });
const { encrypt, decrypt } = require('../utils/encryption');

test('Encrypt and decrypt text', () => {
  const text = 'hello';
  const encrypted = encrypt(text);
  const decrypted = decrypt(encrypted);
  expect(decrypted).toBe(text);
});
