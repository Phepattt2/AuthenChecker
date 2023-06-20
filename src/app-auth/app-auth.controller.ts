import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { AppAuthService } from './app-auth.service';
import { app_auth } from 'src/entity/app-auth.Entity';
import { AppAuthDTO } from 'src/dto/app-auth.dto';
import { randomUUID, randomBytes } from 'crypto';
import { bytesToBase64 } from 'byte-base64';
import { Response, Request } from 'express';

import { Roles } from 'src/entity/role.decorator';
import { Role } from 'src/entity/role.enum';
// const value of this table  

const excludedKey = ['app_id', 'app_secret', 'created_at', 'updated_at'];

const statusAllowList = [0, 1];


@Controller('app-auth')
export class AppAuthController {
    constructor(private readonly appAuthService: AppAuthService) { }

    @Roles(Role.ADMIN , Role.DEV  , Role.EXEC , Role.USER)
    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response, @Body() appAuthDTO: AppAuthDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKey, appAuthDTO);

            initRes.app_id = appAuthDTO.app_id;

            const findResult = await this.appAuthService.searchBy(initRes);

            res.status(200).json(findResult);

        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'internal server error' });

        }

    }

    @Roles(Role.ADMIN , Role.DEV , Role.EXEC )
    @Get("/getAllAppAuth")
    async getAllAppAuth(@Req() req: Request, @Res() res: Response): Promise<void> {

        try {

            const getRes = await this.appAuthService.findAll();
            res.status(200).json(getRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'Internal Server Error' });

        }
    }
    
    @Roles(Role.ADMIN , Role.DEV , Role.USER)
    @Post("/createAppAuth")
    @HttpCode(HttpStatus.CREATED)
    async createAppAuth(@Req() req: Request, @Res() res: Response, @Body() newApp: AppAuthDTO): Promise<void> {
        try {

            if (statusAllowList.includes(Number(newApp.app_status  ))) {

                const app = new app_auth();
                const initRes = await initer(excludedKey, newApp);

                initRes.app_id = randomUUID();
                initRes.app_secret = bytesToBase64(randomBytes(32));
                initRes.created_at = new Date();
                initRes.updated_at = new Date();

                const createRes = await this.appAuthService.createAppAuth(initRes);

                res.status(200).json(createRes)

            }
            else {

                console.log('invalid input app_status');

                res.status(422).json({Error:'Unprocessable Entity ( invalid input )'});

            }

        } catch (e) {
            console.log(e)
            res.status(500).json({ Error: 'Internal Server Error' });

        }

    }

    
    @Roles(Role.ADMIN , Role.DEV )
    @Put("/updateById")
    async updateAuthById(@Req() req: Request, @Res() res: Response, @Body() appAuthDTO: AppAuthDTO): Promise<void> {
        try {
            if (  statusAllowList.includes(Number(appAuthDTO.app_status  )) ) {

                const intiRes = await initer(excludedKey, appAuthDTO);

                intiRes.app_id = appAuthDTO.app_id;


                const updateResult = await this.appAuthService.updateById(intiRes);

                if (!updateResult) {

                    res.status(404).json({ Error: "AppAuth not found" });

                } else {

                    res.status(200).json(updateResult);

                }
            } else {

                res.status(422).json({Error:'Unprocessable Entity ( invalid input )'});

            }


        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'Internal Server Error' });

        }
    }

    @Roles(Role.ADMIN )
    @Delete("/deleteById")
    async deleteAuthById(@Req() req: Request, @Res() res: Response, @Body() newApp: AppAuthDTO): Promise<void> {

        const id = newApp.app_id;

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

// DTO parser ! excluding some keys 

async function initer(notIncludeList: string[], userInputDTO: app_auth): Promise<app_auth> {

    const exportedObject = new app_auth();

    for (var key in userInputDTO) {

        if (notIncludeList.includes(key) == false) {

            exportedObject[key] = userInputDTO[key];

        }
    }

    return exportedObject

}
