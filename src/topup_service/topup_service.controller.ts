import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { topUpServiceEntity } from 'src/entity/topup_service.Entity';
import { Request, Response } from 'express';
import { TopupServiceService } from './topup_service.service';
import { topUpServiceDTO } from 'src/dto/topUpService.dto';
const excludedKeys = ['service_id','topup_order','updated_at'];

@Controller('topup-service')
export class TopupServiceController {

    constructor(
        private readonly topUpServiceService: TopupServiceService
    ) { }

    @Get('/getAllTopUpService')
    async getAllTopUpService(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {

            const getRes = await this.topUpServiceService.findAll();

            res.status(200).json(getRes);

        } catch (e) {

            console.log(e)

            res.status(500).json({ error: 'Internal Server Error' })

        }
    }
    @Put('/updateById')
    async updatetopUpServiceById(@Req() req: Request, @Res() res: Response, @Body() topUpService: topUpServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKeys,topUpService) ; 
            
            initRes.updated_at = new Date() ;

            const updateRes = await this.topUpServiceService.updateById(initRes);

            res.status(200).json(updateRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

    @Delete('/deleteById')
    async deletetopUpServiceById(@Req() req: Request, @Res() res: Response, @Body() topUpServiceDTO: topUpServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKeys, topUpServiceDTO) ;
            initRes.service_id = topUpServiceDTO.service_id ; 
            initRes.topup_order = topUpServiceDTO.topup_order ; 
            const delRes = await this.topUpServiceService.deleteById(initRes) ;

            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

    @Post('/createTopUPService')
    @HttpCode(HttpStatus.CREATED)
    async createTopUPService(@Req() req: Request, @Res() res: Response, @Body() topUpService: topUpServiceDTO): Promise<void> {
        try {
            // init value in columns 
            const initRes = await initer(excludedKeys, topUpService);
            initRes.updated_at = new Date()  ;
            initRes.service_id = topUpService.service_id  ;
            initRes.topup_order = topUpService.topup_order ;
            const insertRes = await this.topUpServiceService.insertTopUpService(initRes);

            res.status(200).json(insertRes);

        } catch (err) {

            console.log(err);

            res.status(500).json({ error: 'Internal Server Error' })

        }
    }



}

async function initer(notIncludeList: string[], userInputDTO: topUpServiceDTO): Promise<topUpServiceEntity> {
    const exportedObject = new topUpServiceEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}


