import { Module } from '@nestjs/common';
import { AppAuthService } from './app-auth.service';

@Module({
  providers: [AppAuthService]
})
export class AppAuthModule {}
