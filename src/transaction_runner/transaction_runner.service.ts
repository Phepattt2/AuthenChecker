import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionEntity } from 'src/entity/transaction.Entity';
import { transactionRunnerEntity } from 'src/entity/transaction_runner.Entity';
import { Repository } from 'typeorm';

const excludedKey = ["runner_key"]


@Injectable()
export class TransactionRunnerService {
    constructor(
        @InjectRepository(transactionRunnerEntity)
        private readonly transactionRunnerRepository: Repository<transactionRunnerEntity>
        ,
    ) { }

    async insertTransactionRunner(transactionRunner: transactionRunnerEntity): Promise<transactionRunnerEntity> {
        try {
            return await this.transactionRunnerRepository.save(transactionRunner);
        } catch (e) {
            console.log('insert error : ', e)
            return e
        }
    }

    async findAll(): Promise<transactionRunnerEntity[]> {
        try {
            return await this.transactionRunnerRepository.find();
        } catch (e) {
            console.log('error : ', e);
            return e;
        }
    }

    async updateById(transactionRunner: transactionRunnerEntity): Promise<transactionRunnerEntity> {
        try {
            const found = await this.transactionRunnerRepository.findOneBy({ 'runner_key': transactionRunner.runner_key });
            if (found) {
                const updatedFound = await initUpdater(excludedKey, transactionRunner, found);
                updatedFound.runner_key = transactionRunner.runner_key
                return await this.transactionRunnerRepository.save(found);
            } else {
                console.log('error transaction_runner not found');
                return found
            }
        } catch (e) {
            console.log('error : ', e)
            return transactionRunner;
        }
    }

    async deleteById(runner_key: string): Promise<string> {
        try {
            if (await this.transactionRunnerRepository.findOneBy({ 'runner_key': runner_key })) {
                await this.transactionRunnerRepository.delete(runner_key);
                return "transaction_runner successfully deleted";
            } else {
                return "transaction_runner delete failed not found";
            }
        } catch (e) {
            console.log('error : ', e);

            return e;
        }
    }


}


async function initUpdater(notIncludeList: string[], inputEntity: transactionRunnerEntity, baseEntity: transactionRunnerEntity): Promise<transactionRunnerEntity> {

    const exportedEntity = baseEntity;
    for (var key in inputEntity) {
        if (notIncludeList.includes(key) == false) {
            exportedEntity[key] = inputEntity[key];
        }
    }
    return exportedEntity

}