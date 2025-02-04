#!/usr/bin/env node

// Get command line arguments (skip the first two: node and script name)
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: node base64.js <encode|decode> <text>");
  process.exit(1);
}

const [mode, ...inputParts] = args;
// Join parts in case the input text contains spaces
const inputText = inputParts.join(" ");

if (mode === "encode") {
  // Encode the input text to Base64
  const encoded = Buffer.from(inputText, "utf8").toString("base64");
  console.log(encoded);
} else if (mode === "decode") {
  try {
    // Decode the Base64 text back to UTF-8
    const decoded = Buffer.from(inputText, "base64").toString("utf8");
    console.log(decoded);
  } catch (error) {
    console.error("Error decoding text. Make sure it is valid Base64.");
    process.exit(1);
  }
} else {
  console.error('Invalid mode. Please use either "encode" or "decode".');
  process.exit(1);
}

