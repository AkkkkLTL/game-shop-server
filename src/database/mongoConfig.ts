import { connect, set } from "mongoose";
import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
});

export const mongoConnection = async () => {
  set("strictQuery", false);
  const dbConfig:string = process.env.MONGODB_URI || '';
  try {
    await connect(dbConfig);
  } catch(err) {
    console.log(`mongo connection error: ${err}`);
  }
}