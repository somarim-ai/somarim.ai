#!/bin/bash
echo "🏭 SOMARIM SERVERLESS PRODUCTION READINESS CHECK v2"
echo "=================================================="

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

pass_count=0
fail_count=0
warn_count=0
info_count=0

check() {
  if eval "$1"; then
    echo -e "${GREEN}✅ PASS${NC}: $2"
    ((pass_count++))
    return 0
  else
    echo -e "${RED}❌ FAIL${NC}: $2"
    ((fail_count++))
    return 1
  fi
}

warn() {
  echo -e "${YELLOW}⚠️  WARN${NC}: $1"
  ((warn_count++))
}

info() {
  echo -e "${BLUE}ℹ️  INFO${NC}: $1"
  ((info_count++))
}

echo
echo "1. LAMBDA BACKEND READINESS"
check "test -f backend/lambda-handler.js" "Lambda handler exists"
check "test -f backend/package.json" "package.json exists"
check "node -e 'require(\"./backend/package.json\")' > /dev/null" "package.json is valid JSON"

# Better Gemini API key check
if [ -n "$GEMINI_API_KEY" ] && [ "$GEMINI_API_KEY" != "your_gemini_api_key_here" ]; then
  echo -e "${GREEN}✅ PASS${NC}: GEMINI_API_KEY is set"
  ((pass_count++))
else
  echo -e "${RED}❌ FAIL${NC}: GEMINI_API_KEY not set"
  echo "   Run: export GEMINI_API_KEY='your_key' or edit .env file"
  ((fail_count++))
fi

echo
echo "2. FRONTEND S3 READINESS" 
check "test -f frontend/package.json" "Frontend package.json exists"
check "cd frontend && npm run build > /dev/null 2>&1 && cd .." "Frontend builds successfully"
check "test -f frontend/dist/index.html" "Production index.html exists"

echo
echo "3. INFRASTRUCTURE AS CODE"
check "find . -name '*.tf' | head -1 | grep -q '.'" "Terraform files exist"
check "test -f terraform/main.tf" "Main Terraform config exists"
check "find terraform/ -name '*.tf' | xargs grep -q 'aws_lambda_function' && echo 'yes' > /dev/null" "Lambda Terraform config exists"

echo
echo "4. SECURITY & CONFIGURATION"
check "test -f .env.example || test -f backend/.env.example" "Environment template exists"
check "test -f terraform/iam.tf" "IAM configuration exists"
info "CORS configuration should be tested after deployment"

echo
echo "5. COST OPTIMIZATION"
check "find terraform/ -name '*.tf' | xargs grep -q 'memory_size.*128' && echo 'yes' > /dev/null" "Lambda memory optimized (128MB)"
check "test -f terraform/billing.tf" "Billing alerts configured"
info "DynamoDB on-demand pricing will be used"

echo
echo "=================================================="
echo "RESULTS:"
echo -e "${GREEN}PASS: $pass_count${NC}"
echo -e "${RED}FAIL: $fail_count${NC}" 
echo -e "${YELLOW}WARN: $warn_count${NC}"
echo -e "${BLUE}INFO: $info_count${NC}"

if [ $fail_count -eq 0 ]; then
  echo -e "\n${GREEN}🎉 SERVERLESS PRODUCTION READY!${NC}"
  echo "💰 Estimated Monthly Cost: $2-8 (Free Tier Optimized)"
  echo "🚀 Next steps:"
  echo "   1. Run: ./scripts/deploy-serverless.sh"
  echo "   2. Test: curl your-api-endpoint"
  echo "   3. Monitor: AWS Cost Explorer"
else
  echo -e "\n${RED}🚨 NOT PRODUCTION READY! Fix $fail_count critical issues.${NC}"
  echo "💡 Run: ./fix-production-issues.sh to auto-fix common issues"
  exit 1
fi
