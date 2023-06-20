import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { providerEntity } from 'src/entity/provider.Entity';
import { providerDTO } from 'src/dto/provider.dto';
import { Request, Response } from 'express'
import { Roles } from 'src/role/role.decorator';
import { Role } from 'src/role/role.enum';
const excludedKey = ['provider_code', 'created_at']

@Controller('provider')
export class ProviderController {
    constructor(private readonly providerService: ProviderService) { }


    @Roles(Role.ADMIN , Role.DEV , Role.EXEC ,Role.USER)
    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response, @Body() providerDTO: providerDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKey, providerDTO);
            initRes.provider_code = providerDTO.provider_code;

            const findResult = await this.providerService.searchBy(initRes);
            res.status(200).json(findResult);
        } catch (e) {
            console.log(e);
            res.status(500).json({ Error: 'internal server error' });
        }

    }
    @Roles(Role.ADMIN , Role.DEV , Role.EXEC )
    @Get('/getAllProvider')
    async getAllProvider(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            const getRes = await this.providerService.findAll();
            res.status(200).json(getRes)

        } catch (err) {
            
            console.log(err);

            res.status(500).json({ error: 'Internal Server Error' })

        }
    }


    @Roles(Role.ADMIN , Role.DEV , Role.USER)
    @Post('/createProvider')
    @HttpCode(HttpStatus.CREATED)

    async createProvider(@Req() req: Request, @Res() res: Response, @Body() newProvider: providerDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKey, newProvider)
            initRes.provider_code = newProvider.provider_code;

            const createRes = await this.providerService.insertProvider(initRes);

            if (createRes) {
                res.status(200).json(createRes)
            } else {
                res.status(422).json({ Erorr: "Unprocessable Entity ( duplicate Provider's Data )" })
            }

        } catch (e) {
            console.log(e)
            res.status(500).json({ Error: "internal server error" })
        }


    }

    @Roles(Role.ADMIN , Role.DEV )
    @Put('/updateById')
    async updateProviderById(@Req() req: Request, @Res() res: Response, @Body() providerDTO: providerDTO): Promise<void> {
        try {

            const intiRes = await initer(excludedKey, providerDTO);

            intiRes.provider_code = providerDTO.provider_code;

            const updateResult = await this.providerService.updateById(intiRes);

            if (!updateResult) {
                if (updateResult == null) {
                    res.status(422).json({ Erorr: "Unprocessable Entity ( duplicate Provider name )" });
                } else {
                    res.status(404).json({ Error: "Provider not found" });
                }

            } else {
                console.log(updateResult)
                res.status(200).json(updateResult);

            }

        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'Internal Server Error' });

        }
    }

    @Roles(Role.ADMIN )
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
