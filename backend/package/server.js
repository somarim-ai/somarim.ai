require('dotenv').config(); // Load environment variables from .env file

// backend/server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyD6lssLXfLqgwIgoD3CsiKoq0YwvtqzkQw');

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'SOMARIM Server Running', timestamp: new Date().toISOString() });
});

// Medical endpoint
app.post('/api/v1/medical', async (req, res) => {
  try {
    const { protocol } = req.body;
    
    if (!protocol) {
      return res.status(400).json({ error: 'Protocol is required' });
    }

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Medical protocol analysis for: ${protocol}. Provide detailed implementation steps.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      protocol,
      analysis: text,
      status: 'success',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Medical protocol error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 SOMARIM Medical Server running on port ${port}`);
  console.log(`📋 Health check: http://localhost:${port}/`);
  console.log(`🏥 Medical API: http://localhost:${port}/api/v1/medical`);
});

module.exports = app;