import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringArraySupportOption } from 'prettier';
import { topUpServiceEntity } from 'src/entity/topup_service.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopupServiceService {
    constructor(
        @InjectRepository(topUpServiceEntity)
        private readonly topUpServiceRepository: Repository<topUpServiceEntity>
    ) { }

    async findAll(): Promise<topUpServiceEntity[]> {
        try {
        return await this.topUpServiceRepository.find();
        }catch(e){
            console.log(e); 
            return e ; 
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
            const found = await this.topUpServiceRepository.findOneBy({ 'service_id': topUpService.service_id })
            if (found) {
                found.topup_amount = topUpService.topup_amount ; 
                found.updated_at = new Date() ;

                return await this.topUpServiceRepository.save(found);
            } else {
                console.log('error topUpService not fonud')
                return topUpService;
            }
        } catch (e) {
            console.log('error : ', e)
            return topUpService;
        }
    }

    async deleteById( service_id : number ): Promise<string> {
        try {
            if ( await this.topUpServiceRepository.findOneBy({'service_id':service_id})){
                await this.topUpServiceRepository.delete(service_id);
                return "topUpService successfully deleted";
            } else {
                return "topUpService failled"
            }
        } catch (e) {
            console.log('error : ', e)
            return e;
        }
    }
}
