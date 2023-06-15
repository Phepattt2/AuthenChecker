import { Module } from '@nestjs/common';

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

const pathxx = __dirname + './../../src/config/'
const filePath = path.join(pathxx, 'serviceAccountKey.json');
const jsonData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonData);
const serviceAccountData = data.serviceAccount;

@Module({
    providers : [{
        provide : 'FirebaseAdmin' , 
        useFactory : () => {
            return admin.initializeApp({credential: admin.credential.cert(serviceAccountData) });
        }
    }] , 
    exports: ['FirebaseAdmin'] ,
})
export class FirebaseModule {}
