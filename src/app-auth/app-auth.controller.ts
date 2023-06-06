import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { AppAuthService } from './app-auth.service';
import { app_auth } from 'src/entity/app-auth.Entity';
import { AppAuthDTO } from 'src/dto/app-auth.dto';
import { randomUUID, randomBytes } from 'crypto';
import { bytesToBase64 } from 'byte-base64';
import { Response, Request } from 'express';

const excludedKey = ['app_id', 'app_secret', 'created_at', 'updated_at']

@Controller('app-auth')
export class AppAuthController {
    constructor(private readonly appAuthService: AppAuthService) { }

    @Post("/createAppAuth")
    @HttpCode(HttpStatus.CREATED)
    async createAppAuth(@Req() req: Request, @Res() res: Response, @Body() newApp: AppAuthDTO): Promise<void> {

        try {
            const app = new app_auth();
            const initRes = await initer(excludedKey, newApp);

            initRes.app_id = randomUUID();
            initRes.app_secret = bytesToBase64(randomBytes(63));

            initRes.created_at = new Date();
            initRes.updated_at = new Date();

            if (newApp.app_status >= 0 && newApp.app_status <= 1) {
                const createRes = await this.appAuthService.createAppAuth(initRes);
                res.status(200).json(createRes)
            }
            else {
                console.log('input out of range app_status')
                res.status(500).json({ Error: 'Internal Server Error' })

            }
        } catch (e) {
            console.log(e)

        }

    }

    @Get("/getAllAppAuth")
    async getAllAppAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
        try{
            const getRes = await this.appAuthService.findAll();
            res.status(200).json(getRes) ;
        }catch(e){
            res.status(500).json({Error : 'Internal Server Error'})

        }
    }

    @Put("/updateById")
    async updateAuthById(@Req() req: Request, @Res() res: Response,@Body() appAuthDTO: AppAuthDTO): Promise<void> {
        try {

            const intiRes = await initer(excludedKey, appAuthDTO);

            intiRes.app_id = appAuthDTO.app_id;
            intiRes.updated_at = new Date() ; 

            const updateResult = await this.appAuthService.updateById(intiRes);

            if (!updateResult) {

                res.status(404).json({ Error: "AppAuth not found" });

            } else {
                console.log(updateResult)
                res.status(200).json(updateResult);

            }

        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'Internal Server Error' });

        }
    }

    @Delete("/deleteById")
    async deleteAuthById(@Req() req: Request, @Res() res: Response, @Body() newApp: AppAuthDTO): Promise<void> {
        console.log("newAPP is :",newApp)
        const id = newApp.app_id ;

        try {
        
            const delRes = await this.appAuthService.deleteById(id)

            console.log(delRes)
            
            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }


    }

}

async function initer(notIncludeList: string[], userInputDTO: app_auth): Promise<app_auth> {
    const exportedObject = new app_auth();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}
