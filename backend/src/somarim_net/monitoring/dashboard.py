import boto3
import json

class SOMARIMMonitoring:
    def __init__(self):
        self.cloudwatch = boto3.client('cloudwatch')
        
    def create_network_automation_dashboard(self):
        """Create CloudWatch dashboard for SOMARIM"""
        dashboard_body = {
            "widgets": [
                {
                    "type": "metric",
                    "properties": {
                        "metrics": [
                            ["AWS/Lambda", "Invocations", "FunctionName", "somarim-network-automation"],
                            [".", "Errors", ".", "."],
                            [".", "Duration", ".", "."]
                        ],
                        "period": 300,
                        "stat": "Sum",
                        "region": "us-east-1",
                        "title": "SOMARIM Lambda Performance"
                    }
                },
                {
                    "type": "text",
                    "properties": {
                        "markdown": "# SOMARIM Network Automation\n## Real-time AI Operations"
                    }
                }
            ]
        }
        
        self.cloudwatch.put_dashboard(
            DashboardName="SOMARIM-Network-Automation",
            DashboardBody=json.dumps(dashboard_body)
        )
