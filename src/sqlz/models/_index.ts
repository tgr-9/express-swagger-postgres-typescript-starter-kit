import { Sequelize } from 'sequelize';
import config from '../config/config.json';

const dbConfig: any = config.development;
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

export default sequelize;
