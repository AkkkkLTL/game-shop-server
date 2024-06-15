import { Router } from "express";

import { AuthorController } from "@controllers/library/author.controller";
import { Routes } from "@interfaces/routes.interface";
import tryCatch from "@utils/index";
import { AuthorValidator } from "@middlewares/library/validator.middleware";

export class AuthorRoute implements Routes {
  public path = "/authors";
  public router = Router();
  public author = new AuthorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, tryCatch(this.author.getAuthors));
    this.router.get(`${this.path}/:id`, tryCatch(this.author.getAuthorById));
    this.router.post(this.path, AuthorValidator, tryCatch(this.author.createAuthor));
    this.router.put(`${this.path}/:id`, tryCatch(this.author.updateAuthor));
    this.router.delete(`${this.path}/:id`, tryCatch(this.author.deleteAuthor));
  }
}