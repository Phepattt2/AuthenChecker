import { Controller, Get, Post, Req, Res, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './role/role.enum';
import { Roles } from './role/role.decorator';
import { Response, Request } from 'express';
import { Reflector } from '@nestjs/core';
import { userDTO } from './dto/user.dto';
import * as admin from 'firebase-admin';


@Controller("security")

export class AppController {
  constructor(private readonly appService: AppService, @Inject('FirebaseAdmin') private readonly firebaseAdmin: admin.app.App) { }



  @Roles(Role.ADMIN, Role.DEV, Role.EXEC, Role.USER)
  @Get('/login')
  async loginUserAccount(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const userHeaderToken = req.headers["authorization"];
      if (userHeaderToken.startsWith("Bearer ")) {
        const userToken = userHeaderToken.split(" ")[1];
        res.status(200).json({ verifiedToken: userToken })
      }
      else {
        res.status(401).json({ error: "unAuthorized user" })
      }
    } catch {
      res.status(500).json({ error: "internal server error" })
    }
  }

  @Roles(Role.ADMIN)
  @Post('/createUser')
  async createUser(@Req() req: Request, @Res() res: Response, @Body() user: userDTO): Promise<void> {

    try {
      const collecitonRef = this.firebaseAdmin.firestore().collection("Users");
      const queryResult = await collecitonRef.where("email", "==", req.body.email).limit(1).get();
      
      if (checkRole(req.body.role)) {
        if (queryResult.empty) {
          await collecitonRef.add({
            email: req.body.email,
            status: req.body.status,
            role: req.body.role,
          });
          res.status(200).json({ "message": "Success!" })
        } else {
          res.status(422).json({ "message": "inprocessable entity , duplicate email..." });
        }
      } else {
        res.status(422).json({ "message": "inprocessable entity , unknow role..." });

      }



    } catch (e) {
      console.log(e);
      res.status(500).json({ Error: "insert user failed" });

    }
  }
}

function checkRole(value: string[]): boolean {
  return Object.values(Role).some( role => value.includes(role));
}