const express = require('express');
const router = express.Router();

router.get('/omni-core-evolution', (req, res) => {
  res.json({ message: 'Welcome to the Omni Core Evolution API' });
});

module.exports = router;