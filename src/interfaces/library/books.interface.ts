export interface IBook extends Document{
  _id?:string,
  title: string,
  author: Object[],
  isbn: string,
  genre: Object,

  cover?: string,
  summary: string,
  imprint: string,
  status:string,
  pages: number,
  currentPages:number,
}