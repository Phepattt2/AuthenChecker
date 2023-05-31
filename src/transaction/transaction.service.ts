import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionEntity } from 'src/entity/transaction.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(transactionEntity)
        private readonly transactionRepository : Repository<transactionEntity>
        ,
    ){}

    async insertTransaction( transaction : transactionEntity ) : Promise<transactionEntity> {
        return await this.transactionRepository.save(transaction) ;
    } 

    async findAll () : Promise<transactionEntity[]> {
        return await this.transactionRepository.find() ;
    } 


}

