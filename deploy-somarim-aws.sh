#!/bin/bash

echo "🚀 Starting Somarim AWS deployment..."

bash aws-deployment/deploy-lambdas.sh
bash aws-deployment/deploy-api.sh
bash aws-deployment/deploy-frontend.sh

echo "✅ Somarim AWS deployment completed!"
