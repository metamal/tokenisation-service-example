const express = require('express');

// Create a new express app
const app = express();

// Use express's built-in JSON parser
app.use(express.json());

app.post('/tokenize', (req, res) => {
  const accountNumbers = req.body;
  const result = [...accountNumbers];
  res.json(result);
});

app.post('/detokenize', (req, res) => {
  const inputTokens = req.body;
  const result = [...inputTokens];
  res.json(result);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
