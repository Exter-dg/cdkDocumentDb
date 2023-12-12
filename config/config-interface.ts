import { IMachineImage, IPeer, InstanceClass, InstanceSize, InstanceType, Port } from "aws-cdk-lib/aws-ec2";

interface ISgIngressRule {
    peer: IPeer,
    port: Port,
    description: string
}

export interface IEc2Config {
    ec2SgId: string,
    ec2SgDescription: string,
    ec2SgIngressRules: ISgIngressRule[],
    instanceId: string,
    instanceName: string,
    instanceClass: InstanceClass,
    instanceSize: InstanceSize,
    machineImage: IMachineImage,
    keyName: string,
    userData: string
}

export interface IDocumentDbConfig {
    docDbSgId: string,
    docDbSgDescription: string,
    docDbSgIngressRules: ISgIngressRule[],
    docDbClusterId: string,
    docDbClusterMasterUserName: string,
    instanceClass: InstanceClass,
    instanceSize: InstanceSize,
}

export interface IAppConfig {
    Ec2Config: IEc2Config,
    DocDbConfig: IDocumentDbConfig,
    BaseConfig: {
        envName: string
    },
    MasterConfig: {
        defaultVpcId : string,
        envConfig : {
            account: string,
            region: string
        }
    }
}