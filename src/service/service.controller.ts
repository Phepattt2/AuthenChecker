import { Controller, HttpCode, HttpStatus, Post ,Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { Repository } from 'typeorm';
import { ServiceService } from './service.service';
import { serviceDTO } from 'src/dto/service.dto';

@Controller('service')
export class ServiceController {
    constructor( private readonly serviceService : ServiceService){}

    @Post('/createService')
    @HttpCode(HttpStatus.CREATED)
    async createService( @Body()  service : serviceDTO ) : Promise<serviceEntity> {

        const addService = new serviceEntity(); 
        
        addService.service_id = service.service_id 
        addService.provider_code = service.provider_code


        return await this.serviceService.insertService(addService) ;   
    } 
    
}
