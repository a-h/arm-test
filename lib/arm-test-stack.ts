import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import * as path from 'path';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { ContainerImage, FargateTaskDefinition, CpuArchitecture, OperatingSystemFamily } from 'aws-cdk-lib/aws-ecs';

export class ArmTestStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const image = new DockerImageAsset(this, "ArmNodeExample", {
            directory: path.join(__dirname, "../nextjs-docker-example"),
            platform: Platform.LINUX_ARM64,
        })
        const taskDefinition = new FargateTaskDefinition(this, "TaskDef", {
            runtimePlatform: {
                operatingSystemFamily: OperatingSystemFamily.LINUX,
                cpuArchitecture: CpuArchitecture.ARM64,
            },
            cpu: 1024,
            memoryLimitMiB: 2048,
        });
        taskDefinition.addContainer("Web", {
            portMappings: [{ containerPort: 3000 }],
            image: ContainerImage.fromDockerImageAsset(image),
        });
        const service = new ApplicationLoadBalancedFargateService(this, "LoadBalancedService", {
            assignPublicIp: true,
            taskDefinition,
        })
        new CfnOutput(this, "endpointURL", { value: service.loadBalancer.loadBalancerDnsName, })
    }
}
