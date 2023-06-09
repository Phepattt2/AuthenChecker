import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringArraySupportOption } from 'prettier';
import { topUpServiceListDTO } from 'src/dto/topUpServiceList.dto';
import { topUpServiceEntity } from 'src/entity/topup_service.Entity';
import { Repository } from 'typeorm';

const excludedKeys = ['service_id', 'topup_order', 'updated_at'];


@Injectable()
export class TopupServiceService {
    constructor(
        @InjectRepository(topUpServiceEntity)
        private readonly topUpServiceRepository: Repository<topUpServiceEntity>
    ) { }

    async findAll(): Promise<topUpServiceEntity[]> {
        try {
            return await this.topUpServiceRepository.find();
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    async insertTopUpService(topUpService: topUpServiceEntity): Promise<topUpServiceEntity> {
        try {
            const existService = await this.topUpServiceRepository.findBy({ service_id: topUpService.service_id });
            const existAmount = await this.topUpServiceRepository.findBy({ 'service_id': topUpService.service_id, 'topup_amount': topUpService.topup_amount });

            // duplicate name 
            if (await (existAmount).length == 0 ) {
                console.log('existAmount' , existAmount );
                console.log('type existAmount' , typeof(existAmount) );
                topUpService.updated_at = new Date();
                topUpService.topup_order = existService.length + 1;
                return this.topUpServiceRepository.save(topUpService);
            } else {
                console.log('duplicate top up amount')
                return null;
            }

        } catch (e) {
            console.log('erorr : ', e)
            return null;

        }
    }



    async insertTopUpServiceList(topUpServiceList: topUpServiceListDTO): Promise<string> {
        try {
            const topUpServiceId = topUpServiceList.service_id;
            const existService = await this.topUpServiceRepository.findBy({ service_id: topUpServiceList.service_id });

            // from string to Integer list with sorting
            const addList = topUpServiceList.topup_amount.toString().split(',') ; 
            const numberList = (addList.map(str => parseInt(str)));
            numberList.sort((a, b) => a - b);

            var orderId = existService.length;
            var dupList = [] ;
            for (var i = 0; i < numberList.length; i++) {

                var topUpEntity = new topUpServiceEntity();
           
                // init entity's value 
                topUpEntity.service_id = topUpServiceId;
                topUpEntity.topup_amount = numberList[i];
                topUpEntity.updated_at = new Date();

                // check for same topup_amonut between input and stored in DB. 
                var existAmount = await this.topUpServiceRepository.findBy({ 'service_id': topUpServiceId, 'topup_amount': numberList[i] });
                
                if (await (existAmount).length == 0) {
                    topUpEntity.topup_order = orderId + 1;
                    orderId += 1;
                    
                    await this.topUpServiceRepository.save(topUpEntity);
    
                } else {
                    dupList.push(numberList[i] ) ; 
                }

            }
            if( dupList.length > 0 ){
                console.log('dupList', dupList)
                return `insert success but duplicate` ; 
            }else {
                return `insert success`; 
            }

            

        } catch ( e ){
    
            return null ;
        }
        
    }
    async updateById(topUpService: topUpServiceEntity): Promise<topUpServiceEntity> {
        try {
            console.log(topUpService, topUpService.service_id, topUpService.topup_amount)

            const found = await this.topUpServiceRepository.findOneBy({ service_id: topUpService.service_id, topup_order: topUpService.topup_order })
            console.log(found)
            if (found) {


                found.topup_amount = topUpService.topup_amount;

                found.updated_at = new Date();

                return await this.topUpServiceRepository.save(found);

            } else {

                console.log('error topUpService not fonud')

                return found;

            }
        } catch (e) {

            console.log('error : ', e)

            return e;

        }
    }

    async deleteById(topUpService: topUpServiceEntity): Promise<string> {
        try {
            const delRes = await this.topUpServiceRepository.createQueryBuilder()
                .delete()
                .where('service_id = :value1', { value1: topUpService.service_id})
                .execute();
            if (delRes.affected == 0) {
                return "topUpService delete failled not found"
            }
            return "topUpService successfully deleted"
        } catch (e) {
            console.log('error : ', e)
            return e;
        }
    }

    async deleteByIdOrder(topUpService: topUpServiceEntity): Promise<string> {
        try {
            const delRes = await this.topUpServiceRepository.createQueryBuilder()
                .delete()
                .where('service_id = :value1 AND topup_order = :value2', { value1: topUpService.service_id, value2: topUpService.topup_order })
                .execute();
            if (delRes.affected == 0) {
                return "topUpService delete failled not found"
            }
            return "topUpService successfully deleted"
        } catch (e) {
            console.log('error : ', e)
            return e;
        }
    }




    async searchBy(entity: topUpServiceEntity): Promise<topUpServiceEntity[]> {
        const found = await this.topUpServiceRepository.findBy(entity);
        if (found) {
            return found
        } else {
            return null;
        }
    }

}

async function initerUpdate(notIncludeList: string[], userInput: topUpServiceEntity, baseInput: topUpServiceEntity): Promise<topUpServiceEntity> {
    const exportedObject = baseInput;
    for (var key in userInput) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInput[key];
        }
    }
    return exportedObject
}