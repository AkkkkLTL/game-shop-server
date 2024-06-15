export interface IBook extends Document{
  _id?:string,
  title: string,
  author: Object,
  isbn: string,
  genre: Object,

  summary: string,
  imprint: string,
  status:string,
}