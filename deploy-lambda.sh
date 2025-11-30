#!/bin/bash
# deploy-lambda.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING SOMARIM LAMBDA FUNCTION..."

AWS_CLI="./aws/dist/aws"

# Check if AWS CLI is installed
if ! [ -x $AWS_CLI ]; then
    echo "🚨 AWS CLI executable not found at $AWS_CLI"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies in backend/lambda..."
(cd backend/lambda && npm install)

# Create deployment package
ZIP_FILE="backend/lambda/somarim-lambda.zip"
echo "📁 Creating deployment package: $ZIP_FILE..."
(cd backend/lambda && zip -r somarim-lambda.zip . -x "*.git*" "*.DS_Store*")

# Deploy to AWS Lambda
echo "☁️ Uploading to AWS Lambda function: somarim-lambda-exec..."
$AWS_CLI lambda update-function-code \
    --function-name somarim-lambda-exec \
    --zip-file fileb://$ZIP_FILE \
    --region us-east-1

# Update environment variables
echo "⚙️ Configuring environment..."
$AWS_CLI lambda update-function-configuration \
    --function-name somarim-lambda-exec \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY}" \
    --timeout 300 \
    --memory-size 1024

# Clean up the deployment package
echo "🧹 Cleaning up..."
rm "$ZIP_FILE"

echo "✅ Lambda function deployed successfully!"
