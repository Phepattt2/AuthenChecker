import { Controller ,Get } from '@nestjs/common';
import { PackageServiceService } from './package_service.service';
import { packageServiceEntity } from 'src/entity/package_service.Entity';

@Controller('package-service')
export class PackageServiceController {

    constructor (
        private readonly packageServiceService: PackageServiceService
    ) {} 

    @Get('/getAllTransactionRunner')
    async getAllTransaction(): Promise<packageServiceEntity[]> {
        return await this.packageServiceService.findAll();
    }
    
}
