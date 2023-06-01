import { transactionRunnerEntity } from 'src/entity/transaction_runner.Entity';
import {TransactionRunnerService} from './transaction_runner.service' ;
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('transaction-runner')
export class TransactionRunnerController {
    constructor (
        private readonly transactionRunnerService: TransactionRunnerService
    ) {}

    @Get('/getAllTransactionRunner')
    async getAllTransaction(): Promise<transactionRunnerEntity[]> {
        console.log('this fuction is workling')
        return await this.transactionRunnerService.findAll();
    }

}
