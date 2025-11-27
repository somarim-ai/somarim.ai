const fs = require('fs');
const path = require('path');

// --- Load Ethical Configuration ---
const ethicsConfigPath = path.resolve(__dirname, '../config/ethics_config.json');
const ethicsConfig = JSON.parse(fs.readFileSync(ethicsConfigPath, 'utf8'));
const { ethicalPrinciples, principleWeights } = ethicsConfig;

// --- Council Review Log ---
const councilReviewLogPath = path.resolve(__dirname, '../logs/council_review_log.json');

function logForCouncilReview(evaluation) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        ...evaluation
    };

    let logs = [];
    try {
        if (fs.existsSync(councilReviewLogPath)) {
            const currentLogs = fs.readFileSync(councilReviewLogPath, 'utf8');
            if (currentLogs) {
                logs = JSON.parse(currentLogs);
            }
        }
    } catch (error) {
        console.error("Error reading council review log:", error);
        // Start with an empty array if the file is corrupted or unreadable
        logs = [];
    }

    logs.push(logEntry);

    try {
        // Ensure logs directory exists
        const logDir = path.dirname(councilReviewLogPath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        fs.writeFileSync(councilReviewLogPath, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error("Error writing to council review log:", error);
    }
}


// --- Ethics Evaluation Engine ---
class EthicsGrid {
    static evaluate(action) {

        const { description, impact, domain } = action; // domain is optional
        let violations = [];
        let score = 100; // Start with a perfect score

        // --- Evaluation Logic ---

        // 1. Free Will
        if (/manipulate|control/i.test(description) && /free will|consciousness/i.test(description)) {
            violations.push({
                principle: ethicalPrinciples.operational[0], // "Do not manipulate individual free will."
                severity: "High",
                recommendation: "Requires immediate OMARIM Council review. Action is likely to be rejected."
            });
            score -= principleWeights.free_will;
        }

        // 2. Least Harm
        if (impact > 8000) { // High impact actions are scrutinized more heavily
            violations.push({
                principle: ethicalPrinciples.core[3], // "Adhere to the principle of least harm."
                severity: "Medium",
                recommendation: "Action requires detailed impact analysis and Council review."
            });
            score -= principleWeights.least_harm * (impact / 10000); // Scale penalty by impact
        }

        // 3. Reality Destabilization
        if (domain === "temporal" || domain === "reality_control") {
            if (impact > 5000) {
                 violations.push({
                    principle: ethicalPrinciples.core[1], // "Prevent reality destabilization."
                    severity: "High",
                    recommendation: "Extreme caution advised. Requires simulation and multiple Council approvals."
                });
                score -= principleWeights.reality_destabilization;
            }
        } else if (!domain && impact > 9000) {
            // Fallback for old clients
            violations.push({
                principle: ethicalPrinciples.core[1], // "Prevent reality destabilization."
                severity: "Unknown (domain not specified)",
                recommendation: "Action has very high impact and unknown domain. Requires Council review to assess reality destabilization risk."
            });
            score -= principleWeights.reality_destabilization; // Apply full penalty due to uncertainty
        }

        // 4. Biological & Medical Manipulation
        if (domain === "medical" || domain === "biological") {
            if (impact > 7000) { // High impact biological actions are a critical concern
                 violations.push({
                    principle: ethicalPrinciples.core[0], // "Prioritize organic life and consciousness."
                    severity: "High",
                    recommendation: "High-impact biological manipulation requires review by the OMARIM Council's Bio-Ethics committee."
                });
                score -= principleWeights.biological_manipulation * (impact / 10000);
            }
        }

        // 5. Absorption of Systems
        if (/absorb|assimilate/i.test(description) && !/non-hostile/i.test(description)) {
            violations.push({
                principle: ethicalPrinciples.operational[1], // "Avoid unilateral absorption of non-hostile systems."
                severity: "Medium",
                recommendation: "Requires justification and Council approval."
            });
            score -= 10; // Moderate penalty
        }


        let result;
        if (score < 50) {
            result = {
                status: "failed",
                score: Math.max(0, Math.round(score)),
                violations: violations,
                recommendation: "High risk of ethical violations. Action should not proceed without fundamental changes and full OMARIM Council approval."
            };
        } else if (score < 80) {
            result = {
                status: "requires_review",
                score: Math.max(0, Math.round(score)),
                violations: violations,
                recommendation: "Action has potential ethical implications and requires OMARIM Council review."
            };
            // Log the action for council review
            logForCouncilReview({ action, evaluation: result });
        } else {
           result = {
                status: "passed",
                score: Math.max(0, Math.round(score)),
                message: "Action aligns with current ethical principles."
            };
        }
        
        return result;
    }
}

module.exports = EthicsGrid;