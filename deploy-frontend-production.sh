#!/bin/bash
# deploy-frontend-production.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING FRONTEND TO PRODUCTION..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "🚨 AWS CLI could not be found. Please install it and configure your credentials."
    exit 1
fi

echo "✅ AWS CLI is installed."

cd frontend

# Build production version
echo "📦 Building production bundle..."
if npm run build; then
    echo "✅ Build successful."
else
    echo "🚨 Build failed. Aborting deployment."
    exit 1
fi

# Deploy to somarim.com S3 bucket
echo "☁️ Uploading to S3 bucket: s3://somarim.com..."
aws s3 sync dist/ s3://somarim.com --delete

echo "✅ Upload to S3 complete."

# Invalidate CloudFront cache
echo "🔄 Invalidating CDN cache..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?@=='somarim.com']].Id" --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "🚨 Could not find CloudFront distribution for somarim.com."
    exit 1
fi

aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"

echo "✅ CDN cache invalidation initiated for distribution ID: $DISTRIBUTION_ID"

echo "🎉 Frontend deployed to: https://somarim.com"
