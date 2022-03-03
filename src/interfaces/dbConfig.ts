import { Dialect } from "sequelize/types";

export interface IDBConfig {
  username: string,
  password: string,
  database: string,
  host: string,
  port: number,
  dialect: Dialect,
  logging: boolean,
  force: boolean,
  timezone: string
}