#!/bin/bash
# deploy-and-create-lambda.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING MEDICAL LAMBDA FUNCTION (CREATE OR UPDATE)..."

AWS_CLI="./aws/dist/aws"
ZIP_FILE="backend/lambda/medical-lambda.zip"
FUNCTION_NAME="medical-engine"

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

# Install dependencies
echo "📦 Installing dependencies in backend/lambda..."
(cd backend/lambda && npm install)

# Create deployment package
echo "📁 Creating deployment package: $ZIP_FILE..."
(cd backend/lambda && zip -r medical-lambda.zip . -x "*.git*" "*.DS_Store*")

# Check if function exists
if ! "$AWS_CLI" lambda get-function --function-name "$FUNCTION_NAME" > /dev/null 2>&1; then
    echo "✨ Function $FUNCTION_NAME does not exist. Creating it..."

    # Get the ARN of the lambda-role
    LAMBDA_ROLE_ARN=$("$AWS_CLI" iam get-role --role-name lambda-role --query 'Role.Arn' --output text)

    "$AWS_CLI" lambda create-function \
        --function-name "$FUNCTION_NAME" \
        --runtime nodejs18.x \
        --role "$LAMBDA_ROLE_ARN" \
        --handler index.handler \
        --zip-file "fileb://$ZIP_FILE" \
        --timeout 300 \
        --memory-size 1024
else
    echo "✨ Function $FUNCTION_NAME already exists. Updating it..."
    # Deploy to AWS Lambda
    echo "☁️ Uploading to AWS Lambda function: $FUNCTION_NAME..."
    "$AWS_CLI" lambda update-function-code \
        --function-name "$FUNCTION_NAME" \
        --zip-file "fileb://$ZIP_FILE" \
        --region us-east-1
fi

# Update environment variables
echo "⚙️ Configuring environment..."
"$AWS_CLI" lambda update-function-configuration \
    --function-name "$FUNCTION_NAME" \
    --environment "Variables={GEMINI_API_KEY=$GEMINI_API_KEY}"

# Clean up the deployment package
echo "🧹 Cleaning up..."
rm "$ZIP_FILE"

echo "✅ Lambda function deployed successfully!"
