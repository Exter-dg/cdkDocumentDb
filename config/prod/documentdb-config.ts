import { IDocumentDbConfig } from "../config-interface";
import * as ec2 from 'aws-cdk-lib/aws-ec2';


export var DocDbConfig: IDocumentDbConfig = {
    docDbSgId: "DocDbSG",
    docDbSgDescription: "Security group for docDB, allows ssh connection from ec2 Instance",
    docDbSgIngressRules: [
    ],
    docDbClusterId: "docDbCluster",
    docDbClusterMasterUserName: "admin123",
    instanceClass: ec2.InstanceClass.T3,
    instanceSize: ec2.InstanceSize.MEDIUM,
}