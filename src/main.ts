import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config} from 'dotenv' ; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 
  // app.setGlobalPrefix("/portal/api");
  
  app.enableCors();
  app.setGlobalPrefix("/portal/api");
  console.log('backend server opened at port 9000')
  await app.listen(9000);
}
bootstrap();
