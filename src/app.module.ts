import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleWareModule } from './auth-middle-ware/auth-middle-ware.module';

@Module({
  imports: [AuthMiddleWareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
