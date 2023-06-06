import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringArraySupportOption } from 'prettier';
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

            return await this.topUpServiceRepository.save(topUpService);

        } catch (e) {
            console.log('erorr : ', e)
            return e
        }
    }

    async updateById(topUpService: topUpServiceEntity): Promise<topUpServiceEntity> {
        try {

            const found = await this.topUpServiceRepository.findOneBy({ 'service_id': topUpService.service_id, 'topup_order': topUpService.topup_order })

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
            .where('service_id = :value1 AND topup_order = :value2' , {value1 : topUpService.service_id ,value2 : topUpService.topup_order})
            .execute();
            if(delRes.affected == 0 ){
                return "topUpService delete failled not found"
            }
            return "topUpService successfully deleted"
        } catch (e) {
            console.log('error : ', e)
            return e;
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