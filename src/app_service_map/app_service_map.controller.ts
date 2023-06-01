import { Controller , Get } from '@nestjs/common';
import { AppServiceMapService } from './app_service_map.service';
import { appServiceMapEntity } from 'src/entity/app_service_map.Entity';

@Controller('app-service-map')
export class AppServiceMapController {
    constructor(
        private readonly appServiceMapService : AppServiceMapService 
    ){}

    @Get('/getAllAppServiceMap')
    async getAllAppServiceMap(): Promise<appServiceMapEntity[]>{
        return await  this.appServiceMapService.findAll() ;
    } 
}
