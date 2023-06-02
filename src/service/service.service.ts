import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(serviceEntity)
        private readonly serviceRepository : Repository<serviceEntity>
        ,
    ){}

    async insertService( service : serviceEntity ) : Promise<serviceEntity> {
        return await this.serviceRepository.save(service) ;
    } 

    async findAll() : Promise<serviceEntity[]> {
        return await this.serviceRepository.find() ;
    } 

    // async updateById(service: serviceEntity): Promise<serviceEntity> {
    //     try {

    //         const found = await this.serviceRepository.findOneBy({ 'service_id': service.service_id })
            
    //         if (found) {

    //             found.topup_amount = service.topup_amount;

    //             found.updated_at = new Date();

    //             return await this.serviceRepository.save(found);

    //         } else {

    //             console.log('error topUpService not fonud')

    //             return topUpService;

    //         }
    //     } catch (e) {

    //         console.log('error : ', e)

    //         return topUpService;

    //     }
    // }

    // async deleteById(service_id: number): Promise<string> {
    //     try {

    //         if (await this.serviceRepository.findOneBy({ 'service_id': service_id })) {

    //             await this.serviceRepository.delete(service_id);
                
    //             return "topUpService successfully deleted";
            
    //         } else {
             
    //             return "topUpService failled"
            
    //         }
    //     } catch (e) {

    //         console.log('error : ', e)

    //         return e;

    //     }
    // }

}

