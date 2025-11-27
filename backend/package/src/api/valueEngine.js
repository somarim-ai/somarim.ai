const express = require('express');
const router = express.Router();

router.get('/value-engine', (req, res) => {
  res.json({ message: 'Welcome to the Value Engine API' });
});

module.exports = router;