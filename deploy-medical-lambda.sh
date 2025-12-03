#!/bin/bash
# deploy-medical-lambda.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING MEDICAL LAMBDA FUNCTION..."

AWS_CLI="./aws/dist/aws"
ZIP="./aws/dist/zip"

# Check if AWS CLI is installed
if ! [ -x $AWS_CLI ]; then
    echo "🚨 AWS CLI executable not found at $AWS_CLI"
    exit 1
fi

# Check if zip is installed
if ! [ -x $ZIP ]; then
    echo "🚨 zip executable not found at $ZIP"
    exit 1
fi


# Install dependencies
echo "📦 Installing dependencies in backend/lambda..."
(cd backend/lambda && npm install)

# Create deployment package
ZIP_FILE="backend/lambda/medical-lambda.zip"
echo "📁 Creating deployment package: $ZIP_FILE..."
(cd backend/lambda && $ZIP -r medical-lambda.zip . -x "*.git*" "*.DS_Store*")

# Deploy to AWS Lambda
echo "☁️ Uploading to AWS Lambda function: medical-engine..."
$AWS_CLI lambda update-function-code \
    --function-name medical-engine \
    --zip-file fileb://$ZIP_FILE \
    --region us-east-1

# Update environment variables
echo "⚙️ Configuring environment..."
$AWS_CLI lambda update-function-configuration \
    --function-name medical-engine \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY}" \
    --timeout 300 \
    --memory-size 1024

# Clean up the deployment package
echo "🧹 Cleaning up..."
rm "$ZIP_FILE"

echo "✅ Lambda function deployed successfully!"
