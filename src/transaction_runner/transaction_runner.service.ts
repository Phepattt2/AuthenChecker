import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transactionRunnerEntity } from 'src/entity/transaction_runner.Entity';
import { Repository } from 'typeorm';

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
                found.runner_count = transactionRunner.runner_count;
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
            if(await this.transactionRunnerRepository.findOneBy({'runner_key' : runner_key})) {
                await this.transactionRunnerRepository.delete(runner_key);
                return "transaction_runner successfully deleted";
            }else {
                return "transaction_runner failled "
              }
        } catch (e) {
            console.log('error : ', e);

            return e;
        }
    }


}
