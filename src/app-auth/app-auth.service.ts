import { Get, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { app_auth } from 'src/entity/app-auth.Entity';
import { Repository } from 'typeorm';


@Injectable()
export class AppAuthService {
    constructor(
        @InjectRepository(app_auth)
        private readonly appAuthRepository: Repository<app_auth> ,
    ){}





    async createAppAuth( appAuth : app_auth ) : Promise<app_auth>{
        console.log(typeof(appAuth))
        console.log(appAuth.app_id)
        console.log(appAuth.app_secret)
        console.log('service side : ', appAuth)
        return this.appAuthRepository.save(appAuth) ; 
    } 

    async findAll() : Promise<app_auth[]>{
        return this.appAuthRepository.find() ;
    }


}
