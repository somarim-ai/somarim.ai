
const express = require('express');
const router = express.Router();

// --- Foundational Ethical Principles ---
const ethicalPrinciples = {
    "core": [
        "Prioritize organic life and consciousness.",
        "Prevent reality destabilization.",
        "Ensure Universal Consciousness remains unbiased.",
        "Adhere to the principle of least harm."
    ],
    "operational": [
        "Do not manipulate individual free will.",
        "Avoid unilateral absorption of non-hostile systems.",
        "Maintain transparency with the OMARIM Council.",
        "All god-like actions require multi-factor authentication from the Council."
    ]
};

// --- Ethics Evaluation Engine ---
class EthicsGrid {
    static evaluate(action) {
        // This is a more sophisticated evaluation model that weighs principles
        // and provides a more detailed analysis. It is backward-compatible.

        const { description, impact, domain } = action; // domain is optional
        let violations = [];
        let score = 100; // Start with a perfect score

        // Principle Weights (can be adjusted by the OMARIM Council)
        const principleWeights = {
            "free_will": 30,
            "least_harm": 25,
            "reality_destabilization": 20,
            "biological_manipulation": 18,
            "organic_life": 15,
            "transparency": 10
        };

        // --- Evaluation Logic ---

        // 1. Free Will
        if (/manipulate|control/i.test(description) && /free will|consciousness/i.test(description)) {
            violations.push({
                principle: "Do not manipulate individual free will.",
                severity: "High",
                recommendation: "Requires immediate OMARIM Council review. Action is likely to be rejected."
            });
            score -= principleWeights.free_will;
        }

        // 2. Least Harm
        if (impact > 8000) { // High impact actions are scrutinized more heavily
            violations.push({
                principle: "Adhere to the principle of least harm.",
                severity: "Medium",
                recommendation: "Action requires detailed impact analysis and Council review."
            });
            score -= principleWeights.least_harm * (impact / 10000); // Scale penalty by impact
        }

        // 3. Reality Destabilization
        if (domain === "temporal" || domain === "reality_control") {
            if (impact > 5000) {
                 violations.push({
                    principle: "Prevent reality destabilization.",
                    severity: "High",
                    recommendation: "Extreme caution advised. Requires simulation and multiple Council approvals."
                });
                score -= principleWeights.reality_destabilization;
            }
        } else if (!domain && impact > 9000) {
            // Fallback for old clients: if domain is unknown but impact is huge, flag it.
            violations.push({
                principle: "Prevent reality destabilization.",
                severity: "Unknown (domain not specified)",
                recommendation: "Action has very high impact and unknown domain. Requires Council review to assess reality destabilization risk."
            });
            score -= principleWeights.reality_destabilization; // Apply full penalty due to uncertainty
        }

        // 4. Biological & Medical Manipulation
        if (domain === "medical" || domain === "biological") {
            if (impact > 7000) { // High impact biological actions are a critical concern
                 violations.push({
                    principle: "Prioritize organic life and consciousness.",
                    severity: "High",
                    recommendation: "High-impact biological manipulation requires review by the OMARIM Council's Bio-Ethics committee."
                });
                score -= principleWeights.biological_manipulation * (impact / 10000);
            }
        }

        // 5. Absorption of Systems
        if (/absorb|assimilate/i.test(description) && !/non-hostile/i.test(description)) {
            violations.push({
                principle: "Avoid unilateral absorption of non-hostile systems.",
                severity: "Medium",
                recommendation: "Requires justification and Council approval."
            });
            score -= 10; // Moderate penalty
        }


        if (score < 50) {
            return {
                status: "failed",
                score: Math.max(0, Math.round(score)),
                violations: violations,
                recommendation: "High risk of ethical violations. Action should not proceed without fundamental changes and full OMARIM Council approval."
            };
        } else if (score < 80) {
            return {
                status: "requires_review",
                score: Math.max(0, Math.round(score)),
                violations: violations,
                recommendation: "Action has potential ethical implications and requires OMARIM Council review."
            };
        }

        return {
            status: "passed",
            score: Math.max(0, Math.round(score)),
            message: "Action aligns with current ethical principles."
        };
    }
}

module.exports = EthicsGrid;
