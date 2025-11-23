#!/bin/bash
# deploy-lambda.sh

echo "🚀 DEPLOYING SOMARIM LAMBDA FUNCTION..."

cd backend/lambda

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create deployment package
echo "📁 Creating deployment package..."
zip -r somarim-lambda.zip . -x "*.git*" "*.DS_Store*"

# Deploy to AWS Lambda
echo "☁️ Uploading to AWS Lambda..."
aws lambda update-function-code \
    --function-name somarim-lambda-exec \
    --zip-file fileb://somarim-lambda.zip \
    --region us-east-1

# Update environment variables
echo "⚙️ Configuring environment..."
aws lambda update-function-configuration \
    --function-name somarim-lambda-exec \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY,AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY}" \
    --timeout 300 \
    --memory-size 1024

echo "✅ Lambda function deployed successfully!"