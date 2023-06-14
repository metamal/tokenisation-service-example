const express = require('express');

// Create a new express app
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
