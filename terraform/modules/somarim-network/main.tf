resource "aws_lambda_function" "network_automation" {
  filename         = "../../backend/lambda.zip"
  function_name    = "somarim-network-automation"
  role            = aws_iam_role.lambda_exec.arn
  handler         = "lambda_handlers.network_automation.lambda_handler"
  runtime         = "python3.9"
  timeout         = 300
  memory_size     = 512
  
  environment {
    variables = {
      GEMINI_API_KEY     = var.gemini_api_key
      NODE_ENV           = "production"
      LOG_LEVEL          = "INFO"
    }
  }
}

resource "aws_api_gateway_rest_api" "somarim_api" {
  name        = "somarim-network-api"
  description = "SOMARIM Network Automation API"
}

resource "aws_api_gateway_resource" "network" {
  rest_api_id = aws_api_gateway_rest_api.somarim_api.id
  parent_id   = aws_api_gateway_rest_api.somarim_api.root_resource_id
  path_part   = "network"
}

resource "aws_api_gateway_method" "post" {
  rest_api_id   = aws_api_gateway_rest_api.somarim_api.id
  resource_id   = aws_api_gateway_resource.network.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.network_automation.function_name
  principal     = "apigateway.amazonaws.com"
}
