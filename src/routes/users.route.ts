import { Router } from "express";

import { Routes } from "@interfaces/routes.interface";
import { UserController } from "@controllers/users.controller";

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.user.getUsers);
    this.router.get(`${this.path}/:userId`, this.user.getUser);
  }
}