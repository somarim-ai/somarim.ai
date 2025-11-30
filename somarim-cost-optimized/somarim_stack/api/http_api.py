from aws_cdk import (
    aws_apigatewayv2 as apigw,
    aws_apigatewayv2_integrations as integrations,
    CfnOutput,
    Duration
)
from constructs import Construct

class CostOptimizedAPI(Construct):
    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        network_lambda
    ):
        super().__init__(scope, construct_id)
        
        # 🚀 HTTP API (cheaper than REST)
        self.api = apigw.HttpApi(
            self, "HttpApi",
            api_name="somarim-cost-optimized-api",
            cors_preflight=apigw.CorsPreflightOptions(
                allow_origins=["*"],
                allow_methods=[apigw.CorsHttpMethod.POST, apigw.CorsHttpMethod.OPTIONS],
                allow_headers=["content-type"],
                max_age=Duration.hours(1)
            )
        )
        
        lambda_integration = integrations.HttpLambdaIntegration(
            "NetworkIntegration", network_lambda
        )
        
        # Essential routes only
        self.api.add_routes(
            path="/network",
            methods=[apigw.HttpMethod.POST],
            integration=lambda_integration
        )
        
        self.api.add_routes(
            path="/health",
            methods=[apigw.HttpMethod.GET],
            integration=lambda_integration
        )
        
        self.api_url = self.api.url
