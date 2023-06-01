import { Controller, HttpCode, HttpStatus, Post, Body, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { Repository } from 'typeorm';
import { ServiceService } from './service.service';
import { serviceDTO } from 'src/dto/service.dto';

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post('/createService')
    @HttpCode(HttpStatus.CREATED)
    async createService(@Body() service: serviceDTO): Promise<serviceEntity> {

        const addService = new serviceEntity();
        addService.service_id = service.service_id;
        addService.service_code = service.service_code;
        addService.service_type = service.service_type;
        addService.service_name = service.service_name;
        addService.service_fee = service.service_fee;
        addService.service_status = service.service_status;
        addService.provider_code = service.provider_code;
        addService.provider_service_id = service.provider_service_id;
        addService.created_at = new Date();
        addService.require_calfee = service.require_calfee;
        // fix 
        addService.latest_fee_at = new Date();

        if (service.service_status >= 0 && service.service_status <= 1 && service.require_calfee >= 0 && service.require_calfee <= 1) {
            return await this.serviceService.insertService(addService);
        } else {
            console.log('input out of range (service_status or require_calfee)')
            return addService;
        }
    }

    @Get('/getAllService')
    async getAllService () : Promise<serviceEntity[]> {
        return this.serviceService.findAll()}

    

}
