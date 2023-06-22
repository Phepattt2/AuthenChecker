import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { app_auth } from "src/entity/app-auth.Entity";
import { appServiceMapEntity } from "src/entity/app_service_map.Entity";
import { packageServiceEntity } from "src/entity/package_service.Entity";
import { providerEntity } from "src/entity/provider.Entity";
import { serviceEntity } from "src/entity/service.Entity";
import { testEntity } from "src/entity/test.Entity";
import { topUpServiceEntity } from "src/entity/topup_service.Entity";
import { transactionEntity } from "src/entity/transaction.Entity";
import { transactionRunnerEntity } from "src/entity/transaction_runner.Entity";


export const typrOrmConfig: TypeOrmModuleOptions = {
        type: process.env.DB_TYPE as any,
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT),
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DB,
        entities: [
                appServiceMapEntity,
                app_auth,
                packageServiceEntity,
                providerEntity,
                serviceEntity,
                topUpServiceEntity,
                transactionRunnerEntity,
                transactionEntity,
        ],
        synchronize: true,
}

console.log('databased init  -- connecnt started --'); 
