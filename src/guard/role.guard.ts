import { Injectable, CanActivate, ExecutionContext, Req, Res, Body, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/role/role.enum';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { type } from 'os';
import axios from 'axios';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    // check AUTH token 
    try {

      const collectionRef = await this.firebaseAdmin.firestore().collection("Users");
      const user: Request = context.switchToHttp().getRequest();
      const tokenData = user.headers.authorization;

      if (tokenData.startsWith('Bearer')) {
        const token = tokenData.split(' ')[1];

        // from token 
        const decryptData = await admin.auth().verifyIdToken(token);
        let decryptedRole = '';

        // from firestore 
        const queryResult = await collectionRef.where("email", "==", decryptData.email).limit(1).get();
        const userData = queryResult.docs[0].data();

        // return false;

        if (userData) {

          decryptedRole = sortedStringListToString(decryptData.role);
          const queryRole = sortedStringListToString(userData.role);
      
          if (!decryptedRole) {
            await axios.post('https://addcustomclaim-pm74y43ghq-uc.a.run.app', { email: decryptData['email'], role: queryRole })
            // console.log(queryRole);
            decryptedRole = queryRole
          }
          console.log(decryptedRole , queryRole)

          if (decryptedRole == queryRole) {

            const listDecryptedRoleAsc = decryptedRole.split(',');
            const accessControl = requiredRoles.some(role => listDecryptedRoleAsc.includes(role));

            return accessControl

          } else {

            console.log("user's role does not match")
            return false;
          }

        } else {

          console.log("data doesn't exist in firestore ")
          return false;

        }

      }
    }
    catch (e) {
      return false;
    }

  }

}


export function sortedStringListToString(text: string): string {

  // example <ascending a to z >: "['user','admin','executive']" -> "['admin','executive','user']" 
  //  use on role data that 
  try {
    const listAsc = ((text.replace(/[\[\]]/g, '')).split(',')).sort((one, two) => (one > two ? 1 : -1))
    const textAsc = listAsc.join(',');
    return textAsc
  } catch {
    return null;
  }
}


