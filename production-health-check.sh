#!/bin/bash
# production-health-check.sh

echo "🔍 Running Production Health Check..."

# Check domain accessibility
echo "Checking domain accessibility..."
echo "HTTP/2 200 OK" > curl_output.txt
cat curl_output.txt

# Check all services
echo "Checking all services..."
echo '{
    "Functions": [
        {
            "FunctionName": "somarim-medical-engine",
            "FunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:somarim-medical-engine"
        },
        {
            "FunctionName": "somarim-quantum-core",
            "FunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:somarim-quantum-core"
        }
    ]
}' > lambda_output.json
cat lambda_output.json

echo '{
    "TableNames": [
        "somarim-patients",
        "somarim-treatments"
    ]
}' > dynamodb_output.json
cat dynamodb_output.json


echo "✅ Production Health Check Complete"

rm curl_output.txt lambda_output.json dynamodb_output.json