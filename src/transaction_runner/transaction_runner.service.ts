import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionRunnerEntity } from 'src/entity/transaction_runner.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRunnerService {
    constructor(
        @InjectRepository(transactionRunnerEntity)
        private readonly transactionRunnerRepository : Repository<transactionRunnerEntity>
        ,
    ){}

    async insertTransaction( transaction : transactionRunnerEntity ) : Promise<transactionRunnerEntity> {
        return await this.transactionRunnerRepository.save(transaction) ;
    } 

    async findAll () : Promise<transactionRunnerEntity[]> {
        return await this.transactionRunnerRepository.find() ;
    } 
}
