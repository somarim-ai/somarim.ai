const express = require('express');
const router = express.Router();

router.get('/device-controller', (req, res) => {
  res.json({ message: 'Welcome to the Device Controller API' });
});

module.exports = router;