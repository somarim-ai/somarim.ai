resource "aws_iam_role_policy" "somarim_network" {
  name = "somarim-network-automation"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream", 
          "logs:PutLogEvents",
          "cloudwatch:PutMetricData"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow" 
        Action = [
          "ssm:GetParameter",
          "secretsmanager:GetSecretValue"
        ]
        Resource = "arn:aws:ssm:*:*:parameter/somarim/*"
      }
    ]
  })
}
