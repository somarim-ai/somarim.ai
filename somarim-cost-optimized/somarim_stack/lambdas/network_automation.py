from aws_cdk import (
    aws_lambda as lambda_,
    aws_dynamodb as dynamodb,
    aws_iam as iam,
    Duration
)
from constructs import Construct

class CostOptimizedLambda(Construct):
    def __init__(
        self, 
        scope: Construct, 
        construct_id: str,
        gemini_api_key: str,
        sessions_table: dynamodb.Table
    ):
        super().__init__(scope, construct_id)
        
        # Ultra cost-optimized Lambda
        self.function = lambda_.Function(
            self, "Function",
            function_name="somarim-network-ai-optimized",
            memory_size=128,  # 🚀 75% cheaper than 512MB
            timeout=Duration.seconds(30),  # 🚀 90% cheaper than 300s
            runtime=lambda_.Runtime.PYTHON_3_9,
            handler="lambda_handlers.network_automation.lambda_handler",
            code=lambda_.Code.from_asset("../backend"),
            architecture=lambda_.Architecture.ARM_64,  # 🚀 Cheaper than x86
            environment={
                "GEMINI_API_KEY": gemini_api_key,
                "SESSIONS_TABLE": sessions_table.table_name,
                "COST_OPTIMIZED": "true"
            }
        )
        
        # Minimal permissions
        sessions_table.grant_read_write_data(self.function)
        self.function.role.add_managed_policy(
            iam.ManagedPolicy.from_aws_managed_policy_name(
                "service-role/AWSLambdaBasicExecutionRole"
            )
        )
