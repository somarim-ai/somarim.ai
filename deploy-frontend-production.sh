#!/bin/bash
# deploy-frontend-production.sh

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 DEPLOYING FRONTEND TO PRODUCTION..."

AWS_CLI="./aws/dist/aws"

# Check if AWS CLI is installed
if ! [ -x "$AWS_CLI" ]; then
    echo "🚨 AWS CLI executable not found at $AWS_CLI"
    exit 1
fi

echo "✅ AWS CLI is installed."

# Build production version
echo "📦 Building production bundle in frontend..."
(cd frontend && npm run build)

# Deploy to somarim.com S3 bucket
echo "☁️ Uploading to S3 bucket: s3://somarim.com..."
$AWS_CLI s3 sync frontend/dist/ s3://somarim.com --delete

echo "✅ Upload to S3 complete."

# Invalidate CloudFront cache
echo "🔄 Invalidating CDN cache..."
DISTRIBUTION_ID=$($AWS_CLI cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?@=='somarim.com']].Id" --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "🚨 Could not find CloudFront distribution for somarim.com."
    exit 1
fi

$AWS_CLI cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"

echo "✅ CDN cache invalidation initiated for distribution ID: $DISTRIBUTION_ID"

echo "🎉 Frontend deployed to: https://somarim.com"
