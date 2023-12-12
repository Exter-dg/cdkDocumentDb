import * as cdk from 'aws-cdk-lib';
import { aws_docdb as docDb, aws_ec2 as ec2 } from 'aws-cdk-lib';
import { IVpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { IAppConfig } from '../config/config-interface';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface DocDbStackProps extends cdk.StackProps {
    ec2SG: ec2.ISecurityGroup
    config: IAppConfig
}

export class CdkDocumentDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: DocDbStackProps) {
    super(scope, id, props);

    const DocDbConfig = props.config.DocDbConfig;

    const defaultVPC: IVpc = ec2.Vpc.fromLookup(this, props.config.MasterConfig.defaultVpcId, {
        isDefault: true
    })

    // Create a new security group for the doc db cluster
    const docDbSg: ec2.ISecurityGroup = new ec2.SecurityGroup(this, DocDbConfig.docDbSgId, {
        vpc: defaultVPC,
        description: DocDbConfig.docDbSgDescription,
    });

    // ! This rule cannot be sent from config
    docDbSg.addIngressRule(ec2.Peer.securityGroupId(props.ec2SG.securityGroupId), ec2.Port.tcp(27017), 'Allow  SSH traffic')


    // Create a clustered database
    const cluster = new docDb.DatabaseCluster(this, DocDbConfig.docDbClusterId, {
        masterUser: {
            username: DocDbConfig.docDbClusterMasterUserName
        },
        vpc: defaultVPC,
        instanceType: ec2.InstanceType.of(DocDbConfig.instanceClass, DocDbConfig.instanceSize),
        securityGroup: docDbSg
    });

  }
}
