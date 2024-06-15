import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core"

interface IRequestBody {
  name: string,
  background_image: string,
  description_raw: string,
  released: string,
  parent_platforms: string[],
  genres: string[],
  publishers: string[],
  developers: string[],
  website: string,
}

declare global {
  namespace Express {
    interface User {
      id?: string,
    }
    export interface Request {
      me?: any,
      context?: any,
    }
  }
}

export type TUpdateRequest = Request<ParamsDictionary, unknown, IRequestBody>;