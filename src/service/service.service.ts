import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { IntegerType, Repository } from 'typeorm';
import { deserializeStream } from 'typeorm/driver/mongodb/bson.typings';

const excludedKey = ['service_id', 'created_at', 'latest_fee_at']


@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(serviceEntity)
        private readonly serviceRepository: Repository<serviceEntity>
        ,
    ) { }

    async getLastestTime(): Promise<Date> {
        const latestTime = new Date() ;
        return latestTime;
    }

    async insertService(service: serviceEntity): Promise<serviceEntity> {
        service.created_at = new Date();
        service.latest_fee_at = await this.getLastestTime() ;
        return await this.serviceRepository.save(service);
    }

    async findAll(): Promise<serviceEntity[]> {
        return await this.serviceRepository.find();
    }

    async updateById(service: serviceEntity): Promise<serviceEntity> {
        try {

            const found = await this.serviceRepository.findOneBy({ 'service_id': service.service_id })

            if (found != null) {

                const initRes = await initerUpdate(excludedKey, service, found);

                return await this.serviceRepository.save(initRes);

            } else {

                console.log('error service not fonud')
                return found;

            }
        } catch (e) {

            console.log('error : ', e)

            return e;

        }
    }

    async deleteById(service_id: number): Promise<string> {
        try {
            const delRes = await this.serviceRepository.createQueryBuilder() 
            .delete() 
            .where('service_id = :value1' , {
                value1 : service_id,
            })
            .execute() ; 

            console.log('delRes ' , delRes)
            if(delRes.affected ==0 ) {
                return "service delete failed not found "
            }


            return "topUpService successfully deleted";

        } catch (e) {

            console.log('error : ', e)

            return e;

        }
    }

    async searchBy(entity : serviceEntity): Promise<serviceEntity[]> {
        const found = await this.serviceRepository.findBy(entity) ; 
            if (found) {
                return found
            } else {
                return null ; 
            }
    }


}

async function initerUpdate(notIncludeList: string[], userInput: serviceEntity, baseInput: serviceEntity): Promise<serviceEntity> {
    const exportedObject = baseInput;
    for (var key in userInput) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInput[key];
        }
    }
    return exportedObject
}