import { IGenre } from "@interfaces/library/genres.interface";
import { Schema, model } from "mongoose";

const GenreSchema: Schema<IGenre> = new Schema({
  name: {
    type: String, 
    required: true, 
    minLength: 3, 
    maxLength: 100
  }
});

export const GenreModel = model<IGenre>("Genre", GenreSchema);