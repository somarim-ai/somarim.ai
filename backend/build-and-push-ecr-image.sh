#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- VARS ---
AWS_REGION="us-east-1"
ECR_REPOSITORY_NAME="somarim-ecr-repo"

# --- DOCKER LOGIN ---
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query "Account" --output text).dkr.ecr.$AWS_REGION.amazonaws.com
echo "✅ Docker login successful."


# --- BUILD AND PUSH ---
ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
ECR_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY_NAME"

echo "Building Docker image..."
docker build -t $ECR_REPOSITORY_NAME .
echo "✅ Docker image built."

echo "Tagging Docker image..."
docker tag $ECR_REPOSITORY_NAME:latest $ECR_URI:latest
echo "✅ Docker image tagged."


echo "Pushing image to ECR..."
docker push $ECR_URI:latest
echo "✅ Image pushed to ECR at $ECR_URI:latest"

