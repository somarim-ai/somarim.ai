const express = require("express");
const router = express.Router();
const { getCausalLinks, getCausalAnomalies } = require("../controllers/causal");

router.get("/", async (req, res) => {
  try {
    const result = await getCausalLinks();
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/anomalies", async (req, res) => {
  try {
    const result = await getCausalAnomalies();
    res.status(200).json({ success: true, anomalies: result.anomalies });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
