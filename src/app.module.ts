import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleWareModule } from './auth-middle-ware/auth-middle-ware.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typrOrmConfig} from  './config/typeorm.config'
@Module({
  imports: [AuthMiddleWareModule , TypeOrmModule.forRoot(typrOrmConfig) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
