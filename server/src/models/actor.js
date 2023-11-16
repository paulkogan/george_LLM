'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';

const ActorModel = (sequelize, DataTypes) => {
  class Actor extends Model {}

  Actor.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Actor',
    tableName: "actors",
    underscored: true
  });

  return Actor;
};


export default ActorModel;