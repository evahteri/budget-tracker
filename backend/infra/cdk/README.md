# Infra automation for the backend service

This AWS CDK code includes the setup to run the backend application on AWS.

## Used services

- EC2 Application Load Balancer
- ECS cluster with Fargate instances
- VPC 

## How to use

1. Install AWS CDK
2. Add .env file to `backend/infra/cdk` with content:
```
CDK_ACCOUNT={your aws account id}
CDK_REGION={aws region you want to deploy}
```
3. `cdk bootstrap`
4. `cdk synth`
5. `cdk deploy`
