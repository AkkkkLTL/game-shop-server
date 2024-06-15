import { NextFunction, Request, Response } from "express";
import Mock from "mockjs";
import { pool } from "../database/mongoConfig";
import { TUpdateRequest } from "../types";
import { QueryResult } from "pg";

export const game_list_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const data = await pool.query('SELECT * FROM test_db;');
  const data = Mock.mock({
    'results|1-10':[{
      'id|+1':1,
    }]
  });
  res.status(200).json(data);
}

export const game_create_post = async (
  req: TUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    background_image,
    description_raw,
    released,
    parent_platforms,
    genres,
    publishers,
    developers,
    website
  } = req.body;

  console.log(`receive a request ${JSON.stringify(req.body)}`);
  await pool.query(
    `INSERT INTO game(name, background_image, description_raw, released, parent_platforms, genres, publishers, developers, website)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [
      name,
      background_image,
      description_raw,
      released,
      parent_platforms,
      genres,
      publishers,
      developers,
      website
    ]
  );

  const newGame = await pool.query(
    `SELECT * FROM game ORDER BY create_at DESC LIMIT 1;`
  )

  res.status(200).json(newGame.rows);
}

export const game_get = async (
  req:Request,
  res:Response,
  next: NextFunction
) => {
  const {id} = req.params;
  const data = await pool.query('SELECT * FROM game WHERE id = $1;', [id]);
  if (data.rows.length === 0) throw new Error("We didn't find the game");
  res.status(200).json(data.rows);
}

export const game_delete = async (req:Request, res: Response) => {
  const {id} = req.params;
  const queryResult: QueryResult<{count: string}> = await pool.query(
    'SELECT COUNT(*) FROM game;'
  );
  const totalGames = parseInt(queryResult.rows[0].count, 10);
  if (totalGames <= 1) throw new Error("You can't delete the last game");
  const data = await pool.query('DELETE FROM game WHERE id = $1;', [id]);
  res.json(data);
}