import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { appServiceMapEntity } from 'src/entity/app_service_map.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppServiceMapService {
    constructor(
        @InjectRepository(appServiceMapEntity)
        private readonly appServiceMapEntityRepository: Repository<appServiceMapEntity>
        ){}

        async findAll() : Promise<appServiceMapEntity[]> {
            return await this.appServiceMapEntityRepository.find(); 
        } 

}
