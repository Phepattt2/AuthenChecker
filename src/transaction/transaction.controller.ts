import { Body, Controller, Get, Put, Delete, HttpCode, HttpStatus, Post, Res, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { transactionEntity } from 'src/entity/transaction.Entity';
import { transactionDTO } from 'src/dto/transaction.dto';
import { Request, Response } from 'express';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';

const excludedKey = ['created_at', 'ref_id', 'paid_at'];
const txn_statusAllow = [0,1,2,3]  ;



@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Roles( Role.ADMIN , Role.DEV ,Role.EXEC ,Role.USER )
    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response , @Body() transactionDTO: transactionDTO ): Promise<void> {
        try {
            const initRes = await initer(excludedKey , transactionDTO) ;
            initRes.ref_id = transactionDTO.ref_id ;
    
           const findResult = await  this.transactionService.searchBy(initRes) ;
            res.status(200).json(findResult) ; 
        }catch(e){
            console.log(e) ; 
            res.status(500).json({Error: 'Internal Server Error'})
        }
        
    }
    @Roles( Role.ADMIN , Role.DEV ,Role.EXEC )
    @Get('/getAllTransactions')
    async getAllTransaction(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const transaction = await this.transactionService.findAll();
            res.status(200).json(transaction)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }

    }

    @Roles(Role.ADMIN , Role.DEV  ,Role.USER)
    @Post('/createTransaction')
    @HttpCode(HttpStatus.CREATED)

    async createTransaction(@Req() req: Request, @Res() res: Response, @Body() newTransaction: transactionDTO): Promise<void> {
        try {
            if (   txn_statusAllow.includes(Number(newTransaction.txn_status )) ){
                const setEntity = await initer(excludedKey, newTransaction)
                // database auto generate ref_id
                const res_data = await this.transactionService.insertTransaction(setEntity);
                res.status(200).json(res_data)
            }else{
                res.status(400).json({Error:'Unprocessable Entity ( invalid input ) '})
            }
            
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }



    }

    @Roles(Role.ADMIN ,Role.DEV)
    @Put("/updateById")
    async updateTransactionById(@Req() req: Request, @Res() res: Response, @Body() transaction: transactionDTO): Promise<void> {
        try {
            if (  txn_statusAllow.includes(Number(transaction.txn_status )) ){

                const initRes = await initer(excludedKey, transaction)

                initRes.ref_id = transaction.ref_id;
    
                const updateResult = await this.transactionService.updateById(initRes);
    
                if (!updateResult) {
    
                    res.status(404).json(`Error: transaction not found`);
    
                } else {
    
                    res.status(200).json(updateResult);
    
                }
            } else {
                res.status(422).json({ Error : "Unprocessable Entity ( Unprocessable Entity )"})    ;
            }
            
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    @Roles(Role.ADMIN )
    @Delete("/deleteById")
    async deleteTransactionById(@Req() req: Request, @Res() res: Response, @Body() transactionDTO: transactionDTO): Promise<void> {
        try {
            const deleteResult = await this.transactionService.deleteById(transactionDTO.ref_id);
            res.status(200).json(deleteResult);
        } catch (e) {
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



