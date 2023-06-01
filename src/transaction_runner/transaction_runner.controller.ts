import { transactionRunnerEntity } from 'src/entity/transaction_runner.Entity';
import {TransactionRunnerService} from './transaction_runner.service' ;
import { Body, Controller, Get, Post , Put , Delete , HttpCode, HttpStatus} from '@nestjs/common';
import { transactionRunnerDTO } from 'src/dto/transaction_runner.dto';
import { PrimaryGeneratedColumn } from 'typeorm';
import { gen_ref_id } from 'src/generator/gen_ref_id';

@Controller('transaction-runner')
export class TransactionRunnerController {
    constructor (
        private readonly transactionRunnerService: TransactionRunnerService
    ) {}

    @Post("/createTRun")
    @HttpCode(HttpStatus.CREATED)
    async createTransactionRunner(@Body() newTransactionRunner: transactionRunnerDTO ): Promise<transactionRunnerEntity> {
        const addTransactionRunner = new transactionRunnerEntity() ; 
        addTransactionRunner.runner_key = gen_ref_id(0);
        addTransactionRunner.runner_count = newTransactionRunner.runner_count ;
        return this.transactionRunnerService.insertTransactionRunner(addTransactionRunner) ; 

    }  

    @Get('/getAllTransactionRunner')
    async getAllTransaction(): Promise<transactionRunnerEntity[]> {
        return await this.transactionRunnerService.findAll();
    }

    @Put("/updateById")
    async updateTransactionRunnerById( @Body() app_auth:transactionRunnerEntity) : Promise<transactionRunnerEntity> {
        return await this.transactionRunnerService.updateById(app_auth) ; 
    }

    @Delete("/deleteById")
    async deleteTransactionRunnerById( @Body() app_id : string) : Promise<string> {
        return await this.transactionRunnerService.deleteById(app_id) ; 
    }

}
