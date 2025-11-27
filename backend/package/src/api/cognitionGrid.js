const express = require('express');
const router = express.Router();

router.get('/cognition-grid', (req, res) => {
  res.json({ message: 'Welcome to the Cognition Grid API' });
});

module.exports = router;