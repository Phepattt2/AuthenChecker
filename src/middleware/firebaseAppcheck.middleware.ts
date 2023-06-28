import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

const pathxx = __dirname + './../../src/config/'
const filePath = path.join(pathxx, 'serviceAccountKey.json');
const jsonData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonData);


@Injectable()

export class firebaseAppCheckMiddleware implements NestMiddleware {
    // no test ! 
    
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('header', req.headers)
        console.log(`headers firebase chacker ${req.header('X-Firebase-AppCheck')}`) ;

        try {
            const appCheckToken = req.header('X-Firebase-AppCheck');
            if (!appCheckToken) {
                res.status(401).json({ Error: 'Unauthorized' });
            }
            else {
                const tokenCheckResult = await checkReCaptchaToken(appCheckToken);
                if (tokenCheckResult == "succeeded") {
                    next();
                } else {
                    res.status(401).json({ Error: 'Unauthorized' });
                }
            }
        }
        catch (err) {
            res.status(500).json({ Error: 'Internal server error' })

        }
    }
}

async function checkReCaptchaToken(appCheckToken: string): Promise<string> {

    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
            secret: '6LdOTNImAAAAAAI_nduKMgS66zVs-UpQpllU1_Bl',
            response: appCheckToken,
        },
    });

    const { success, score, action } = response.data;
    if (success && score >= 0.5 && action === 'TEST') {
        console.log('reCAPTCHA verification succeeded');
        return 'succeeded'


    } else {
        console.log('reCAPTCHA verification failed');
        return 'failed'

    }



}

