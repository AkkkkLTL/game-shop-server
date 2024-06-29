import { BookController } from "@/controllers/library/book.controller";
import { Routes } from "@/interfaces/routes.interface";
import tryCatch from "@/utils";
import { Router } from "express";

export class BookRoute implements Routes {
  public path = "/books";
  public router = Router();
  public book = new BookController();

  constructor() {
    this.initializeRoutes();
  }
  
  private initializeRoutes() {
    this.router.get(this.path, tryCatch(this.book.getBooks));
    this.router.get(`${this.path}/summary`, tryCatch(this.book.getBookOverview));
    this.router.get(`${this.path}/:id`, tryCatch(this.book.getBookById));
    this.router.post(`${this.path}/create`, tryCatch(this.book.createBook));
    this.router.put(`${this.path}/:id`, tryCatch(this.book.updateBook));
    this.router.delete(`${this.path}/:id`, tryCatch(this.book.deleteBook));
  }
}