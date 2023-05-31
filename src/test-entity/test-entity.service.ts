import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { testEntity } from 'src/entity/test.Entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestEntityService {
    constructor(
        @InjectRepository(testEntity)
        private readonly testEntityRepository: Repository<testEntity> ,
    ){}

    async addTest(testEntity : testEntity ): Promise<testEntity>{
        console.log('outside ',testEntity);
        return await this.testEntityRepository.save(testEntity) ; 
    }

  
    async findAll( ): Promise<testEntity[]>{
        return await this.testEntityRepository.find() ; 
    }





}
