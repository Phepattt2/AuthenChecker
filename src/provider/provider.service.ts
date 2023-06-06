import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { providerEntity } from 'src/entity/provider.Entity';
import { Repository } from 'typeorm';
const excludedKey = ['provider_code'] 

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(providerEntity)
        private readonly providerRepository: Repository<providerEntity> ,
    ){}

     async findAll() : Promise<providerEntity[]> {
        return this.providerRepository.find()  ;
     } 

     async insertProvider(provider : providerEntity) : Promise<providerEntity> {
        return this.providerRepository.save(provider) ; 
     }

     async updateById(provider: providerEntity): Promise<providerEntity> {
      try {

         const found = await this.providerRepository.findOneBy({ 'provider_code': provider.provider_code })

         if (found) {

             const initRes = await initerUpdate(excludedKey, provider, found);

             return await this.providerRepository.save(initRes);

         } else {
            console.log(found)
             console.log('error provider not fonud')
             return found;

         }
     } catch (e) {

         console.log('error : ', e)

         return e;

     }
  }

  async deleteById(provider_code: string): Promise<string> {
   try {
       const delRes = await this.providerRepository.createQueryBuilder() 
       .delete() 
       .where('provider_code = :value1' , {
           value1 : provider_code,
       })
       .execute() ; 

       console.log('delRes ' , delRes)
       if(delRes.affected ==0 ) {
           return "provider delete failed not found "
       }


       return "provider successfully deleted";

   } catch (e) {

       console.log('error : ', e)

       return e;

   }
}


}
async function initerUpdate(notIncludeList: string[], userInput: providerEntity, baseInput: providerEntity): Promise<providerEntity> {
   const exportedObject = baseInput;
   for (var key in userInput) {
       if (notIncludeList.includes(key) == false) {
           exportedObject[key] = userInput[key];
       }
   }
   return exportedObject
}