#!/bin/bash
# scripts/load-env.sh

echo "🔧 Loading environment..."

# Check for required variables
if [ -z "$GEMINI_API_KEY" ]; then
  echo "❌ GEMINI_API_KEY is required"
  exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "❌ AWS credentials are required"
  exit 1
fi

# Set defaults
export AWS_REGION=${AWS_REGION:-us-east-1}
export PROJECT_NAME=${PROJECT_NAME:-somarim}

echo "✅ Environment loaded"
