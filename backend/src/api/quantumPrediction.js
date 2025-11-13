const express = require('express');
const router = express.Router();

router.get('/quantum-prediction', (req, res) => {
  res.json({ message: 'Welcome to the Quantum Prediction API' });
});

module.exports = router;