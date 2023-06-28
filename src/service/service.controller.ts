import { Controller, HttpCode, HttpStatus, Post, Body, Get, Req, Res, Put, Delete, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { serviceEntity } from 'src/entity/service.Entity';
import { Admin, IntegerType, Repository } from 'typeorm';
import { ServiceService } from './service.service';
import { serviceDTO } from 'src/dto/service.dto';
import { Response, Request } from 'express';
// import { fireStoreDB } from 'src/middleware/firebaseAuthen.middleware';
import { CollectionReference, collection, doc, setDoc, where, query } from 'firebase/firestore';
import { firestore } from 'firebase-admin';
import { userDTO } from 'src/dto/user.dto';
import { RouterModule } from '@nestjs/core';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/role.decorator';
import * as admin from 'firebase-admin'
import axios from 'axios' ;

const excludedKey = ['service_id', 'created_at', 'latest_fee_at']
const serviceStatusAllowed = [0, 1];
const requireCalfeeAllowed = [0, 1];
const serviceTypeAllowed = [1, 2, 3, 4, 5, 6]

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService: ServiceService, @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App) { }

    @Roles(Role.ADMIN, Role.DEV, Role.EXEC, Role.USER)
    @Get('/getSearch')
    async getFindByEntity(@Req() req: Request, @Res() res: Response, @Body() serviceDTO: serviceDTO): Promise<void> {
        try {
            const initRes = await initer(excludedKey, serviceDTO);
            initRes.service_id = serviceDTO.service_id;

            const findResult = await this.serviceService.searchBy(initRes);

            res.status(200).json(findResult);

        } catch (e) {
            console.log(e);
            res.status(500).json({ Error: 'internal server error' });
        }
    }

    @Roles(Role.ADMIN, Role.DEV, Role.EXEC)
    @Get('/getAllService')
    async getAllService(@Req() req: Request, @Res() res: Response): Promise<void> {
        try {

            const getRes = await this.serviceService.findAll()

            res.status(200).json(getRes)

        } catch (err) {

            console.log(err);

            res.status(500).json({ error: 'Internal Server Error' })

        }
    }



    @Roles(Role.ADMIN, Role.DEV, Role.USER)
    @Post('/createService')
    @HttpCode(HttpStatus.CREATED)
    async createService(@Req() req: Request, @Res() res: Response, @Body() service: serviceDTO): Promise<void> {

        try {

            if (serviceStatusAllowed.includes(Number(service.service_status))
                && requireCalfeeAllowed.includes(Number(service.require_calfee))
                && serviceTypeAllowed.includes(Number(service.service_type))) {

                const resInit = await initer(excludedKey, service)

                //generate key
                resInit.service_id = service.service_id;

                const insertRes = await this.serviceService.insertService(resInit);

                if (insertRes) {
                    res.status(200).json({ insertRes })
                } else {
                    res.status(422).json({ Error: "Unprocessable Entity ( duplicate service_name )" })
                }

            } else {

                res.status(422).json({ Error: 'Unprocessable Entity ( invalid input )' })

            }


        } catch (err) {

            console.log(err);

            res.status(500).json({ error: 'Internal Server Error' })

        }
    }


    @Roles(Role.ADMIN, Role.DEV)
    @Put('/updateById')
    async updateServiceById(@Req() req: Request, @Res() res: Response, @Body() service: serviceDTO): Promise<void> {
        try {
            if ((service.service_status in serviceStatusAllowed || service.service_status == null)
                && (service.require_calfee in requireCalfeeAllowed || service.require_calfee == null)
                && (service.service_type in serviceTypeAllowed || service.service_type == null)) {


                const intiRes = await initer(excludedKey, service);
                intiRes.service_id = service.service_id;
                const updateRes = await this.serviceService.updateById(intiRes);
                if (!updateRes) {
                    res.status(422).json({ Error: 'Unprocessable Entity' });

                } else {
                    res.status(200).json(updateRes);

                }
            } else {
                console.log(service)
                res.status(422).json({ Error: "Unprocessable Entity ( invalid input )" });
            }

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }

    @Roles(Role.ADMIN)
    @Delete('/deleteById')
    async deleteServiceById(@Req() req: Request, @Res() res: Response, @Body() service: serviceDTO): Promise<void> {
        try {
            const delRes = await this.serviceService.deleteById(service.service_id)
            console.log(delRes)
            res.status(200).json(delRes);

        } catch (e) {

            console.log(e);

            res.status(500).json({ error: 'Internal Server Error' });

        }
    }







    // //  -------------------------------------------------------------------------------------------------------- // 

    // @Post('/getUsers')
    // async getDataBaseUsers(@Req() req: Request, @Res() res: Response , @Body() userDto : userDTO ): Promise<void> {
    //     try {
    //         console.log(req.header)            
    //         console.log(req.body)            
    //         await admin.auth().getUserByEmail(userDto.email).then((user)=>{
    //             return admin.auth().setCustomUserClaims(user.uid , { role : ["developer" , "admin" , "intern"]})
    //         }).then(()=>{
    //             console.log("success")
    //             res.status(200).json({'message':'success'});
    //         }).catch(()=>{
    //             console.log("error")
    //             res.status(422).json({'message':'error'});
    //         })

    //     } catch (err) {

    //         console.log(err);

    //         res.status(500).json({ error: 'Internal Server Error' })

    //     }
    // }

    // for admin ! 

    // @Post('/googleLoginUser')
    // async createUser(@Req() req: Request, @Res() res: Response, @Body() user: userDTO): Promise<void> {
    //     try {
    //         const collectoinRef = fireStoreDB.collection("Users");
    //         const querySnapshot = await collectoinRef.where("uid", "==", user.uid).limit(1).get();
    //         if (!querySnapshot.empty) {
    //             // if user exists check for role 

    //             res.status(200).send(`successfully login , role ${user.role}`);
    //         } else {
    //             // if empty create new document to firestore (extracting data from token )
    //             // add service function                             be entity 
    //             const documentReference = await collectoinRef.add(user);
    //             res.status(200).send("pending for authorization");
    //         }

    //     } catch (e) {
    //         console.log(e);
    //         res.status(400).json({ Error: "insert user failed" });

    //     }
    // }

    // @Put('/updateUserRole')
    // async updateUsersRole(@Req() req: Request, @Res() res: Response, @Body() user: userDTO): Promise<void> {
    //     try {
    //         const collectoinRef = fireStoreDB.collection("Users");
    //         const querySnapshot = await collectoinRef.where("uid", "==", user.uid).limit(1).get();
    //         if (!querySnapshot.empty) {

    //             const updateData = await querySnapshot.docs.map(doc => doc.ref.update({ "role": user.role }));

    //             const patched = await collectoinRef.where("uid", "==", user.uid).limit(1).get();

    //             const resp = patched.docs[0].data()
    //             console.log(resp)

    //             res.status(200).json({ resp });
    //         } else {
    //             res.status(404).json({ Error: "user not found" })
    //         }

    //     } catch (e) {
    //         console.log(e);
    //         res.status(500).json({ Error: "internal server error" });

    //     }
    // }



    //  -------------------------------------------------------------------------------------------------------- // 

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
