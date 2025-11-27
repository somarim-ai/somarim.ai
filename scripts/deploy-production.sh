#!/bin/bash

# Exit on error
set -e

# Deploy Terraform infrastructure
cd terraform
terraform init
terraform apply -auto-approve
