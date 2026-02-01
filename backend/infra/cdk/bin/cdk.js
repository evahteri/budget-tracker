#!/usr/bin/env node
require('dotenv').config();

const cdk = require('aws-cdk-lib/core');
const { BackendStack } = require('../lib/cdk-stack');

const app = new cdk.App();

const account = process.env.CDK_ACCOUNT;
const region = process.env.CDK_REGION;

if (!account || !region) {
  throw new Error('CDK_ACCOUNT and CDK_REGION must be set');
}

new BackendStack(app, 'BackendStack', {
  env : { account: account, region: region },
});
