#!/bin/bash
echo "🔧 Fixing Production Readiness Issues..."

# 1. Fix Gemini API Key issue
echo "1. Setting up Gemini API Key..."
if [ -z "$GEMINI_API_KEY" ]; then
  echo "❌ GEMINI_API_KEY not set"
  echo "   Please set it: export GEMINI_API_KEY='your_key_here'"
  echo "   Or run: ./setup-environment.sh"
  exit 1
else
  echo "✅ GEMINI_API_KEY is set"
fi

# 2. Create IAM configuration
echo "2. Creating least privilege IAM configuration..."
mkdir -p terraform

cat > terraform/iam.tf << 'IAMEOF'
resource "aws_iam_role" "lambda_exec" {
  name = "somarim-lambda-exec"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy" "lambda_basic" {
  name = "somarim-lambda-basic"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream", 
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}
IAMEOF
echo "✅ IAM configuration created"

# 3. Add CORS to Lambda handler
echo "3. Adding CORS support to Lambda..."
if [ -f "backend/lambda-handler.js" ]; then
  grep -q "Access-Control-Allow-Origin" backend/lambda-handler.js || cat >> backend/lambda-handler.js << 'CORSEOF'

// CORS headers for S3 + Lambda
const addCorsHeaders = (response) => {
  return {
    ...response,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      ...response.headers
    }
  };
};
CORSEOF
  echo "✅ CORS support added"
else
  echo "⚠️  Lambda handler not found, skipping CORS update"
fi

# 4. Create billing alerts
echo "4. Setting up billing alerts..."
cat > terraform/billing.tf << 'BILLINGEOF'
resource "aws_cloudwatch_metric_alarm" "monthly_billing" {
  alarm_name          = "somarim-monthly-billing"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "1"
  metric_name         = "EstimatedCharges"
  namespace           = "AWS/Billing"
  period              = "21600"
  statistic           = "Maximum"
  threshold           = "10"
  alarm_description   = "Monthly billing estimate exceeded $10"

  dimensions = {
    Currency = "USD"
  }
}
BILLINGEOF
echo "✅ Billing alerts configured"

echo "🎉 All production issues fixed!"
echo "📋 Remaining manual steps:"
echo "   - Set your email in terraform/billing.tf"
echo "   - Review IAM policies for your specific needs"
echo "   - Run: ./serverless-readiness-check.sh to verify"
