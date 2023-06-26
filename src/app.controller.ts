import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './role/role.enum';
import { Roles } from './role/role.decorator';
import { Response, Request } from 'express';

@Controller("security")

export class AppController {
  constructor(private readonly appService: AppService) { }

  @Roles(Role.ADMIN, Role.DEV, Role.EXEC , Role.USER)
  @Post('/login')
  async loginUserAccount(@Req() req: Request, @Res() res: Response): Promise<void> {
    try{
      const userHeaderToken = req.headers["authorization"] ; 
      if(userHeaderToken.startsWith("Bearer ")){
        const userToken = userHeaderToken.split(" ")[1]; 
        res.status(200).json({ verifiedToken : userToken})
      }
      else {
        res.status(401).json({error : "unAuthorized user"})
      } 
    }catch{
      res.status(500).json({error : "internal server error"})
    }
  }
}

