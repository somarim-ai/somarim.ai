#!/bin/bash
# deploy-only.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING MEDICAL LAMBDA FUNCTION..."

AWS_CLI="./aws/dist/aws"
ZIP_FILE="backend/lambda/medical-lambda.zip"

# Check if AWS CLI is installed
if ! [ -x "$AWS_CLI" ]; then
    echo "🚨 AWS CLI executable not found at $AWS_CLI"
    exit 1
fi

# Check if zip file exists
if ! [ -f "$ZIP_FILE" ]; then
    echo "🚨 Deployment package not found at $ZIP_FILE"
    echo "Please run ./package-medical-lambda.sh first."
    exit 1
fi

# Check for GEMINI_API_KEY
if [ -z "$GEMINI_API_KEY" ]; then
    echo "🚨 GEMINI_API_KEY environment variable is not set."
    echo "You can set it by running: export GEMINI_API_KEY='YOUR_KEY_HERE'"
    exit 1
fi

# Deploy to AWS Lambda
echo "☁️ Uploading to AWS Lambda function: medical-engine..."
"$AWS_CLI" lambda update-function-code \
    --function-name medical-engine \
    --zip-file "fileb://$ZIP_FILE" \
    --region us-east-1

# Update environment variables
echo "⚙️ Configuring environment..."
"$AWS_CLI" lambda update-function-configuration \
    --function-name medical-engine \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY}" \
    --timeout 300 \
    --memory-size 1024

echo "✅ Lambda function deployed successfully!"
