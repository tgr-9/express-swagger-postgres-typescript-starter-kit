import { Sequelize } from 'sequelize';
import { IDBConfig } from 'src/interfaces/dbConfig';
import config from '../config/config.json';

const dbConfig: IDBConfig = config.development as IDBConfig;

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export default sequelize;
