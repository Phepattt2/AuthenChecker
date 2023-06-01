import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { packageServiceEntity } from 'src/entity/package_service.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackageServiceService {
    constructor(
        @InjectRepository(packageServiceEntity)
        private readonly packageServiceRepository : Repository<packageServiceEntity>
        ,
    ){}

    async insertTransaction( transaction : packageServiceEntity ) : Promise<packageServiceEntity> {
        return await this.packageServiceRepository.save(transaction) ;
    } 

    async findAll () : Promise<packageServiceEntity[]> {
        return await this.packageServiceRepository.find() ;
    } 

}
