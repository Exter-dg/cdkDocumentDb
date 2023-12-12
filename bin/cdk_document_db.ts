#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkDocumentDbStack } from '../lib/documentdb-stack';
import { CdkEc2Stack } from '../lib/ec2-stack';
import { AppConfigClass } from './cdk_document_db_config';

const app = new cdk.App();

AppConfigClass.AppConfig.forEach(config => {
  const envName = config.BaseConfig.envName;

  // Create new instance
  const ec2JumpInstance = new CdkEc2Stack(app, `EC2Step${envName}`, {
    env: config.MasterConfig.envConfig,
    config: config
  });


  // Create docdb cluster
  const cluster = new CdkDocumentDbStack(app, `DocDbCluster${envName}`, { 
    env: config.MasterConfig.envConfig, 
    ec2SG: ec2JumpInstance.sg,
    config: config
  });

  cluster.addDependency(ec2JumpInstance);

});



// TODO stackset in cloufformation - one role/resource -> multiple account/regions - how to do this in cdk?