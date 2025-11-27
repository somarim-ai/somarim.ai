const express = require('express');
const router = express.Router();

router.get('/systems-matrix', (req, res) => {
  res.json({ message: 'Welcome to the Systems Matrix API' });
});

module.exports = router;