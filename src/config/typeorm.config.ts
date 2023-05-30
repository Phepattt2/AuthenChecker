import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typrOrmConfig: TypeOrmModuleOptions = {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Piito#1911',
        database: 'postgres',
        entities: [],   
        synchronize: true,
}

console.log('databased init  -- connecnt started --') ; 
