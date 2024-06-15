import { Service } from "typedi";

import { IBook } from "@interfaces/library/books.interface";
import { BookModel } from "@models/library/book.model";
import { HttpException } from "@exceptions/HttpExceptions";
import { PipelineStage } from "mongoose";

@Service()
export class BookService {
  public async findAllBook():Promise<IBook[]> {
    const books:IBook[] = await BookModel.find({}, "title author")
      .sort({title:1})
      .populate("author");
    
    return books;
  }

  public async findBookById(bookId:string):Promise<IBook> {
    const findBook = await BookModel.findById(bookId);
    if (!findBook)
      throw new HttpException(404, "Book Not Found");

    return findBook;
  }

  public async findBookByAuthor(authorId:string):Promise<IBook[]> {
    const findBooks:IBook[] = await BookModel.find({author: authorId}, "title summary");
    return findBooks;
  }

  public async findBookByStatus(bookStatus:string):Promise<IBook[]> {
    const findBooks:IBook[] = await BookModel.find({status: bookStatus});
    return findBooks;
  }

  public async countAllBook():Promise<number> {
    const numbooks:number = await BookModel.countDocuments();
    return numbooks;
  }

  public async countBookGroupBy(bookGroup:string):Promise<Object[]> {
    const query:PipelineStage[] = [
      {
        $group: {
          _id: `$${bookGroup}`,
          num_books: {$sum:1},
        }
      }
    ];
    const [...numBookStatus] = await BookModel.aggregate(query);
    return numBookStatus;
  }

  public async createBook(bookData:IBook):Promise<IBook> {
    const findBook:IBook|null = await BookModel.findOne({isbn: bookData.isbn});
    if (findBook) throw new HttpException(409, `The Book ${bookData.title} already exists`);

    const createBookData:IBook = await BookModel.create(bookData);

    return createBookData;
  }

  public async updateBook(bookId:string, bookData:IBook):Promise<IBook> {
    if (bookData.isbn) {
      const findBook:IBook|null = await BookModel.findOne({isbn: bookData.isbn});
      if (findBook && findBook._id != bookId)
        throw new HttpException(409, `The Book ${bookData.isbn} already exists`)
    }

    const updateBookById:IBook|null = await BookModel.findByIdAndUpdate(bookId, { bookData });
    if (!updateBookById)
      throw new HttpException(404, "Book doesn't exist");

    return updateBookById;
  }

  public async deleteBook(bookId:string):Promise<IBook> {
    const deleteBookById:IBook|null = await BookModel.findByIdAndDelete(bookId);
    if (!deleteBookById)
      throw new HttpException(404, "Book doesn't exists");

    return deleteBookById;
  }
}