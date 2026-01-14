const express = require('express');
const os = require('os');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js app!',
    hostname: os.hostname(),
    timestamp: new Date().toISOString(),
    language: 'JavaScript/Node.js'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'nodejs-app' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Node.js app listening on port ${PORT}`);
});