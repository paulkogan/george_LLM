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
  });

  // take these methods out to a domain layer
	Actor.findByName = async (name_target) => {

		const results = await Actor.findOne({
			where: {name: name_target},
		})

		if (!results) {
			console.log("No Actor found")
		}
      
		return results

	} 

	Actor.addNew = async (new_actor) => {

		return await Actor.create(new_actor)
		//return message
	}

  return Actor;
};


export default ActorModel;