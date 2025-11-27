# SOMARIM AIOps for Network Automation

## Overview
SOMARIM is an AI-native platform that transforms natural language business intents into fully operational network configurations. It uses Google's Gemini Pro to understand, generate, and validate complex network changes, while proactively predicting failures and automating troubleshooting.

### Key Features
- **Intent-Based Configuration**: Describe your network needs in plain English.
- **Multi-Vendor Support**: Generate configurations for Cisco, Juniper, Arista, and more.
- **AI-Powered Validation**: Automatically create validation commands to ensure correctness.
- **Proactive Failure Prediction**: Analyze telemetry to predict and prevent outages.
- **Automated Troubleshooting**: Diagnose and resolve network issues with AI-driven insights.

## Deployment
This project is deployed on AWS Lambda and orchestrated with Terraform. The CI/CD pipeline is managed by GitHub Actions.

### Prerequisites
- AWS Account
- Terraform Cloud or CLI
- Gemini API Key
- GitHub Account

### Setup & Deployment
1. **Fork this repository.**
2. **Configure secrets** in GitHub Actions:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `GEMINI_API_KEY`
3. **Push to `main` branch** to trigger the deployment workflow.

## Usage
Interact with the API Gateway endpoint to send commands:

**Endpoint**: `(Your API Gateway URL)/network`

### Example cURL
```bash
curl -X POST (Your API Gateway URL)/network \
-H "Content-Type: application/json" \
-d '{
  "action": "generate_config",
  "parameters": {
    "intent": "Create a new VLAN for the guest network with DHCP",
    "vendor": "cisco"
  }
}'
```
