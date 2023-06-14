const express = require('express');
const crypto = require('crypto');
const Loki = require('lokijs');

// Create a new Express app
const app = express();

// Use Express's built-in JSON parser
app.use(express.json());

// Create a new LokiJS database
const db = new Loki('tokens.db');

// Add a collection to the database with a unique index on 'acc' and 'token'
const pairs = db.addCollection('tokens', { unique: ['acc', 'token'] });

function generateHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

app.post('/tokenize', (req, res) => {
  const accountNumbers = req.body;
  const result = accountNumbers.map((acc) => {
    const pair = pairs.by('acc', acc);
    if (!pair) {
      const token = generateHash(acc);
      pairs.insert({ acc, token });
      return token;
    }
    return pair.token;
  });
  res.json(result);
});

app.post('/detokenize', (req, res) => {
  const inputTokens = req.body;
  const result = inputTokens.map((token) => {
    const pair = pairs.by('token', token);
    return pair?.acc ?? null;
  });
  res.json(result);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
