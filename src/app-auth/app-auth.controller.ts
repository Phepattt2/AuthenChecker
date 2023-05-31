import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppAuthService } from './app-auth.service';
import { app_auth } from 'src/entity/app-auth.Entity';
import { AppAuthDTO } from 'src/dto/app-auth.dto';
import { randomUUID, randomBytes } from 'crypto';
import { bytesToBase64 } from 'byte-base64';

@Controller('app-auth')
export class AppAuthController {
    constructor( private readonly appAuthService: AppAuthService) {}
    
    @Post("/createAppAuth")
    @HttpCode(HttpStatus.CREATED)
    async createTest(@Body() newAppEntity : AppAuthDTO) : Promise<app_auth> {
        console.log( "new app entity is :" , newAppEntity)
        const app = new app_auth() ; 

        app.app_id = randomUUID() ;
        // 504 bit 63 bytes
        app.app_secret = bytesToBase64(randomBytes(63));
        
        app.app_name = newAppEntity.app_name ; 
        app.app_status = newAppEntity.app_status ; 
        app.created_at = new Date() ; 
        app.updated_at = new Date() ;
      
        return await this.appAuthService.createAppAuth(app) ; 
    }

    @Get("/getAlltest")
    async getAll() : Promise<app_auth[]> {
        console.log("recived get request")
        return this.appAuthService.findAll() ; 
    }


}
