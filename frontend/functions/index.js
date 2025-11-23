const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.somarimAPI = functions.https.onRequest(async (req, res) => {
    // Set CORS headers to allow requests from the frontend
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    // Ensure the request has a body
    if (!req.body) {
        res.status(400).json({ success: false, error: 'Request body is missing.' });
        return;
    }

    const { command, protocol } = req.body;

    // Check for required parameters
    if (!command) {
        res.status(400).json({ success: false, error: 'Missing \'command\' in request body.' });
        return;
    }

    try {
        // Get the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Construct a detailed prompt for the medical AI
        const prompt = `
            As the SOMARIM-5000 Medical AI, your task is to provide a detailed, simulated medical treatment plan based on the user's command.
            
            **User Command:** "${command}"
            **Selected Protocol:** ${protocol || 'Not specified'}

            **Available Simulated Protocols:**
            - **STROKE_REVERSAL:** Quantum-level intervention to dissolve blockages and repair neural pathways post-ischemia.
            - **NEURAL_REPAIR (NRH-9000):** Nanite-driven reconstruction of damaged neurons and synaptic connections.
            - **GENETIC_OPTIMIZATION (QHB-100):** Quantum harmonization of bio-frequencies to enhance cognitive and physiological functions.

            **Instructions:**
            1.  Acknowledge the user's command.
            2.  Identify the most relevant protocol(s).
            3.  Generate a concise, professional, and futuristic-sounding treatment plan.
            4.  The plan should sound plausible within a sci-fi context.
            5.  Format the response as a clear, step-by-step summary.

            **Example Response Format:**
            "Acknowledged: Activate neural repair.
            Protocol: NRH-9000 Initiated.
            Plan:
            1. Calibrating quantum field to patient's bio-signature.
            2. Deploying NRH-9000 nanites to affected neural regions.
            3. Commencing synaptic reconstruction and myelin sheath regeneration.
            4. Estimated completion: 7 minutes."
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Return the AI-generated treatment plan
        res.status(200).json({
            success: true,
            treatment: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Error processing Gemini request:", error);
        res.status(500).json({ success: false, error: 'Failed to communicate with the Medical AI Engine.' });
    }
});
