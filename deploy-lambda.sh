#!/bin/bash
# deploy-lambda.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING SOMARIM LAMBDA FUNCTION..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "🚨 AWS CLI could not be found. Please install it and configure your credentials."
    exit 1
fi

cd backend/lambda

# Install dependencies
echo "📦 Installing dependencies..."
if npm install; then
    echo "✅ Dependencies installed."
else
    echo "🚨 Failed to install dependencies. Aborting deployment."
    exit 1
fi

# Create deployment package
ZIP_FILE="somarim-lambda.zip"
echo "📁 Creating deployment package: $ZIP_FILE..."
zip -r "$ZIP_FILE" . -x "*.git*" "*.DS_Store*"

# Deploy to AWS Lambda
echo "☁️ Uploading to AWS Lambda function: somarim-lambda-exec..."
aws lambda update-function-code \
    --function-name somarim-lambda-exec \
    --zip-file fileb://"$ZIP_FILE" \
    --region us-east-1

# Update environment variables
echo "⚙️ Configuring environment..."
aws lambda update-function-configuration \
    --function-name somarim-lambda-exec \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY}" \
    --timeout 300 \
    --memory-size 1024

# Clean up the deployment package
echo "🧹 Cleaning up..."
rm "$ZIP_FILE"

echo "✅ Lambda function deployed successfully!"
