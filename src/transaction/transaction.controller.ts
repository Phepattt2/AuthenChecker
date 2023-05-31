import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
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

        if (newTransaction.editable_amount >= 0 && newTransaction.editable_amount <= 1) {
            const addTransaction = new transactionEntity();

            addTransaction.ref_id = gen_ref_id() ; 
            addTransaction.app_id = newTransaction.app_id ; 
            addTransaction.txn_status = newTransaction.txn_status ; 
            addTransaction.serivce_id = newTransaction.service_id ; 
            addTransaction.reference1 = newTransaction.reference1 ; 
            addTransaction.device_type = newTransaction.device_type ;
            addTransaction.device_id = newTransaction.device_id ;
            addTransaction.editable_amount = newTransaction.editable_amount ;
            
            addTransaction.created_at = new Date()  ;
         
            return this.transactionService.insertTransaction(addTransaction);
        } else {
            return null ;
        }
        
    }

}


function ranString(length : number) : string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function addZero( val : number ):string{
    var stringVal = val.toString() ;
    if(stringVal.length <= 1 ){
        stringVal = "0" + stringVal ; 
    }
    return stringVal ;
}

function gen_ref_id() : string {
    const current = new Date();
    var month = addZero(current.getUTCMonth() + 1) //months from 1-12
    var day = addZero(current.getUTCDate())
    var year = current.getUTCFullYear().toString();
    const ref_id = year + month + day + ranString(10) ;
    return ref_id ; 
} 




 // regenerate ref _ id // from date  



