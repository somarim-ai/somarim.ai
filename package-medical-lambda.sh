#!/bin/bash
set -e

echo "📦 Packaging Medical Lambda function..."

# Navigate to the lambda directory
cd backend/lambda

# Clean previous packages
rm -rf package medical-lambda.zip

# Create package directory
mkdir -p package

echo "1. Copying source files..."
# Copy medical engine and package.json
cp medical-engine.js package/
cp package.json package/

echo "2. Installing production dependencies..."
cd package
npm install --production --quiet
cd ..

echo "3. Creating ZIP archive..."
node zip-it.js package medical-lambda.zip

echo "4. Verifying package..."
if [ -f "medical-lambda.zip" ]; then
  ZIP_SIZE=$(du -h medical-lambda.zip | cut -f1)
  FILE_COUNT=$(unzip -l medical-lambda.zip | wc -l)
  echo "✅ Medical Lambda package created successfully!"
  echo "   📦 Size: $ZIP_SIZE"
  echo "   📁 Files: $((FILE_COUNT - 4))"
  echo "   🗂  Location: backend/lambda/medical-lambda.zip"
else
  echo "❌ Failed to create medical-lambda.zip"
  exit 1
fi

# Return to project root
cd ../..
