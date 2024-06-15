import { Request, Response } from "express";
import debug from "debug";
import { validationResult } from "express-validator";
import { Container } from "typedi";

import { IAuthor } from "@interfaces/library/authors.interface";
import { AuthorService } from "@services/library/author.service";
import { BookService } from "@services/library/book.service";


export class AuthorController {

  private _debug = debug("author");
  public author = Container.get(AuthorService);
  public book = Container.get(BookService);

  public getAuthors = async (req:Request, res:Response) => {

    const findAllAuthorsData:IAuthor[] = await this.author.findAllAuthor({family_name:1});
  
    res.status(200).json({
      data: findAllAuthorsData,
      message: "findAll",
    });
  }

  public getAuthorById = async (req:Request, res:Response) => {
    const authorId:string = req.params.id;
    const [author, allBooksByAuthor] = await Promise.all([
      this.author.findAuthorById(authorId),
      this.book.findBookByAuthor(authorId),
    ]); 

    res.status(200).json({
      data: {
        author: author,
        author_books: allBooksByAuthor,
      },
      message: "findOne"
    });
  }

  public createAuthor = async (req:Request, res:Response) => {
    // validate the author Data
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
    {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    
    const authorData:IAuthor = req.body;
    const createAuthorData:IAuthor = await this.author.createAuthor(authorData);
    res.status(201).json({
      data: createAuthorData,
      message: "created",
    });
  }

  public updateAuthor = async (req:Request, res:Response) => {
    const authorId:string = req.params.id;
    const authorData:IAuthor = req.body;
    const updateAuthorData:IAuthor = await this.author.updateAuthor(authorId, authorData);

    res.status(200).json({
      data: updateAuthorData,
      message: "updated",
    })
  }

  public deleteAuthor = async (req:Request, res:Response) => {
    const authorId = req.params.id;
    const deleteAuthorData = await this.author.deleteAuthor(authorId);

    res.status(200).json({
      data: deleteAuthorData,
      message: "deleted",
    });
  }
}