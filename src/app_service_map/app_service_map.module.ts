import { Module } from '@nestjs/common';
import { AppServiceMapService } from './app_service_map.service';

@Module({
  providers: [AppServiceMapService]
})
export class AppServiceMapModule {}
