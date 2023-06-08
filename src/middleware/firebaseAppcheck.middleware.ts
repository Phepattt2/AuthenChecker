import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { getAppCheck } from "firebase-admin/app-check";
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const pathxx = __dirname + './../../src/config/'
const filePath = path.join(pathxx, 'serviceAccountKey.json');
const jsonData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonData);
const serviceAccountData = data.serviceAccount;




// const firebaseApp =  admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountData)
// });








@Injectable()

export class firebaseAppCheckMiddleware implements NestMiddleware {
    // no test ! 

    async use(req: Request, res: Response, next: NextFunction) {
        console.log('headers ', req.headers)
    
        try {
            const appCheckToken = req.header('X-Firebase-AppCheck');
            if (!appCheckToken) {
                res.status(401).json({ Erro: 'Unauthorized' });
            }
            else {
                const tokenCheckResult = await checkReCaptchaToken(appCheckToken);
                if (tokenCheckResult == "succeeded") {
                    next();
                } else {
                    res.status(401).json({ Erro: 'Unauthorized' });
                }
            }
        }
        catch (err) {
            res.status(500).json({ Error: 'Internal server error' })
            next();

        }
    }
}

async function checkReCaptchaToken(appCheckToken: string): Promise<string> {

    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
            secret: '6LdGxnYmAAAAADwgklIiNN9CDXDcp36FpLRo0pPW',
            response: appCheckToken,
        },
    });

    const { success, score, action } = response.data;
    console.log(response)
    if (success && score >= 0.5 && action === 'TEST') {
        console.log('reCAPTCHA verification succeeded');
        return 'succeeded'


    } else {
        console.log('reCAPTCHA verification failed');
        return 'failed'

    }



}
