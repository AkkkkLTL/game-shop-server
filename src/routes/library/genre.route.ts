import { GenreController } from "@/controllers/library/genre.controller";
import { Routes } from "@/interfaces/routes.interface";
import tryCatch from "@/utils";
import { Router } from "express";

export class GenreRoute implements Routes {
  public path =  "/genre";
  public router = Router();
  public genre = new GenreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, tryCatch(this.genre.getGenres));
    this.router.get(`${this.path}/:id`, tryCatch(this.genre.getGenreById));
    this.router.post(this.path, tryCatch(this.genre.createGenre));
    this.router.put(`${this.path}/:id`, tryCatch(this.genre.updateGenre));
    this.router.delete(`${this.path}/:id`, tryCatch(this.genre.deleteGenre));
  }
}