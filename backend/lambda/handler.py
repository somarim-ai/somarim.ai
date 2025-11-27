import json
import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from mangum import Mangum  # WSGI adapter for Lambda
import time

# Initialize Flask app
app = Flask(__name__)

# Configure Gemini
# Make sure to set GEMINI_API_KEY in your Lambda environment variables
genai.configure(api_key=os.environ.get('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

@app.route('/gemini/brain', methods=['POST', 'OPTIONS'])
def gemini_brain():
    if request.method == 'OPTIONS':
        # Pre-flight request. Reply successfully:
        return jsonify({
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'statusCode': 200
        })
    
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        # Call Gemini
        response = model.generate_content(prompt)
        
        return jsonify({
            'response': response.text,
            'sessionId': data.get('sessionId', 'default'),
            'timestamp': int(time.time())
        })
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

# Lambda handler
handler = Mangum(app)

# Local development
if __name__ == '__main__':
    app.run(debug=True, port=5000)
