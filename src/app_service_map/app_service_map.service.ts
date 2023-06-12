import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { appServiceMapEntity } from 'src/entity/app_service_map.Entity';
import { Repository } from 'typeorm';

const excludedKey = ['app_id', 'servicer_id'];


@Injectable()
export class AppServiceMapService {
    constructor(
        @InjectRepository(appServiceMapEntity)
        private readonly appServiceMapEntityRepository: Repository<appServiceMapEntity>
    ) { }

    async findAll(): Promise<appServiceMapEntity[]> {
        return await this.appServiceMapEntityRepository.find();
    }

    async insertAppServiceMap(appService: appServiceMapEntity): Promise<appServiceMapEntity> {
        appService.created_at = new Date();
        return await this.appServiceMapEntityRepository.save(appService);
    }


    async deleteById(appService: appServiceMapEntity): Promise<string> {
        try {

            const delRes = await this.appServiceMapEntityRepository.createQueryBuilder()
                .delete()
                .where('app_id = :value1 AND service_id = :value2' , { value1: appService.app_id ,value2 : appService.service_id })
                .execute();
            console.log(delRes);
            if (delRes.affected == 0) {
                return "AppServiceMap delete failled not found"
            }
            return "AppServiceMap successfully deleted"
        } catch (e) {
            console.log(e)
            return e;

        }
    }

    async searchBy(entity : appServiceMapEntity): Promise<appServiceMapEntity[]> {
        const found = await this.appServiceMapEntityRepository.findBy(entity) ; 
            if (found) {
                return found
            } else {
                return null ; 
            }
    }


}
