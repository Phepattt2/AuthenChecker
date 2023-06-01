import { Body, Controller , Delete, Get ,HttpCode,HttpStatus,Post, Put} from '@nestjs/common';
import { topUpServiceEntity } from 'src/entity/topup_service.Entity';
import { TopupServiceService } from './topup_service.service';

@Controller('topup-service')
export class TopupServiceController {

    constructor(
        private readonly topUpServiceService: TopupServiceService 
    ) {}

    @Get('/getAllTopUpService')
    async getAllTopUpService(): Promise<topUpServiceEntity[]> {
        return await this.topUpServiceService.findAll();
    }
    @Put('/updateById')
    async updatetopUpServiceById( @Body() topUpService:topUpServiceEntity) : Promise<topUpServiceEntity> {
        return await this.topUpServiceService.updateById(topUpService) ;
    }

    @Delete('/deleteById')
    async deletetopUpServiceById( @Body() service_id : number) : Promise<string> {
        return await this.topUpServiceService.deleteById(service_id)
    }

    @Post('/createTopUPService')
    @HttpCode(HttpStatus.CREATED) 
    async createTopUPService( @Body() topUpService : topUpServiceEntity) : Promise<topUpServiceEntity> {
        return await this.topUpServiceService.insertTopUpService(topUpService)
    }


    
}


