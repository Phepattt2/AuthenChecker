import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { providerEntity } from 'src/entity/provider.Entity';
import { providerDTO } from 'src/dto/provider.dto';

@Controller('provider')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) { }

    @Get('/getAllProvider')
    async getAllProvider(): Promise<providerEntity[]> {
        return this.providerService.findAll();
    }

    @Post('/createProv')
    @HttpCode(HttpStatus.CREATED)

    async createProvider(@Body() newProvider: providerDTO): Promise<providerEntity> {

        const addProvider = new providerEntity();

        addProvider.provider_name = newProvider.provider_name;
        addProvider.provider_code = newProvider.provider_code;
        addProvider.created_at = new Date() ;

        return this.providerService.insertProvider(addProvider);
    }


}
