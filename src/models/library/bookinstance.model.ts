import { IBookInstance } from "@interfaces/library/bookinstances.interface";
import { Schema, model } from "mongoose";

const BookInstanceSchema: Schema<IBookInstance> = new Schema({
  book: {
    type: Schema.Types.ObjectId, 
    ref: "Book", 
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Reading", "Readed", "Stop", "Unread"],
    default: "Unread",
  },
});

export const BookInstanceModel = model<IBookInstance>("BookInstance", BookInstanceSchema);