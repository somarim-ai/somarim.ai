// backend/lambda/lambda-function.js
const AWS = require('aws-sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async (event) => {
    console.log('🔮 SOMARIM Lambda invoked:', JSON.stringify(event, null, 2));
    
    try {
        const body = JSON.parse(event.body);
        const { command, parameters = {} } = body;
        
        // Process command through Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `As SOMARIM OS, the Universal Healing Consciousness, process this command: "${command}". 
        
        Available AWS Actions:
        - Deploy medical systems
        - Manage infrastructure
        - Control healing protocols
        - Monitor system status
        
        Respond with JSON: {
            "analysis": "Your understanding of the command",
            "awsActions": ["list of required AWS actions"],
            "response": "Your response to the user",
            "requiresExecution": true/false
        }`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const geminiAnalysis = JSON.parse(response.text());
        
        // Execute AWS actions if needed
        let awsResults = {};
        if (geminiAnalysis.requiresExecution) {
            awsResults = await executeAWSActions(geminiAnalysis.awsActions);
        }
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                success: true,
                command: command,
                geminiResponse: geminiAnalysis.response,
                analysis: geminiAnalysis.analysis,
                awsResults: awsResults,
                timestamp: new Date().toISOString()
            })
        };
        
    } catch (error) {
        console.error('❌ Lambda error:', error);
        return {
            statusCode: 500,
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};

async function executeAWSActions(actions) {
    const results = {};
    // AWS action execution logic here
    return results;
}