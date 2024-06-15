import { IBook } from "@interfaces/library/books.interface";
import { Schema, model } from "mongoose";

const BookSchema: Schema<IBook> = new Schema({
  title: {
    type: String, 
    required: true
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: "Author", 
    required: true
  },
  isbn: {
    type: String, 
    required: true
  },
  genre: {
    type: Schema.Types.ObjectId, 
    ref: "Genre"
  },

  summary: {
    type: String, 
  },
  imprint: {
    type: String, 
  },
  status: {
    type: String,
    required: true,
    enum: ["READING", "UNREAD", "READED"],
    default: "UNREAD"
  }
});

export const BookModel = model<IBook>("Book", BookSchema);