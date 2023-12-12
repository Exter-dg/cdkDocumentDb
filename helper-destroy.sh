#!/bin/bash

# Check if the environment name is provided
if [ -z "$1" ]; then
  echo "Error: Please provide the environment name as the first argument."
  exit 1
fi

env_name="$1"

# Find all stacks that end with the provided environment name
# stacks=$(cdk list | grep -E "${env_name}$")

stacks_to_deploy=$(cdk list | grep -E "${1}$" | tr '\n' ' ')

# Loop through each stack and destroy it
# for stack in $stacks; do
#   echo "Destroying stack: $stack..."
#   cdk destroy "$stack"
# done

echo "Destroying stacks: $stacks_to_deploy"
cdk destroy $stacks_to_deploy

echo "Destroy op complete."
