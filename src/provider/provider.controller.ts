import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { providerEntity } from 'src/entity/provider.Entity';
import { providerDTO } from 'src/dto/provider.dto';
import { Request, Response } from 'express'
const excludedKey = ['provider_code', 'created_at']

@Controller('provider')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) { }

    @Get('/getAllProvider')
    async getAllProvider(): Promise<providerEntity[]> {
        return this.providerService.findAll();
    }

    @Post('/createProvider')
    @HttpCode(HttpStatus.CREATED)

    async createProvider(@Req() req: Request, @Res() res: Response,@Body() newProvider: providerDTO): Promise<void> {
        try{
            const initRes = await initer(excludedKey, newProvider) 
            initRes.provider_code = newProvider.provider_code  ;
            initRes.created_at = new Date();
    
            const createRes = await this.providerService.insertProvider(initRes);

            res.status(200).json(createRes)


        }catch(e) {
        console.log(e)
            res.status(500).json({Error:"internal server error"})
        }

        
    }


    @Put('/updateById')
    async updateProviderById(@Req() req: Request, @Res() res: Response, @Body() providerDTO: providerDTO): Promise<void> {
        try {

            const intiRes = await initer(excludedKey, providerDTO);

            intiRes.provider_code = providerDTO.provider_code;

            const updateResult = await this.providerService.updateById(intiRes);

            if (!updateResult) {

                res.status(404).json({ Error: "Provider not found" });

            } else {
                console.log(updateResult)
                res.status(200).json(updateResult);

            }

        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'Internal Server Error' });

        }
    }

    @Delete('/deleteById')
    async deleteProviderById(@Req() req: Request, @Res() res: Response, @Body() provider: providerDTO): Promise<void> {
        try {
            const delRes = await this.providerService.deleteById(provider.provider_code)
            console.log(delRes)
            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

}

async function initer(notIncludeList: string[], userInputDTO: providerDTO): Promise<providerEntity> {
    const exportedObject = new providerEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}
