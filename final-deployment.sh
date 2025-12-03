#!/bin/bash
# final-deployment.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING SOMARIM MEDICAL LAMBDA FUNCTION..."

AWS_CLI="./aws/dist/aws"
ZIP_FILE="somarim-lambda.zip"
FUNCTION_NAME="somarim-medical-engine"

# Check if AWS CLI is installed
if ! [ -x "$AWS_CLI" ]; then
    echo "🚨 AWS CLI executable not found at $AWS_CLI"
    exit 1
fi

# Check for required environment variables
if [ -z "$GEMINI_API_KEY" ] || [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "🚨 Required environment variables are not set."
    exit 1
fi

# Install dependencies and create deployment package
(cd backend/lambda && npm install && node create-zip.js)

# Deploy to AWS Lambda
echo "☁️ Uploading to AWS Lambda function: $FUNCTION_NAME..."
"$AWS_CLI" lambda update-function-code \
    --function-name "$FUNCTION_NAME" \
    --zip-file "fileb://backend/lambda/somarim-lambda.zip" \
    --region us-east-1

# Update environment variables
echo "⚙️ Configuring environment..."
"$AWS_CLI" lambda update-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY}" \
    --timeout 300 \
    --memory-size 1024

# Clean up the deployment package
echo "🧹 Cleaning up..."
rm "backend/lambda/somarim-lambda.zip"

echo "✅ Lambda function deployed successfully!"
