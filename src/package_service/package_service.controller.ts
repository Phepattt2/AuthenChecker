import { Controller ,Get ,Post ,Put , Delete , HttpCode , HttpStatus , Body ,Req , Res  } from '@nestjs/common';
import { PackageServiceService } from './package_service.service';
import { packageServiceEntity } from 'src/entity/package_service.Entity';
import { packageServiceDTO } from 'src/dto/package_service.dto';
import { Response , Request } from 'express';
const excludedKey = ['service_id', 'package_id', 'created_at', 'updated_at'];

@Controller('package-service')

export class PackageServiceController {

    constructor (
        private readonly packageServiceService: PackageServiceService
    ) {} 

    @Get('/getAllTransactionRunner')
    async getAllTransaction(): Promise<packageServiceEntity[]> {
        return await this.packageServiceService.findAll();
    }

    @Post('/createProv')
    @HttpCode(HttpStatus.CREATED)

    async createPackageService(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {
            const initRes  = await initer (excludedKey , packageServiceDTO) ;  

            initRes.service_id = packageServiceDTO.service_id ; 
    
            initRes.package_id = packageServiceDTO.package_id ; 
    
            initRes.created_at = new Date() ;
    
            initRes.updated_at = new Date() ;
    
            const createRes = await this.packageServiceService.insertPackageService(initRes);
    
            res.status(200).json(createRes) ; 
         }catch(e){
            console.log(e) ; 
            res.status(500).json({Error : "internal server error"})
         }
        

    }


    @Put('/updateById')
    async updateServiceById(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKey, packageServiceDTO);

            initRes.service_id = packageServiceDTO.service_id ; 
    
            initRes.package_id = packageServiceDTO.package_id ; 
    
            initRes.updated_at = new Date() ;

            const updateResult = await this.packageServiceService.updateById(initRes);

            if (!updateResult) {

                res.status(404).json({ Error: "PackageService not found" });

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
    async deleteServiceById(@Req() req: Request, @Res() res: Response, @Body() packageServiceDTO: packageServiceDTO): Promise<void> {
        try {

            const initRes = await initer(excludedKey, packageServiceDTO) ;
            initRes.service_id = packageServiceDTO.service_id ; 
            initRes.package_id = packageServiceDTO.package_id ; 
            const delRes = await this.packageServiceService.deleteById(initRes) ;

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
