import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { providerEntity } from 'src/entity/provider.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(providerEntity)
        private readonly providerRepository: Repository<providerEntity> ,
    ){}

     async findAll() : Promise<providerEntity[]> {
        return this.providerRepository.find()  ;
     } 

     async insertProvider(provider : providerEntity) : Promise<providerEntity> {
        return this.providerRepository.save(provider) ; 
     }

}
