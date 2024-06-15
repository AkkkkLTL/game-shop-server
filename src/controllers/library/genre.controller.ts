import { IGenre } from "@/interfaces/library/genres.interface"
import { GenreService } from "@/services/library/genre.service"
import { Request, Response } from "express"
import Container from "typedi"

export class GenreController {
  public genre = Container.get(GenreService);

  public getGenres = async (req:Request, res:Response) => {
    const findAllGenresData:IGenre[] = await this.genre.findAllGenre();

    res.status(200).json({
      data: findAllGenresData,
      message: "findAll",
    })
  }

  public getGenreById = async (req:Request, res:Response) => {
    const genreId:string = req.params.id;
    const genre:IGenre = await this.genre.findGenreById(genreId);

    res.status(200).json({
      data: genre,
      message: "findOne",
    })
  }

  public createGenre = async (req:Request, res:Response) => {
    const genreData:IGenre = req.body;
    const createGanreData:IGenre = await this.genre.createGenre(genreData);

    res.status(201).json({
      data: createGanreData,
      message: "created",
    })
  }

  public updateGenre = async (req:Request, res:Response) => {
    const genreId:string = req.params.id;
    const genreData:IGenre = req.body;
    const updateGenreData:IGenre = await this.genre.updateGenre(genreId, genreData);

    res.status(200).json({
      data: updateGenreData,
      message: "updated",
    })
  }

  public deleteGenre = async (req:Request, res:Response) => {
    const genreId:string = req.params.id;
    const deleteGenreData:IGenre = await this.genre.deleteGenre(genreId);

    res.status(200).json({
      data: deleteGenreData,
      message: "deleted",
    })
  }
}