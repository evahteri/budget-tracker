#!/usr/bin/env node

const cdk = require('aws-cdk-lib/core');
const { BackendStack } = require('../lib/cdk-stack');

const app = new cdk.App();
new BackendStack(app, 'BackendStack', {
  env : { account: '462993243775', region: 'eu-north-1' },
});
