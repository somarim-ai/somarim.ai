import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
const CouncilReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await apiClient.get('/api/council/reviews');
                setReviews(data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading Council reviews..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    return (_jsxs("div", { className: "council-review-container", children: [_jsx("h2", { children: "Council Review Board" }), reviews.length === 0 ? (_jsx("p", { children: "No actions are currently pending review." })) : (_jsx("ul", { className: "review-list", children: reviews.map((review, index) => (_jsxs("li", { className: "review-item", children: [_jsx("h3", { children: "Action Details" }), _jsxs("p", { children: [_jsx("strong", { children: "Description:" }), " ", review.action.description] }), _jsxs("p", { children: [_jsx("strong", { children: "Impact:" }), " ", review.action.impact] }), review.action.domain && _jsxs("p", { children: [_jsx("strong", { children: "Domain:" }), " ", review.action.domain] }), _jsx("h4", { children: "Evaluation" }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " ", review.evaluation.status] }), _jsxs("p", { children: [_jsx("strong", { children: "Score:" }), " ", review.evaluation.score] }), _jsxs("p", { children: [_jsx("strong", { children: "Recommendation:" }), " ", review.evaluation.recommendation] }), _jsx("h4", { children: "Violations" }), _jsx("ul", { children: review.evaluation.violations.map((violation, vIndex) => (_jsxs("li", { children: [_jsxs("p", { children: [_jsx("strong", { children: "Principle:" }), " ", violation.principle] }), _jsxs("p", { children: [_jsx("strong", { children: "Severity:" }), " ", violation.severity] }), _jsxs("p", { children: [_jsx("strong", { children: "Recommendation:" }), " ", violation.recommendation] })] }, vIndex))) })] }, index))) }))] }));
};
export default CouncilReview;
