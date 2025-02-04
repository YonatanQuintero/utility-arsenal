require('dotenv').config();
const fs = require("fs").promises;
const path = require("path");

// Default English alphabets
const ALPHABET_UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHABET_LOWER_CASE = ALPHABET_UPPER_CASE.toLowerCase();

// Custom substitution alphabets (pulled from .env if provided)
const CUSTOM_ALPHABET_UPPER_CASE = process.env.CUSTOM_ALPHABET_UPPER_CASE || "QWERTYUIOPASDFGHJKLZXCVBNM";
const CUSTOM_ALPHABET_LOWER_CASE = CUSTOM_ALPHABET_UPPER_CASE.toLowerCase();

/**
 * Encrypts a given text by substituting letters using a custom alphabet.
 * @param {string} text - The text to encrypt
 * @returns {string} Encrypted text
 */
function encryptText(text) {
  return text
    .split('')
    .map(char => {
      let idx = ALPHABET_UPPER_CASE.indexOf(char);
      if (idx >= 0) {
        return CUSTOM_ALPHABET_UPPER_CASE[idx];
      }

      idx = ALPHABET_LOWER_CASE.indexOf(char);
      if (idx >= 0) {
        return CUSTOM_ALPHABET_LOWER_CASE[idx];
      }

      return char;
    })
    .join('');
}

/**
 * Decrypts a given text by substituting letters back to the standard alphabet.
 * @param {string} text - The text to decrypt
 * @returns {string} Decrypted text
 */
function decryptText(text) {
  return text
    .split('')
    .map(char => {
      let idx = CUSTOM_ALPHABET_UPPER_CASE.indexOf(char);
      if (idx >= 0) {
        return ALPHABET_UPPER_CASE[idx];
      }

      idx = CUSTOM_ALPHABET_LOWER_CASE.indexOf(char);
      if (idx >= 0) {
        return ALPHABET_LOWER_CASE[idx];
      }

      return char;
    })
    .join('');
}

/**
 * Reads a file from disk, returning its contents as a UTF-8 string.
 * @param {string} filename - Path to the file to read
 * @returns {Promise<string>} The file content
 */
async function readFile(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    return data;
  } catch (error) {
    console.error(`Error reading file "${filename}":`, error.message);
    return "";
  }
}

/**
 * Encrypts file contents.
 * @param {string} filename - Path to file to encrypt
 * @returns {Promise<string>} Encrypted file contents
 */
async function encryptFile(filename) {
  const data = await readFile(filename);
  return encryptText(data);
}

/**
 * Decrypts file contents.
 * @param {string} filename - Path to file to decrypt
 * @returns {Promise<string>} Decrypted file contents
 */
async function decryptFile(filename) {
  const data = await readFile(filename);
  return decryptText(data);
}

/**
 * Prints the usage instructions.
 */
function printUsage() {
  console.log(`Usage: node script.js <command> <argument>
  
Commands:
  encrypt <filePath>        Encrypts the contents of a file.
  decrypt <filePath>        Decrypts the contents of a file.
  encrypt-text <text>       Encrypts the given text (from command line).
  decrypt-text <text>       Decrypts the given text (from command line).

Examples:
  node script.js encrypt path/to/file.txt
  node script.js decrypt path/to/file.txt
  node script.js encrypt-text "Hello World"
  node script.js decrypt-text "Qitss Iwnbt"
`);
}

/**
 * Main function: handles command line arguments.
 */
async function main() {
  const [, , command, ...args] = process.argv;

  if (!command || !args.length) {
    printUsage();
    process.exit(1);
  }

  try {
    if (command === "encrypt") {
      // Encrypt file
      const filePath = path.resolve(args[0]);
      const result = await encryptFile(filePath);
      console.log("Encrypted text:\n", result);

    } else if (command === "decrypt") {
      // Decrypt file
      const filePath = path.resolve(args[0]);
      const result = await decryptFile(filePath);
      console.log("Decrypted text:\n", result);

    } else if (command === "encrypt-text") {
      // Encrypt text directly from command line
      const textToEncrypt = args.join(" ");
      const result = encryptText(textToEncrypt);
      console.log("Encrypted text:\n", result);

    } else if (command === "decrypt-text") {
      // Decrypt text directly from command line
      const textToDecrypt = args.join(" ");
      const result = decryptText(textToDecrypt);
      console.log("Decrypted text:\n", result);

    } else {
      console.log("Unknown command:", command);
      printUsage();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
