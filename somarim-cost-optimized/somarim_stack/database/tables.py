from aws_cdk import (
    aws_dynamodb as dynamodb,
    RemovalPolicy
)
from constructs import Construct

class CostOptimizedTables(Construct):
    def __init__(self, scope: Construct, construct_id: str):
        super().__init__(scope, construct_id)
        
        # 🚀 Single table design for cost efficiency
        self.sessions_table = dynamodb.Table(
            self, "SessionsTable",
            table_name="somarim-sessions",
            partition_key=dynamodb.Attribute(
                name="pk",
                type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="sk",  
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,  # 🚀 Pay per request
            time_to_live_attribute="ttl",
            removal_policy=RemovalPolicy.DESTROY,
            point_in_time_recovery=False  # 🚀 Cost savings
        )
