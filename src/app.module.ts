import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typrOrmConfig } from './config/typeorm.config'
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
import { transactionEntity } from './entity/transaction.Entity';
import { TransactionService } from './transaction/transaction.service';
import { appServiceMapEntity } from './entity/app_service_map.Entity';
import { packageServiceEntity } from './entity/package_service.Entity';
import { topUpServiceEntity } from './entity/topup_service.Entity';
import { transactionRunnerEntity } from './entity/transaction_runner.Entity';
import { AppServiceMapController } from './app_service_map/app_service_map.controller';
import { AppServiceMapModule } from './app_service_map/app_service_map.module';
import { AppServiceMapService } from './app_service_map/app_service_map.service';
import { TransactionRunnerController } from './transaction_runner/transaction_runner.controller';
import { TransactionRunnerService } from './transaction_runner/transaction_runner.service';
import { TransactionRunnerModule } from './transaction_runner/transaction_runner.module';
import { PackageServiceController } from './package_service/package_service.controller';
import { PackageServiceService } from './package_service/package_service.service';
import { PackageServiceModule } from './package_service/package_service.module';
import { TopupServiceController } from './topup_service/topup_service.controller';
import { TopupServiceService } from './topup_service/topup_service.service';
import { TopupServiceModule } from './topup_service/topup_service.module';
import { AuthMiddleWare } from './middleware/firebaseAuthen.middleware';
import {  firebaseAppCheckMiddleware } from './middleware/firebaseAppcheck.middleware';


// appServiceMapEntity,
//                 app_auth,
//                 packageServiceEntity,
//                 providerEntity,
//                 serviceEntity,
//                 topUpServiceEntity,
//                 transactionRunnerEntity,
//                 transactionEntity,
//                 appServiceMapEntity,

@Module({
  imports: [ 
    TypeOrmModule.forRoot(typrOrmConfig),
    TypeOrmModule.forFeature([  appServiceMapEntity,
                                app_auth,
                                packageServiceEntity,
                                providerEntity,
                                serviceEntity,
                                topUpServiceEntity,
                                transactionRunnerEntity,
                                transactionEntity,]),
            ],
          
  controllers: [AppController, AppAuthController, ProviderController, ServiceController, TransactionController, AppServiceMapController, TransactionRunnerController, PackageServiceController, TopupServiceController ], 
  providers: [AppService, AppAuthService, ProviderService, ServiceService, TransactionService , AppServiceMapService, TransactionRunnerService, PackageServiceService, TopupServiceService],
})
export class AppModule implements NestModule
{
  configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(AuthMiddleWare).forRoutes('*');
    //  consumer
    //  .apply(firebaseAppCheckMiddleware).forRoutes('*');
  }
 }


//  export class AppModule 
// {
 
// }

