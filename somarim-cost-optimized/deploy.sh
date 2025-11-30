#!/bin/bash
# deploy.sh

echo "🚀 DEPLOYING SOMARIM COST-OPTIMIZED STACK ($13/month)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if backend exists
if [ ! -d "../backend" ]; then
    echo -e "${RED}❌ Backend directory not found${NC}"
    echo "Please ensure your SOMARIM backend is in ../backend/"
    exit 1
fi

# Check if frontend exists
if [ ! -d "../frontend/dist" ]; then
    echo -e "${YELLOW}⚠️  Frontend dist not found, building...${NC}"
    cd ../frontend
    npm run build
    cd ../somarim-cost-optimized
fi

# Install CDK if not present
if ! command -v cdk &> /dev/null; then
    echo -e "${YELLOW}📦 Installing AWS CDK...${NC}"
    npm install -g aws-cdk
fi

# Install Python dependencies
echo -e "${YELLOW}📦 Installing Python dependencies...${NC}"
pip install -r requirements.txt

# Get Gemini API key
if [ -z "$GEMINI_API_KEY" ]; then
    echo -e "${YELLOW}🔑 Enter your Gemini API key:${NC}"
    read -s GEMINI_API_KEY
    echo
fi

# Bootstrap (if needed)
echo -e "${YELLOW}🔄 Bootstrapping CDK...${NC}"
cdk bootstrap

# Deploy
echo -e "${YELLOW}🚀 Deploying SOMARIM to AWS...${NC}"
cdk deploy --context gemini_api_key=$GEMINI_API_KEY

echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}💰 Estimated monthly cost: $13.00${NC}"
echo -e "${GREEN}🌐 Your SOMARIM AIOps platform is now live!${NC}"
