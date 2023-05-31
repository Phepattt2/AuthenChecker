import { Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { app_auth } from 'src/entity/app-auth.Entity';
import { Repository, getConnection } from 'typeorm';


@Injectable()
export class AppAuthService {
    constructor(
        @InjectRepository(app_auth)
        private readonly appAuthRepository: Repository<app_auth>,
    ) { }

    async createAppAuth(appAuth: app_auth): Promise<app_auth> {
        console.log(typeof (appAuth))
        console.log(appAuth.app_id)
        console.log(appAuth.app_secret)
        console.log('service side : ', appAuth)
        return this.appAuthRepository.save(appAuth);
    }

    async findAll(): Promise<app_auth[]> {
        return await this.appAuthRepository.find();
    }

    async updateById(appAuth: app_auth): Promise<app_auth> {
        try {
            const found = await this.appAuthRepository.findOneBy({ 'app_id': appAuth.app_id })
            found.app_name = appAuth.app_name
            found.app_status = appAuth.app_status
            found.updated_at = new Date() ;
            return await this.appAuthRepository.save(found) ; 
        } catch (e) {
            console.log('error : ', e)
            return appAuth;
        }
    }
    async deleteById(idNumber: string): Promise<string> {
        try{
            await this.appAuthRepository.delete(idNumber) ; 
            return "app_auth successfully deleted";
        }catch(e){
            console.log(e)
            return e ;

        }
    }
}
