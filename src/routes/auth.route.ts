import { Router } from "express";

import { Routes } from "@interfaces/routes.interface";
import { AuthController } from "@controllers/auth.controller";

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}sign-up`, this.auth.getSignUp);
    this.router.post(`${this.path}sign-up`, this.auth.postSignUp);
    this.router.get(`${this.path}log-in`, this.auth.getLogIn);
    this.router.post(`${this.path}log-in`, this.auth.postLogIn);
    this.router.get(`${this.path}log-out`, this.auth.getLogOut);
  }
}