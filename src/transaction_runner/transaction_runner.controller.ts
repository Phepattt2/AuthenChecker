import { transactionRunnerEntity } from 'src/entity/transaction_runner.Entity';
import { TransactionRunnerService } from './transaction_runner.service';
import { Body, Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { transactionRunnerDTO } from 'src/dto/transaction_runner.dto';
import { PrimaryGeneratedColumn } from 'typeorm';
import { gen_ref_id } from 'src/generator/gen_ref_id';
import { Request, Response } from 'express';

const excludedKey = ["runner_key"]

@Controller('transaction-runner')
export class TransactionRunnerController {
    constructor(
        private readonly transactionRunnerService: TransactionRunnerService
    ) { }


    @Post("/createTRun")
    @HttpCode(HttpStatus.CREATED)
    async createTransactionRunner(@Req() req: Request, @Res() res: Response, @Body() newTransactionRunner: transactionRunnerDTO): Promise<void> {
        try {

            const addTransactionRunner = new transactionRunnerEntity();
            
            // init the culumns value. 
            const intiRes = await initer(excludedKey,newTransactionRunner) ;

            // generate ref_id key
            intiRes.runner_key = gen_ref_id(0);
            
            const creatRes = await this.transactionRunnerService.insertTransactionRunner(intiRes);
            
            res.status(200).json(creatRes)

        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    @Get('/getAllTransactionRunner')
    async getAllTransaction(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const getRes = await this.transactionRunnerService.findAll();
            res.status(200).json(getRes);
        }
        catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    @Put("/updateById")
    async updateTransactionRunnerById(@Req() req: Request, @Res() res: Response, @Body() transactionRunner: transactionRunnerDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKey,transactionRunner) ; 
            
            initRes.runner_key = transactionRunner.runner_key ; 
            console.log(initRes)
            const updateRes = await this.transactionRunnerService.updateById(initRes);

            res.status(200).json(updateRes)

        } catch (e) {
            console.log(e)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    @Delete("/deleteById")
    async deleteTransactionRunnerById(@Req() req: Request, @Res() res: Response, @Body() app_id: string): Promise<void> {
        try {
            const delRes = await this.transactionRunnerService.deleteById(app_id);
            res.status(200).json(delRes);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

async function initer(notIncludeList: string[], userInputDTO: transactionRunnerDTO): Promise<transactionRunnerEntity> {
    const exportedObject = new transactionRunnerEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}