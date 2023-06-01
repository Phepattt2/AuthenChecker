import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(serviceEntity)
        private readonly serviceRepository : Repository<serviceEntity>
        ,
    ){}

    async insertService( service : serviceEntity ) : Promise<serviceEntity> {
        return await this.serviceRepository.save(service) ;
    } 

    async findAll() : Promise<serviceEntity[]> {
        return await this.serviceRepository.find() ;
    } 

}
