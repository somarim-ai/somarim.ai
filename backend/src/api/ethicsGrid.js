const express = require('express');
const router = express.Router();

router.get('/ethics-grid', (req, res) => {
  res.json({ message: 'Welcome to the Ethics Grid API' });
});

module.exports = router;