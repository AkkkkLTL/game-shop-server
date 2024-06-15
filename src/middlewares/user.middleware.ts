import { NextFunction, Request, Response } from "express";

import { users } from "@models/user.model";
import { messages } from "@models/message.model";

export const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.context = {
    users,
    messages,
    me: users[1]
  }
  next();
}