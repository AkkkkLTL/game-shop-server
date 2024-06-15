export interface IAuthor extends Document {
  _id?: string,
  full_name: string,
  date_of_birth: Date,
  date_of_death: Date,

  url?: string,
}