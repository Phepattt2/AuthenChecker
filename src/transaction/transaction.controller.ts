import { Body, Controller, Get, Put, Delete, HttpCode, HttpStatus, Post, Res, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { transactionEntity } from 'src/entity/transaction.Entity';
import { transactionDTO } from 'src/dto/transaction.dto';
import { Request, Response } from 'express';

const excludedKey = ['created_at', 'ref_id', 'paid_at'];

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get('/getAllTransactions')
    async getAllTransaction(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            console.log('recived get ')
            const transaction = await this.transactionService.findAll();
            res.status(200).json(transaction)
        } catch (err) {
        console.log(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
        
    }

    @Post('/createTransaction')
    @HttpCode(HttpStatus.CREATED)

    async createProvider(@Req() req: Request, @Res() res: Response, @Body() newTransaction: transactionDTO): Promise<void> {

        try {
            const setEntity = await initer(excludedKey, newTransaction)
            const res_data = await this.transactionService.insertTransaction(setEntity);
            res.status(200).json(res_data)
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }



    }

    @Put("/updateById")
    async updateAuthById(@Req() req: Request, @Res() res: Response, @Body() transaction: transactionDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKey,transaction)
            initRes.ref_id = transaction.ref_id ;
            const updateResult = await this.transactionService.updateById(initRes);
            res.status(200).json(updateResult);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    @Delete("/deleteById")
    async deleteAuthById(@Req() req: Request, @Res() res: Response, @Body() transactionDTO: transactionDTO): Promise<void> {
        try {
            const deleteResult = await this.transactionService.deleteById(transactionDTO.ref_id);
            res.status(200).json(deleteResult);
        }catch(e){
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
}


async function initer(notIncludeList: string[], userInputDTO: transactionDTO): Promise<transactionEntity> {
    const exportedObject = new transactionEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}


// regenerate ref _ id // from date  



