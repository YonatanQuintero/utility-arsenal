#!/usr/bin/env node

const crypto = require('crypto');

/**
 * Displays usage instructions.
 */
const displayUsage = () => {
  console.log(`
Usage: node crypto-tool.js <operation> <privateKey> <text> [algorithm]

Parameters:
  operation   - "encrypt" or "decrypt"
  privateKey  - Your private key for encryption/decryption
  text        - Text to encrypt or decrypt
  algorithm   - (Optional) Encryption algorithm (default: aes-256-gcm)

Examples:
  Encrypt:
    node crypto-tool.js encrypt myPrivateKey "Hello, World!"
  
  Decrypt:
    node crypto-tool.js decrypt myPrivateKey "encryptedTextHere"

  Encrypt with a different algorithm:
    node crypto-tool.js encrypt myPrivateKey "Hello, World!" aes-192-gcm
`);
};

/**
 * Initializes and derives a key from the private key using scrypt.
 * @param {string} privateKey - The private key provided by the user.
 * @param {number} keyLength - The desired key length.
 * @returns {Buffer} - The derived key.
 */
const initializeKey = (privateKey, keyLength = 32) => {
  if (!privateKey) {
    throw new Error('Private key is required.');
  }
  // Use a fixed salt for simplicity; consider using a random salt in production
  const salt = 'salt';
  return crypto.scryptSync(privateKey, salt, keyLength);
};

/**
 * Encrypts the given text using the specified algorithm and key.
 * @param {string} text - The plaintext to encrypt.
 * @param {Buffer} key - The encryption key.
 * @param {string} algorithm - The encryption algorithm.
 * @returns {string} - The encrypted text in the format iv:encrypted:tag.
 */
const encrypt = (text, key, algorithm = 'aes-256-gcm') => {
  if (!text) {
    throw new Error('Text to encrypt is required.');
  }

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${encrypted.toString('hex')}:${tag.toString('hex')}`;
};

/**
 * Decrypts the given encrypted text using the specified algorithm and key.
 * @param {string} encryptedText - The encrypted text in the format iv:encrypted:tag.
 * @param {Buffer} key - The decryption key.
 * @param {string} algorithm - The decryption algorithm.
 * @returns {string} - The decrypted plaintext.
 */
const decrypt = (encryptedText, key, algorithm = 'aes-256-gcm') => {
  if (!encryptedText) {
    throw new Error('Encrypted text is required.');
  }

  const parts = encryptedText.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted text format. Expected format: iv:encrypted:tag');
  }

  const [ivHex, encryptedHex, tagHex] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
};

/**
 * Parses command-line arguments and executes the appropriate operation.
 */
const main = () => {
  const args = process.argv.slice(2);

  if (args.length < 3 || args.length > 4) {
    displayUsage();
    process.exit(1);
  }

  const [operation, privateKey, text, algorithm] = args;

  try {
    const defaultAlgorithm = 'aes-256-gcm';
    const selectedAlgorithm = algorithm || defaultAlgorithm;
    const keyLength = selectedAlgorithm.includes('192') ? 24 : selectedAlgorithm.includes('256') ? 32 : 16;
    const key = initializeKey(privateKey, keyLength);

    let result;
    if (operation === 'encrypt') {
      result = encrypt(text, key, selectedAlgorithm);
      console.log(`Encrypted Text:\n${result}`);
    } else if (operation === 'decrypt') {
      result = decrypt(text, key, selectedAlgorithm);
      console.log(`Decrypted Text:\n${result}`);
    } else {
      console.error('Invalid operation. Must be "encrypt" or "decrypt".');
      displayUsage();
      process.exit(1);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Execute the main function
main();