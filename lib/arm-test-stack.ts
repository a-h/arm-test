import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { ContainerImage } from 'aws-cdk-lib/aws-ecs';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ArmTestStack extends Stack {
        constructor(scope: Construct, id: string, props?: StackProps) {
                super(scope, id, props);

                // The code that defines your stack goes here

                // example resource
                // const queue = new sqs.Queue(this, 'ArmTestQueue', {
                //   visibilityTimeout: cdk.Duration.seconds(300)
                // });
                const image = new DockerImageAsset(this, "ArmNodeExample", {
                        directory: path.join(__dirname, "../node-docker-example"),
                        platform: Platform.LINUX_AMD64,
                })
                const service = new ApplicationLoadBalancedFargateService(this, "LoadBalancedService", {
                        assignPublicIp: true,
                        taskImageOptions: {
                                image: ContainerImage.fromDockerImageAsset(image),
                                containerPort: 3000,
                        },
                })
                new CfnOutput(this, "endpointURL", { value: service.loadBalancer.loadBalancerDnsName, })
        }
}
