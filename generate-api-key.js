const crypto = require('crypto');
function generateRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

function generateApiKey() {
  const apiKey = generateRandomString(32);
  console.log('Generated API key:');
  console.log(apiKey);
  console.log('Please keep this key secure and do not share it with anyone.');
}

generateApiKey();