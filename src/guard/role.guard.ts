import { Injectable, CanActivate, ExecutionContext, Req, Res, Body, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/entity/role.enum';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { type } from 'os';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector , @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App) { 
  }

  async canActivate(context: ExecutionContext ): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user: Request = context.switchToHttp().getRequest();

    // check AUTH token 
    try {
      const tokenData = user.headers.authorization;

      if (tokenData.startsWith('Bearer')) {

        const token = tokenData.split(' ')[1];

        try {
          const decryptData = await admin.auth().verifyIdToken(token) ;
          if(decryptData["role"]){
            const userRoleList = decryptData["role"].split(',') ; 
            console.log(requiredRoles.some((role) => userRoleList.includes(role)));
            return requiredRoles.some((role) => userRoleList.includes(role));
          }else {
            return false ; 
          }

          // return admin.auth().verifyIdToken(token).then(async (res) => {
          //   const fireStoreDB = this.firebaseAdmin.firestore();
          //   const querySnapshot = await fireStoreDB.collection('Users').where("uid", "==", res.uid).limit(1).get();

            

          //   if (!querySnapshot.empty) {
          //     const userData = querySnapshot.docs[0].data();

          //     return requiredRoles.some((role) => userData.role?.includes(role))

          //   } else {

          //     return false;
          //   }

          // })
        } catch (e) {
          return false;
        }

      }
    }
    catch (e) {
      return false;
    }

  }

}

