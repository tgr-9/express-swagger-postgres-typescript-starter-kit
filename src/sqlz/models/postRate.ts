import { Model, INTEGER, Optional } from 'sequelize';
import { IPostRate } from '../../interfaces/postRate';
import { TABLES } from '../../constants/tables';
import { Post } from './post';
import { User } from './user';
import sequelize from './_index';

interface PostRateCreationAttributes extends Optional<IPostRate, 'id'> { }

export class PostRate extends Model<IPostRate, PostRateCreationAttributes> implements IPostRate {
  public id!: number;
  public postId: number;
  public userId: number;
  public rate: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

}

PostRate.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: INTEGER,
      allowNull: false
    },
    postId: {
      type: INTEGER,
      allowNull: false
    },
    rate: {
      type: INTEGER,
      allowNull: false
    },
  },
  { sequelize, tableName: TABLES.POST_RATE }
);

PostRate.belongsTo(User, {
  foreignKey: 'id',
  constraints: false
});

User.hasMany(PostRate, {
  foreignKey: 'userId',
  constraints: false
});

PostRate.belongsTo(Post, {
  foreignKey: 'id',
  constraints: false
});

Post.hasMany(PostRate, {
  foreignKey: 'postId',
  constraints: false,
  as: 'rates'
});