#!/bin/bash
# deploy-frontend-production.sh

echo "🚀 DEPLOYING FRONTEND TO PRODUCTION..."

cd frontend

# Build production version
echo "📦 Building production bundle..."
npm run build

# Deploy to somarim.com S3 bucket
echo "☁️ Uploading to S3..."
aws s3 sync dist/ s3://somarim.com --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CDN cache..."
aws cloudfront create-invalidation \
    --distribution-id $(aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?@=='somarim.com']].Id" --output text) \
    --paths "/*"

echo "✅ Frontend deployed to: https://somarim.com"
