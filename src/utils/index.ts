import { NextFunction, Request, Response } from "express";

const tryCatch = (
  controller: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response>
) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await controller(req,res,next);
  } catch(error) {
    return next(error);
  }
}

export default tryCatch;