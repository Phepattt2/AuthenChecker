import { Controller , Get ,Post} from '@nestjs/common';
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

}


