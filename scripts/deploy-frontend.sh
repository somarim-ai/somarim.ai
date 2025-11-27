#!/bin/bash
# scripts/deploy-frontend.sh

set -e

echo "🎨 Deploying frontend..."

cd frontend

# Build
npm run build

# Get S3 bucket from Terraform
S3_BUCKET=$(cd ../backend/terraform && terraform output -raw s3_bucket_name)

# Deploy to S3
aws s3 sync ./dist s3://$S3_BUCKET --delete

# Invalidate CloudFront
CLOUDFRONT_ID=$(cd ../backend/terraform && terraform output -raw cloudfront_id)
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_ID \
  --paths "/*"

echo "✅ Frontend deployed to: $S3_BUCKET"
