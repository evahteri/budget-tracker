const { Stack } = require('aws-cdk-lib/core');
const { Vpc } = require('aws-cdk-lib/aws-ec2');
const { Cluster, ContainerImage } = require('aws-cdk-lib/aws-ecs');
const { ApplicationLoadBalancedFargateService } = require('aws-cdk-lib/aws-ecs-patterns');
const path = require('path');

class BackendStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'BackendVPC', {
      maxAzs: 3,
      natGateways: 1,
    });

    const cluster = new Cluster(this, 'BackendCluster', {
      vpc,
    });

    new ApplicationLoadBalancedFargateService(this, 'BackendFargateService', {
      cluster,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      taskImageOptions: {
        image: ContainerImage.fromAsset(path.join(__dirname, '../../../')),
        containerPort: 3001,
        healthCheck: {
          command: ['CMD-SHELL', 'curl -f http://localhost:3001/health || exit 1'],
          interval: 30,
          timeout: 5,
          retries: 3,
          startPeriod: 10,
        },
      },
      publicLoadBalancer: true,
    });

  }
}

module.exports = { BackendStack }
