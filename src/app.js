const express = require('express');
const crypto = require('crypto');

// Create a new express app
const app = express();

// Use express's built-in JSON parser
app.use(express.json());

function generateHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

const globalTokens = {};

app.post('/tokenize', (req, res) => {
  const accountNumbers = req.body;
  const result = accountNumbers.map((s) => {
    const token = generateHash(s);
    globalTokens[token] = s;
    return token;
  });
  res.json(result);
});

app.post('/detokenize', (req, res) => {
  const inputTokens = req.body;
  const result = inputTokens.map((token) => globalTokens[token]);
  res.json(result);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
