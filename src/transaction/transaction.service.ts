import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionEntity } from 'src/entity/transaction.Entity';
import { Repository } from 'typeorm';

const excludedKey = ['created_at', 'ref_id', 'paid_at'];


@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(transactionEntity)
        private readonly transactionRepository: Repository<transactionEntity>
        ,
    ) { }

    async insertTransaction(transaction: transactionEntity): Promise<transactionEntity> {
        try{

        return await this.transactionRepository.save(transaction);}
        catch (e){
            console.log('error inserting transaction ',e) ; 
            return e 
        }
    }

    async findAll(): Promise<transactionEntity[]> {
        try {
        return await this.transactionRepository.find();}
        catch (e){
            console.log('error finding transaction ',e);
            return e 
        }
    }

    async updateById(transaction: transactionEntity): Promise<transactionEntity|null> {
        try {

            const found = await this.transactionRepository.findOneBy({ref_id:transaction.ref_id})
            // const found = await this.transactionRepository.findOneById(transaction.ref_id)
            if (found) {

                const upFound = await initerUpdate(excludedKey,transaction,found) ;
                upFound.ref_id = transaction.ref_id ;

                return await this.transactionRepository.save(found);
            } else {
                console.log('error transaction not fonud')
                return found;
            }
        } catch (e) {
            console.log('error : ', e)
            return transaction;
        }
    }

    async deleteById(runner_key: string): Promise<string> {
        try {
            const delRes =  await this.transactionRepository.delete(runner_key);
            if(delRes.affected == 0 ){
                return "transaction delete failed not found";
            }
            return "transaction successfully deleted";
        } catch (e) {
            console.log('error : ', e)
            return e;
        }
    }

    async searchBy(entity : transactionEntity): Promise<transactionEntity[]> {
        const found = await this.transactionRepository.findBy(entity) ; 
            if (found) {
                return found
            } else {
                return null ; 
            }
    }



}

async function initerUpdate(notIncludeList: string[], userInput: transactionEntity , baseInput : transactionEntity): Promise<transactionEntity> {
    const exportedObject = baseInput;
    for (var key in userInput) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInput[key];
        }
    }
    return exportedObject
}