import { Module } from '@nestjs/common';
import { AuthMiddleWareController } from './auth-middle-ware.controller';
import { AuthMiddleWareService } from './auth-middle-ware.service';

@Module({
  controllers: [AuthMiddleWareController],
  providers: [AuthMiddleWareService]
})
export class AuthMiddleWareModule {}
