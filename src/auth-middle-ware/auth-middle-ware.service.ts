import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'; 
import { UserMetadata } from 'firebase-admin/lib/auth/user-record';
import * as fs from 'fs';
import { type } from 'os';
import * as path from 'path';


const { getAppCheck } = require("firebase-admin/app-check");

console.log(__dirname)

const pathxx = __dirname +'./../../src/config/'
const filePath = path.join(pathxx,'serviceAccountKey.json');
const jsonData = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(jsonData);
const serviceAccountData = data.serviceAccount ; 

admin.initializeApp({
  // serviceAcc
  credential: admin.credential.cert(serviceAccountData)
});

@Injectable()

export class AuthMiddleWareService {
    //  tested 
    protected(request,response,next){
            if (request.headers.authorization){
                const tokenData = request.headers.authorization ; 
                if (tokenData.startsWith('Bearer')){
                    const token = tokenData.split(' ')[1];
                    admin.auth().verifyIdToken(token).then(async(res) => {
                    const userUid = res.uid ;  
                    response.status(200)
                    response.send(`userId : ${userUid} status 200 OK`) ;
                }).catch((e) =>{
                        response.status(401)
                        response.send(`status Authorized 401 error wrong token`) ;
                        next();
                    })
                } 
            }else{
                response.status(401)
                response.send(`status Authorized 401 error`) ;
                next();
            }
        }

    // no test ! 
    protectedAppcheck(request , response , next ){
        try{
            const appCheckToken = request.header('X-Firebase-AppCheck');

            if (!appCheckToken) {
                response.status(401);
                
            }
        
            try {
                const appCheckClaims =  getAppCheck().verifyToken(appCheckToken);
                // If verifyToken() succeeds, continue with the next middleware
                // function in the stack.

                
            } catch (err) {
                response.status(401);
                
            }



            const tokenData = request.headers
            console.log(tokenData)
            const decodedVal = admin.auth().verifyIdToken(tokenData,true);
        }
        catch(err){
            console.log(err)
        } 
    }
}
