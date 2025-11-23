#!/bin/bash
# complete-deployment.sh

echo "🎯 STARTING COMPLETE SOMARIM DEPLOYMENT..."

# 1. Deploy Lambda Function
echo "🔮 Step 1: Deploying Lambda Function..."
chmod +x deploy-lambda.sh
./deploy-lambda.sh

# 2. Setup API Gateway
echo "🌐 Step 2: Configuring API Gateway..."
chmod +x setup-api-gateway.sh
./setup-api-gateway.sh

# 3. Update React Environment
echo "⚛️ Step 3: Updating React Environment..."
# Create/update .env file
cat > frontend/.env <<EOL
REACT_APP_SOMARIM_API_URL=$SOMARIM_API_URL
REACT_APP_VERSION=1.0.0
EOL

# 4. Start React Application
echo "🚀 Step 4: Starting React Application..."
cd frontend
npm install
npm run dev

echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 React App: http://localhost:3000"
echo "🔮 SOMARIM API: $SOMARIM_API_URL"