'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';

const MovieModel = (sequelize, DataTypes) => {
  class Movie extends Model {}

  Movie.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    synopsis: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    release_year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    global_box_office: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Movie',
    tableName: "movies",
  });

  return Movie;
};


export default MovieModel;