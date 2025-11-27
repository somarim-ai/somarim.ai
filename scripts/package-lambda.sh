#!/bin/bash

# Exit on any error
set -e

echo "📦 Packaging Lambda function..."

cd backend

# Install production dependencies
npm install --production

# Create a zip file with the necessary files
zip -r lambda.zip *.js package.json node_modules/

echo "✅ Lambda function packaged successfully as backend/lambda.zip"
