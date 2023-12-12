import { MasterConfig } from "../config/master-config";

// Dev Imports
import { Ec2Config as Ec2ConfigDev } from "../config/dev/ec2-config";
import { DocDbConfig as DocDbConfigDev } from "../config/dev/documentdb-config";
import { BaseConfig as BaseConfigDev } from "../config/dev/base-config";

// Base Imports
import { Ec2Config as Ec2ConfigProd } from "../config/prod/ec2-config";
import { DocDbConfig as DocDbConfigProd } from "../config/prod/documentdb-config";
import { BaseConfig as BaseConfigProd } from "../config/prod/base-config";
import { IAppConfig, IDocumentDbConfig, IEc2Config } from "../config/config-interface";



export class AppConfigClass {
    public static AppConfig:IAppConfig[] = [
        {
            Ec2Config: Ec2ConfigDev,
            DocDbConfig: DocDbConfigDev,
            BaseConfig: BaseConfigDev,
            MasterConfig: MasterConfig,
        },
        {
            Ec2Config: Ec2ConfigProd,
            DocDbConfig: DocDbConfigProd,
            BaseConfig: BaseConfigProd,
            MasterConfig: MasterConfig,
        }
    ]
}