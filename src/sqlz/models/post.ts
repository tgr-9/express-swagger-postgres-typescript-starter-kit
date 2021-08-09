import { Model, INTEGER, Optional, TEXT } from 'sequelize';
import { IPost } from '../../interfaces';
import { TABLES } from '../../constants/tables';
import sequelize from './_index';

interface PostCreationAttributes extends Optional<IPost, 'id'> { }

export class Post extends Model<IPost, PostCreationAttributes> implements IPost {
  public id!: number;
  public content: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

}

Post.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: TEXT,
      allowNull: false
    },
  },
  { sequelize, tableName: TABLES.POST }
);