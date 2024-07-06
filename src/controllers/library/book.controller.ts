import { IBook } from "@/interfaces/library/books.interface";
import { AuthorService } from "@/services/library/author.service";
import { BookService } from "@/services/library/book.service";
import { GenreService } from "@/services/library/genre.service";
import debug from "debug";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Container from "typedi";

export class BookController {
  private _debug = debug("book");
  private book = Container.get(BookService);
  private author = Container.get(AuthorService);
  private genre = Container.get(GenreService);

  public getBooks = async (req:Request, res:Response) => {
    const params = req.query;
    const findAllBooksData:IBook[] = await this.book.findAllBook(params);

    res.status(200).json({
      data: findAllBooksData,
      message: "findAll",
    });
  }

  public getBookById = async (req:Request, res:Response) => {
    const bookId:string = req.params.id;
    const book:IBook = await this.book.findBookById(bookId);

    res.status(200).json({
      data: book,
      message: "findOne",
    });
  }

  public getBookOverview = async (req:Request, res:Response) => {
    const statusBook = await this.book.countBookGroupBy("status");

    res.status(200).json({
      data: statusBook,
      message: "Over View Data",
    });
  }

  public createBook = async (req:Request, res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const bookData = req.body;
    const createBookData:IBook = await this.book.createBook(bookData);
    res.status(201).json({
      data: createBookData,
      message: "created",
    });
  }

  public updateBook = async (req:Request, res:Response) => {
    const bookId:string = req.params.id;
    const bookData:IBook = req.body;
    const updateBookData:IBook = await this.book.updateBook(bookId, bookData);

    res.status(200).json({
      data: updateBookData,
      message: "updated",
    })
  }

  public deleteBook = async (req:Request, res:Response) => {
    const bookId:string = req.params.id;
    const deleteBookData:IBook = await this.book.deleteBook(bookId);

    res.status(200).json({
      data: deleteBookData,
      message: "deleted",
    })
  }
}