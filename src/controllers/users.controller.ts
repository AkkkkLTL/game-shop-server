import { NextFunction, Request, Response } from "express";

export class UserController {
  public getUsers = (req:Request, res:Response, next:NextFunction) => {
    return res.send(Object.values(req.context.users));
  }
  public getUser = (req: Request, res: Response, next: NextFunction) => {
    return res.send(req.context.users[req.params.userId]);
  }
}