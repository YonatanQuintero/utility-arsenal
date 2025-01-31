# Custom Substitution Cipher (Node.js)

A simple Node.js script to encrypt or decrypt text files using a custom substitution cipher. The default cipher swaps each letter of the English alphabet with a “scrambled” version of the alphabet. You can override the default mapping using environment variables.

## Features

- Encrypts or decrypts any text file (UTF-8).
- Allows you to customize the alphabet substitution using a `.env` file.
- Simple command-line usage.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended).

---

## Installation

1. **Clone or download** this repository onto your machine.
2. **Install dependencies**:
   ```bash
   npm install
   ```
   
   Or if you only need the `dotenv` package (in case you don't have any other dependencies):
   ```bash
   npm install dotenv
   ```

3. (Optional) **Create a `.env` file** to customize the alphabet mapping. For example:
   ```dotenv
   CUSTOM_ALPHABET_UPPER_CASE=QWERTYUIOPASDFGHJKLZXCVBNM
   ```
   If no `.env` is provided, it uses the default substitution alphabet:
   ```
   QWERTYUIOPASDFGHJKLZXCVBNM
   ```

---

## Usage

1. **Encrypt a file**:
   ```bash
   node index.js encrypt path/to/inputFile.txt path/to/outputFile.txt
   ```
   - `path/to/inputFile.txt`: The file you want to encrypt.
   - `path/to/outputFile.txt`: The file in which to save the encrypted text. If you omit this, the script prints the encrypted result directly to the console.

2. **Decrypt a file**:
   ```bash
   node index.js decrypt path/to/inputFile.txt path/to/outputFile.txt
   ```
   - Same usage as **encrypt**, but for decryption.

### Examples

- **Encrypt, printing to console**:
  ```bash
  node index.js encrypt data/plain.txt
  ```

- **Decrypt, saving to a file**:
  ```bash
  node index.js decrypt data/encrypted.txt data/decrypted_output.txt
  ```

---

## Customizing the Alphabet

By default, uppercase `A-Z` is mapped to `QWERTYUIOPASDFGHJKLZXCVBNM`. You can override this by setting the environment variable `CUSTOM_ALPHABET_UPPER_CASE` in your `.env` file:

```env
CUSTOM_ALPHABET_UPPER_CASE=ZYXWVUTSRQPONMLKJIHGFEDCBA
```

Your custom alphabet must be **26 unique uppercase letters**; the script will automatically compute the lowercase equivalent for `a-z`.

---

## Contributing

Feel free to [open an issue](https://github.com/your-repo/issues) or submit pull requests if you have feature suggestions or bug reports.

---

## License

This script is licensed under the [MIT License](LICENSE). You are free to modify and distribute it as you see fit.