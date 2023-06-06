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
        console.log("runner key ", transaction.ref_id)

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
            console.log(transaction)

            console.log(transaction.ref_id)
            const found = await this.transactionRepository.findOneBy({ref_id:transaction.ref_id})
            // const found = await this.transactionRepository.findOneById(transaction.ref_id)
            if (found) {

                const upFound = await initerUpdate(excludedKey,transaction,found) ;
                upFound.ref_id = transaction.ref_id ; 
                // found.txn_status = transaction.txn_status
                // found.service_txn_id = transaction.service_txn_id
                // found.service_session = transaction.service_session
                // found.reference1 = transaction.reference1
                // found.reference2 = transaction.reference2
                // found.reference3 = transaction.reference3
                // found.reference4 = transaction.reference4
                // found.reference5 = transaction.reference5
                // found.reference6 = transaction.reference6
                // found.device_type = transaction.device_type
                // found.device_id = transaction.device_id
                // found.location_id = transaction.location_id
                // found.cashier_id = transaction.cashier_id
                // found.txn_detail = transaction.txn_detail
                // found.amount = transaction.amount
                // found.fee = transaction.fee

                return await this.transactionRepository.save(found);
            } else {
                console.log('error transaction not fonud')
                return transaction;
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