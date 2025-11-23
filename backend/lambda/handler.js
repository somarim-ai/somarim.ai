const AWS = require('aws-sdk');
const { GeminiController } = require('./src/gemini/GeminiController');
const { AWSActions } = require('./src/aws/AWSActions');

exports.handler = async (event, context) => {
    console.log('🔮 SOMARIM Lambda invoked:', JSON.stringify(event, null, 2));
    
    try {
        const geminiController = new GeminiController();
        const awsActions = new AWSActions();
        
        // Parse the command from API Gateway
        const body = JSON.parse(event.body);
        const { command, parameters, actionType } = body;
        
        console.log(`🎯 Executing command: ${command}`);
        
        // Process command through Gemini AI
        const geminiResponse = await geminiController.processCommand(command, parameters);
        
        // Execute AWS actions if needed
        let awsResult = null;
        if (geminiResponse.requiresAWSAction) {
            awsResult = await awsActions.execute(geminiResponse.awsCommands);
        }
        
        // Return comprehensive response
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
                geminiAnalysis: geminiResponse.analysis,
                awsResults: awsResult,
                timestamp: new Date().toISOString(),
                executionId: context.awsRequestId
            })
        };
        
    } catch (error) {
        console.error('❌ Lambda execution error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
};