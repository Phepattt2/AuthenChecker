import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleWareModule } from './auth-middle-ware/auth-middle-ware.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typrOrmConfig} from  './config/typeorm.config'
import { testEntity } from './entity/test.Entity';
import { TestEntityController } from './test-entity/test-entity.controller';
import { TestEntityService } from './test-entity/test-entity.service';
import { app_auth } from './entity/app-auth.Entity';
import { AppAuthController } from './app-auth/app-auth.controller';
import { AppAuthService } from './app-auth/app-auth.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionModule } from './transaction/transaction.module';
import { ProviderController } from './provider/provider.controller';
import { ProviderModule } from './provider/provider.module';
import { ProviderService } from './provider/provider.service';
import { providerEntity } from './entity/provider.Entity';
import { ServiceModule } from './service/service.module';
import { ServiceController } from './service/service.controller';
import { ServiceService } from './service/service.service';
import { serviceEntity } from './entity/service.Entity';


@Module({
  imports: [ AuthMiddleWareModule , 
              TypeOrmModule.forRoot(typrOrmConfig) ,
              TypeOrmModule.forFeature([testEntity,app_auth,providerEntity , serviceEntity]),
              
            ],
  controllers: [AppController,TestEntityController,AppAuthController, ProviderController ,ServiceController ],
  providers: [AppService,TestEntityService, AppAuthService , ProviderService , ServiceService],
  
})
export class AppModule {}
