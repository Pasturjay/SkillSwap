require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock database
let db = {
  apiKey: 'sk_test_51ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  dashboardData: {
    totalRevenue: 45231.89,
    transactions: 2350,
    activeCustomers: 12234
  }
};

// Middleware to check API key
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== db.apiKey) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
};

// Get dashboard data
app.get('/api/dashboard', checkApiKey, (req, res) => {
  res.json(db.dashboardData);
});

// Get API key
app.get('/api/apikey', checkApiKey, (req, res) => {
  res.json({ apiKey: db.apiKey });
});

// Generate new API key
app.post('/api/apikey', checkApiKey, (req, res) => {
  const newApiKey = 'sk_test_' + crypto.randomBytes(32).toString('hex');
  db.apiKey = newApiKey;
  res.json({ apiKey: newApiKey });
});

app.listen(port, () => {
  console.log(`SolPay backend listening at http://localhost:${port}`);
});
