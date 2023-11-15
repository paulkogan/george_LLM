'use strict';
import { Sequelize, DataTypes, Model } from 'sequelize';

const CharacterModel = (sequelize, DataTypes) => {
  class Character extends Model {}

  Character.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    civilian: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    gender: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    image_url:  {
      allowNull: true,
      type: DataTypes.STRING
    },
    powers: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    character_type:  {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Character',
    tableName: "characters",
  });

  return Character;
};


export default CharacterModel;