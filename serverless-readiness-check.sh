#!/bin/bash
echo "🏭 SOMARIM SERVERLESS PRODUCTION READINESS CHECK"
echo "==============================================="

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

pass_count=0
fail_count=0
warn_count=0

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

echo
echo "1. LAMBDA BACKEND READINESS"
check "test -f backend/lambda-handler.js" "Lambda handler exists"
check "test -f backend/package.json" "package.json exists"
check "node -e 'require(\"./backend/package.json\")' > /dev/null" "package.json is valid JSON"
check "test -n \"$GEMINI_API_KEY\"" "GEMINI_API_KEY is set"

echo
echo "2. FRONTEND S3 READINESS" 
check "test -f frontend/package.json" "Frontend package.json exists"
check "cd frontend && npm run build > /dev/null 2>&1 && cd .." "Frontend builds successfully"
check "test -f frontend/dist/index.html" "Production index.html exists"

echo
echo "3. INFRASTRUCTURE AS CODE"
check "find . -name '*.tf' | head -1 | grep -q '.'" "Terraform files exist"
check "test -f terraform/main.tf" "Main Terraform config exists"
check "find terraform/ -name '*.tf' | xargs grep -q 'aws_lambda_function' && echo 'yes'" "Lambda Terraform config exists"

echo
echo "4. SECURITY & CONFIGURATION"
check "test -f .env.example || test -f backend/.env.example" "Environment template exists"
warn "Verify IAM roles have least privilege"
warn "Check CORS configuration for S3+Lambda"

echo
echo "5. COST OPTIMIZATION"
check "find terraform/ -name '*.tf' | xargs grep -q 'memory_size.*128' && echo 'yes'" "Lambda memory optimized (128MB)"
warn "Consider DynamoDB on-demand pricing"
warn "Setup billing alerts in AWS"

echo
echo "==============================================="
echo "RESULTS:"
echo -e "${GREEN}PASS: $pass_count${NC}"
echo -e "${RED}FAIL: $fail_count${NC}" 
echo -e "${YELLOW}WARN: $warn_count${NC}"

if [ $fail_count -eq 0 ]; then
  echo -e "\n${GREEN}🎉 SERVERLESS PRODUCTION READY!${NC}"
  echo "Estimated Monthly Cost: $2-8 (Free Tier Optimized)"
  echo "Next: ./scripts/deploy-serverless.sh"
else
  echo -e "\n${RED}🚨 NOT PRODUCTION READY! Fix $fail_count critical issues.${NC}"
  exit 1
fi
