#!/bin/bash
# backend/lambda/package.sh

echo "📦 Packaging Lambda function..."

# Create deployment package
cd backend/lambda
mkdir -p package

# Install dependencies
pip install -r requirements.txt -t package/

# Copy handler
cp handler.py package/

# Create zip
cd package
zip -r ../somarim-lambda.zip .

echo "✅ Lambda package created: somarim-lambda.zip"
