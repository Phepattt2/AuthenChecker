import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { packageServiceEntity } from 'src/entity/package_service.Entity';
import { Repository } from 'typeorm';
const excludedKey = ['service_id', 'package_id', 'created_at', 'updated_at'];

@Injectable()
export class PackageServiceService {
    constructor(
        @InjectRepository(packageServiceEntity)
        private readonly packageServiceRepository: Repository<packageServiceEntity>
        ,
    ) { }

    async insertPackageService(packageService: packageServiceEntity): Promise<packageServiceEntity> {
       
        const duplicate = await this.packageServiceRepository.findOneBy({ package_id : packageService.package_id})
        if(!duplicate){
            packageService.created_at = new Date();

            packageService.updated_at = new Date();
    
            return await this.packageServiceRepository.save(packageService);
        }else {
            return null ; 
        }

    }

    async findAll(): Promise<packageServiceEntity[]> {
        return await this.packageServiceRepository.find();
    }

    async deleteById(package_service: packageServiceEntity): Promise<string> {
        try {
            const delRes = await this.packageServiceRepository.createQueryBuilder()
            .delete()
            .where('service_id = :value1 AND package_id = :value2' , {value1 : package_service.service_id ,value2 : package_service.package_id})
            .execute();
            if(delRes.affected == 0 ){
                return "packageService delete failled not found"
            }
            return "packageService successfully deleted"
        } catch (e) {
            console.log('error : ', e)
            return e;
        }
    }


    async updateById(package_service: packageServiceEntity): Promise<packageServiceEntity> {
        try {

            const found = await this.packageServiceRepository.findOneBy({ 'service_id': package_service.service_id, 'package_id': package_service.package_id })

            if (found) {

                found.package_name_en = package_service.package_name_en;
                found.package_name_th = package_service.package_name_th;
                found.package_price = package_service.package_price;
                found.package_validity = package_service.package_validity;
                found.package_validity_unit = package_service.package_validity_unit;
                found.package_type = package_service.package_type;
                found.updated_at = new Date();

                return await this.packageServiceRepository.save(found);

            } else {

                console.log('error PackageService not fonud')

                return found;

            }
        } catch (e) {

            console.log('error : ', e)

            return e;

        }
    }

    async searchBy(entity : packageServiceEntity): Promise<packageServiceEntity[]> {
        const found = await this.packageServiceRepository.findBy(entity) ; 
            if (found) {
                return found
            } else {
                return null ; 
            }
    }
  


}
async function initerUpdate(notIncludeList: string[], userInput: packageServiceEntity, baseInput: packageServiceEntity): Promise<packageServiceEntity> {
   const exportedObject = baseInput;
   for (var key in userInput) {
       if (notIncludeList.includes(key) == false) {
           exportedObject[key] = userInput[key];
       }
   }
   return exportedObject
}