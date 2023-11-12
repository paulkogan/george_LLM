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
  }, {
    sequelize,
    modelName: 'Character',
    tableName: "characters",
  });

  // take these methods out to a domain layer
	Character.findByName = async (name_target) => {

		const results = await Character.findOne({
			where: {name: name_target},
		})

		if (!results) {
			console.log("No character found")
		}
      
		return results

	} 

	Character.addNew = async (new_character) => {

		return await Character.create(new_character)
		//return message
	}

  return Character;
};


export default CharacterModel;