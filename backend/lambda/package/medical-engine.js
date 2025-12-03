
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyD6lssLXfLqgwIgoD3CsiKoq0YwvtqzkQw');

exports.handler = async (event) => {
  try {
    const { protocol } = JSON.parse(event.body);
    
    if (!protocol) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Protocol is required' }),
      };
    }

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Medical protocol analysis for: ${protocol}. Provide detailed implementation steps.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
       },
      body: JSON.stringify({
        protocol,
        analysis: text,
        status: 'success',
        timestamp: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error('Medical protocol error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
