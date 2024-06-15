import { Request } from "express";

export interface IUser extends Document {
  _id?: string,
  username: string | null,
  password: string,
}

export interface UserReq extends Request {
  me?: any,
  
}