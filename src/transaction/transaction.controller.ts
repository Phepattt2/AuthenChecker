import { Body, Controller, Get, Put , Delete , HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { transactionEntity } from 'src/entity/transaction.Entity';
import { transactionDTO } from 'src/dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService : TransactionService) { }

    @Get('/getAllTransactions')
    async getAllTransaction(): Promise<transactionEntity[]> {
        return await this.transactionService.findAll();
    }

    @Post('/createTransaction')
    @HttpCode(HttpStatus.CREATED)

    async createProvider(@Body() newTransaction: transactionDTO): Promise<transactionEntity> {
            const addTransaction = new transactionEntity();
            
            for ( const keys in addTransaction ){
                
            }
            addTransaction.app_id = newTransaction.app_id ; 
            addTransaction.txn_status = newTransaction.txn_status ; 
            addTransaction.service_id = newTransaction.service_id ; 
            addTransaction.service_txn_id = newTransaction.service_txn_id ;
            addTransaction.service_session = newTransaction.service_session 
            addTransaction.reference1 = newTransaction.reference1 ; 
            addTransaction.reference2= newTransaction.reference1 ; 
            addTransaction.reference3 = newTransaction.reference1 ; 
            addTransaction.reference4 = newTransaction.reference1 ; 
            addTransaction.reference5 = newTransaction.reference1 ; 
            addTransaction.reference6 = newTransaction.reference1 ; 
            addTransaction.device_type = newTransaction.device_type ;
            addTransaction.device_id = newTransaction.device_id ;
            addTransaction.location_id = newTransaction.location_id ; 
            addTransaction.cashier_id = newTransaction.cashier_id ; 
            addTransaction.txn_detail = newTransaction.txn_detail ;
            addTransaction.amount = newTransaction.amount ;
            addTransaction.fee = newTransaction.fee ;
            addTransaction.created_at = newTransaction.created_at ;
            addTransaction.created_at = new Date()  ;
            
            return this.transactionService.insertTransaction(addTransaction);
        
        
    }

    @Put("/updateById")
    async updateAuthById( @Body() app_auth:transactionEntity) : Promise<transactionEntity> {
        return await this.transactionService.updateById(app_auth) ; 
    }

    @Delete("/deleteById")
    async deleteAuthById( @Body() app_id : string) : Promise<string> {
        return await this.transactionService.deleteById(app_id) ; 
    }

}






 // regenerate ref _ id // from date  



