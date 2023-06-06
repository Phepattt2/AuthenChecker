import { Controller, HttpCode, HttpStatus, Post, Body, Get, Req, Res ,Put ,Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { Repository } from 'typeorm';
import { ServiceService } from './service.service';
import { serviceDTO } from 'src/dto/service.dto';
import { Response, Request } from 'express';

const excludedKey = ['service_id', 'created_at', 'latest_fee_at']

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService) { }

    @Post('/createService')
    @HttpCode(HttpStatus.CREATED)
    async createService(@Req() req: Request, @Res() res: Response, @Body() service: serviceDTO): Promise<void> {
        const serviceStatusAllowed = [0, 1];
        const requireCalfeeAllowed = [0, 1];

        try {

            if (service.service_status in serviceStatusAllowed && service.require_calfee in requireCalfeeAllowed) {


                const resInit = await initer(excludedKey, service)

                //generate key
                resInit.service_id = service.service_id;

                resInit.created_at = new Date();

                resInit.latest_fee_at = new Date();

                const insertRes = await this.serviceService.insertService(resInit);

                res.status(200).json({ insertRes })

            } else {
                res.status(500).json({ error:'invalid input error'})

            }


        } catch (err) {

            console.log(err);
            
            res.status(500).json({ error: 'Internal Server Error' })
        
        }
    }


    @Get('/getAllService')
    async getAllService(@Req() req: Request, @Res() res: Response): Promise<void> {
        try{

            const getRes = await this.serviceService.findAll()

            res.status(200).json(getRes)

        } catch (err){

            console.log(err);
            
            res.status(500).json({ error : 'Internal Server Error' })

        }
    }

    // @Put('/updateById')
    // async updateServiceById(@Req() req: Request, @Res() res: Response, @Body() service: serviceDTO): Promise<void> {
    //     try {

    //         const intiRes = await initer(excludedKey,service) ; 
    //         intiRes.service_id = service.service_id ; 
    //         const updateRes = await this.serviceService.updateById(intiRes);

    //         res.status(200).json(updateRes);

    //     } catch (e) {

    //         console.log(e);

    //         res.status(500).json({ error: 'Internal Server Error' });

    //     }
    // }

    // @Delete('/deleteById')
    // async deleteServiceById(@Req() req: Request, @Res() res: Response, @Body() service_id: number): Promise<void> {
    //     try {

    //         const delRes = await this.serviceService.deleteById(service_id)

    //         res.status(200).json(delRes);

    //     } catch (e) {

    //         console.log(e);

    //         res.status(500).json({ error: 'Internal Server Error' });

    //     }
    // }





}


async function initer(notIncludeList: string[], userInputDTO: serviceDTO): Promise<serviceEntity> {
    const exportedObject = new serviceEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}
