import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { app_auth } from "src/entity/app-auth.Entity";
import { providerEntity } from "src/entity/provider.Entity";
import { serviceEntity } from "src/entity/service.Entity";
import { testEntity } from "src/entity/test.Entity";


export const typrOrmConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Piito#1911',
        database: 'temp1',
        entities: [testEntity ,app_auth ,providerEntity , serviceEntity ],   
        synchronize: true,
}               

console.log('databased init  -- connecnt started --') ; 
