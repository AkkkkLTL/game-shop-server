import { Service } from "typedi";
import { SortOrder } from "mongoose";

import { AuthorModel } from "@models/library/author.model";
import { IAuthor } from "@interfaces/library/authors.interface";
import { BookModel } from "@models/library/book.model";
import { IBook } from "@interfaces/library/books.interface";
import { HttpException } from "@exceptions/HttpExceptions";

@Service()
export class AuthorService {
  /**
   * get All Authors
   * 
   * @param sortArg author sort rule
   * @returns all Authors
   */
  public async findAllAuthor(sortArg?:{[key:string]:SortOrder} | null): Promise<IAuthor[]> {
    // Finding all Author into MongoDB
    const authors:IAuthor[] = await AuthorModel.find()
      .sort(sortArg);

    return authors;
  }

  /**
   * find Author by id
   * 
   * @param authorId author id
   * @returns specified author & this author's books
   */
  public async findAuthorById(authorId:string): Promise<IAuthor> {
    const findAuthor = await AuthorModel.findById(authorId);
    if (!findAuthor) throw new HttpException(404, "Author doesn't exist");

    return findAuthor;
  }

  /**
   * create Author, can duplicate
   * 
   * @param authorData new author data
   * @returns new author
   */
  public async createAuthor(authorData:IAuthor):Promise<IAuthor> {
    const createAuthorData:IAuthor = await AuthorModel.create(authorData);

    return createAuthorData;
  }

  /**
   * update author, can duplicate
   * 
   * @param authorId author id
   * @param authorData update author data
   * @returns updated specified author
   */
  public async updateAuthor(authorId:string, authorData:IAuthor):Promise<IAuthor> {
    const updateAuthorById = await AuthorModel.findByIdAndUpdate(authorId, {authorData});
    if (!updateAuthorById) throw new HttpException(404, "Author doesn't exist");

    return updateAuthorById;
  }

  /**
   * delete author
   * 
   * @param authorId author id
   * @returns deleted specified author
   */
  public async deleteAuthor(authorId:string):Promise<IAuthor> {
    const findBooksByAuthor:IBook[] = await BookModel.find({author: authorId});

    // avoid books's author no found
    if (findBooksByAuthor.length > 0)
      throw new HttpException(402, "Having books by this author, can't delete");

    const deleteAuthorById:IAuthor|null = await AuthorModel.findByIdAndDelete(authorId);
    // check the author whether exist
    if (!deleteAuthorById) 
      throw new HttpException(404, "Author doesn't exists");

    return deleteAuthorById;
  }
}