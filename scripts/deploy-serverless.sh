#!/bin/bash

echo "Deploying serverless components..."

# Navigate to the terraform directory
cd terraform

# Initialize Terraform
/ephemeral/nix/store/qihvgqhg2fkhrb1wlglh3fg6mbc1rlys-terraform-1.9.8/bin/terraform init

# Apply the terraform configuration
/ephemeral/nix/store/qihvgqhg2fkhrb1wlglh3fg6mbc1rlys-terraform-1.9.8/bin/terraform apply -auto-approve

echo "Serverless deployment complete."
