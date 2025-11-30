#!/bin/bash
# deploy-to-production.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING SOMARIM TO AWS PRODUCTION..."

# --- DEPLOY BACKEND ---
echo "▶️  Deploying backend..."
if [ -f "./deploy-lambda.sh" ]; then
    bash ./deploy-lambda.sh
else
    echo "🚨 ./deploy-lambda.sh not found!"
    exit 1
fi
echo "✅ Backend deployment script executed."

# --- DEPLOY FRONTEND ---
echo "▶️  Deploying frontend..."
if [ -f "./deploy-frontend-production.sh" ]; then
    bash ./deploy-frontend-production.sh
else
    echo "🚨 ./deploy-frontend-production.sh not found!"
    exit 1
fi
echo "✅ Frontend deployment script executed."


# --- HEALTH CHECKS ---
# In a real-world scenario, you would have a more robust health check.
# This is a simple check to see if the main page is accessible.
echo "🧪 Testing production endpoints..."
FRONTEND_URL="https://somarim.com"

# NOTE: You will need to replace this with your actual API Gateway URL
# You can find this in the AWS console after deploying your API Gateway.
BACKEND_URL="https://<YOUR_API_GATEWAY_URL>"

echo "Checking frontend status at: $FRONTEND_URL"
if curl -s --head --request GET "$FRONTEND_URL" | grep "200 OK" > /dev/null; then
    echo "✅ Frontend is LIVE!"
else
    echo "🚨 Frontend health check FAILED. Please check the S3 bucket and CloudFront distribution."
fi


echo "🎉 SOMARIM IS NOW IN PRODUCTION ON AWS!"
echo "🌐 Frontend: $FRONTEND_URL"
echo "🔧 Backend: Please configure your API Gateway URL in this script."
echo "🔮 Ready for real users and real healing protocols!"
