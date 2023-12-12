import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { IAppConfig } from '../config/config-interface';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface Ec2StackProps extends cdk.StackProps {
  config: IAppConfig
}

export class CdkEc2Stack extends cdk.Stack {
  public sg: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    // Get default VPC
    const defaultVPC: ec2.IVpc = ec2.Vpc.fromLookup(this, props.config.MasterConfig.defaultVpcId, {
      isDefault: true,

    })

    // Create a security group for EC2
    // Allows SSH connection from anywhere
    const ec2SG: ec2.ISecurityGroup = new ec2.SecurityGroup(this, props.config.Ec2Config.ec2SgId, {
      vpc: defaultVPC,
      description: props.config.Ec2Config.ec2SgDescription,
    });
    this.sg = ec2SG;

    // Add inbound ssh rule to the security group
    props.config.Ec2Config.ec2SgIngressRules.forEach(rule => {
      ec2SG.addIngressRule(rule.peer, rule.port, rule.description);
    });

    // TODO Create a new keypair for the jumpvm
    // const keyPair = new ec2.CfnKeyPair(this, 'MyKeyPair', {
    //     keyName: "jumpVmKey"
    // });

    // Get  existing key pair
    // const keyPair = ec2.CfnKeyPair(this, "jumpVmKey", {
    //     keyName: "JumpVmKey",
    //     publicKeyMaterial: ""
    // })


    // TODO create a separate file for userdatascript and import it here.
    // const userDataScript = `#!/bin/bash
    // echo -e "[mongodb-org-5.0] \nname=MongoDB Repository\nbaseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/5.0/x86_64/\ngpgcheck=1 \nenabled=1 \ngpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc" | sudo tee /etc/yum.repos.d/mongodb-org-5.0.repo
    // yum install -y mongodb-org-shell
    // wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem`


    // Launch a new ec2 instance
    const instance = new ec2.Instance(this, props.config.Ec2Config.instanceId, {
      instanceName: props.config.Ec2Config.instanceName,

      instanceType: ec2.InstanceType.of(
        props.config.Ec2Config.instanceClass,
        props.config.Ec2Config.instanceSize
      ),
      machineImage: props.config.Ec2Config.machineImage,
      vpc: defaultVPC,
      securityGroup: ec2SG,
      keyName: props.config.Ec2Config.keyName,
      userData: ec2.UserData.custom(props.config.Ec2Config.userData)
    });

  }
}

// TODO import already created ec2 instance (any resource) and then make changes to it (eg instance type)

// TODO if resource fails, what error does cdk show?