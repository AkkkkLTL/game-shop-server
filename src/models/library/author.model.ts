import { DateTime } from "luxon";
import { Schema, model } from "mongoose";

import { IAuthor } from "@interfaces/library/authors.interface";

const AuthorSchema: Schema<IAuthor> = new Schema({
  full_name: {
    type: String, 
    required: true, 
    maxLength: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  },
});

// virtual for author's URL
AuthorSchema.virtual('url').get(function (){
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

export const AuthorModel = model<IAuthor>("Author", AuthorSchema);
