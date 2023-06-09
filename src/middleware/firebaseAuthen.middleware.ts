import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';



const { getAppCheck } = require("firebase-admin/app-check");

console.log(__dirname)

const pathxx = __dirname + './../../src/config/'
const filePath = path.join(pathxx, 'serviceAccountKey.json');
const jsonData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonData);
const serviceAccountData = data.serviceAccount;

admin.initializeApp({
    // serviceAcc
    credential: admin.credential.cert(serviceAccountData)
});

@Injectable()

export class AuthMiddleWare implements NestMiddleware {
    //  tested 
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenData = req.headers.authorization;

            if (tokenData.startsWith('Bearer')) {
                const token = tokenData.split(' ')[1];
                admin.auth().verifyIdToken(token).then(async (res) => {
                    next();
                }).catch((e) => {
                    res.status(401)
                    res.send({ Error: 'status Authorized 401 error invalid token' });
                })
            }
        }
        catch (e) {
            console.log(e) ; 
            res.status(401)
            res.send({ Error: `status Authorized 401 error` });
        }
    }

}
