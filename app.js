const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
var receivedInput = '';


// Define a POST route to receive data from Angular
app.post('/api/data', (req, res) => {
  const inputData = req.body.input;
  console.log('Received input:', inputData);
  receivedInput = inputData;
  res.json({ message: `Received input: ${inputData}` });

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
