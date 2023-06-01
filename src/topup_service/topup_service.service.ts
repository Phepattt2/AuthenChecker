import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { topUpServiceEntity } from 'src/entity/topup_service.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopupServiceService {
    constructor(
        @InjectRepository(topUpServiceEntity)
        private  readonly topUpServiceRepository: Repository<topUpServiceEntity> 
    ){}

    async findAll () : Promise<topUpServiceEntity[]> {
        return await this.topUpServiceRepository.find() ;
    } 
}
