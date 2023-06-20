import { Controller, Get, Post, Put, Delete, HttpCode, HttpStatus, Body, Req, Res } from '@nestjs/common';
import { PackageServiceService } from './package_service.service';
import { packageServiceEntity } from 'src/entity/package_service.Entity';
import { packageServiceDTO } from 'src/dto/package_service.dto';
import { Response, Request } from 'express';
import { Role } from 'src/entity/role.enum';
import { Roles } from 'src/entity/role.decorator';
const excludedKey = ['service_id', 'package_id', 'created_at', 'updated_at'];
const package_validity_unit_List = ['second', 'minute', 'hour', 'day', 'month', 'year'];
const packageServiceAllow = [1, 2, 3];
@Controller('package-service')

export class PackageServiceController {

    constructor(
        private readonly packageServiceService: PackageServiceService
    ) { }

    @Roles( Role.ADMIN ,Role.DEV , Role.EXEC , Role.USER )
    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKey, packageServiceDTO);
            initRes.service_id = packageServiceDTO.service_id;
            initRes.package_id = packageServiceDTO.package_id;

            const findResult = await this.packageServiceService.searchBy(initRes);
            res.status(200).json(findResult);
        } catch (e) {
            console.log(e);
            res.status(500).json({ Error: 'internal server error' });
        }

    }


    @Roles( Role.ADMIN ,Role.DEV , Role.EXEC )
    @Get('/getAllTransactionRunner')
    async getAllTransaction(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            
            const getRes = await this.packageServiceService.findAll();
            
            res.status(200).json(getRes)

        } catch (err) {

            console.log(err);

            res.status(500).json({ error: 'Internal Server Error' })

        }
    }

    @Roles( Role.ADMIN ,Role.DEV , Role.USER )
    @Post('/createProv')
    @HttpCode(HttpStatus.CREATED)

    async createPackageService(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {
            if ((packageServiceAllow.includes(Number(packageServiceDTO.package_type))
                || packageServiceDTO.package_type == null)
                && package_validity_unit_List.includes(packageServiceDTO.package_validity_unit)) {

                const initRes = await initer(excludedKey, packageServiceDTO);

                initRes.service_id = packageServiceDTO.service_id;

                initRes.package_id = packageServiceDTO.package_id;

                const createRes = await this.packageServiceService.insertPackageService(initRes);

                if (createRes) {
                    res.status(200).json(createRes);
                } else {
                    res.status(422).json({ Error: 'Unprocessable Entity ( duplicate )' })
                }
            } else {
                res.status(422).json({ Error: 'Unprocessable Entity ( invalid input )' });
            }


        } catch (e) {
            console.log(e);
            res.status(500).json({ Error: "internal server error" })
        }


    }

    @Roles( Role.ADMIN ,Role.DEV  )
    @Put('/updateById')
    async updateServiceById(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {
            if ((packageServiceAllow.includes(Number(packageServiceDTO.package_type))
                || packageServiceDTO.package_type == null)
                && package_validity_unit_List.includes(packageServiceDTO.package_validity_unit)) {
                const initRes = await initer(excludedKey, packageServiceDTO);

                initRes.service_id = packageServiceDTO.service_id;

                initRes.package_id = packageServiceDTO.package_id;

                initRes.updated_at = new Date();

                const updateResult = await this.packageServiceService.updateById(initRes);

                if (!updateResult) {

                    res.status(404).json({ Error: "PackageService not found" });

                } else {
                    console.log(updateResult)
                    res.status(200).json(updateResult);

                }
            } else {
                res.status(422).json({ Error: "Unprocessable Entity ( invalid input )" });

            }


        } catch (e) {

            console.log(e);

            res.status(500).json({ Error: 'Internal Server Error' });

        }
    }
    @Roles( Role.ADMIN )
    @Delete('/deleteById')
    async deleteServiceById(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKey, packageServiceDTO);
            initRes.service_id = packageServiceDTO.service_id;
            initRes.package_id = packageServiceDTO.package_id;
            const delRes = await this.packageServiceService.deleteById(initRes);

            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }


}
async function initer(notIncludeList: string[], userInputDTO: packageServiceDTO): Promise<packageServiceEntity> {
    const exportedObject = new packageServiceEntity();
    for (var key in userInputDTO) {
        if (notIncludeList.includes(key) == false) {
            exportedObject[key] = userInputDTO[key];
        }
    }
    return exportedObject
}
