import json
import os
from src.somarim_net.main import SomarimNetworkAI
from src.somarim_net.core.gemini_integration import GeminiNetworkOrchestrator
from datetime import datetime

gemini_orchestrator = GeminiNetworkOrchestrator(os.environ.get('GEMINI_API_KEY', ''))
somarim_ai = SomarimNetworkAI(gemini_orchestrator)

def lambda_handler(event, context):
    """Main Lambda entry point for SOMARIM network automation"""
    
    # Parse the request
    body = json.loads(event.get('body', '{}'))
    action = body.get('action')
    parameters = body.get('parameters', {})
    
    try:
        if action == 'generate_config':
            result = somarim_ai.generate_configuration(
                intent=parameters['intent'],
                vendor=parameters.get('vendor', 'multi-vendor')
            )
        elif action == 'predict_failures':
            result = somarim_ai.predict_failures(
                telemetry_data=parameters['telemetry']
            )
        elif action == 'troubleshoot':
            result = somarim_ai.troubleshoot_network(
                symptoms=parameters['symptoms']
            )
        else:
            return error_response("Unknown action")
        
        return success_response(result)
        
    except Exception as e:
        return error_response(str(e))

def success_response(data):
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': ''
        },
        'body': json.dumps({
            'status': 'success',
            'data': data,
            'timestamp': datetime.utcnow().isoformat()
        })
    }

def error_response(message):
    return {
        'statusCode': 400,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': ''
        },
        'body': json.dumps({
            'status': 'error',
            'message': message,
            'timestamp': datetime.utcnow().isoformat()
        })
    }
