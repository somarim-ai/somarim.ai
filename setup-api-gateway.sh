#!/bin/bash
# setup-api-gateway.sh

echo "🚀 CONFIGURING API GATEWAY..."

# Create API Gateway
API_ID=$(aws apigateway create-rest-api \
    --name "somarim-api" \
    --description "SOMARIM OS Control API" \
    --query "id" \
    --output text)

echo "📡 API Gateway ID: $API_ID"

# Get Root Resource ID
ROOT_ID=$(aws apigateway get-resources \
    --rest-api-id $API_ID \
    --query "items[0].id" \
    --output text)

# Create Command Resource
COMMAND_RESOURCE_ID=$(aws apigateway create-resource \
    --rest-api-id $API_ID \
    --parent-id $ROOT_ID \
    --path-part "command" \
    --query "id" \
    --output text)

# Create POST Method
aws apigateway put-method \
    --rest-api-id $API_ID \
    --resource-id $COMMAND_RESOURCE_ID \
    --http-method POST \
    --authorization-type "NONE" \
    --no-api-key-required

# Integrate with Lambda
aws apigateway put-integration \
    --rest-api-id $API_ID \
    --resource-id $COMMAND_RESOURCE_ID \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:$(aws sts get-caller-identity --query Account --output text):function:somarim-lambda-exec/invocations

# Add Lambda permission
aws lambda add-permission \
    --function-name somarim-lambda-exec \
    --statement-id apigateway-somarim \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:us-east-1:$(aws sts get-caller-identity --query Account --output text):$API_ID/*/POST/command"

# Deploy API
aws apigateway create-deployment \
    --rest-api-id $API_ID \
    --stage-name "production"

# Get Invoke URL
INVOKE_URL="https://$API_ID.execute-api.us-east-1.amazonaws.com/production"
echo "🎯 API Gateway Invoke URL: $INVOKE_URL"

# Save URL to environment
echo "export SOMARIM_API_URL=$INVOKE_URL" >> ~/.bashrc
export SOMARIM_API_URL=$INVOKE_URL

echo "✅ API Gateway configured successfully!"