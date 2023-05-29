import { Controller, Get, Req, Res , Next } from '@nestjs/common';
import { AuthMiddleWareService } from './auth-middle-ware.service';
import { Response , Request , NextFunction } from 'express';

@Controller('auth-middle-ware')
export class AuthMiddleWareController {
    constructor(private AuthMiddleWareService : AuthMiddleWareService) {} 

    // maybe remove Get cus it just function 
    // @Get('/api')
    appCheckToken(@Req() request : Request , @Res() response : Response  ,@Next() next : NextFunction) {
        return this.AuthMiddleWareService.protectedAppcheck(request,response,next) ; 
    }

    // maybe remove Get cus it just function 
    // @Get('/tokenCheck')
    checkAuthToken(@Req() request : Request , @Res() response : Response , @Next() next : NextFunction) {
       return this.AuthMiddleWareService.protected(request,response,next) ;
    }



}
