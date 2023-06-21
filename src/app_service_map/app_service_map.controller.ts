import { AppServiceMapService } from './app_service_map.service';
import { appServiceMapEntity } from 'src/entity/app_service_map.Entity';
import { Response, Request } from 'express';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { appServiceMapDTO } from 'src/dto/app_service_map.dto';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';

// constant values 

const excludedKey = ['app_id', 'servicer_id', 'created_at'];


@Controller('app-service-map')
export class AppServiceMapController {
    constructor(
        private readonly appServiceMapService: AppServiceMapService
    ) { }

    @Roles(Role.ADMIN , Role.DEV , Role.EXEC ,Role.USER)
    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response , @Body() appServiceMapDTO: appServiceMapDTO ): Promise<void> {
        try{
            const initRes = await initer(excludedKey , appServiceMapDTO) ;
            initRes.app_id = appServiceMapDTO.app_id ;
            initRes.service_id = appServiceMapDTO.service_id ;
    
           const findResult = await  this.appServiceMapService.searchBy(initRes) ;
            res.status(200).json(findResult) ; 
        }catch(e){
            console.log(e)  ;
            res.status(500).json({Error:'internal server error'}) ; 
        }
        
    }

    @Roles(Role.ADMIN , Role.DEV , Role.EXEC )
    @Get('/getAllAppServiceMap')
    async getAllAppServiceMap(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const getRes = await this.appServiceMapService.findAll();
            res.status(200).json(getRes)

        } catch (e) {
            console.log(e);
            res.status(500).json({ Error: 'Internal Server Error' });
        }
    }
    
    @Roles(Role.ADMIN , Role.DEV ,Role.USER)
    @Post("/createAppServiceMap")
    @HttpCode(HttpStatus.CREATED)
    async createAppServiceMap(@Req() req: Request, @Res() res: Response, @Body() appServiceDTO: appServiceMapDTO): Promise<void> {

        try {
            const initRes = await initer(excludedKey, appServiceDTO);

            initRes.app_id = appServiceDTO.app_id;
            initRes.service_id = appServiceDTO.service_id;

            const createRes = await this.appServiceMapService.insertAppServiceMap(initRes);
            res.status(200).json(createRes)


        } catch (e) {
            console.log(e)
            res.status(500).json({ Error: "Internal Server Error" })
        }

    }
    @Roles(Role.ADMIN )
    @Delete("/deleteById")
    async deleteAppServiceMapById(@Req() req: Request, @Res() res: Response, @Body() newAppService: appServiceMapDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKey, newAppService);
            initRes.service_id = newAppService.service_id;
            initRes.app_id = newAppService.app_id;

            const delRes = await this.appServiceMapService.deleteById(initRes);

            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }


    
    
    }
 

}

// parse DTO to ENTITY

async function initer(notIncludeList: string[], userInputDTO: appServiceMapEntity): Promise<appServiceMapEntity> {
    const exportedObject = new appServiceMapEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}
