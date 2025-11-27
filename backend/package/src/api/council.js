const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const councilReviewLogPath = path.resolve(__dirname, '../logs/council_review_log.json');

// Endpoint to get all council review requests
router.get('/reviews', (req, res) => {
    try {
        if (fs.existsSync(councilReviewLogPath)) {
            const logData = fs.readFileSync(councilReviewLogPath, 'utf8');
            const logs = JSON.parse(logData);
            res.json(logs);
        } else {
            res.json([]); // Return empty array if log file doesn't exist
        }
    } catch (error) {
        console.error("Error reading council review log:", error);
        res.status(500).json({ message: "Error fetching council review logs." });
    }
});

module.exports = router;
