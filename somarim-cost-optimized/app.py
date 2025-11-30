#!/usr/bin/env python3
import aws_cdk as cdk
from somarim_stack.somarim_stack import SomarimCostOptimizedStack

app = cdk.App()

SomarimCostOptimizedStack(
    app, "SomarimCostOptimized",
    description="SOMARIM AIOps - Cost Optimized for $13/month",
    env=cdk.Environment(
        account=app.node.try_get_context("account"),
        region=app.node.try_get_context("region") or "us-east-1"
    )
)

app.synth()
