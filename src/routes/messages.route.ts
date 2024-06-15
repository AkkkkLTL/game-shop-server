import { MessageController } from "@controllers/messages.controller";
import { Routes } from "@interfaces/routes.interface";
import { Router } from "express";

export class MessageRoute implements Routes {
  public path = "/messages";
  public router = Router();
  public message = new MessageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.message.getMessages);
    this.router.get(`${this.path}/:messageId`, this.message.getMessage);
    this.router.post(this.path, this.message.postMessage);
    this.router.delete(`${this.path}/:messageId`, this.message.deleteUser);
  }
}