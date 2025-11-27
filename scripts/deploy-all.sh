#!/bin/bash
# scripts/deploy-all.sh

set -e

echo "🚀 Starting SOMARIM deployment..."

# Load environment
source ./scripts/load-env.sh

# Package Lambda
echo "📦 Packaging backend..."
./backend/lambda/package.sh

# Build frontend
echo "🏗 Building frontend..."
cd frontend
npm run build
cd ..

# Initialize Terraform
echo "🔄 Initializing Terraform..."
cd backend/terraform
terraform init

# Deploy infrastructure
echo "⚡ Deploying to AWS..."
terraform apply -auto-approve -var="gemini_api_key=$GEMINI_API_KEY"

# Get outputs
API_URL=$(terraform output -raw api_url)
FRONTEND_BUCKET=$(terraform output -raw s3_bucket_name)

# Deploy frontend
echo "📤 Deploying frontend..."
aws s3 sync ../frontend/dist s3://$FRONTEND_BUCKET --delete

echo "✅ Deployment complete!"
echo "🌐 Frontend URL: https://$(terraform output -raw cloudfront_domain)"
echo "🔗 API URL: $API_URL"
