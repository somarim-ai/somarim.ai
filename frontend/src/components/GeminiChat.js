import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
export default function GeminiChat() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const sendPrompt = async () => {
        try {
            const res = await fetch("https://g1f7pqyx9l.execute-api.us-east-1.amazonaws.com/SOMARIM/gemini/brain", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            });
            const data = await res.json();
            setResponse(data.response);
        }
        catch (err) {
            console.error("API call failed:", err);
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "SOMARIM Gemini Chat" }), _jsx("textarea", { value: prompt, onChange: (e) => setPrompt(e.target.value), placeholder: "Type your prompt here...", rows: 4, cols: 50 }), _jsx("br", {}), _jsx("button", { onClick: sendPrompt, children: "Send to Gemini" }), _jsxs("div", { children: [_jsx("h2", { children: "Response:" }), _jsx("pre", { children: response })] })] }));
}
