import { IEc2Config } from "../config-interface";
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as fs from 'fs';

const userdataPath = __dirname + '/../ec2UserData/userData.sh';
const userData = fs.readFileSync(userdataPath, 'utf8');

export var Ec2Config: IEc2Config = {
    ec2SgId: "EC2SG",
    ec2SgDescription: "Security group for cdkJumpVm, allows all ssh connections",
    ec2SgIngressRules: [
        {
            peer: ec2.Peer.anyIpv4(),
            port: ec2.Port.tcp(22),
            description: "Allow all SSH traffic"
        }
    ],
    instanceId: "JumpVm",
    instanceName: "CDKJumpVMDocDb2",
    instanceClass: ec2.InstanceClass.T2,
    instanceSize: ec2.InstanceSize.MICRO,
    machineImage: ec2.MachineImage.latestAmazonLinux2(),
    keyName: "JumpVmKey",
    userData: userData
};