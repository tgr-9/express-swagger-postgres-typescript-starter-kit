import { Model, STRING, INTEGER, Optional } from 'sequelize';
import { TABLES } from '../../constants/tables';
import sequelize from './_index';
import { IUserPayload } from '../../interfaces/user';

interface UserCreationAttributes extends Optional<IUserPayload, 'id'> { }

export class User extends Model<IUserPayload, UserCreationAttributes> implements IUserPayload {
  public id!: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

}

User.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: STRING(50),
    lastname: STRING(50),
    email: {
      type: STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
  },
  { sequelize, tableName: TABLES.USER }
);