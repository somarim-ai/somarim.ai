terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_lambda_function" "example" {
  function_name = "serverless-example"
  runtime       = "nodejs16.x"
  handler       = "backend/lambda-handler.handler"
  filename      = "../backend/lambda.zip"
  role          = aws_iam_role.lambda_exec.arn
  memory_size   = 128
}
