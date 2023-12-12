#!/bin/bash

# Check if the environment name is provided
if [ -z "$1" ]; then
  echo "Error: Please provide the environment name as the first argument."
  exit 1
fi

env_name="$1"

# Find all stacks that end with the provided environment name
# stacks=$(cdk list | grep -E "${env_name}$")

# Combine all stacks into a single argument list
stacks_to_deploy=$(cdk list | grep -E "${1}$" | tr '\n' ' ')

# Loop through each stack and deploy it
# for stack in $stacks; do
#   echo "Deploying stack: $stack..."
#   cdk deploy "$stack"
# done

echo "Destroying stacks: $stacks_to_deploy"
cdk deploy $stacks_to_deploy

echo "Deployment complete."
