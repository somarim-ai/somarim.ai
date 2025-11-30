from aws_cdk import (
    Stack, Duration, RemovalPolicy, CfnOutput, aws_budgets as budgets
)
from constructs import Construct
from .lambdas.network_automation import CostOptimizedLambda
from .api.http_api import CostOptimizedAPI
from .frontend.static_hosting import CostOptimizedFrontend
from .database.tables import CostOptimizedTables

class SomarimCostOptimizedStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs):
        super().__init__(scope, construct_id, **kwargs)

        # 1. Cost-Optimized Database Tables
        database = CostOptimizedTables(self, "Database")
        
        # 2. Cost-Optimized Lambda Functions
        network_lambda = CostOptimizedLambda(
            self, "NetworkAutomation",
            gemini_api_key=self.get_gemini_api_key(),
            sessions_table=database.sessions_table
        )
        
        # 3. Cost-Optimized API Gateway
        api = CostOptimizedAPI(
            self, "HttpAPI",
            network_lambda=network_lambda.function
        )
        
        # 4. Cost-Optimized Frontend
        frontend = CostOptimizedFrontend(self, "Frontend")
        
        # 5. Budget Alert
        self.create_budget_alert()
        
        # 6. Outputs
        self.add_outputs(api, frontend, network_lambda)

    def get_gemini_api_key(self):
        return self.node.try_get_context("gemini_api_key") or "set-in-cdk-context"

    def create_budget_alert(self):
        budgets.CfnBudget(
            self, "MonthlyBudget",
            budget=budgets.CfnBudget.BudgetDataProperty(
                budget_name="somarim-13-dollar-budget",
                budget_type="COST",
                time_unit="MONTHLY",
                budget_limit=budgets.CfnBudget.SpendProperty(
                    amount=13.00,
                    unit="USD"
                )
            )
        )

    def add_outputs(self, api, frontend, lambda_func):
        CfnOutput(self, "ApiUrl", value=api.api_url)
        CfnOutput(self, "FrontendUrl", value=frontend.distribution_url)
        CfnOutput(self, "LambdaFunction", value=lambda_func.function.function_name)
        CfnOutput(self, "MonthlyCostEstimate", value="$13.00")
