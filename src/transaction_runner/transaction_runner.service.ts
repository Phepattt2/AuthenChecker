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
            return await this.transactionRunnerRepository.save(transactionRunner);
    }

    async findAll(): Promise<transactionRunnerEntity[]> {
            return await this.transactionRunnerRepository.find();
    }

    async updateById(transactionRunner: transactionRunnerEntity): Promise<transactionRunnerEntity> {
            const found = await this.transactionRunnerRepository.findOneBy({ 'runner_key': transactionRunner.runner_key });
            if (found) {
                const updatedFound = await initUpdater(excludedKey, transactionRunner, found);
                updatedFound.runner_key = transactionRunner.runner_key
                return await this.transactionRunnerRepository.save(found);
            } else {
                console.log('error transaction_runner not found');
                return found
            }
    }

    async deleteById(runner_key: string): Promise<string> {
        const found  = await this.transactionRunnerRepository.findOneBy({ 'runner_key': runner_key })
            if (found) {
                await this.transactionRunnerRepository.delete(runner_key);
                return "transaction_runner successfully deleted";
            } else {
                return "transaction_runner delete failed not found";
            }
    }

    async findBy(entity : transactionRunnerEntity): Promise<transactionRunnerEntity[]> {
        const found = await this.transactionRunnerRepository.findBy(entity) ; 
            if (found) {
                return found
            } else {
                return null ; 
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