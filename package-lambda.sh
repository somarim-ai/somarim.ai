#!/bin/bash
set -e

echo "📦 Packaging Lambda function with Bash..."

# Check if we're in the right directory
if [ ! -d "backend" ]; then
  echo "❌ Backend directory not found. Run from project root."
  exit 1
fi

cd backend

# Clean previous packages
rm -rf package lambda.zip

# Create package directory
mkdir -p package

echo "1. Copying source files..."
# Copy all JavaScript files
find . -name "*.js" -not -path "./node_modules/*" -not -path "./package/*" -exec cp --parents {} package/ \;

# Copy package.json
cp package.json package/

echo "2. Installing production dependencies..."
cd package
npm install --production --quiet
cd ..

echo "3. Creating ZIP archive..."
cd package
zip -r ../lambda.zip . -q
cd ..

echo "4. Verifying package..."
if [ -f "lambda.zip" ]; then
  ZIP_SIZE=$(du -h lambda.zip | cut -f1)
  FILE_COUNT=$(unzip -l lambda.zip | wc -l)
  echo "✅ Lambda package created successfully!"
  echo "   📦 Size: $ZIP_SIZE"
  echo "   📁 Files: $((FILE_COUNT - 4))"  # Subtract header/footer lines
  echo "   🗂  Location: backend/lambda.zip"
else
  echo "❌ Failed to create lambda.zip"
  exit 1
fi

# Return to project root
cd ..
