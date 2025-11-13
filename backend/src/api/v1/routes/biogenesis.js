const express = require("express");
const router = express.Router();
const { handleBiogenesis } = require("../controllers/biogenesis");

router.get("/", async (req, res) => {
  try {
    const data = await handleBiogenesis();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
