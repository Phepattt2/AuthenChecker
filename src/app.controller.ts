import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("portal/api")
export class AppController {
  constructor(private readonly appService: AppService) {}

}
