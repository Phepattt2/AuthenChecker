import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { topUpServiceEntity } from 'src/entity/topup_service.Entity';
import { Request, Response } from 'express';
import { TopupServiceService } from './topup_service.service';
import { topUpServiceDTO } from 'src/dto/topUpService.dto';
import { topUpServiceListDTO } from 'src/dto/topUpServiceList.dto';
const excludedKeys = ['service_id', 'topup_order', 'updated_at'];

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
    async updateTopUpServiceById(@Req() req: Request, @Res() res: Response, @Body() topUpService: topUpServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKeys, topUpService);

            initRes.service_id = topUpService.service_id;
            initRes.topup_order = topUpService.topup_order;

            const updateRes = await this.topUpServiceService.updateById(initRes);

            if (!updateRes) {
                res.status(404).json(`Error: TopUpService not found`);

            } else {
                res.status(200).json(updateRes);

            }


        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

    @Delete('/deleteById')
    async deleteTopUpServiceById(@Req() req: Request, @Res() res: Response, @Body() topUpServiceDTO: topUpServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKeys, topUpServiceDTO);
            initRes.service_id = topUpServiceDTO.service_id;
            initRes.topup_order = topUpServiceDTO.topup_order;
            const delRes = await this.topUpServiceService.deleteById(initRes);

            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }


    @Delete('/deleteByIdOrder')
    async deleteTopUpServiceByIdOrder(@Req() req: Request, @Res() res: Response, @Body() topUpServiceDTO: topUpServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKeys, topUpServiceDTO);
            initRes.service_id = topUpServiceDTO.service_id;
            initRes.topup_order = topUpServiceDTO.topup_order;
            const delRes = await this.topUpServiceService.deleteByIdOrder(initRes);

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
            initRes.service_id = topUpService.service_id;
            const insertRes = await this.topUpServiceService.insertTopUpService(initRes);
            if (insertRes === null) {
                res.status(422).json({ Error: "Unprocessable Entity ( invalid data )" });
            }
            else {
                res.status(200).json(insertRes);
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }


    @Post('/createTopUPServiceByList')
    @HttpCode(HttpStatus.CREATED)
    async createTopUPServiceByList(@Req() req: Request, @Res() res: Response, @Body() topUpServiceList: topUpServiceListDTO): Promise<void> {
        try {
            // init value in columns 
            const insertRes = await this.topUpServiceService.insertTopUpServiceList(topUpServiceList);
            if (insertRes == null) {
                res.status(422).json({ Error: "Unprocessable Entity ( invalid data )" });
            }
            else if (insertRes == 'insert success but duplicate' || insertRes == 'insert success') {
                res.status(200).json(insertRes);
            }


        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }




    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response, @Body() topUpServiceDTO: topUpServiceDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKeys, topUpServiceDTO);
            initRes.service_id = topUpServiceDTO.service_id;
            initRes.topup_order = topUpServiceDTO.topup_order;

            const findResult = await this.topUpServiceService.searchBy(initRes);
            res.status(200).json(findResult);
        } catch (e) {
            console.log(e);
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


