#!/bin/bash
# scripts/deploy-lambda.sh

set -e

echo "🔨 Deploying Lambda function..."

cd backend/lambda

# Package the function
./package.sh

# Get function name from Terraform
FUNCTION_NAME=$(cd ../terraform && terraform output -raw lambda_function_name)

# Update Lambda code
aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://somarim-lambda.zip

echo "✅ Lambda deployed: $FUNCTION_NAME"
