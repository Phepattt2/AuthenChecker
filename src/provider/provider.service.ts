import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { providerEntity } from 'src/entity/provider.Entity';
import { Repository } from 'typeorm';
const excludedKey = ['provider_code' , 'created_at']

@Injectable()
export class ProviderService {
    constructor(
        @InjectRepository(providerEntity)
        private readonly providerRepository: Repository<providerEntity>,
    ) { }

    async findAll(): Promise<providerEntity[]> {
        return this.providerRepository.find();
    }

    async insertProvider(provider: providerEntity): Promise<providerEntity> {

        const samePeoviderCode = await this.providerRepository.findBy({ provider_code: provider.provider_code })
        const sameNameProvider = await this.providerRepository.findBy({ provider_name: provider.provider_name })
        
        if( ( samePeoviderCode).length == 0 ){
            if (( sameNameProvider).length == 0) {
                provider.created_at = new Date() ; 
                return this.providerRepository.save(provider);
            } else {
                console.log("same name : ",sameNameProvider)
                return null;
            }
        } else {
            return null ; 
        } 
        

    }

    async updateById(provider: providerEntity): Promise<providerEntity> {
        try {
            const sameNameProvider = this.providerRepository.findBy({ provider_name: provider.provider_name })
            console.log('sameNameProvider' , (await sameNameProvider).length)
            if ((await sameNameProvider).length == 0) {
                const found = await this.providerRepository.findOneBy({ 'provider_code': provider.provider_code })

                if (found) {
                    const initRes = await initerUpdate(excludedKey, provider, found);
                    return await this.providerRepository.save(initRes);

                } else {
                    console.log('error provider not fonud')
                    return found;
                }
            }else {
                return null ; 
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
                .where('provider_code = :value1', {
                    value1: provider_code,
                })
                .execute();

            console.log('delRes ', delRes)
            if (delRes.affected == 0) {
                return "provider delete failed not found "
            }


            return "provider successfully deleted";

        } catch (e) {

            console.log('error : ', e)

            return e;

        }
    }
    async searchBy(entity: providerEntity): Promise<providerEntity[]> {
        const found = await this.providerRepository.findBy(entity);
        if (found) {
            return found
        } else {
            return null;
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