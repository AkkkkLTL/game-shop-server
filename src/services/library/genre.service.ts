import { HttpException } from "@/exceptions/HttpExceptions";
import { IGenre } from "@interfaces/library/genres.interface";
import { GenreModel } from "@models/library/genre.model";

export class GenreService {
  public async findAllGenre():Promise<IGenre[]> {
    const genres:IGenre[] = await GenreModel.find();

    return genres;
  }

  public async findGenreById(genreId:string):Promise<IGenre> {
    const findGenre:IGenre|null = await GenreModel.findById(genreId);
    if (!findGenre) throw new HttpException(404, "Genre not Found");

    return findGenre;
  }

  public async createGenre(genreData:IGenre):Promise<IGenre> {
    const findGenre:IGenre|null = await GenreModel.findOne({name: genreData.name});
    if (findGenre) throw new HttpException(409, `The Genre ${genreData.name} already exists`);

    const createGenre:IGenre = await GenreModel.create(genreData);
    return createGenre;
  }

  public async updateGenre(genreId:string, genreData:IGenre) {
    if (genreData.name) {
      const findGenre:IGenre|null = await GenreModel.findOne({name: genreData.name});
      if (findGenre && findGenre._id != genreId)
        throw new HttpException(409, "The Genre already exists");
    }

    const updateGenre:IGenre|null = await GenreModel.findByIdAndUpdate(genreId, { genreData });
    if (!updateGenre)
      throw new HttpException(404, "The Genre doesn't exists");

    return updateGenre;
  }

  public async deleteGenre(genreId:string) {
    const deleteGenre:IGenre|null = await GenreModel.findByIdAndDelete(genreId);
    if (!deleteGenre)
      throw new HttpException(404, "The Genre doesn't exists");
    return deleteGenre;
  }
}